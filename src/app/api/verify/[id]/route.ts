import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Public verification endpoint (also used by the QR code page).
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const certs = await db.certificates();
  const c = certs.find((x) => x.certificateId === id);
  if (!c || c.status !== "valid")
    return NextResponse.json({ valid: false, error: "This certificate could not be verified by Knowledgeverse." }, { status: 404 });
  return NextResponse.json({
    valid: true,
    certificateId: c.certificateId,
    studentName: c.studentName,
    course: c.courseName,
    status: "Completed",
    completionDate: c.completionDate,
    issuedBy: "Knowledgeverse",
  });
}
