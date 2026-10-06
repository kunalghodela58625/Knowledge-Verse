import { notFound } from "next/navigation";
import { getCourse } from "@/lib/courses";
import { getQuiz } from "@/lib/quizData";
import EnrollButton from "./EnrollButton";

export const dynamic = "force-dynamic";

export default async function CourseDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound();
  const quiz = course.id === "software-engineering" ? getQuiz("se-final") : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-900 p-8 text-white sm:p-12">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{course.category}</span>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{course.title}</h1>
        <p className="mt-3 max-w-3xl text-indigo-100">{course.description}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          {[course.duration, `${course.totalModules} modules`, `${course.totalLessons} lessons`, course.difficulty, "Certificate included"].map((t) => (
            <span key={t} className="rounded-full bg-white/15 px-3 py-1">{t}</span>
          ))}
        </div>
        <div className="mt-6">
          <EnrollButton courseId={course.id} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">Course Content</h2>
          <div className="mt-4 space-y-4">
            {course.modules.map((m, i) => (
              <div key={m.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">Module {i + 1}</p>
                <h3 className="mt-1 font-bold text-slate-900">{m.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{m.description}</p>
                {m.objectives.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {m.objectives.map((o) => (
                      <li key={o}>• {o}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-2 text-xs text-slate-400">
                  {m.lessons.length} lessons · ≈ {Math.round(m.estimatedMinutes / 60 * 10) / 10} hrs
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-bold text-slate-900">What you get</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>✓ {course.totalLessons} video + written lessons</li>
              <li>✓ Progress tracking across devices</li>
              {quiz && <li>✓ Self-assessment quiz ({quiz.questions.length} questions, optional)</li>}
              <li>✓ Professional Certificate of Completion</li>
              <li>✓ QR-verifiable certificate with PDF download</li>
              <li>✓ No quiz-score or watch-time barrier</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
