// Renders the certificate review sample to a real PDF using headless Chromium.
// This is the same WYSIWYG path students get (rendered artwork → PDF page),
// so the stored sample shows exactly how downloads look.
// Usage:  npx tsx scripts/render-sample-pdf.ts
// Output: certificate-samples/software-engineering-sample.pdf
import { execSync } from "child_process";
import path from "path";
import { pathToFileURL } from "url";
import { chromium } from "playwright";

async function main() {
  const root = process.cwd();
  console.log("Regenerating sample HTML...");
  execSync("npx tsx scripts/make-sample.ts", { stdio: "inherit", cwd: root });

  const htmlFile = path.join(root, "certificate-samples/software-engineering-sample.html");
  const pdfFile = path.join(root, "certificate-samples/software-engineering-sample.pdf");

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(pathToFileURL(htmlFile).toString(), { waitUntil: "networkidle" });
  // Ensure the artwork images are fully decoded before printing.
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) =>
        img.complete && img.naturalWidth > 0
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            })
      )
    );
  });
  await page.pdf({
    path: pdfFile,
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
  });
  await browser.close();
  console.log("Sample PDF written:", pdfFile);
}

main().catch((e) => {
  console.error("RENDER FAILED:", e);
  process.exit(1);
});
