'use client'
import { useState } from "react";
import { AdminHeader } from "./_components/admin-header";
import { AdminSidebar } from "./_components/admin-sidebar";
import { Toaster } from "@/components/ui/sonner";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#F5F5F5] dark:bg-[#050505]">
      <Toaster position="top-right" />
      <AdminSidebar />
      {/* Mobile Sidebar Overlay Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white dark:bg-[#0A0A0A] transition-transform duration-300 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <AdminSidebar />
      </div>
      <div className="flex flex-1 flex-col lg:ml-64">
        <AdminHeader mobileOpen={mobileOpen}
          onToggle={() => setMobileOpen((prev) => !prev)} />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}