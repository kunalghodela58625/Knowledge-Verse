"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui";

interface Q {
  id: string;
  question: string;
  options: string[];
}
interface Attempt {
  id: string;
  score: number;
  total: number;
  percentage: number;
  attemptedAt: string;
}
interface Review {
  questionId: string;
  question: string;
  options: string[];
  selected: number;
  correctIndex: number;
  correct: boolean;
  explanation: string;
}

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [questions, setQuestions] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [result, setResult] = useState<{ score: number; total: number; percentage: number; detail: Review[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/quiz?quizId=${quizId}`, { cache: "no-store" }).then(async (r) => {
      if (r.status === 401) {
        router.push(`/login?next=/quiz/${quizId}`);
        return;
      }
      if (!r.ok) return;
      const d = await r.json();
      setTitle(d.quiz.title);
      setDesc(d.quiz.description);
      setQuestions(d.quiz.questions);
      setAttempts(d.attempts || []);
    });
  }, [quizId, router]);

  async function submit() {
    if (Object.keys(answers).length < questions.length) {
      setError(`Please answer all ${questions.length} questions (${Object.keys(answers).length} answered).`);
      return;
    }
    setError("");
    setBusy(true);
    try {
      const r = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, answers }),
      });
      const d = await r.json();
      if (!r.ok) setError(d.error || "Submission failed.");
      else {
        setResult({ score: d.attempt.score, total: d.attempt.total, percentage: d.attempt.percentage, detail: d.attempt.detail });
        window.scrollTo({ top: 0 });
      }
    } finally {
      setBusy(false);
    }
  }

  if (!title) return <div className="mx-auto max-w-3xl px-4 py-10">Loading quiz…</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">{desc}</p>

      {attempts.length > 0 && !result && (
        <p className="mt-3 rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
          Previous attempts: {attempts.map((a) => `${a.score}/${a.total} (${a.percentage}%)`).join(" · ")}
        </p>
      )}

      {result ? (
        <div className="mt-6">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center">
            <p className="text-3xl font-extrabold text-indigo-700">{result.score}/{result.total} ({result.percentage}%)</p>
            <p className="mt-1 text-sm text-slate-600">
              Self-assessment only — your score is saved for your learning and never affects your certificate.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button onClick={() => { setResult(null); setAnswers({}); }} className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm font-semibold">Retake Quiz</button>
              <Link href="/dashboard" className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white">Back to Dashboard</Link>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {result.detail.map((d, i) => (
              <div key={d.questionId} className={`rounded-2xl border p-5 ${d.correct ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"}`}>
                <p className="text-sm font-semibold text-slate-900">Q{i + 1}. {d.question}</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {d.options.map((o, oi) => (
                    <li key={oi} className={`rounded-lg px-3 py-1.5 ${oi === d.correctIndex ? "bg-green-100 font-semibold text-green-800" : oi === d.selected ? "bg-red-100 text-red-800" : "bg-white text-slate-600"}`}>
                      {oi === d.correctIndex ? "✓ " : oi === d.selected ? "✕ " : ""}{o}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-slate-500">{d.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {error && <Alert kind="error">{error}</Alert>}
          {questions.map((q, i) => (
            <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">Q{i + 1}. {q.question}</p>
              <div className="mt-3 space-y-2">
                {q.options.map((o, oi) => (
                  <label key={oi} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm ${answers[q.id] === oi ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === oi}
                      onChange={() => setAnswers({ ...answers, [q.id]: oi })}
                      className="accent-indigo-600"
                    />
                    <span>{o}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button disabled={busy} onClick={submit} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {busy ? "Submitting…" : `Submit Quiz (${Object.keys(answers).length}/${questions.length} answered)`}
          </button>
        </div>
      )}
    </div>
  );
}
