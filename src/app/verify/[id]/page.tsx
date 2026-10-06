import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function VerifyResult({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certs = await db.certificates();
  const c = certs.find((x) => x.certificateId === id && x.status === "valid");

  if (!c) {
    return (
      <div className="mx-auto max-w-xl px-4 py-14 text-center">
        <div className="rounded-2xl border border-red-200 bg-white p-10">
          <p className="text-4xl">✕</p>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Certificate Not Found</h1>
          <p className="mt-2 text-sm text-slate-500">
            This certificate could not be verified by Knowledgeverse. Please check the Certificate ID and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-14">
      <div className="rounded-2xl border border-green-200 bg-white p-10 text-center">
        <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">✓</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Certificate Verified</h1>
        <dl className="mx-auto mt-6 max-w-md space-y-3 text-left text-sm">
          <div className="flex justify-between border-b border-slate-100 pb-2"><dt className="text-slate-500">Certificate ID</dt><dd className="font-mono font-semibold">{c.certificateId}</dd></div>
          <div className="flex justify-between border-b border-slate-100 pb-2"><dt className="text-slate-500">Student Name</dt><dd className="font-semibold">{c.studentName}</dd></div>
          <div className="flex justify-between border-b border-slate-100 pb-2"><dt className="text-slate-500">Course</dt><dd className="font-semibold">{c.courseName}</dd></div>
          <div className="flex justify-between border-b border-slate-100 pb-2"><dt className="text-slate-500">Status</dt><dd className="font-semibold text-green-700">Completed</dd></div>
          <div className="flex justify-between border-b border-slate-100 pb-2"><dt className="text-slate-500">Completion Date</dt><dd className="font-semibold">{c.completionDate}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-500">Issued By</dt><dd className="font-semibold">Knowledgeverse</dd></div>
        </dl>
      </div>
    </div>
  );
}
