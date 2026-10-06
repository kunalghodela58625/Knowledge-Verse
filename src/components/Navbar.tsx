"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Me {
  id: string;
  fullName: string;
  email: string;
  role: "student" | "admin";
  createdAt: string;
}

export function useMe() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    // Re-validate the session on every navigation so the navbar never shows
    // stale Login/Register buttons right after login (or a profile link after logout).
    let alive = true;
    setLoading(true);
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive) setMe(d?.user ?? null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [pathname]);
  return { me, loading, setMe };
}

export default function Navbar() {
  const { me, loading, setMe } = useMe();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMe(null);
    router.push("/");
    router.refresh();
  }

  const link = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      onClick={() => setOpen(false)}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-indigo-50 hover:text-indigo-700 ${
        pathname === href ? "text-indigo-700 bg-indigo-50" : "text-slate-600"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
            K
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Knowledge<span className="text-indigo-600">verse</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {link("/courses", "Courses")}
          {link("/verify", "Verify Certificate")}
          {me && link("/dashboard", "Dashboard")}
          {me?.role === "admin" && link("/admin", "Admin")}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {loading ? (
            <span className="text-sm text-slate-400">…</span>
          ) : me ? (
            <>
              <Link
                href="/profile"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                {me.fullName}
              </Link>
              <button
                onClick={logout}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {link("/courses", "Courses")}
            {link("/verify", "Verify Certificate")}
            {me && link("/dashboard", "Dashboard")}
            {me?.role === "admin" && link("/admin", "Admin")}
            {me ? (
              <>
                {link("/profile", `Profile (${me.fullName})`)}
                <button
                  onClick={logout}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-left text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {link("/login", "Login")}
                {link("/register", "Get Started")}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
