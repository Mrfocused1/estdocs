"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPortfolioRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main admin page with portfolio tab
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-dark-navy flex items-center justify-center">
      <div className="text-white font-display italic uppercase">
        Redirecting to Admin Dashboard...
      </div>
    </div>
  );
}
