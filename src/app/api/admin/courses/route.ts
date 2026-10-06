import { NextResponse } from "next/server";
import { db, uid } from "@/lib/db";
import { requireAdmin } from "../_guard";

// GET all custom courses (admin view)
export async function GET() {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const [courses, modules, lessons] = await Promise.all([db.courses(), db.modules(), db.lessons()]);
  return NextResponse.json({ courses, modules, lessons });
}

// POST create course { title, description, duration, difficulty, category }
export async function POST(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  try {
    const b = await req.json();
    if (!String(b.title || "").trim()) return NextResponse.json({ error: "Title is required." }, { status: 400 });
    const courses = await db.courses();
    const c = {
      id: uid("cc_"),
      title: String(b.title).trim(),
      description: String(b.description || ""),
      duration: String(b.duration || "Self-paced"),
      difficulty: String(b.difficulty || "Beginner"),
      category: String(b.category || "General"),
      createdAt: new Date().toISOString(),
    };
    courses.push(c);
    await db.saveCourses(courses);
    return NextResponse.json({ course: c });
  } catch {
    return NextResponse.json({ error: "Could not create course." }, { status: 500 });
  }
}

// PUT update course / DELETE course?id=
export async function PUT(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const b = await req.json();
  const courses = await db.courses();
  const c = courses.find((x) => x.id === b.id);
  if (!c) return NextResponse.json({ error: "Course not found." }, { status: 404 });
  for (const k of ["title", "description", "duration", "difficulty", "category"] as const) {
    if (b[k] !== undefined) c[k] = String(b[k]);
  }
  await db.saveCourses(courses);
  return NextResponse.json({ course: c });
}

export async function DELETE(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const id = new URL(req.url).searchParams.get("id") || "";
  await db.saveCourses((await db.courses()).filter((c) => c.id !== id));
  await db.saveModules((await db.modules()).filter((m) => m.courseId !== id));
  await db.saveLessons((await db.lessons()).filter((l) => l.courseId !== id));
  return NextResponse.json({ ok: true });
}
