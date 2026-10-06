import { NextResponse } from "next/server";
import { db, uid } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getQuiz } from "@/lib/quizData";
import { courseQuizId } from "@/lib/courses";

// GET /api/quiz?quizId=&courseId= -> public question set (WITHOUT answers) + my attempts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const quizId = searchParams.get("quizId") || "";
  const quiz = getQuiz(quizId);
  if (!quiz) return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
  const me = await import("@/lib/auth").then((m) => m.getCurrentUser());
  const attempts = await db.attempts();
  const mine = me ? attempts.filter((a) => a.userId === me.id && a.quizId === quizId) : [];
  return NextResponse.json({
    quiz: {
      id: quiz.id,
      courseId: quiz.courseId,
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.map((q) => ({ id: q.id, question: q.question, options: q.options })),
      total: quiz.questions.length,
    },
    attempts: mine.map((a) => ({ id: a.id, score: a.score, total: a.total, percentage: a.percentage, attemptedAt: a.attemptedAt })),
  });
}

// POST /api/quiz { quizId, answers: {questionId: selectedIndex} }
// Server grades against the answer key. Score never affects certification.
export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Please login to submit the quiz." }, { status: 401 });
  try {
    const { quizId, answers } = await req.json();
    const quiz = getQuiz(String(quizId || ""));
    if (!quiz) return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    const detail = quiz.questions.map((q) => {
      const sel = Number(answers?.[q.id]);
      const correct = sel === q.correctIndex;
      return { questionId: q.id, question: q.question, options: q.options, selected: Number.isFinite(sel) ? sel : -1, correctIndex: q.correctIndex, correct, explanation: q.explanation };
    });
    const score = detail.filter((d) => d.correct).length;
    const attempt = {
      id: uid("q_"),
      userId: me.id,
      quizId: quiz.id,
      courseId: quiz.courseId,
      score,
      total: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      answers: detail.map((d) => ({ questionId: d.questionId, selected: d.selected, correct: d.correct })),
      attemptedAt: new Date().toISOString(),
    };
    const all = await db.attempts();
    all.push(attempt);
    await db.saveAttempts(all);
    void courseQuizId;
    return NextResponse.json({ attempt: { ...attempt, detail } });
  } catch {
    return NextResponse.json({ error: "Could not submit the quiz." }, { status: 500 });
  }
}
