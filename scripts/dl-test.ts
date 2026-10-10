// Verifies the real student download flow in a browser:
// register -> enroll -> complete -> issue -> open cert page ->
// screenshot art -> click Download -> inspect the PDF file.
import { readFileSync } from "fs";
import { chromium } from "playwright";

const BASE = "http://127.0.0.1:3105";

async function api(ctx: any, method: string, p: string, body?: any) {
  const r = await ctx.request[method.toLowerCase()](BASE + p, body ? { data: body } : undefined);
  return { status: r.status(), data: await r.json().catch(() => ({})) };
}

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1280, height: 1000 } });
  const page = await ctx.newPage();

  let r = await api(ctx, "POST", "/api/auth/register", {
    fullName: "Download Tester", email: "dl@test.com", password: "Pass1234", confirmPassword: "Pass1234",
  });
  console.log("register:", r.status);
  r = await api(ctx, "GET", "/api/courses/software-engineering");
  const lessons: string[] = r.data.course.modules.flatMap((m: any) => m.lessons.map((l: any) => l.id));
  console.log("lessons:", lessons.length);
  await api(ctx, "POST", "/api/enroll", { courseId: "software-engineering" });
  for (const lid of lessons) {
    await api(ctx, "POST", "/api/progress", { courseId: "software-engineering", lessonId: lid, completed: true });
  }
  r = await api(ctx, "POST", "/api/certificates", { courseId: "software-engineering" });
  const cid = r.data.certificate.certificateId;
  console.log("cert:", cid);
  console.log("record stats:", JSON.stringify(r.data.certificate.courseStats), "curriculum:", r.data.certificate.curriculum?.length, "qr:", r.data.certificate.qrDataUrl?.slice(0, 30));

  await page.goto(`${BASE}/certificate/${cid}`, { waitUntil: "networkidle" });
  await page.locator("#certificate-art").waitFor({ timeout: 20000 });
  await page.waitForTimeout(1500);
  await page.locator("#certificate-art").screenshot({ path: "/tmp/opencode/dl-art.png" });
  console.log("art screenshot saved");

  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 60000 }),
    page.getByRole("button", { name: /Download Certificate/ }).click(),
  ]);
  const pdfPath = "/tmp/opencode/dl-cert.pdf";
  await download.saveAs(pdfPath);
  console.log("PDF saved");

  const raw = readFileSync(pdfPath).toString("latin1");
  const mediaBox = raw.match(/\/MediaBox\s*\[([^\]]+)\]/);
  const pages = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
  const images = (raw.match(/\/Subtype\s*\/Image/g) || []).length;
  const { size } = await import("fs").then((fs) => fs.promises.stat(pdfPath));
  console.log("MediaBox:", mediaBox?.[1], "| pages:", pages, "| images:", images, "| bytes:", size);
  // A4 landscape = 841.89 x 595.28 pt
  await browser.close();
}

main().catch((e) => {
  console.error("DL TEST FAILED:", e);
  process.exit(1);
});
