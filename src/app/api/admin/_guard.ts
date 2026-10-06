import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function requireAdmin() {
  const me = await getCurrentUser();
  if (!me) return { error: NextResponse.json({ error: "Please login first." }, { status: 401 }) };
  if (me.role !== "admin")
    return { error: NextResponse.json({ error: "Admin access required." }, { status: 403 }) };
  return { me };
}
