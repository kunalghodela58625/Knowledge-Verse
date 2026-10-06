"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Empty, ProgressBar } from "@/components/ui";

interface Enrollment {
  courseId: string;
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  completed: boolean;
  lastLessonId: string | null;
  enrolledAt: string;
}

interface Attempt {
  id: string;
  score: number;
  total: number;
  percentage: number;
  attemptedAt: string;
}

interface Cert {
  certificateId: string;
  courseName: string;
  completionDate: string;
  status: string;
}

export default function DashboardClient() {
  const [enrollments, setEnrollments] = useState<Enrollment[] | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [certs, setCerts] = useState<Cert[]>([]);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" }).then((r) => {
      if (!r.ok) router.push("/login?next=/dashboard");
      else r.json().then((d) => setName(d.user.fullName));
    });
    fetch("/api/enroll", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setEnrollments(d.enrollments));
    fetch("/api/quiz?quizId=se-final", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setAttempts(d.attempts || []));
    fetch("/api/certificates", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCerts(d.certificates || []));
  }, [router]);

  if (!enrollments)
    return <div className="mx-auto max-w-7xl px-4 py-10">Loading your dashboard…</div>;

  const inProgress = enrollments.filter((e) => !e.completed);
  const done = enrollments.filter((e) => e.completed);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Welcome, {name || "Student"}</h1>
      <p className="mt-1 text-slate-500">Continue learning from where you left off.</p>

      {enrollments.length === 0 ? (
        <div className="mt-8">
          <Empty title="You are not enrolled in any course yet." hint="Explore the catalog and start your first course." />
          <Link href="/courses" className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white">
            Explore Courses
          </Link>
        </div>
      ) : (
        <>
          {inProgress.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">Courses in Progress</h2>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                {inProgress.map((e) => (
                  <div key={e.courseId} className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="font-bold text-slate-900">{e.courseTitle}</h3>
                    <p className="mt-1 text-sm text-slate-500">{e.completedLessons} / {e.totalLessons} lessons completed</p>
                    <div className="mt-2 flex items-center gap-3">
                      <ProgressBar value={e.progress} className="flex-1" />
                      <span className="text-sm font-semibold">{e.progress}%</span>
                    </div>
                    <Link href={`/learn/${e.courseId}`} className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                      Continue Learning →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {done.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">Completed Courses</h2>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                {done.map((e) => (
                  <div key={e.courseId} className="rounded-2xl border border-green-200 bg-green-50 p-6">
                    <h3 className="font-bold text-slate-900">{e.courseTitle} ✓</h3>
                    <p className="mt-1 text-sm text-slate-600">Course Completed ✓</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link href={`/learn/${e.courseId}`} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Review</Link>
                      <Link href={`/certificates`} className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white">View Certificate</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">My Certificates</h2>
              {certs.length === 0 ? (
                <p className="mt-2 text-sm text-slate-500">Complete all lessons of a course to earn your certificate.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm">
                  {certs.map((c) => (
                    <li key={c.certificateId} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span>{c.courseName} <span className="font-mono text-xs text-slate-400">{c.certificateId}</span></span>
                      <Link href={`/certificate/${c.certificateId}`} className="font-semibold text-indigo-600">View</Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/certificates" className="mt-3 inline-block text-sm font-semibold text-indigo-600">Open certificates →</Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">Quiz History</h2>
              {attempts.length === 0 ? (
                <p className="mt-2 text-sm text-slate-500">No quiz attempts yet. Quizzes are optional self-assessments.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm">
                  {attempts.slice(0, 5).map((a) => (
                    <li key={a.id} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span>Final Assessment</span>
                      <span className="font-semibold">{a.score}/{a.total} ({a.percentage}%)</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/quiz/se-final" className="mt-3 inline-block text-sm font-semibold text-indigo-600">Take the quiz →</Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
