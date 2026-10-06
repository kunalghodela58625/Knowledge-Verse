"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Cert {
  certificateId: string;
  courseName: string;
  completionDate: string;
  status: string;
  issuedAt: string;
}

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Cert[] | null>(null);

  useEffect(() => {
    fetch("/api/certificates", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCerts(d.certificates));
  }, []);

  if (!certs) return <div className="mx-auto max-w-4xl px-4 py-10">Loading certificates…</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">My Certificates</h1>
      {certs.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold text-slate-700">No certificates yet.</p>
          <p className="mt-1 text-sm text-slate-500">Complete 100% of a course to earn your Certificate of Completion.</p>
          <Link href="/courses" className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white">
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {certs.map((c) => (
            <div key={c.certificateId} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">{c.courseName}</h2>
              <p className="mt-1 text-sm text-slate-500">
                Completed {c.completionDate} · ID <span className="font-mono">{c.certificateId}</span> · {c.status}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/certificate/${c.certificateId}`} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                  View Certificate
                </Link>
                <Link href={`/certificate/${c.certificateId}`} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">
                  Download Certificate
                </Link>
                <Link href={`/verify/${c.certificateId}`} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">
                  Verify Certificate
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
