import { NextResponse } from "next/server";
import { listCourses } from "@/lib/courses";

export async function GET() {
  const courses = await listCourses();
  return NextResponse.json({
    courses: courses.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      duration: c.duration,
      difficulty: c.difficulty,
      category: c.category,
      totalLessons: c.totalLessons,
      totalModules: c.totalModules,
      totalMinutes: c.totalMinutes,
    })),
  });
}
