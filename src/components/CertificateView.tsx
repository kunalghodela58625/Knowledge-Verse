export interface CertData {
  certificateId: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  issuedAt?: string;
  qrDataUrl: string;
  courseStats?: { modules: number; lessons: number; duration: string };
}

// Rich professional certificate artwork (screen + print).
export default function CertificateView({ cert }: { cert: CertData }) {
  const stats = cert.courseStats;
  const issued = (cert.issuedAt || "").slice(0, 10) || cert.completionDate;

  return (
    <div
      id="certificate-art"
      className="relative mx-auto w-full max-w-4xl rounded-xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-2 shadow-2xl sm:p-3"
    >
      {/* Gold seal */}
      <div className="absolute -top-3 right-6 z-10 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full border-4 border-amber-300 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 text-center shadow-lg sm:h-24 sm:w-24">
        <span className="text-sm leading-none text-amber-800">★</span>
        <span className="px-1 text-[7px] font-extrabold tracking-wider text-amber-900 uppercase sm:text-[8px]">
          Knowledgeverse Verified
        </span>
      </div>

      <div
        className="cert-serif relative overflow-hidden rounded-lg bg-[#fffdf4] px-4 py-5 text-center sm:px-10 sm:py-6"
        style={{ border: "3px solid #b45309", outline: "1px solid #f59e0b", outlineOffset: "-7px" }}
      >
        {/* Corner flourishes */}
        <span className="pointer-events-none absolute top-2 left-3 text-xl text-amber-500">❖</span>
        <span className="pointer-events-none absolute top-2 right-3 text-xl text-amber-500">❖</span>

        {/* Brand */}
        <p className="text-[11px] font-bold tracking-[0.4em] text-indigo-950 uppercase sm:text-sm">
          Knowledgeverse
        </p>
        <p className="mt-0.5 text-[9px] tracking-[0.25em] text-slate-500 uppercase sm:text-[10px]">
          Online Learning Platform
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-wide text-slate-900 uppercase sm:text-4xl">
          Certificate
        </h1>
        <p className="text-sm font-semibold tracking-[0.35em] text-amber-700 uppercase sm:text-lg">
          of Completion
        </p>
        <div className="mx-auto mt-2 flex w-56 items-center gap-2 sm:w-72">
          <span className="h-px flex-1 bg-amber-500" />
          <span className="text-amber-600">✦</span>
          <span className="h-px flex-1 bg-amber-500" />
        </div>

        {/* Recipient */}
        <p className="mt-3 text-[11px] text-slate-500 italic sm:text-sm">
          This certificate is proudly presented to
        </p>
        <p
          className="mx-auto mt-1 inline-block border-b-2 border-amber-500 px-6 pb-1 text-2xl font-bold text-indigo-950 sm:text-4xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {cert.studentName}
        </p>

        {/* Course statement */}
        <p className="mx-auto mt-2 max-w-2xl text-[11px] leading-relaxed text-slate-600 sm:text-sm">
          for successfully completing all required modules and lessons of the
        </p>
        <p className="mt-0.5 text-lg font-bold text-slate-900 sm:text-2xl">{cert.courseName}</p>
        <p className="text-[11px] text-slate-600 sm:text-sm">
          course offered by <span className="font-semibold text-indigo-900">Knowledgeverse</span>
        </p>

        {/* Completion facts */}
        <div className="mx-auto mt-3 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
          {[
            [stats ? String(stats.modules) : "—", "Modules Completed"],
            [stats ? String(stats.lessons) : "—", "Lessons Completed"],
            [stats ? stats.duration : "—", "Total Study Time"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-lg border border-amber-300 bg-amber-50 px-1 py-1.5 sm:py-2">
              <p className="text-sm font-extrabold text-indigo-950 sm:text-lg">{v}</p>
              <p className="text-[8px] font-semibold tracking-wider text-slate-500 uppercase sm:text-[10px]">{l}</p>
            </div>
          ))}
        </div>

        {/* Declaration */}
        <p className="mx-auto mt-3 max-w-2xl text-[9px] leading-relaxed text-slate-500 sm:text-[11px]">
          This is to certify that the above-named student has fulfilled all course
          requirements on Knowledgeverse. Authenticity can be confirmed at any time
          by scanning the QR code or visiting the verification address below quoting
          the Certificate ID.
        </p>

        {/* Footer band */}
        <div className="mt-3 flex items-stretch justify-between gap-2 rounded-lg bg-slate-950 px-3 py-3 text-left sm:px-5">
          <div className="flex min-w-0 flex-1 flex-col justify-center text-[9px] leading-relaxed text-slate-300 sm:text-[11px]">
            <p>Certificate ID: <span className="font-mono font-bold text-amber-300">{cert.certificateId}</span></p>
            <p>Completion Date: <span className="font-semibold text-white">{cert.completionDate}</span></p>
            <p>Issued: <span className="font-semibold text-white">{issued}</span></p>
            <p className="mt-1 hidden truncate text-slate-400 sm:block">
              Verify: /verify/{cert.certificateId}
            </p>
          </div>

          {/* Large signature on dark band — neon glow blends via screen */}
          <div className="flex w-40 flex-col items-center justify-center sm:w-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/signature.png"
              alt="Authorized signature"
              className="h-16 w-full object-contain mix-blend-screen sm:h-24"
            />
            <div className="mt-1 w-full border-t border-amber-500/70" />
            <p className="mt-0.5 text-[9px] font-semibold tracking-wider text-slate-200 uppercase sm:text-[11px]">
              Authorized Signature
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="rounded-md bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.qrDataUrl} alt="Verification QR code" className="h-14 w-14 sm:h-[76px] sm:w-[76px]" />
            </span>
            <p className="mt-1 text-[8px] text-slate-400 sm:text-[10px]">Scan to verify</p>
          </div>
        </div>
      </div>
    </div>
  );
}
