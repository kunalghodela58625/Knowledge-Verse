"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CertificateView, { type CertData } from "@/components/CertificateView";
import { downloadCertificatePDF } from "@/lib/certificatePdf";

export default function CertificatePage() {
  const { id } = useParams<{ id: string }>();
  const [cert, setCert] = useState<CertData | null>(null);
  const [busy, setBusy] = useState(false);
  const [missing, setMissing] = useState(false);
  const [dlError, setDlError] = useState("");

  useEffect(() => {
    fetch("/api/certificates", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) {
          setMissing(true);
          return;
        }
        const c = d.certificates.find((x: CertData) => x.certificateId === id);
        if (c) setCert(c);
        else setMissing(true);
      });
  }, [id]);

  if (missing)
    return (
      <div className="mx-auto max-w-xl px-4 py-14 text-center">
        <p className="font-semibold">Certificate not found. Please login with the account that earned it.</p>
        <Link href="/certificates" className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white">
          My Certificates
        </Link>
      </div>
    );
  if (!cert) return <div className="mx-auto max-w-4xl px-4 py-10">Loading certificate…</div>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="no-print mb-4 flex flex-wrap gap-2">
        <Link href="/certificates" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">← All Certificates</Link>
        <button
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setDlError("");
            try {
              await downloadCertificatePDF(cert);
            } catch (e) {
              setDlError(e instanceof Error ? e.message : "Could not generate the PDF. Please try again.");
            } finally {
              setBusy(false);
            }
          }}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Preparing PDF…" : "Download Certificate (PDF)"}
        </button>
        <Link href={`/verify/${cert.certificateId}`} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">
          Verify Certificate
        </Link>
      </div>
      {dlError && (
        <div className="no-print mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {dlError}
        </div>
      )}
      <CertificateView cert={cert} />
      <p className="no-print mt-4 text-center text-xs text-slate-400">
        Certificate ID {cert.certificateId} · issued to {cert.studentName} · completion-based, no scores shown.
      </p>
    </div>
  );
}
