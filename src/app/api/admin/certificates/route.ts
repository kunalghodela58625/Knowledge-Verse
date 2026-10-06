import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "../_guard";

// POST /api/admin/certificates { certificateId, status } -> revoke / restore
export async function POST(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const { certificateId, status } = await req.json();
  const certs = await db.certificates();
  const c = certs.find((x) => x.certificateId === certificateId);
  if (!c) return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
  c.status = status === "revoked" ? "revoked" : "valid";
  await db.saveCertificates(certs);
  return NextResponse.json({ certificate: c });
}
