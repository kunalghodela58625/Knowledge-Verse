import { NextResponse } from "next/server";
import { getCourse } from "@/lib/courses";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const course = await getCourse(id);
  if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });
  return NextResponse.json({ course });
}
