import { jsPDF } from "jspdf";
import type { CertData } from "@/components/CertificateView";

const NAVY: [number, number, number] = [35, 44, 75];
const GOLD: [number, number, number] = [160, 125, 44];
const INK: [number, number, number] = [26, 26, 26];
const GREY: [number, number, number] = [74, 74, 68];
const IVORY: [number, number, number] = [253, 252, 246];

// Shrink font until text fits maxWidth. Prevents overflow ("disrupted" layout)
// with long student or course names.
function fitFont(doc: jsPDF, text: string, maxWidth: number, startSize: number, minSize = 9): number {
  let s = startSize;
  doc.setFontSize(s);
  while (s > minSize && doc.getTextWidth(text) > maxWidth) {
    s -= 0.5;
    doc.setFontSize(s);
  }
  return s;
}

// Pure layout builder — no DOM access, so it can be unit-tested in Node.
// Mirrors CertificateView section for section.
export function buildCertificatePDF(cert: CertData, sigDataUrl: string): jsPDF {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;
  const cx = W / 2;
  const stats = cert.courseStats;
  const issued = (cert.issuedAt || "").slice(0, 10) || cert.completionDate;

  // Mount + ivory paper + double border
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, H, "F");
  doc.setFillColor(...IVORY);
  doc.rect(9, 9, W - 18, H - 18, "F");
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.9);
  doc.rect(11, 11, W - 22, H - 22);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.rect(15, 15, W - 30, H - 30);

  // Institution header
  doc.setFont("times", "bold");
  doc.setTextColor(...NAVY);
  doc.setFontSize(11);
  doc.text("K N O W L E D G E V E R S E", cx, 24, { align: "center" });
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.line(cx - 70, 27.5, cx - 38, 27.5);
  doc.line(cx + 38, 27.5, cx + 70, 27.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...GREY);
  doc.text("O N L I N E   L E A R N I N G   P L A T F O R M", cx, 28, { align: "center" });

  // Title
  doc.setFont("times", "bold");
  doc.setTextColor(...INK);
  doc.setFontSize(29);
  doc.text("Certificate of Completion", cx, 39, { align: "center" });

  // Recipient
  doc.setFont("times", "italic");
  doc.setFontSize(10.5);
  doc.setTextColor(...GREY);
  doc.text("This is to certify that", cx, 46, { align: "center" });
  doc.setFont("times", "bold");
  doc.setTextColor(...NAVY);
  fitFont(doc, cert.studentName, 220, 30);
  doc.text(cert.studentName, cx, 58, { align: "center" });
  const nameW = doc.getTextWidth(cert.studentName);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(cx - nameW / 2 - 8, 60.5, cx + nameW / 2 + 8, 60.5);

  // Course
  doc.setFont("times", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(61, 61, 56);
  doc.text("has successfully fulfilled all requirements of the", cx, 66, { align: "center" });
  doc.setFont("times", "bold");
  doc.setTextColor(...INK);
  fitFont(doc, cert.courseName, 220, 20);
  doc.text(cert.courseName, cx, 74.5, { align: "center" });
  doc.setFont("times", "italic");
  doc.setFontSize(9.5);
  doc.setTextColor(...GREY);
  doc.text(
    stats
      ? `comprising ${stats.modules} modules and ${stats.lessons} lessons of structured study (${stats.duration} of learning material)`
      : "comprising all required modules and lessons of structured study",
    cx,
    80,
    { align: "center" }
  );

  // Programme of study (two columns)
  let bottomTop = 86;
  if (cert.curriculum && cert.curriculum.length > 0) {
    doc.setFont("times", "bold");
    doc.setFontSize(8);
    doc.setTextColor(107, 98, 80);
    doc.text("P R O G R A M M E   O F   S T U D Y", cx, bottomTop, { align: "center" });
    doc.setDrawColor(216, 207, 174);
    doc.line(cx - 110, bottomTop + 2, cx + 110, bottomTop + 2);
    doc.setFont("times", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(61, 61, 56);
    const items = cert.curriculum.slice(0, 12);
    const rows = Math.ceil(items.length / 2);
    const colX = [cx - 105, cx + 5];
    items.forEach((m, i) => {
      const col = i < rows ? 0 : 1;
      const row = i % rows;
      const label = `${String(i + 1).padStart(2, "0")}. ${m}`;
      const clipped = doc.getTextWidth(label) > 98 ? label : label;
      doc.text(clipped, colX[col], bottomTop + 7 + row * 4.6);
    });
    bottomTop = bottomTop + 7 + (rows - 1) * 4.6 + 4;
    doc.setDrawColor(216, 207, 174);
    doc.line(cx - 110, bottomTop, cx + 110, bottomTop);
  }

  // Declaration (wrapped, always inside the page)
  doc.setFont("times", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...GREY);
  const decl = doc.splitTextToSize(
    "This is to certify that the above-named student has fulfilled all course requirements on Knowledgeverse. Authenticity can be confirmed at any time by scanning the QR code or visiting the verification address quoting the Certificate ID.",
    215
  );
  const declLines = Array.isArray(decl) ? decl : [decl];
  const declY = Math.min(bottomTop + 6, 150);
  doc.text(declLines.slice(0, 3), cx, declY, { align: "center" });

  // Bottom row geometry
  const rowY = 156; // top of QR / seal / signature zone
  const rowH = 30;

  // QR + verification (left)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(201, 194, 171);
  doc.setLineWidth(0.3);
  const qx = 26;
  doc.rect(qx, rowY, 24, 24, "FD");
  try {
    doc.addImage(cert.qrDataUrl, "PNG", qx + 2, rowY + 2, 20, 20);
  } catch {
    /* ignore */
  }
  doc.setFont("times", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...GREY);
  doc.text("Verify at", qx + 12, rowY + 27, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text(`/verify/${cert.certificateId}`, qx + 12, rowY + 30.5, { align: "center" });

  // Seal (center): double gold ring + wording
  doc.setFillColor(244, 236, 212);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.8);
  doc.circle(cx, rowY + 13, 13, "FD");
  doc.setLineWidth(0.3);
  doc.circle(cx, rowY + 13, 10.5);
  doc.setFont("times", "bold");
  doc.setFontSize(7);
  doc.setTextColor(109, 90, 34);
  doc.text("KNOWLEDGEVERSE", cx, rowY + 10, { align: "center" });
  doc.text("VERIFIED", cx, rowY + 14.5, { align: "center" });
  doc.setFontSize(6);
  doc.text("OFFICIAL SEAL", cx, rowY + 30.5, { align: "center" });

  // Signature (right): near-black mount matching the PNG background keeps ink crisp
  const sigW = 72;
  const sigH = 27;
  const sigX = W - 26 - sigW;
  doc.setFillColor(11, 12, 15);
  doc.rect(sigX, rowY, sigW, sigH, "F");
  try {
    doc.addImage(sigDataUrl, "PNG", sigX, rowY, sigW, sigH);
  } catch {
    /* ignore */
  }
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.4);
  doc.line(sigX + 8, rowY + sigH + 2.5, sigX + sigW - 8, rowY + sigH + 2.5);
  doc.setFont("times", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...NAVY);
  doc.text("AUTHORIZED SIGNATORY", sigX + sigW / 2, rowY + sigH + 7, { align: "center" });
  doc.setFont("times", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GREY);
  doc.text("Office of the Registrar, Knowledgeverse", sigX + sigW / 2, rowY + sigH + 10.5, { align: "center" });
  void rowH;

  // Record line
  doc.setDrawColor(216, 207, 174);
  doc.line(cx - 110, 190, cx + 110, 190);
  doc.setFont("times", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...GREY);
  doc.text(
    `Certificate No. ${cert.certificateId}      Date of Completion: ${cert.completionDate}      Date of Issue: ${issued}`,
    cx,
    194,
    { align: "center" }
  );
  doc.setFont("times", "italic");
  doc.setFontSize(7);
  doc.setTextColor(138, 132, 116);
  doc.text(
    "This certificate records course completion only and carries no grades, scores or rankings.",
    cx,
    197.5,
    { align: "center" }
  );

  return doc;
}

async function urlToDataUrl(url: string): Promise<string> {
  const r = await fetch(url);
  const blob = await r.blob();
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}

// Browser entry point used by the certificate page.
export async function downloadCertificatePDF(cert: CertData) {
  const sig = await urlToDataUrl("/signature-sm.png");
  const doc = buildCertificatePDF(cert, sig);
  doc.save(`${cert.certificateId}.pdf`);
}
