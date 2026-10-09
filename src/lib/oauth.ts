import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, uid } from "./db";
import { createSession, setSessionCookie } from "./auth";

const STATE_COOKIE = "kv_oauth_state";

function secret(): Uint8Array {
  const s =
    process.env.KV_JWT_SECRET ||
    process.env.JWT_SECRET ||
    "knowledgeverse-dev-secret-change-in-production";
  return new TextEncoder().encode(s);
}

export function googleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function appOrigin(req: Request): string {
  // KV_PUBLIC_URL wins when set (production custom domains).
  if (process.env.KV_PUBLIC_URL) return process.env.KV_PUBLIC_URL.replace(/\/$/, "");
  // Top-level navigations don't send an Origin header, so derive from Host.
  // Vercel (and most proxies) set x-forwarded-host / x-forwarded-proto.
  const host =
    req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || "http";
  return `${proto}://${host}`.replace(/\/$/, "");
}

function redirectUri(origin: string): string {
  return `${origin}/api/auth/oauth/google/callback`;
}

function safeNext(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/dashboard";
}

// STEP 1: redirect the student to Google's consent screen.
export async function startGoogle(req: Request) {
  if (!googleConfigured()) {
    return new Response(
      "Google sign-in is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (see DEPLOY_VERCEL.md).",
      { status: 500 }
    );
  }
  const url = new URL(req.url);
  const next = safeNext(url.searchParams.get("next"));
  const state = await new SignJWT({ jti: uid("st_"), next })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(secret());

  const jar = await cookies();
  jar.set(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" && process.env.KV_ALLOW_HTTP !== "1",
    path: "/",
    maxAge: 600,
  });

  const origin = appOrigin(req);
  const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  auth.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
  auth.searchParams.set("redirect_uri", redirectUri(origin));
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("scope", "openid email profile");
  auth.searchParams.set("state", state);
  auth.searchParams.set("access_type", "online");
  auth.searchParams.set("prompt", "select_account");
  redirect(auth.toString());
}

// STEP 2: Google redirects back here with ?code=&state=. Verify, fetch the
// profile, find-or-create the student, then log them in.
export async function finishGoogle(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const jar = await cookies();
  const saved = jar.get(STATE_COOKIE)?.value;
  jar.delete(STATE_COOKIE);

  const fail = (msg: string) =>
    redirect(`/login?error=${encodeURIComponent(msg)}`);

  if (!code || !state || !saved || state !== saved) return fail("Sign-in was cancelled or expired. Please try again.");
  let next = "/dashboard";
  try {
    const { payload } = await jwtVerify(state, secret());
    next = safeNext(String(payload.next || "/dashboard"));
  } catch {
    return fail("Sign-in session expired. Please try again.");
  }

  try {
    const origin = appOrigin(req);
    // Exchange code for tokens
    const tokRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri(origin),
        grant_type: "authorization_code",
      }),
    });
    if (!tokRes.ok) return fail("Could not complete Google sign-in. Please try again.");
    const tokens = (await tokRes.json()) as { access_token?: string };
    if (!tokens.access_token) return fail("Could not complete Google sign-in. Please try again.");

    // Fetch verified profile
    const meRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!meRes.ok) return fail("Could not read your Google profile. Please try again.");
    const profile = (await meRes.json()) as {
      email?: string;
      email_verified?: boolean;
      name?: string;
      given_name?: string;
      family_name?: string;
    };
    const email = String(profile.email || "").toLowerCase();
    if (!email || profile.email_verified === false)
      return fail("Your Google account email is not verified.");
    const fullName =
      String(profile.name || "").trim() ||
      `${profile.given_name || ""} ${profile.family_name || ""}`.trim() ||
      email.split("@")[0];

    const users = await db.users();
    let user = users.find((u) => u.email.toLowerCase() === email);
    if (!user) {
      user = {
        id: uid("u_"),
        fullName,
        email,
        passwordHash: "",
        provider: "google" as const,
        role: "student" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users.push(user);
      await db.saveUsers(users);
    }

    const token = await createSession(user);
    await setSessionCookie(token);
    redirect(next);
  } catch {
    return fail("Google sign-in failed. Please try again.");
  }
}
