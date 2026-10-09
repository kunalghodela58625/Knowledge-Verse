import { NextResponse } from "next/server";
import { db, uid } from "@/lib/db";
import { hashPassword, validatePassword, isValidEmail, createSession, setSessionCookie, safeUser } from "@/lib/auth";
import { ensureAdmin } from "@/lib/seed";

// Direct registration (name + email + password). Google OAuth is available
// separately via /api/auth/oauth/google.
export async function POST(req: Request) {
  try {
    await ensureAdmin();
    const body = await req.json();
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const confirm = String(body.confirmPassword || "");

    if (!fullName) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    if (!email || !isValidEmail(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    const pwErr = validatePassword(password);
    if (pwErr) return NextResponse.json({ error: pwErr }, { status: 400 });
    if (password !== confirm) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });

    const users = await db.users();
    if (users.some((u) => u.email.toLowerCase() === email))
      return NextResponse.json({ error: "An account with this email already exists. Please login." }, { status: 409 });

    const user = {
      id: uid("u_"),
      fullName,
      email,
      passwordHash: await hashPassword(password),
      provider: "credentials" as const,
      role: "student" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(user);
    await db.saveUsers(users);

    const token = await createSession(user);
    await setSessionCookie(token);
    return NextResponse.json({ user: safeUser(user) });
  } catch {
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
