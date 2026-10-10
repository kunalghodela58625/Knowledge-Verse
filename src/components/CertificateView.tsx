import { certificateArtHTML, type CertArtData } from "@/lib/certificateArt";

// Re-exported so existing imports keep working.
export type { CertArtData as CertData };

// Thin wrapper: the artwork HTML is the single source of truth shared by the
// page, the PDF download (screenshot of #certificate-art) and the stored
// review sample (certificate-samples/).
export default function CertificateView({ cert }: { cert: CertArtData }) {
  const html = certificateArtHTML(cert, {
    sigUrl: "/signature-ink.png",
    verifyPath: `/verify/${cert.certificateId}`,
  });
  return (
    <div
      id="certificate-art"
      style={{ maxWidth: 900, margin: "0 auto", boxShadow: "0 20px 50px rgba(0,0,0,0.35)", borderRadius: 4 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
