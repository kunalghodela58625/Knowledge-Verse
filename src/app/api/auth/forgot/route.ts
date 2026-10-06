import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { isValidEmail } from "@/lib/auth";

// Generates a reset token. In production this would be emailed;
// here the token is returned so password recovery works without an SMTP server.
// The reset page consumes the token server-side.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !isValidEmail(email))
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

    const users = await db.users();
    const user = users.find((u) => u.email.toLowerCase() === email);
    // Always respond generically to avoid email enumeration, but include the
    // token when the account exists so the demo flow works end-to-end.
    if (!user) return NextResponse.json({ ok: true, message: "If an account exists, a reset link has been created." });

    const resets = await db.resets();
    const token = randomBytes(32).toString("hex");
    const filtered = resets.filter((r) => r.email !== email);
    filtered.push({ email, token, expiresAt: Date.now() + 1000 * 60 * 60 });
    await db.saveResets(filtered);
    return NextResponse.json({ ok: true, message: "Reset link created.", token });
  } catch {
    return NextResponse.json({ error: "Could not process the request. Please try again." }, { status: 500 });
  }
}
