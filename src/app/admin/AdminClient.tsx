"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, Field, inputCls } from "@/components/ui";

interface Overview {
  stats: { students: number; enrollments: number; completedCourses: number; certificates: number; quizAttempts: number; customCourses: number };
  users: { id: string; fullName: string; email: string; role: string; createdAt: string }[];
  enrollments: { id: string; userId: string; courseId: string; enrolledAt: string; completed: boolean; completedAt: string | null }[];
  certificates: { certificateId: string; studentName: string; courseName: string; completionDate: string; status: string; issuedAt: string }[];
  attempts: { id: string; userId: string; quizId: string; score: number; total: number; percentage: number; attemptedAt: string }[];
}

interface CustomCourse { id: string; title: string; description: string; duration: string; difficulty: string; category: string }
interface CustomModule { id: string; courseId: string; title: string; description: string }
interface CustomLesson { id: string; moduleId: string; courseId: string; title: string; description: string; videoUrl: string; estimatedMinutes: number }

export default function AdminClient() {
  const [data, setData] = useState<Overview | null>(null);
  const [denied, setDenied] = useState(false);
  const [tab, setTab] = useState("overview");
  const [courses, setCourses] = useState<CustomCourse[]>([]);
  const [modules, setModules] = useState<CustomModule[]>([]);
  const [lessons, setLessons] = useState<CustomLesson[]>([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function load() {
    const r = await fetch("/api/admin/overview", { cache: "no-store" });
    if (r.status === 401) {
      router.push("/login?next=/admin");
      return;
    }
    if (r.status === 403) {
      setDenied(true);
      return;
    }
    setData(await r.json());
    const c = await fetch("/api/admin/courses", { cache: "no-store" }).then((x) => x.json());
    setCourses(c.courses || []);
    setModules(c.modules || []);
    setLessons(c.lessons || []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function api(url: string, method: string, body?: unknown) {
    setMsg("");
    const r = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) setMsg(d.error || "Operation failed.");
    else {
      setMsg("Saved.");
      await load();
    }
  }

  if (denied)
    return (
      <div className="mx-auto max-w-xl px-4 py-14 text-center">
        <Alert kind="error">Admin access required. This area is restricted.</Alert>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-indigo-600">Back home</Link>
      </div>
    );
  if (!data) return <div className="mx-auto max-w-7xl px-4 py-10">Loading admin dashboard…</div>;

  const tabs = ["overview", "students", "courses", "certificates", "quizzes"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
      {msg && <div className="mt-3 max-w-md"><Alert kind="info">{msg}</Alert></div>}

      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize ${tab === t ? "bg-indigo-600 text-white" : "border border-slate-300 bg-white"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Students", data.stats.students],
            ["Enrollments", data.stats.enrollments],
            ["Completed courses", data.stats.completedCourses],
            ["Valid certificates", data.stats.certificates],
            ["Quiz attempts", data.stats.quizAttempts],
            ["Custom courses", data.stats.customCourses],
          ].map(([l, v]) => (
            <div key={l as string} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-3xl font-bold text-indigo-600">{v}</p>
              <p className="text-sm text-slate-500">{l}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-semibold">Built-in course</p>
            <p className="text-sm text-slate-500">Software Engineering · 8 modules · 59 lessons · Final quiz (40 Qs)</p>
            <Link href="/courses/software-engineering" className="mt-2 inline-block text-sm font-semibold text-indigo-600">View →</Link>
          </div>
        </div>
      )}

      {tab === "students" && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs text-slate-500 uppercase">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Joined</th><th className="px-4 py-3">Enrollments</th></tr>
            </thead>
            <tbody>
              {data.users.map((u) => (
                <tr key={u.id} className="border-b border-slate-100">
                  <td className="px-4 py-2 font-medium">{u.fullName}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{data.enrollments.filter((e) => e.userId === u.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "courses" && (
        <div className="mt-6 space-y-6">
          <CourseForm onSave={(b) => api("/api/admin/courses", "POST", b)} />
          {courses.map((c) => (
            <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold">{c.title} <span className="text-xs font-normal text-slate-400">({c.difficulty} · {c.duration})</span></h3>
                <button onClick={() => api(`/api/admin/courses?id=${c.id}`, "DELETE")} className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-600">
                  Delete course
                </button>
              </div>
              {modules.filter((m) => m.courseId === c.id).map((m) => (
                <div key={m.id} className="mt-3 rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{m.title}</p>
                    <button onClick={() => api(`/api/admin/modules?id=${m.id}`, "DELETE")} className="text-xs text-red-600">Delete module</button>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-slate-600">
                    {lessons.filter((l) => l.moduleId === m.id).map((l) => (
                      <li key={l.id} className="flex justify-between gap-2">
                        <span>• {l.title} {l.videoUrl ? "(video)" : ""}</span>
                        <button onClick={() => api(`/api/admin/lessons?id=${l.id}`, "DELETE")} className="text-red-600">Delete</button>
                      </li>
                    ))}
                  </ul>
                  <LessonForm
                    onSave={(b) => api("/api/admin/lessons", "POST", { ...b, courseId: c.id, moduleId: m.id })}
                  />
                </div>
              ))}
              <ModuleForm onSave={(b) => api("/api/admin/modules", "POST", { ...b, courseId: c.id })} />
            </div>
          ))}
          {courses.length === 0 && <p className="text-sm text-slate-500">No custom courses yet — add the first one above. (Software Engineering is built-in.)</p>}
        </div>
      )}

      {tab === "certificates" && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs text-slate-500 uppercase">
              <tr><th className="px-4 py-3">Certificate ID</th><th className="px-4 py-3">Student</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr>
            </thead>
            <tbody>
              {data.certificates.map((c) => (
                <tr key={c.certificateId} className="border-b border-slate-100">
                  <td className="px-4 py-2 font-mono text-xs">{c.certificateId}</td>
                  <td className="px-4 py-2">{c.studentName}</td>
                  <td className="px-4 py-2">{c.courseName}</td>
                  <td className="px-4 py-2">{c.completionDate}</td>
                  <td className="px-4 py-2">{c.status}</td>
                  <td className="px-4 py-2">
                    {c.status === "valid" ? (
                      <button onClick={() => api("/api/admin/certificates", "POST", { certificateId: c.certificateId, status: "revoked" })} className="text-xs font-semibold text-red-600">Revoke</button>
                    ) : (
                      <button onClick={() => api("/api/admin/certificates", "POST", { certificateId: c.certificateId, status: "valid" })} className="text-xs font-semibold text-green-700">Restore</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.certificates.length === 0 && <p className="p-6 text-sm text-slate-500">No certificates issued yet.</p>}
        </div>
      )}

      {tab === "quizzes" && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="font-bold">Quiz attempts (latest {data.attempts.length})</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {data.attempts.map((a) => {
              const u = data.users.find((x) => x.id === a.userId);
              return (
                <li key={a.id} className="flex flex-wrap justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span>{u?.fullName || a.userId} · {a.quizId}</span>
                  <span className="font-semibold">{a.score}/{a.total} ({a.percentage}%) · {new Date(a.attemptedAt).toLocaleString()}</span>
                </li>
              );
            })}
          </ul>
          {data.attempts.length === 0 && <p className="mt-2 text-sm text-slate-500">No attempts yet.</p>}
          <p className="mt-4 text-xs text-slate-400">
            The built-in Software Engineering final quiz (40 questions with answer key + explanations) lives in src/lib/quizData.ts — edit options, correct answers and explanations there. Quiz scores never gate certificates.
          </p>
        </div>
      )}
    </div>
  );
}

function CourseForm({ onSave }: { onSave: (b: Record<string, string>) => void }) {
  const [f, setF] = useState({ title: "", description: "", duration: "", difficulty: "Beginner", category: "General" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(f);
        setF({ title: "", description: "", duration: "", difficulty: "Beginner", category: "General" });
      }}
      className="rounded-2xl border border-slate-200 bg-white p-6"
    >
      <h3 className="font-bold">Add a new course</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="Title"><input className={inputCls} value={f.title} onChange={set("title")} required /></Field>
        <Field label="Category"><input className={inputCls} value={f.category} onChange={set("category")} /></Field>
        <Field label="Duration"><input className={inputCls} value={f.duration} onChange={set("duration")} placeholder="e.g. 10 hours" /></Field>
        <Field label="Difficulty"><input className={inputCls} value={f.difficulty} onChange={set("difficulty")} /></Field>
        <div className="sm:col-span-2"><Field label="Description"><input className={inputCls} value={f.description} onChange={set("description")} /></Field></div>
      </div>
      <button className="mt-3 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white">Add Course</button>
    </form>
  );
}

function ModuleForm({ onSave }: { onSave: (b: Record<string, string>) => void }) {
  const [title, setTitle] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title });
        setTitle("");
      }}
      className="mt-3 flex gap-2"
    >
      <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New module title" required />
      <button className="shrink-0 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">+ Module</button>
    </form>
  );
}

function LessonForm({ onSave }: { onSave: (b: Record<string, string>) => void }) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title, videoUrl });
        setTitle("");
        setVideoUrl("");
      }}
      className="mt-2 flex flex-col gap-2 sm:flex-row"
    >
      <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Lesson title" required />
      <input className={inputCls} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="YouTube URL (optional)" />
      <button className="shrink-0 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">+ Lesson</button>
    </form>
  );
}
