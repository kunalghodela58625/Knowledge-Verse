import { readFileSync, writeFileSync } from "fs";
import QRCode from "qrcode";
import { buildCertificatePDF } from "../src/lib/certificatePdf";

async function main() {
  const sigB64 = readFileSync("public/signature-sm.png").toString("base64");
  const sig = `data:image/png;base64,${sigB64}`;
  const qr = await QRCode.toDataURL("http://localhost/verify/KV-SE-TEST1234", { width: 220, margin: 1 });

  const cases = [
    {
      name: "normal",
      cert: {
        certificateId: "KV-SE-TEST1234",
        studentName: "Aarav Sharma",
        courseName: "Software Engineering",
        completionDate: "2026-10-06",
        issuedAt: "2026-10-06T10:00:00.000Z",
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
    },
    {
      name: "longname",
      cert: {
        certificateId: "KV-SE-LONG9999",
        studentName: "Venkata Naga Lakshmi Narasimha Raghavendra Sharma",
        courseName: "Software Engineering",
        completionDate: "2026-10-06",
        issuedAt: "2026-10-06T10:00:00.000Z",
        qrDataUrl: qr,
        courseStats: { modules: 8, lessons: 59, duration: "≈ 27 hours" },
        curriculum: ["Module One", "Module Two"],
      },
    },
  ];

  for (const c of cases) {
    const doc: any = buildCertificatePDF(c.cert as any, sig);
    const buf = Buffer.from(doc.output("arraybuffer"));
    writeFileSync(`/tmp/cert-${c.name}.pdf`, buf);
    const raw = buf.toString("latin1");
    const checks = [
      ["name present", raw.includes(c.cert.studentName.split(" ")[0])],
      ["course present", raw.includes("Software Engineering")],
      ["cert id present", raw.includes(c.cert.certificateId)],
      ["programme present", raw.includes("P R O G R A M M E")],
      ["signature embedded", raw.includes("/Image")],
      ["one page", doc.getNumberOfPages() === 1],
    ];
    console.log(`--- ${c.name}: ${buf.length} bytes`);
    for (const [label, ok] of checks) console.log(`   ${ok ? "PASS" : "FAIL"} ${label}`);
  }
}

main().catch((e) => {
  console.error("PDF TEST FAILED:", e);
  process.exit(1);
});
