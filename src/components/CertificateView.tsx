export interface CertData {
  certificateId: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  issuedAt?: string;
  qrDataUrl: string;
  courseStats?: { modules: number; lessons: number; duration: string };
  curriculum?: string[];
}

const SERIF = "Georgia, 'Times New Roman', Times, serif";

// Classic academic certificate: ivory paper, hairline borders, restrained
// navy-and-gold palette, formal wording. Deliberately print-like — no gradients
// or playful shapes — so it reads as a genuine institutional document.
export default function CertificateView({ cert }: { cert: CertData }) {
  const stats = cert.courseStats;
  const issued = (cert.issuedAt || "").slice(0, 10) || cert.completionDate;

  return (
    <div
      id="certificate-art"
      className="mx-auto w-full max-w-4xl bg-[#232c4b] p-2 shadow-2xl sm:p-2.5"
    >
      <div
        className="relative bg-[#fdfcf6] px-5 py-5 sm:px-10 sm:py-6"
        style={{ border: "2px solid #232c4b", outline: "1px solid #a07d2c", outlineOffset: "-6px" }}
      >
        {/* Institution header */}
        <p
          className="text-center text-[11px] font-bold uppercase sm:text-[13px]"
          style={{ fontFamily: SERIF, letterSpacing: "0.45em", color: "#232c4b" }}
        >
          Knowledgeverse
        </p>
        <div className="mx-auto mt-1.5 flex max-w-md items-center gap-3">
          <span className="h-px flex-1 bg-[#a07d2c]" />
          <span className="text-[9px] tracking-[0.3em] text-[#6b6250] uppercase sm:text-[10px]">
            Online Learning Platform
          </span>
          <span className="h-px flex-1 bg-[#a07d2c]" />
        </div>

        {/* Title */}
        <h1
          className="mt-3 text-center text-[26px] leading-tight font-bold text-[#1a1a1a] sm:text-[38px]"
          style={{ fontFamily: SERIF }}
        >
          Certificate of Completion
        </h1>

        {/* Formal body */}
        <p className="mt-2 text-center text-[11px] text-[#4a4a44] italic sm:text-[13px]" style={{ fontFamily: SERIF }}>
          This is to certify that
        </p>
        <p
          className="mt-1 text-center text-[24px] font-bold text-[#232c4b] sm:text-[34px]"
          style={{ fontFamily: SERIF }}
        >
          {cert.studentName}
        </p>
        <div className="mx-auto mt-1 w-48 border-b border-[#a07d2c] sm:w-72" />
        <p
          className="mx-auto mt-2 max-w-2xl text-center text-[11px] leading-relaxed text-[#3d3d38] sm:text-[13px]"
          style={{ fontFamily: SERIF }}
        >
          has successfully fulfilled all requirements of the
        </p>
        <p
          className="mt-0.5 text-center text-[17px] font-bold text-[#1a1a1a] sm:text-[23px]"
          style={{ fontFamily: SERIF }}
        >
          {cert.courseName}
        </p>
        <p
          className="mt-1 text-center text-[10px] text-[#4a4a44] italic sm:text-xs"
          style={{ fontFamily: SERIF }}
        >
          {stats
            ? `comprising ${stats.modules} modules and ${stats.lessons} lessons of structured study (${stats.duration} of learning material)`
            : "comprising all required modules and lessons of structured study"}
        </p>

        {/* Programme of study */}
        {cert.curriculum && cert.curriculum.length > 0 && (
          <div className="mx-auto mt-3 max-w-2xl border-y border-[#d8cfae] py-2">
            <p
              className="text-center text-[9px] font-bold tracking-[0.3em] text-[#6b6250] uppercase sm:text-[10px]"
              style={{ fontFamily: SERIF }}
            >
              Programme of Study
            </p>
            <ol className="mt-1 grid grid-cols-1 gap-x-6 text-[9px] text-[#3d3d38] sm:grid-cols-2 sm:text-[10.5px]" style={{ fontFamily: SERIF }}>
              {cert.curriculum.map((m, i) => (
                <li key={m} className="truncate">
                  <span className="text-[#a07d2c]">{String(i + 1).padStart(2, "0")}.</span> {m}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Bottom row: verification | seal | signature */}
        <div className="mt-3 flex items-end justify-between gap-2 sm:gap-4">
          {/* Verification */}
          <div className="w-32 shrink-0 text-center sm:w-44">
            <span className="inline-block border border-[#c9c2ab] bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.qrDataUrl} alt="Verification QR code" className="h-14 w-14 sm:h-[72px] sm:w-[72px]" />
            </span>
            <p className="mt-1 text-[8px] leading-tight text-[#4a4a44] sm:text-[9px]" style={{ fontFamily: SERIF }}>
              Verify at<br />
              <span className="font-bold">/verify/{cert.certificateId}</span>
            </p>
          </div>

          {/* Seal */}
          <div className="hidden shrink-0 flex-col items-center sm:flex">
            <svg width="92" height="92" viewBox="0 0 100 100" aria-label="Knowledgeverse seal">
              <defs>
                <path id="sealArc" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
              </defs>
              <circle cx="50" cy="50" r="47" fill="#f4ecd4" stroke="#a07d2c" strokeWidth="2" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#a07d2c" strokeWidth="0.75" />
              <text fontSize="10.5" fill="#6d5a22" letterSpacing="2.5" style={{ fontFamily: SERIF }}>
                <textPath href="#sealArc">KNOWLEDGEVERSE • VERIFIED •</textPath>
              </text>
              <text x="50" y="58" textAnchor="middle" fontSize="20" fill="#a07d2c">★</text>
            </svg>
            <p className="mt-0.5 text-[8px] tracking-[0.2em] text-[#6b6250] uppercase" style={{ fontFamily: SERIF }}>
              Official Seal
            </p>
          </div>

          {/* Signature — large, on near-black mount so the ink stays crisp */}
          <div className="flex w-48 shrink-0 flex-col items-center sm:w-72">
            <div className="w-full rounded-sm bg-[#0b0c0f] px-2 pt-1 pb-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/signature-sm.png"
                alt="Authorized signature"
                className="h-20 w-full object-contain sm:h-28"
              />
            </div>
            <div className="mt-1 w-4/5 border-t border-[#232c4b]" />
            <p className="mt-0.5 text-[9px] font-bold tracking-[0.18em] text-[#232c4b] uppercase sm:text-[10px]" style={{ fontFamily: SERIF }}>
              Authorized Signatory
            </p>
            <p className="text-[8px] text-[#6b6250] sm:text-[9px]" style={{ fontFamily: SERIF }}>
              Office of the Registrar, Knowledgeverse
            </p>
          </div>
        </div>

        {/* Record line */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-0.5 border-t border-[#d8cfae] pt-2 text-[8px] text-[#4a4a44] sm:text-[10px]" style={{ fontFamily: SERIF }}>
          <span>Certificate No. <strong className="font-mono">{cert.certificateId}</strong></span>
          <span>Date of Completion: <strong>{cert.completionDate}</strong></span>
          <span>Date of Issue: <strong>{issued}</strong></span>
        </div>
        <p className="mt-1 text-center text-[7px] text-[#8a8474] italic sm:text-[8px]" style={{ fontFamily: SERIF }}>
          This certificate records course completion only and carries no grades, scores or rankings.
        </p>
      </div>
    </div>
  );
}
