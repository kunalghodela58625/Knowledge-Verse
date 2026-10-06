import { jsPDF } from "jspdf";
import type { CertData } from "@/components/CertificateView";

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

export async function downloadCertificatePDF(cert: CertData) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;
  const stats = cert.courseStats;
  const issued = (cert.issuedAt || "").slice(0, 10) || cert.completionDate;

  // Navy frame + cream face + gold double border
  doc.setFillColor(12, 18, 45);
  doc.rect(0, 0, W, H, "F");
  doc.setFillColor(255, 253, 244);
  doc.rect(10, 10, W - 20, H - 20, "F");
  doc.setDrawColor(180, 83, 9);
  doc.setLineWidth(1.2);
  doc.rect(13, 13, W - 26, H - 26);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.4);
  doc.rect(16, 16, W - 32, H - 32);

  const cx = W / 2;
  // Brand
  doc.setFont("times", "bold");
  doc.setTextColor(12, 18, 45);
  doc.setFontSize(11);
  doc.text("K N O W L E D G E V E R S E", cx, 26, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("O N L I N E   L E A R N I N G   P L A T F O R M", cx, 31, { align: "center" });

  // Title
  doc.setFont("times", "bold");
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(30);
  doc.text("CERTIFICATE", cx, 41, { align: "center" });
  doc.setFontSize(13);
  doc.setTextColor(180, 83, 9);
  doc.text("O F   C O M P L E T I O N", cx, 47.5, { align: "center" });
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.line(cx - 40, 50.5, cx - 8, 50.5);
  doc.line(cx + 8, 50.5, cx + 40, 50.5);

  // Recipient
  doc.setFont("times", "italic");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("This certificate is proudly presented to", cx, 57, { align: "center" });
  doc.setFont("times", "bold");
  doc.setFontSize(30);
  doc.setTextColor(12, 18, 45);
  doc.text(cert.studentName, cx, 69, { align: "center" });
  const nameW = doc.getTextWidth(cert.studentName);
  doc.setDrawColor(245, 158, 11);
  doc.line(cx - nameW / 2 - 6, 72, cx + nameW / 2 + 6, 72);

  // Course statement
  doc.setFont("times", "italic");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("for successfully completing all required modules and lessons of the", cx, 78, { align: "center" });
  doc.setFont("times", "bold");
  doc.setFontSize(19);
  doc.setTextColor(15, 23, 42);
  doc.text(cert.courseName, cx, 87, { align: "center" });
  doc.setFont("times", "italic");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("course offered by Knowledgeverse", cx, 93, { align: "center" });

  // Stats boxes
  const statVals = [
    stats ? String(stats.modules) : "-",
    stats ? String(stats.lessons) : "-",
    stats ? stats.duration : "-",
  ];
  const statLabels = ["MODULES COMPLETED", "LESSONS COMPLETED", "TOTAL STUDY TIME"];
  const boxW = 52;
  const startX = cx - (boxW * 3 + 8) / 2;
  doc.setFont("helvetica", "bold");
  statVals.forEach((v, i) => {
    const x = startX + i * (boxW + 4);
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.4);
    doc.rect(x, 97, boxW, 16, "FD");
    doc.setFontSize(13);
    doc.setTextColor(12, 18, 45);
    doc.text(v, x + boxW / 2, 104.5, { align: "center" });
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(statLabels[i], x + boxW / 2, 109.5, { align: "center" });
  });

  // Declaration
  doc.setFont("times", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const decl = doc.splitTextToSize(
    "This is to certify that the above-named student has fulfilled all course requirements on Knowledgeverse. Authenticity can be confirmed at any time by scanning the QR code or visiting the verification address quoting the Certificate ID.",
    220
  );
  doc.text(decl, cx, 118, { align: "center" });

  // Footer band
  const bandY = 132;
  const bandH = H - bandY - 14;
  doc.setFillColor(10, 14, 30);
  doc.rect(16, bandY, W - 32, bandH, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  const lx = 24;
  doc.text(`Certificate ID: ${cert.certificateId}`, lx, bandY + 10);
  doc.text(`Completion Date: ${cert.completionDate}`, lx, bandY + 17);
  doc.text(`Issued: ${issued}`, lx, bandY + 24);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Verify: /verify/${cert.certificateId}`, lx, bandY + 31);

  // Large signature: black backing (matches PNG bg) + image
  try {
    const sig = await urlToDataUrl("/signature.png");
    const sigW = 62;
    const sigH = 30;
    const sigX = cx - sigW / 2;
    const sigY = bandY + 3;
    doc.setFillColor(13, 14, 16);
    doc.rect(sigX, sigY, sigW, sigH, "F");
    doc.addImage(sig, "PNG", sigX, sigY, sigW, sigH);
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.4);
    doc.line(sigX, sigY + sigH + 2, sigX + sigW, sigY + sigH + 2);
    doc.setFontSize(8);
    doc.setTextColor(226, 232, 240);
    doc.text("Authorized Signature", cx, sigY + sigH + 7, { align: "center" });
  } catch {
    /* ignore */
  }

  // QR
  try {
    doc.setFillColor(255, 255, 255);
    doc.rect(W - 52, bandY + 4, 30, 30, "F");
    doc.addImage(cert.qrDataUrl, "PNG", W - 50, bandY + 6, 26, 26);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text("Scan to verify", W - 37, bandY + bandH - 3, { align: "center" });
  } catch {
    /* ignore */
  }

  // Gold seal
  doc.setFillColor(253, 230, 138);
  doc.setDrawColor(180, 83, 9);
  doc.setLineWidth(1);
  doc.circle(W - 30, 34, 13, "FD");
  doc.setFontSize(7);
  doc.setTextColor(120, 53, 15);
  doc.text("VERIFIED", W - 30, 33, { align: "center" });
  doc.text("KNOWLEDGEVERSE", W - 30, 37, { align: "center" });

  doc.save(`${cert.certificateId}.pdf`);
}
