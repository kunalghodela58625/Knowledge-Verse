"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Alert, Field, inputCls } from "@/components/ui";
import { useRedirectIfLoggedIn } from "@/components/GuestOnly";
import GoogleButton from "@/components/GoogleButton";

function RegisterForm() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
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
      const r = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) setError(d.error || "Registration failed.");
      else router.push(next);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      {checking ? (
        <p className="text-center text-sm text-slate-400">Checking session…</p>
      ) : (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <p className="mt-1 text-sm text-slate-500">
          Your full name will appear on your certificates — enter it carefully.
        </p>
        <div className="mt-5">
          <Suspense>
            <GoogleButton text="Sign up with Google" />
          </Suspense>
        </div>
        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200" /> or with email <span className="h-px flex-1 bg-slate-200" />
        </div>
        <form onSubmit={submit} className="space-y-4">
          {error && <Alert kind="error">{error}</Alert>}
          <Field label="Full Name">
            <input className={inputCls} value={form.fullName} onChange={set("fullName")} placeholder="e.g. Rahul Sharma" required />
          </Field>
          <Field label="Email Address">
            <input className={inputCls} type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required />
          </Field>
          <Field label="Password (min 8 chars, letters + numbers)">
            <input className={inputCls} type="password" value={form.password} onChange={set("password")} required />
          </Field>
          <Field label="Confirm Password">
            <input className={inputCls} type="password" value={form.confirmPassword} onChange={set("confirmPassword")} required />
          </Field>
          <button disabled={busy} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {busy ? "Creating account…" : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="font-semibold text-indigo-600">Login</Link>
        </p>
      </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
