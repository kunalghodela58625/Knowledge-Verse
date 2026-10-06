"use client";

import Link from "next/link";
import { useMe } from "@/components/Navbar";

// Hero buttons adapt to session: logged-in users go to their dashboard,
// guests see Explore Courses / Get Started.
export function HeroCTA() {
  const { me, loading } = useMe();
  if (loading) return <span className="text-sm text-indigo-200">Loading…</span>;
  if (me) {
    return (
      <>
        <Link
          href="/dashboard"
          className="rounded-xl bg-white px-7 py-3 font-semibold text-indigo-700 hover:bg-indigo-50"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/courses"
          className="rounded-xl border border-white/40 px-7 py-3 font-semibold text-white hover:bg-white/10"
        >
          Explore Courses
        </Link>
      </>
    );
  }
  return (
    <>
      <Link
        href="/courses"
        className="rounded-xl bg-white px-7 py-3 font-semibold text-indigo-700 hover:bg-indigo-50"
      >
        Explore Courses
      </Link>
      <Link
        href="/register"
        className="rounded-xl border border-white/40 px-7 py-3 font-semibold text-white hover:bg-white/10"
      >
        Get Started
      </Link>
    </>
  );
}

export function BottomCTA() {
  const { me, loading } = useMe();
  if (loading || !me) {
    return (
      <Link href="/register" className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700">
        Start Learning Free
      </Link>
    );
  }
  return (
    <Link href="/dashboard" className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700">
      Continue Learning
    </Link>
  );
}
