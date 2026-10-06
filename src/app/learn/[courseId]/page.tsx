"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, ProgressBar } from "@/components/ui";

interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoId: string | null;
  videoDuration: string | null;
  estimatedMinutes: number;
  objectives: string[];
  sections?: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  keyTakeaways?: string[];
}
interface Module {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  lessons: Lesson[];
  estimatedMinutes: number;
}
interface Course {
  id: string;
  title: string;
  totalLessons: number;
  modules: Module[];
}

function LearnInner() {
  const { courseId } = useParams<{ courseId: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const [sidebar, setSidebar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [certId, setCertId] = useState<string | null>(null);

  const flat = useMemo(() => course?.modules.flatMap((m) => m.lessons) ?? [], [course]);
  const activeId = search.get("lesson") || null;
  const active = flat.find((l) => l.id === activeId) ?? flat[0];
  const idx = active ? flat.findIndex((l) => l.id === active.id) : -1;

  useEffect(() => {
    fetch(`/api/courses/${courseId}`, { cache: "no-store" }).then(async (r) => {
      if (!r.ok) {
        router.push("/courses");
        return;
      }
      const d = await r.json();
      setCourse(d.course);
    });
    fetch("/api/enroll", { cache: "no-store" }).then(async (r) => {
      if (!r.ok) {
        router.push(`/courses/${courseId}`);
        return;
      }
      const d = await r.json();
      setEnrolled(d.enrollments.some((e: { courseId: string }) => e.courseId === courseId));
    });
    fetch(`/api/progress?courseId=${courseId}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setDone(d.completedLessonIds));
  }, [courseId, router]);

  const refreshProgress = useCallback(async () => {
    const r = await fetch(`/api/progress?courseId=${courseId}`, { cache: "no-store" });
    if (r.ok) {
      const d = await r.json();
      setDone(d.completedLessonIds);
      return d;
    }
    return null;
  }, [courseId]);

  async function toggleComplete(lessonId: string, value: boolean) {
    setSaving(true);
    try {
      const r = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId, completed: value }),
      });
      if (r.ok) {
        const d = await r.json();
        await refreshProgress();
        if (d.courseCompleted) {
          // Auto-issue the certificate (server re-validates 100% completion).
          const c = await fetch("/api/certificates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId }),
          });
          if (c.ok) {
            const cd = await c.json();
            setCertId(cd.certificate.certificateId);
          }
        }
      }
    } finally {
      setSaving(false);
    }
  }

  function go(lessonId: string) {
    router.push(`/learn/${courseId}?lesson=${lessonId}`);
    setSidebar(false);
    window.scrollTo({ top: 0 });
  }

  if (!course || enrolled === null) return <div className="mx-auto max-w-7xl px-4 py-10">Loading course…</div>;
  if (!enrolled) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center">
        <Alert kind="info">You need to enroll in this course first.</Alert>
        <Link href={`/courses/${courseId}`} className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white">
          Go to Course Page
        </Link>
      </div>
    );
  }
  if (!active) return <div className="mx-auto max-w-7xl px-4 py-10">This course has no lessons yet.</div>;

  const pct = course.totalLessons ? Math.round((done.length / course.totalLessons) * 100) : 0;
  const isDone = done.includes(active.id);
  const complete = pct >= 100;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => setSidebar(true)} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold lg:hidden">
          ☰ Modules
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-slate-900">{course.title}</h1>
          <div className="mt-1 flex items-center gap-2">
            <ProgressBar value={pct} className="max-w-xs flex-1" />
            <span className="text-xs font-semibold text-slate-600">{done.length}/{course.totalLessons} · {pct}%</span>
          </div>
        </div>
        <Link href="/dashboard" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Dashboard</Link>
      </div>

      {complete && (
        <div className="mt-4 rounded-2xl border border-green-300 bg-green-50 p-5 text-center">
          <p className="font-bold text-green-800">🎓 Course Completed ✓ — your certificate is ready!</p>
          <Link href={certId ? `/certificate/${certId}` : "/certificates"} className="mt-3 inline-block rounded-xl bg-green-700 px-6 py-2.5 text-sm font-semibold text-white">
            View Certificate
          </Link>
        </div>
      )}

      <div className="mt-4 grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="nice-scroll hidden max-h-[80vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 lg:block">
          <SidebarBody course={course} done={done} activeId={active.id} go={go} />
        </aside>

        {/* Mobile drawer */}
        {sidebar && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebar(false)} />
            <aside className="nice-scroll absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-4">
              <button onClick={() => setSidebar(false)} className="mb-2 rounded-lg border px-3 py-1.5 text-sm font-semibold">✕ Close</button>
              <SidebarBody course={course} done={done} activeId={active.id} go={go} />
            </aside>
          </div>
        )}

        {/* Lesson */}
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
          <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
            Lesson {idx + 1} of {flat.length}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">{active.title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {active.videoDuration ? `${active.videoDuration} · ` : ""}≈ {active.estimatedMinutes} min study · {active.description}
          </p>

          {active.videoId ? (
            <div className="mt-5 overflow-hidden rounded-xl bg-black">
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${active.videoId}`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-slate-100 p-6 text-center text-sm text-slate-500">
              No video for this lesson — study the written material below.
            </div>
          )}
          <p className="mt-2 text-xs text-slate-400">
            Video: YouTube (embedded for learning; watching fully is optional and never required for completion).
          </p>

          {active.objectives.length > 0 && (
            <section className="mt-6 rounded-xl bg-indigo-50 p-5">
              <h3 className="font-semibold text-indigo-900">Learning objectives</h3>
              <ul className="mt-2 space-y-1 text-sm text-indigo-900">
                {active.objectives.map((o) => (
                  <li key={o}>• {o}</li>
                ))}
              </ul>
            </section>
          )}

          {active.sections?.map((s) => (
            <section key={s.heading} className="mt-6">
              <h3 className="text-lg font-bold text-slate-900">{s.heading}</h3>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-2 text-sm leading-relaxed text-slate-600">{p}</p>
              ))}
              {s.bullets && (
                <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                  {s.bullets.map((b) => (
                    <li key={b} className="rounded-lg bg-slate-50 px-3 py-2">• {b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {active.keyTakeaways && active.keyTakeaways.length > 0 && (
            <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-amber-900">Key takeaways</h3>
              <ul className="mt-2 space-y-1 text-sm text-amber-900">
                {active.keyTakeaways.map((t) => (
                  <li key={t}>✓ {t}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
            <button
              disabled={saving}
              onClick={() => toggleComplete(active.id, !isDone)}
              className={`flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-60 ${isDone ? "bg-slate-500 hover:bg-slate-600" : "bg-green-600 hover:bg-green-700"}`}
            >
              {saving ? "Saving…" : isDone ? "Completed ✓ (click to undo)" : "Mark as Complete ✓"}
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            {idx > 0 ? (
              <button onClick={() => go(flat[idx - 1].id)} className="flex-1 rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold hover:bg-slate-50">
                ← Previous Lesson
              </button>
            ) : <span className="flex-1" />}
            {idx < flat.length - 1 ? (
              <button onClick={() => go(flat[idx + 1].id)} className="flex-1 rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold hover:bg-slate-50">
                Next Lesson →
              </button>
            ) : <span className="flex-1" />}
          </div>
        </article>
      </div>
    </div>
  );
}

function SidebarBody({ course, done, activeId, go }: { course: Course; done: string[]; activeId: string; go: (id: string) => void }) {
  return (
    <div className="space-y-4">
      {course.modules.map((m, i) => {
        const d = m.lessons.filter((l) => done.includes(l.id)).length;
        return (
          <div key={m.id}>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Module {i + 1} · {d}/{m.lessons.length}
            </p>
            <p className="text-sm font-semibold text-slate-800">{m.title}</p>
            <ul className="mt-1 space-y-0.5">
              {m.lessons.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] ${
                      l.id === activeId ? "bg-indigo-600 font-semibold text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className={done.includes(l.id) ? "text-green-500" : "text-slate-300"}>
                      {done.includes(l.id) ? "✓" : "○"}
                    </span>
                    <span className="line-clamp-2">{l.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10">Loading course…</div>}>
      <LearnInner />
    </Suspense>
  );
}
