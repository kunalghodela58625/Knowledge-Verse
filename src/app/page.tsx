import Link from "next/link";
import { BottomCTA, HeroCTA } from "@/components/HeroCTA";

const FEATURES = [
  { t: "Structured Learning", d: "Learn through organized modules and lessons that follow a clear path." },
  { t: "Video + Written Learning", d: "Combine YouTube video resources with clear written explanations and examples." },
  { t: "Track Your Progress", d: "Continue learning from where you left off — progress is saved to your account." },
  { t: "Assess Your Knowledge", d: "Take quizzes and test your understanding with instant feedback." },
  { t: "Earn Certificates", d: "Complete a course and receive a professional Certificate of Completion." },
  { t: "Verify Certificates", d: "Every certificate carries a QR code verifiable online in seconds." },
];

const STEPS = [
  ["Create an Account", "Register on Knowledgeverse in under a minute."],
  ["Enroll", "Choose a course and enroll for free."],
  ["Learn", "Study videos and written material at your pace."],
  ["Complete", "Complete all required modules and lessons."],
  ["Get Certified", "Receive your professional Certificate of Completion."],
  ["Verify", "Anyone can verify it through its QR code."],
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold tracking-widest uppercase">
            Online Learning Platform
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Learn. Grow. Achieve.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
            Build your knowledge through structured courses, engaging learning
            resources, and verifiable certificates.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <HeroCTA />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Everything you need to learn
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">{f.t}</h3>
              <p className="mt-2 text-sm text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured course */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-900 text-white">
            <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-widest text-indigo-300 uppercase">Featured Course</p>
                <h2 className="mt-2 text-3xl font-bold">Software Engineering</h2>
                <p className="mt-3 text-indigo-100">
                  Learn fundamental concepts of Software Engineering through
                  structured video lessons and written study material — SDLC,
                  process models, requirements, estimation, testing, UML and more.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-white/15 px-3 py-1">≈ 27 Hours</span>
                  <span className="rounded-full bg-white/15 px-3 py-1">8 Modules</span>
                  <span className="rounded-full bg-white/15 px-3 py-1">59 Lessons</span>
                  <span className="rounded-full bg-white/15 px-3 py-1">Beginner–Intermediate</span>
                </div>
                <Link
                  href="/courses/software-engineering"
                  className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 hover:bg-indigo-50"
                >
                  View Course
                </Link>
              </div>
              <div className="grid content-center gap-3 text-sm">
                {["SDLC & Process Models", "Requirements & SRS", "Estimation (COCOMO, FP) & Risk", "Testing, Quality & UML"].map((t) => (
                  <div key={t} className="rounded-xl bg-white/10 px-4 py-3">✓ {t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">How Knowledgeverse Works</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(([t, d], i) => (
            <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold text-slate-900">{t}</h3>
              <p className="mt-1 text-sm text-slate-500">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <BottomCTA />
        </div>
      </section>
    </div>
  );
}
