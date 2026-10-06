"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EnrollButton({ courseId }: { courseId: string }) {
  const [state, setState] = useState<"loading" | "enrolled" | "not" | "login">("loading");
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/enroll", { cache: "no-store" })
      .then((r) => {
        if (r.status === 401) {
          setState("login");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (!d) return;
        const e = d.enrollments.find((x: { courseId: string }) => x.courseId === courseId);
        if (e) {
          setState("enrolled");
          setProgress(e.progress);
        } else setState("not");
      })
      .catch(() => setState("not"));
  }, [courseId]);

  async function enroll() {
    setState("loading");
    const r = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    if (r.status === 401) {
      router.push(`/login?next=/courses/${courseId}`);
      return;
    }
    if (r.ok) {
      setState("enrolled");
      setProgress(0);
    } else setState("not");
  }

  if (state === "loading")
    return <span className="inline-block rounded-xl bg-white/20 px-6 py-3 text-sm font-semibold text-white">Loading…</span>;
  if (state === "login")
    return (
      <Link href={`/login?next=/courses/${courseId}`} className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
        Login to Enroll
      </Link>
    );
  if (state === "enrolled")
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/learn/${courseId}`} className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
          {progress >= 100 ? "Review Course" : progress > 0 ? `Continue Learning (${progress}%)` : "Start Learning"}
        </Link>
      </div>
    );
  return (
    <button onClick={enroll} className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
      Enroll Now — Free
    </button>
  );
}
