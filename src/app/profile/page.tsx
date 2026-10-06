"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, Field, inputCls } from "@/components/ui";

export default function ProfilePage() {
  const [user, setUser] = useState<{ fullName: string; email: string; createdAt: string } | null>(null);
  const [name, setName] = useState("");
  const [cur, setCur] = useState("");
  const [nw, setNw] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ enrolled: 0, completed: 0, certificates: 0 });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" }).then(async (r) => {
      if (!r.ok) {
        router.push("/login?next=/profile");
        return;
      }
      const d = await r.json();
      setUser(d.user);
      setName(d.user.fullName);
    });
    fetch("/api/enroll", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) setStats((s) => ({ ...s, enrolled: d.enrollments.length, completed: d.enrollments.filter((e: { completed: boolean }) => e.completed).length }));
      });
    fetch("/api/certificates", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats((s) => ({ ...s, certificates: d.certificates.length })));
  }, [router]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setError("");
    const r = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: name, ...(nw ? { currentPassword: cur, newPassword: nw } : {}) }),
    });
    const d = await r.json();
    if (!r.ok) setError(d.error || "Update failed.");
    else {
      setUser({ ...user!, fullName: d.user.fullName });
      setMsg("Profile updated. Note: your certificate always uses your current account name.");
      setCur("");
      setNw("");
    }
  }

  if (!user) return <div className="mx-auto max-w-2xl px-4 py-10">Loading profile…</div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Student Profile</h1>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        {[
          ["Enrolled", stats.enrolled],
          ["Completed", stats.completed],
          ["Certificates", stats.certificates],
        ].map(([l, v]) => (
          <div key={l as string} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-2xl font-bold text-indigo-600">{v}</p>
            <p className="text-xs text-slate-500">{l}</p>
          </div>
        ))}
      </div>
      <form onSubmit={save} className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        {error && <Alert kind="error">{error}</Alert>}
        {msg && <Alert kind="success">{msg}</Alert>}
        <Field label="Full Name (appears on certificates)">
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field label="Email (cannot be changed)">
          <input className={inputCls} value={user.email} disabled />
        </Field>
        <p className="text-xs text-slate-400">Account created: {new Date(user.createdAt).toLocaleDateString()}</p>
        <div className="border-t border-slate-100 pt-4">
          <p className="mb-3 text-sm font-semibold">Change password (optional)</p>
          <div className="space-y-4">
            <Field label="Current Password">
              <input className={inputCls} type="password" value={cur} onChange={(e) => setCur(e.target.value)} />
            </Field>
            <Field label="New Password">
              <input className={inputCls} type="password" value={nw} onChange={(e) => setNw(e.target.value)} />
            </Field>
          </div>
        </div>
        <button className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
