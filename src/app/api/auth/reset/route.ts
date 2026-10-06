import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, validatePassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = String(body.token || "");
    const password = String(body.password || "");
    const confirm = String(body.confirmPassword || "");
    if (!token) return NextResponse.json({ error: "Invalid reset link." }, { status: 400 });

    const pwErr = validatePassword(password);
    if (pwErr) return NextResponse.json({ error: pwErr }, { status: 400 });
    if (password !== confirm) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });

    const resets = await db.resets();
    const rec = resets.find((r) => r.token === token);
    if (!rec || rec.expiresAt < Date.now())
      return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });

    const users = await db.users();
    const user = users.find((u) => u.email === rec.email);
    if (!user) return NextResponse.json({ error: "Account not found." }, { status: 404 });
    user.passwordHash = await hashPassword(password);
    user.updatedAt = new Date().toISOString();
    await db.saveUsers(users);
    await db.saveResets(resets.filter((r) => r.token !== token));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Password reset failed. Please try again." }, { status: 500 });
  }
}
