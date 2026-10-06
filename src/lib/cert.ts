import { randomBytes } from "crypto";
import QRCode from "qrcode";

// Unique, unguessable certificate IDs: KV-<COURSECODE>-<8 hex chars>
export function newCertificateId(courseCode: string): string {
  const hex = randomBytes(4).toString("hex").toUpperCase();
  return `KV-${courseCode}-${hex}`;
}

export function newVerificationToken(): string {
  return randomBytes(24).toString("hex");
}

export function verificationUrl(origin: string, certificateId: string): string {
  return `${origin.replace(/\/$/, "")}/verify/${certificateId}`;
}

export async function makeQrDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, { width: 220, margin: 1 });
}
