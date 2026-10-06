"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/ui";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  totalLessons: number;
  totalModules: number;
}

export default function CatalogClient({ courses }: { courses: Course[] }) {
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState("All");
  const [enrolled, setEnrolled] = useState<Record<string, { progress: number; completed: boolean }>>({});

  useEffect(() => {
    fetch("/api/enroll", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        const m: Record<string, { progress: number; completed: boolean }> = {};
        for (const e of d.enrollments) m[e.courseId] = { progress: e.progress, completed: e.completed };
        setEnrolled(m);
      })
      .catch(() => {});
  }, []);

  const diffs = ["All", ...Array.from(new Set(courses.map((c) => c.difficulty)))];
  const filtered = courses.filter((c) => {
    const hay = `${c.title} ${c.description} ${c.category}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (diff === "All" || c.difficulty === diff);
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Course Catalog</h1>
      <p className="mt-1 text-slate-500">Structured courses with video lessons, notes, quizzes and certificates.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by course name, topic or keyword…"
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <select
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm"
        >
          {diffs.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const en = enrolled[c.id];
          return (
            <div key={c.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{c.category}</span>
              <h2 className="mt-3 text-xl font-bold text-slate-900">{c.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-500">{c.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">{c.duration}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{c.totalModules} modules</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{c.totalLessons} lessons</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{c.difficulty}</span>
              </div>
              {en && (
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs text-slate-500">
                    <span>{en.completed ? "Completed ✓" : "Enrolled"}</span>
                    <span>{en.progress}%</span>
                  </div>
                  <ProgressBar value={en.progress} />
                </div>
              )}
              <Link
                href={`/courses/${c.id}`}
                className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {en ? (en.completed ? "Review Course" : "Continue Learning") : "View Course"}
              </Link>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-center text-sm text-slate-500">No courses match your search.</p>}
    </div>
  );
}
