import { NextResponse } from "next/server";
import { db, uid, type Certificate } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getCourse, lessonIdsOf } from "@/lib/courses";
import { newCertificateId, newVerificationToken, verificationUrl, makeQrDataUrl } from "@/lib/cert";

// Self-heal: older certificate records (issued before stats/curriculum/QR
// fields existed) are completed from current course data and saved back, so
// the screen view and the PDF download can never render empty boxes or a
// missing QR code.
async function healCertificate(c: Certificate, origin: string): Promise<boolean> {
  let changed = false;
  const course = await getCourse(c.courseId);
  if (course) {
    if (!c.courseStats) {
      c.courseStats = {
        modules: course.totalModules,
        lessons: course.totalLessons,
        duration: course.duration,
      };
      changed = true;
    }
    if (!c.curriculum || c.curriculum.length === 0) {
      c.curriculum = course.modules.map((m) => m.title);
      changed = true;
    }
  }
  if (!c.qrDataUrl) {
    c.qrDataUrl = await makeQrDataUrl(verificationUrl(origin, c.certificateId));
    changed = true;
  }
  return changed;
}

function requestOrigin(req: Request): string {
  return process.env.KV_PUBLIC_URL || req.headers.get("origin") || "http://localhost:3000";
}

// GET /api/certificates -> my certificates (healed + saved back if needed)
export async function GET(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Please login first." }, { status: 401 });
  const certs = await db.certificates();
  const origin = requestOrigin(req);
  let changed = false;
  for (const c of certs) {
    if (c.userId === me.id && (await healCertificate(c, origin))) changed = true;
  }
  if (changed) await db.saveCertificates(certs);
  return NextResponse.json({ certificates: certs.filter((c) => c.userId === me.id) });
}

// POST /api/certificates { courseId }
// EXACT eligibility logic: 100% of required lessons completed -> issue.
// No quiz-score, watch-time or study-time conditions of any kind.
export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Please login first." }, { status: 401 });
  try {
    const { courseId } = await req.json();
    const course = await getCourse(String(courseId || ""));
    if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });

    const enrollments = await db.enrollments();
    const enr = enrollments.find((e) => e.userId === me.id && e.courseId === course.id);
    if (!enr) return NextResponse.json({ error: "Please enroll in the course first." }, { status: 403 });

    // Re-validate completion server-side — never trust the client.
    const ids = lessonIdsOf(course);
    const progress = await db.progress();
    const done = progress.filter((p) => p.userId === me.id && p.courseId === course.id && p.completed).length;
    if (ids.length === 0 || done < ids.length) {
      return NextResponse.json(
        { error: `Certificate locked: complete all ${ids.length} lessons first (${done}/${ids.length} done).`, done, total: ids.length },
        { status: 403 }
      );
    }
    if (!enr.completed) {
      enr.completed = true;
      enr.completedAt = enr.completedAt || new Date().toISOString();
      await db.saveEnrollments(enrollments);
    }

    const certs = await db.certificates();
    const existing = certs.find((c) => c.userId === me.id && c.courseId === course.id && c.status === "valid");
    if (existing) return NextResponse.json({ certificate: existing });

    // Name comes from the account — never from client input.
    const users = await db.users();
    const user = users.find((u) => u.id === me.id)!;
    const origin = process.env.KV_PUBLIC_URL || req.headers.get("origin") || "http://localhost:3000";
    const certificateId = newCertificateId(course.code);
    const qrDataUrl = await makeQrDataUrl(verificationUrl(origin, certificateId));
    const cert = {
      id: uid("c_"),
      certificateId,
      userId: me.id,
      studentName: user.fullName,
      courseId: course.id,
      courseName: course.title,
      completionDate: (enr.completedAt || new Date().toISOString()).slice(0, 10),
      issuedAt: new Date().toISOString(),
      status: "valid" as const,
      verificationToken: newVerificationToken(),
      qrDataUrl,
      courseStats: {
        modules: course.totalModules,
        lessons: course.totalLessons,
        duration: course.duration,
      },
      curriculum: course.modules.map((m) => m.title),
    };
    certs.push(cert);
    await db.saveCertificates(certs);
    return NextResponse.json({ certificate: cert });
  } catch {
    return NextResponse.json({ error: "Could not issue the certificate." }, { status: 500 });
  }
}
