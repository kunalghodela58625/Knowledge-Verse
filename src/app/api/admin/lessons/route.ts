import { NextResponse } from "next/server";
import { db, uid } from "@/lib/db";
import { requireAdmin } from "../_guard";

// Lessons: POST { courseId, moduleId, title, description, videoUrl, estimatedMinutes }
export async function POST(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const b = await req.json();
  if (!b.moduleId || !String(b.title || "").trim())
    return NextResponse.json({ error: "Module and title are required." }, { status: 400 });
  const lessons = await db.lessons();
  const order = lessons.filter((l) => l.moduleId === b.moduleId).length;
  const l = {
    id: uid("l_"),
    moduleId: b.moduleId,
    courseId: b.courseId || "",
    title: String(b.title).trim(),
    description: String(b.description || ""),
    videoUrl: String(b.videoUrl || ""),
    estimatedMinutes: Number(b.estimatedMinutes) || 25,
    order,
  };
  lessons.push(l);
  await db.saveLessons(lessons);
  return NextResponse.json({ lesson: l });
}

export async function PUT(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const b = await req.json();
  const lessons = await db.lessons();
  const l = lessons.find((x) => x.id === b.id);
  if (!l) return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
  for (const k of ["title", "description", "videoUrl"] as const) {
    if (b[k] !== undefined) l[k] = String(b[k]);
  }
  if (b.estimatedMinutes !== undefined) l.estimatedMinutes = Number(b.estimatedMinutes) || l.estimatedMinutes;
  await db.saveLessons(lessons);
  return NextResponse.json({ lesson: l });
}

export async function DELETE(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const id = new URL(req.url).searchParams.get("id") || "";
  await db.saveLessons((await db.lessons()).filter((l) => l.id !== id));
  return NextResponse.json({ ok: true });
}
