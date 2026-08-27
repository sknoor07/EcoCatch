"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import api from "@/db/api-client";
import { useRouter } from "next/navigation";
import { links } from "./admin-sidebar";

interface AdminHeaderProps {
  mobileOpen: boolean;
  onToggle: () => void;
}

export function AdminHeader({ mobileOpen, onToggle }: AdminHeaderProps) {
  const [user, setUser] = useState<{ name: string | null; email: string; avatar: string | null } | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get("/admin/me").then((res) => setUser(res.data.user));
    fetchUnread();

    const handleNotificationsUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<{ delta?: number }>;
      const delta = customEvent.detail?.delta;
      if (typeof delta === "number") {
        setUnreadCount((count) => Math.max(0, count + delta));
      } else {
        fetchUnread();
      }
    };

    window.addEventListener("notifications-updated", handleNotificationsUpdated);
    const interval = setInterval(fetchUnread, 30000);

    // FIX: handleClickOutside is defined properly inside useEffect scope
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery("");
      }
    };

    // FIX: Event listener is registered globally inside useEffect
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(interval);
      window.removeEventListener("notifications-updated", handleNotificationsUpdated);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUnread = () => {
    api.get("/admin/notifications").then((res) => {
      setUnreadCount(res.data.unreadCount);
    }).catch(() => { });
  };

  const filteredLinks = searchQuery.trim() === ""
    ? []
    : links.filter(link => link.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md px-6">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full lg:hidden"
        onClick={onToggle}
      >
        {mobileOpen ? (
          <X className="h-5 w-5 text-[#86868b]" />
        ) : (
          <Menu className="h-5 w-5 text-[#86868b]" />
        )}
      </Button>

      <div ref={searchRef} className="flex-1 relative">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full rounded-full border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#111] pl-10 pr-4 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Search Results Dropdown */}
          {searchQuery.trim() !== "" && (
            <div className="absolute left-0 top-12 w-full max-w-md rounded-2xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#111] shadow-lg overflow-hidden z-50">
              {filteredLinks.length > 0 ? (
                <div className="p-1">
                  {filteredLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Button
                        key={link.href}
                        onClick={() => {
                          router.push(link.href);
                          setSearchQuery("");
                        }}
                        className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] hover:bg-[#FAF9F6] dark:hover:bg-[#1A1A1A]/40 transition-colors text-left"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F4E8] dark:bg-[#1a3d2a] text-[#2D5A3D] dark:text-[#4ADE80]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span>{link.label}</span>
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-3 text-sm text-[#86868b] text-center">
                  No matching pages found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/admin/contacts">
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
            <Bell className="h-5 w-5 text-[#86868b]" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        </Link>
        <Link href="/admin/settings">
          <div className="flex items-center gap-2 rounded-full border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#111] px-3 py-1.5 transition-colors hover:border-[#2D5A3D]/30 dark:hover:border-[#4ADE80]/30 cursor-pointer">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2D5A3D] dark:bg-[#4ADE80] text-[10px] font-bold text-white dark:text-[#0A0A0A]">
                {user?.name?.[0] || user?.email?.[0] || "A"}
              </div>
            )}
            <span className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              {user?.name || user?.email || "Admin"}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}