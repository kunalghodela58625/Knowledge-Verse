import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db, type User } from "./db";

const COOKIE = "kv_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): Uint8Array {
  const s =
    process.env.KV_JWT_SECRET ||
    process.env.JWT_SECRET ||
    "knowledgeverse-dev-secret-change-in-production";
  return new TextEncoder().encode(s);
}

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 12);
}

export async function verifyPassword(
  pw: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}

export async function createSession(user: User): Promise<string> {
  return new SignJWT({ uid: user.id, role: user.role, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  // Secure cookies require HTTPS. They work on http://localhost (browsers treat
  // localhost as trustworthy) but break plain-HTTP LAN/self-host access, so
  // allow opting out with KV_ALLOW_HTTP=1 in such deployments.
  const secure =
    process.env.NODE_ENV === "production" &&
    process.env.KV_ALLOW_HTTP !== "1";
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export interface Session {
  uid: string;
  role: "student" | "admin";
  email: string;
}

export async function getSession(): Promise<Session | null> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    return {
      uid: String(payload.uid),
      role: payload.role === "admin" ? "admin" : "student",
      email: String(payload.email),
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const s = await getSession();
  if (!s) return null;
  const users = await db.users();
  return users.find((u) => u.id === s.uid) ?? null;
}

export function safeUser(u: User) {
  return {
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
  };
}

export function validatePassword(pw: string): string | null {
  if (!pw || pw.length < 8) return "Password must be at least 8 characters long.";
  if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw))
    return "Password must contain at least one letter and one number.";
  return null;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
