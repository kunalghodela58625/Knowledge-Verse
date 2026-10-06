"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Alert, Field, inputCls } from "@/components/ui";
import { useRedirectIfLoggedIn } from "@/components/GuestOnly";

function ResetForm() {
  const checking = useRedirectIfLoggedIn();
  const token = useSearchParams().get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const r = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword: confirm }),
      });
      const d = await r.json();
      if (!r.ok) setError(d.error || "Reset failed.");
      else setDone(true);
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
        <h1 className="text-2xl font-bold text-slate-900">Set a new password</h1>
        {!token && <Alert kind="error">Missing reset token. Please use the link from the forgot-password page.</Alert>}
        {done ? (
          <div className="mt-6 space-y-4">
            <Alert kind="success">Password updated. You can now login.</Alert>
            <Link href="/login" className="block rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white">Go to Login</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            {error && <Alert kind="error">{error}</Alert>}
            <Field label="New Password (min 8 chars, letters + numbers)">
              <input className={inputCls} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Field>
            <Field label="Confirm New Password">
              <input className={inputCls} type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            </Field>
            <button disabled={busy || !token} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
              {busy ? "Updating…" : "Update Password"}
            </button>
          </form>
        )}
      </div>
      )}
    </div>
  );
}

export default function ResetPage() {
  return (
    <Suspense>
      <ResetForm />
    </Suspense>
  );
}
