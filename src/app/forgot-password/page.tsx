"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert, Field, inputCls } from "@/components/ui";
import { useRedirectIfLoggedIn } from "@/components/GuestOnly";

export default function ForgotPage() {
  const checking = useRedirectIfLoggedIn();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMsg("");
    setBusy(true);
    try {
      const r = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const d = await r.json();
      if (!r.ok) setError(d.error || "Request failed.");
      else {
        setMsg(d.message || "Reset link created.");
        if (d.token) setLink(`/reset-password?token=${d.token}`);
      }
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
        <h1 className="text-2xl font-bold text-slate-900">Forgot password</h1>
        <p className="mt-1 text-sm text-slate-500">Enter your account email to create a reset link.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {error && <Alert kind="error">{error}</Alert>}
          {msg && <Alert kind="success">{msg}</Alert>}
          {link && (
            <Alert kind="info">
              Demo reset link (normally emailed):{" "}
              <Link href={link} className="font-semibold underline">Reset my password</Link>
            </Alert>
          )}
          <Field label="Email Address">
            <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <button disabled={busy} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {busy ? "Please wait…" : "Send Reset Link"}
          </button>
        </form>
      </div>
      )}
    </div>
  );
}
