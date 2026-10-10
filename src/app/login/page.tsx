"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Alert, Field, inputCls } from "@/components/ui";
import { useRedirectIfLoggedIn } from "@/components/GuestOnly";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";
  const checking = useRedirectIfLoggedIn(next);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await r.json();
      if (!r.ok) setError(d.error || "Login failed.");
      else router.push(next);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      {checking ? (
        <p className="text-center text-sm text-slate-400">Checking session…</p>
      ) : (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-500">Login to continue learning.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {error && <Alert kind="error">{error}</Alert>}
          <Field label="Email Address">
            <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Password">
            <input className={inputCls} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          <button disabled={busy} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {busy ? "Logging in…" : "Login"}
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <Link href="/forgot-password" className="text-indigo-600 hover:underline">Forgot password?</Link>
          <Link href="/register" className="text-indigo-600 hover:underline">Create account</Link>
        </div>
      </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
