"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, inputCls } from "@/components/ui";

export default function VerifyLookup() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function go(e: React.FormEvent) {
    e.preventDefault();
    const v = id.trim();
    if (!v) {
      setError("Please enter a certificate ID (e.g. KV-SE-XXXXXXXX).");
      return;
    }
    router.push(`/verify/${encodeURIComponent(v)}`);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-14">
      <h1 className="text-center text-3xl font-bold text-slate-900">Certificate Verification</h1>
      <p className="mt-2 text-center text-sm text-slate-500">
        Scan a certificate QR code or enter its Certificate ID to confirm authenticity.
      </p>
      <form onSubmit={go} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="KV-SE-XXXXXXXX"
          className={inputCls}
        />
        <button className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          Verify
        </button>
      </form>
      {error && <div className="mt-4"><Alert kind="error">{error}</Alert></div>}
    </div>
  );
}
