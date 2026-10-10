// Single source of truth for the certificate artwork.
//
// The art uses ONLY inline styles with hex colors and system serif fonts —
// deliberately no Tailwind classes, no external CSS, no SVG. This lets the
// exact same markup render in three places without any drift:
//   1. the certificate page (CertificateView),
//   2. the downloadable PDF (html2canvas screenshot of #certificate-art),
//   3. the printable review sample (scripts/make-sample.ts → certificate-samples/).

export interface CertArtData {
  certificateId: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  issuedAt?: string;
  qrDataUrl: string;
  courseStats?: { modules: number; lessons: number; duration: string };
  curriculum?: string[];
}

export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SERIF = "Georgia,'Times New Roman',Times,serif";

export function certificateArtHTML(
  cert: CertArtData,
  opts: { sigUrl: string; verifyPath: string }
): string {
  const c = {
    certificateId: escapeHtml(cert.certificateId),
    studentName: escapeHtml(cert.studentName),
    courseName: escapeHtml(cert.courseName),
    completionDate: escapeHtml(cert.completionDate),
    issued: escapeHtml((cert.issuedAt || "").slice(0, 10) || cert.completionDate),
  };
  const stats = cert.courseStats;
  const curriculum = (cert.curriculum || []).slice(0, 12);

  const statsRow = stats
    ? `<div style="margin-top:12px;text-align:center;">` +
      [
        [String(stats.modules), "Modules Completed"],
        [String(stats.lessons), "Lessons Completed"],
        [String(stats.duration), "Total Study Time"],
      ]
        .map(
          ([v, l]) =>
            `<div style="display:inline-block;width:31%;margin:0 0.5%;vertical-align:top;border:1px solid #a07d2c;background:#faf5e6;padding:8px 4px;">` +
            `<div style="font-family:${SERIF};font-size:19px;font-weight:bold;color:#232c4b;">${escapeHtml(v)}</div>` +
            `<div style="font-family:${SERIF};font-size:9px;letter-spacing:1.5px;color:#6b6250;">${l.toUpperCase()}</div></div>`
        )
        .join("") +
      `</div>`
    : "";

  const half = Math.ceil(curriculum.length / 2);
  const col = (items: string[], start: number) =>
    `<div style="display:inline-block;width:49%;vertical-align:top;text-align:left;">` +
    items
      .map(
        (m, i) =>
          `<div style="font-family:${SERIF};font-size:10.5px;color:#3d3d38;padding:1.5px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">` +
          `<span style="color:#a07d2c;">${String(start + i + 1).padStart(2, "0")}.</span> ${escapeHtml(m)}</div>`
      )
      .join("") +
    `</div>`;
  const curriculumBlock =
    curriculum.length > 0
      ? `<div style="max-width:640px;margin:12px auto 0;border-top:1px solid #d8cfae;border-bottom:1px solid #d8cfae;padding:8px 4px;">` +
        `<div style="font-family:${SERIF};font-size:10px;font-weight:bold;letter-spacing:3px;color:#6b6250;text-align:center;">PROGRAMME OF STUDY</div>` +
        `<div style="margin-top:5px;">${col(curriculum.slice(0, half), 0)}${col(curriculum.slice(half), half)}</div></div>`
      : "";

  return (
    `<div style="background:#232c4b;padding:10px;">` +
    `<div style="background:#fdfcf6;border:2px solid #232c4b;padding:5px;">` +
    `<div style="border:1px solid #a07d2c;padding:26px 34px 20px;text-align:center;">` +

    // Institution header
    `<div style="font-family:${SERIF};font-size:13px;font-weight:bold;letter-spacing:6px;color:#232c4b;">KNOWLEDGEVERSE</div>` +
    `<div style="margin-top:6px;">` +
    `<span style="display:inline-block;width:120px;border-top:1px solid #a07d2c;vertical-align:middle;"></span>` +
    `<span style="font-family:${SERIF};font-size:10px;letter-spacing:3px;color:#6b6250;vertical-align:middle;">&nbsp;&nbsp;ONLINE LEARNING PLATFORM&nbsp;&nbsp;</span>` +
    `<span style="display:inline-block;width:120px;border-top:1px solid #a07d2c;vertical-align:middle;"></span></div>` +

    // Title
    `<div style="font-family:${SERIF};font-size:36px;font-weight:bold;color:#1a1a1a;margin-top:12px;">Certificate of Completion</div>` +

    // Recipient
    `<div style="font-family:${SERIF};font-size:13px;font-style:italic;color:#4a4a44;margin-top:8px;">This is to certify that</div>` +
    `<div style="font-family:${SERIF};font-size:32px;font-weight:bold;color:#232c4b;margin-top:4px;">${c.studentName}</div>` +
    `<div style="width:280px;border-bottom:1px solid #a07d2c;margin:4px auto 0;"></div>` +
    `<div style="font-family:${SERIF};font-size:13px;color:#3d3d38;margin-top:8px;">has successfully fulfilled all requirements of the</div>` +
    `<div style="font-family:${SERIF};font-size:22px;font-weight:bold;color:#1a1a1a;margin-top:2px;">${c.courseName}</div>` +
    `<div style="font-family:${SERIF};font-size:12px;font-style:italic;color:#4a4a44;margin-top:4px;">${
      stats
        ? `comprising ${stats.modules} modules and ${stats.lessons} lessons of structured study (${escapeHtml(stats.duration)} of learning material)`
        : "comprising all required modules and lessons of structured study"
    }</div>` +

    statsRow +
    curriculumBlock +

    // Declaration
    `<div style="font-family:${SERIF};font-size:10.5px;font-style:italic;color:#4a4a44;max-width:640px;margin:12px auto 0;line-height:1.5;">` +
    `This is to certify that the above-named student has fulfilled all course requirements on Knowledgeverse. ` +
    `Authenticity can be confirmed at any time by scanning the QR code or visiting the verification address quoting the Certificate ID.</div>` +

    // Bottom row: verification | seal | signature
    `<div style="margin-top:14px;text-align:center;">` +
    // verification
    `<div style="display:inline-block;width:29%;vertical-align:bottom;text-align:center;">` +
    `<span style="display:inline-block;border:1px solid #c9c2ab;background:#ffffff;padding:4px;">` +
    `<img src="${cert.qrDataUrl}" width="72" height="72" style="display:block;width:72px;height:72px;" alt="Verification QR code" /></span>` +
    `<div style="font-family:${SERIF};font-size:9px;color:#4a4a44;margin-top:4px;">Verify at<br /><strong>${escapeHtml(opts.verifyPath)}</strong></div></div>` +
    // seal (pure CSS double ring — no SVG, canvas-safe; text sized to fit inside)
    `<div style="display:inline-block;width:24%;vertical-align:bottom;text-align:center;">` +
    `<div style="width:96px;height:96px;border-radius:48px;border:2px solid #a07d2c;background:#f4ecd4;margin:0 auto;text-align:center;">` +
    `<div style="width:84px;height:84px;border-radius:42px;border:1px solid #a07d2c;margin:4px auto 0;">` +
    `<div style="font-family:${SERIF};font-size:7px;letter-spacing:0.5px;color:#6d5a22;margin-top:22px;">KNOWLEDGEVERSE</div>` +
    `<div style="font-size:15px;color:#a07d2c;line-height:1.1;">&#9733;</div>` +
    `<div style="font-family:${SERIF};font-size:7px;letter-spacing:0.5px;color:#6d5a22;">VERIFIED</div>` +
    `</div></div>` +
    `<div style="font-family:${SERIF};font-size:8px;letter-spacing:2px;color:#6b6250;margin-top:3px;">OFFICIAL SEAL</div></div>` +
    // signature — transparent ink placed directly on the paper
    `<div style="display:inline-block;width:45%;vertical-align:bottom;text-align:center;">` +
    `<img src="${escapeHtml(opts.sigUrl)}" style="display:block;width:230px;max-width:100%;margin:0 auto;" alt="Authorized signature" />` +
    `<div style="width:80%;border-top:1px solid #232c4b;margin:2px auto 0;"></div>` +
    `<div style="font-family:${SERIF};font-size:10px;font-weight:bold;letter-spacing:2px;color:#232c4b;margin-top:3px;">AUTHORIZED SIGNATORY</div>` +
    `<div style="font-family:${SERIF};font-size:9px;color:#6b6250;">Office of the Registrar, Knowledgeverse</div></div>` +
    `</div>` +

    // Record line
    `<div style="border-top:1px solid #d8cfae;margin-top:12px;padding-top:8px;font-family:${SERIF};font-size:10px;color:#4a4a44;">` +
    `Certificate No. <strong style="font-family:monospace;">${c.certificateId}</strong>` +
    `&nbsp;&nbsp;&nbsp;Date of Completion: <strong>${c.completionDate}</strong>` +
    `&nbsp;&nbsp;&nbsp;Date of Issue: <strong>${c.issued}</strong></div>` +
    `<div style="font-family:${SERIF};font-size:8px;font-style:italic;color:#8a8474;margin-top:3px;">` +
    `This certificate records course completion only and carries no grades, scores or rankings.</div>` +

    `</div></div></div>`
  );
}
