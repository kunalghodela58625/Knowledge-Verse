"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Redirects already-authenticated users away from login/register/recovery
// pages — a logged-in user should never see login or registration UI.
export function useRedirectIfLoggedIn(target = "/dashboard") {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive) return;
        if (d?.user) router.replace(target);
        else setChecking(false);
      })
      .catch(() => {
        if (alive) setChecking(false);
      });
    return () => {
      alive = false;
    };
  }, [router, target]);

  return checking;
}
