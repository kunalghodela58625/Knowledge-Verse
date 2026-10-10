// Generates a self-contained review sample of the CURRENT certificate template.
// Run whenever the template changes:  npx tsx scripts/make-sample.ts
// Output: certificate-samples/software-engineering-sample.html (open in a browser).
// The sample uses the exact same certificateArtHTML() markup as the app, so what
// you see in the sample is what students see on screen and in the PDF download.
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import QRCode from "qrcode";
import { certificateArtHTML } from "../src/lib/certificateArt";

async function main() {
  const root = process.cwd();
  const qr = await QRCode.toDataURL(
    "https://knowledgeverse.example/verify/KV-SE-SAMPLE01",
    { width: 220, margin: 1 }
  );
  const sigB64 = readFileSync(path.join(root, "public/signature-ink.png")).toString("base64");

  const art = certificateArtHTML(
    {
      certificateId: "KV-SE-SAMPLE01",
      studentName: "Rahul Sharma",
      courseName: "Software Engineering",
      completionDate: "2026-10-09",
      issuedAt: "2026-10-09T10:00:00.000Z",
      qrDataUrl: qr,
      courseStats: { modules: 8, lessons: 59, duration: "≈ 27 hours" },
      curriculum: [
        "Introduction to Software Engineering & SDLC",
        "Software Process Models",
        "Requirements Engineering & Analysis",
        "Project Management, Estimation & Risk",
        "Software Quality & Testing",
        "Maintenance, Reliability & Support",
        "UML & Software Design",
        "Revision & Exam Practice",
      ],
    },
    { sigUrl: `data:image/png;base64,${sigB64}`, verifyPath: "/verify/KV-SE-SAMPLE01" }
  );

  const doc = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" />
<title>Knowledgeverse Certificate Sample — KV-SE-SAMPLE01</title>
<style>body{background:#e8e6df;margin:0;padding:32px 16px;font-family:Arial,sans-serif;}</style>
</head>
<body>
<p style="text-align:center;color:#555;font-size:13px;">Review sample of the Knowledgeverse certificate template (generated ${new Date().toISOString().slice(0, 10)}). This is the exact artwork used on screen and in PDF downloads.</p>
<div style="max-width:900px;margin:16px auto;box-shadow:0 20px 50px rgba(0,0,0,0.35);">${art}</div>
</body>
</html>`;

  mkdirSync(path.join(root, "certificate-samples"), { recursive: true });
  const out = path.join(root, "certificate-samples/software-engineering-sample.html");
  writeFileSync(out, doc);
  console.log("Sample written:", out, `(${doc.length} bytes)`);
}

main().catch((e) => {
  console.error("SAMPLE FAILED:", e);
  process.exit(1);
});
