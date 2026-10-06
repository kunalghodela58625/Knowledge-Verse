import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
              K
            </span>
            <span className="font-bold text-slate-900">
              Knowledge<span className="text-indigo-600">verse</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Structured courses, engaging learning resources and verifiable
            certificates.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Learn</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link href="/courses" className="hover:text-indigo-600">Course catalog</Link></li>
            <li><Link href="/courses/software-engineering" className="hover:text-indigo-600">Software Engineering</Link></li>
            <li><Link href="/dashboard" className="hover:text-indigo-600">My dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Certificates</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link href="/verify" className="hover:text-indigo-600">Verify a certificate</Link></li>
            <li><Link href="/certificates" className="hover:text-indigo-600">My certificates</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Account</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link href="/register" className="hover:text-indigo-600">Create account</Link></li>
            <li><Link href="/login" className="hover:text-indigo-600">Login</Link></li>
            <li><Link href="/forgot-password" className="hover:text-indigo-600">Forgot password</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Knowledgeverse. All rights reserved.
      </div>
    </footer>
  );
}
