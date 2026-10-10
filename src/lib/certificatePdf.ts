import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import type { CertData } from "@/components/CertificateView";

// Standard certificate download: a true A4 landscape page (297 × 210 mm),
// white background, even margins on all four sides, artwork centered and
// scaled to fit without any stretching. The artwork is screenshotted exactly
// as displayed, so the PDF always matches the screen pixel-for-pixel.
export async function downloadCertificatePDF(cert: CertData) {
  const node = document.getElementById("certificate-art");
  if (!node) throw new Error("Certificate artwork is not on the page yet.");

  // Wait until every image inside the artwork (QR code, signature) is fully
  // decoded. Capturing earlier is what produced downloads with a missing QR.
  const imgs = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            // Double-check decodability; a broken image resolves instead of hanging.
            if (typeof img.decode === "function") img.decode().then(() => resolve(), () => resolve());
            else resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
            // Fallback timeout so a stalled image can never hang the download.
            setTimeout(() => resolve(), 8000);
          }
        })
    )
  );

  const canvas = await html2canvas(node, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    imageTimeout: 20000,
    logging: false,
  });

  // JPEG at high quality keeps text razor-sharp in print while keeping the
  // file small (a full-resolution PNG of the artwork is 20+ MB).
  const img = canvas.toDataURL("image/jpeg", 0.95);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  const PAGE_W = 297;
  const PAGE_H = 210;
  const MARGIN = 12; // even margin on every side

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  const maxW = PAGE_W - MARGIN * 2;
  const maxH = PAGE_H - MARGIN * 2;
  const ratio = Math.min(maxW / canvas.width, maxH / canvas.height);
  const w = canvas.width * ratio;
  const h = canvas.height * ratio;
  doc.addImage(img, "JPEG", (PAGE_W - w) / 2, (PAGE_H - h) / 2, w, h);
  doc.save(`${cert.certificateId}.pdf`);
}
