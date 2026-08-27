"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, LayoutDashboard, Factory, Mail, Settings, LogOut, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/db/api-client";
import { Button } from "@/components/ui/button";


export const links = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Plants", href: "/admin/plants", icon: Factory },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await api.post("/admin/logout");
    localStorage.removeItem("admin_token");
    window.location.href = "/admin-login";
  };

  return (
    <aside className="fixed left-0 top-0 z-40  h-screen w-64 flex-col border-r border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2D5A3D] dark:bg-[#4ADE80]">
          <Leaf className="h-4 w-4 text-white dark:text-[#0A0A0A]" />
        </div>
        <span className="font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">EcoCatch</span>
        <span className="ml-auto rounded bg-[#E8F4E8] dark:bg-[#1a3d2a] px-1.5 py-0.5 text-[10px] font-bold text-[#2D5A3D] dark:text-[#4ADE80]">
          ADMIN
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const active = link.href === "/admin"
            ? pathname === "/admin"
            : pathname === link.href || pathname?.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#E8F4E8] dark:bg-[#1a3d2a] text-[#2D5A3D] dark:text-[#4ADE80]"
                  : "text-[#86868b] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5 hover:text-[#1A1A1A] dark:hover:text-[#E5E5E5]"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 p-4">
        <Button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}