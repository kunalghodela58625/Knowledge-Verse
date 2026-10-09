import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, isValidEmail, createSession, setSessionCookie, safeUser } from "@/lib/auth";
import { ensureAdmin } from "@/lib/seed";

export async function POST(req: Request) {
  try {
    await ensureAdmin();
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!email || !isValidEmail(email) || !password)
      return NextResponse.json({ error: "Please enter your email and password." }, { status: 400 });

    const users = await db.users();
    const user = users.find((u) => u.email.toLowerCase() === email);
    if (!user || !user.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
      if (user && !user.passwordHash)
        return NextResponse.json({ error: "This account uses Continue with Google. Please sign in with Google." }, { status: 401 });
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await createSession(user);
    await setSessionCookie(token);
    return NextResponse.json({ user: safeUser(user) });
  } catch {
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
