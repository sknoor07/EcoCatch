"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";

export function LayoutWrapper({ children, solutions }: { children: React.ReactNode, solutions: any[] }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/admin-login");

  return (
    <>
      {!isAdmin && <Navbar solutions={solutions} />}
      <main className="min-h-screen">{children}</main>
    </>
  );
}