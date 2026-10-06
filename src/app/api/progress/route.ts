import { NextResponse } from "next/server";
import { db, uid } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getCourse, lessonIdsOf } from "@/lib/courses";

// GET /api/progress?courseId= -> { completedLessonIds, progress, completed, total }
export async function GET(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Please login first." }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId") || "";
  const course = await getCourse(courseId);
  if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });
  const progress = await db.progress();
  const done = progress
    .filter((p) => p.userId === me.id && p.courseId === courseId && p.completed)
    .map((p) => p.lessonId);
  const ids = lessonIdsOf(course);
  return NextResponse.json({
    completedLessonIds: done,
    completedCount: done.length,
    total: ids.length,
    progress: ids.length ? Math.round((done.length / ids.length) * 100) : 0,
  });
}

// POST /api/progress { courseId, lessonId, completed }
// Server validates enrollment + lesson membership; completion flips enrollment.
export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Please login first." }, { status: 401 });
  try {
    const { courseId, lessonId, completed } = await req.json();
    const course = await getCourse(String(courseId || ""));
    if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });
    const ids = lessonIdsOf(course);
    if (!ids.includes(String(lessonId)))
      return NextResponse.json({ error: "Lesson does not belong to this course." }, { status: 400 });

    const enrollments = await db.enrollments();
    const enr = enrollments.find((e) => e.userId === me.id && e.courseId === course.id);
    if (!enr) return NextResponse.json({ error: "Please enroll in the course first." }, { status: 403 });

    const all = await db.progress();
    let rec = all.find((p) => p.userId === me.id && p.courseId === course.id && p.lessonId === lessonId);
    const done = completed !== false;
    if (!rec) {
      rec = { id: uid("p_"), userId: me.id, courseId: course.id, lessonId, completed: done, completedAt: done ? new Date().toISOString() : null };
      all.push(rec);
    } else {
      rec.completed = done;
      rec.completedAt = done ? new Date().toISOString() : null;
    }
    enr.lastLessonId = String(lessonId);
    const doneCount = all.filter((p) => p.userId === me.id && p.courseId === course.id && p.completed).length;
    if (doneCount >= ids.length && ids.length > 0) {
      enr.completed = true;
      enr.completedAt = enr.completedAt || new Date().toISOString();
    } else {
      enr.completed = false;
      enr.completedAt = null;
    }
    await db.saveProgress(all);
    await db.saveEnrollments(enrollments);
    return NextResponse.json({
      ok: true,
      completedCount: doneCount,
      total: ids.length,
      progress: ids.length ? Math.round((doneCount / ids.length) * 100) : 0,
      courseCompleted: enr.completed,
    });
  } catch {
    return NextResponse.json({ error: "Could not save progress." }, { status: 500 });
  }
}
