import { NextResponse } from "next/server";
import { db, uid } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getCourse, lessonIdsOf } from "@/lib/courses";

// GET /api/enroll -> my enrollments with progress summary
export async function GET() {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Please login first." }, { status: 401 });
  const [enrollments, progress] = await Promise.all([db.enrollments(), db.progress()]);
  const mine = enrollments.filter((e) => e.userId === me.id);
  const out = [];
  for (const e of mine) {
    const course = await getCourse(e.courseId);
    if (!course) continue;
    const ids = lessonIdsOf(course);
    const done = progress.filter((p) => p.userId === me.id && p.courseId === e.courseId && p.completed).length;
    out.push({
      ...e,
      courseTitle: course.title,
      totalLessons: ids.length,
      completedLessons: done,
      progress: ids.length ? Math.round((done / ids.length) * 100) : 0,
      lastLessonId: e.lastLessonId,
    });
  }
  return NextResponse.json({ enrollments: out });
}

// POST /api/enroll { courseId }
export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Please login to enroll." }, { status: 401 });
  try {
    const { courseId } = await req.json();
    const course = await getCourse(String(courseId || ""));
    if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });
    const enrollments = await db.enrollments();
    const existing = enrollments.find((e) => e.userId === me.id && e.courseId === course.id);
    if (existing) return NextResponse.json({ enrollment: existing });
    const e = {
      id: uid("e_"),
      userId: me.id,
      courseId: course.id,
      enrolledAt: new Date().toISOString(),
      completed: false,
      completedAt: null as string | null,
      lastLessonId: null as string | null,
    };
    enrollments.push(e);
    await db.saveEnrollments(enrollments);
    return NextResponse.json({ enrollment: e });
  } catch {
    return NextResponse.json({ error: "Enrollment failed. Please try again." }, { status: 500 });
  }
}
