import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, safeUser, hashPassword, validatePassword } from "@/lib/auth";

// Update profile: full name and/or password.
export async function PUT(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Please login first." }, { status: 401 });
  try {
    const body = await req.json();
    const users = await db.users();
    const user = users.find((u) => u.id === me.id);
    if (!user) return NextResponse.json({ error: "Account not found." }, { status: 404 });

    if (body.fullName !== undefined) {
      const name = String(body.fullName).trim();
      if (!name) return NextResponse.json({ error: "Full name cannot be empty." }, { status: 400 });
      user.fullName = name;
    }
    if (body.newPassword) {
      // OAuth-only accounts have no password yet, so they can set one directly.
      if (user.passwordHash) {
        const cur = String(body.currentPassword || "");
        const { verifyPassword } = await import("@/lib/auth");
        if (!(await verifyPassword(cur, user.passwordHash)))
          return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
      }
      const err = validatePassword(String(body.newPassword));
      if (err) return NextResponse.json({ error: err }, { status: 400 });
      user.passwordHash = await hashPassword(String(body.newPassword));
    }
    user.updatedAt = new Date().toISOString();
    await db.saveUsers(users);
    return NextResponse.json({ user: safeUser(user) });
  } catch {
    return NextResponse.json({ error: "Could not update profile." }, { status: 500 });
  }
}
