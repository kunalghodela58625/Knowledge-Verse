import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "../_guard";
import { safeUser } from "@/lib/auth";

export async function GET() {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const [users, enrollments, certs, attempts, courses] = await Promise.all([
    db.users(), db.enrollments(), db.certificates(), db.attempts(), db.courses(),
  ]);
  return NextResponse.json({
    stats: {
      students: users.filter((u) => u.role === "student").length,
      enrollments: enrollments.length,
      completedCourses: enrollments.filter((e) => e.completed).length,
      certificates: certs.filter((c) => c.status === "valid").length,
      quizAttempts: attempts.length,
      customCourses: courses.length,
    },
    users: users.map(safeUser),
    enrollments,
    certificates: certs,
    attempts: attempts.slice(-50).reverse(),
  });
}
