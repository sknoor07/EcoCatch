"use client";

import { useEffect, useState } from "react";
import api from "@/db/api-client";
import { formatDistanceToNow } from "date-fns";
import {
  Mail,
  MailOpen,
  Star,
  Search,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { ContactDetailDialog } from "../../_components/contact-detail-dialog";
import type { Contact } from "@/types/admin";

export function ContactsClient() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "important">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/contacts?filter=${filter}`);
        setContacts(res.data.data);
      } catch {
        toast.error("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };
    void fetchContacts();
  }, [filter]);

  const notifyUnreadChange = (delta: number) => {
    window.dispatchEvent(
      new CustomEvent("notifications-updated", { detail: { delta } })
    );
  };

  const updateContact = async (id: number, updates: Partial<Contact>) => {
    const current = contacts.find((c) => c.id === id);
    try {
      await api.put(`/admin/contacts/${id}`, updates);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
      );
      if (selected?.id === id) {
        setSelected((s) => (s ? { ...s, ...updates } : s));
      }
      if (updates.isRead === false && current?.isRead === true)
        notifyUnreadChange(1);
      if (updates.isRead === true && current?.isRead === false)
        notifyUnreadChange(-1);
    } catch {
      toast.error("Update failed");
    }
  };

  const openDetail = (contact: Contact) => {
    setSelected(contact);
    setDetailOpen(true);
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase()) ||
      c.selectedProducts.some((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
  );

  const tabs = [
    {
      key: "all" as const,
      label: "All",
      count: contacts.length,
    },
    {
      key: "unread" as const,
      label: "Unread",
      count: contacts.filter((c) => !c.isRead).length,
    },
    {
      key: "important" as const,
      label: "Important",
      count: contacts.filter((c) => c.isImportant).length,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filters & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-xl bg-[#F0F0F0] dark:bg-[#111] p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all ${filter === t.key
                  ? "bg-white dark:bg-[#0A0A0A] text-[#1A1A1A] dark:text-[#E5E5E5] shadow-sm"
                  : "text-[#86868b] hover:text-[#1A1A1A] dark:hover:text-[#E5E5E5]"
                }`}
            >
              {t.label}
              <span className="ml-1.5 rounded-full bg-[#1A1A1A]/5 dark:bg-[#E5E5E5]/10 px-1.5 py-0.5 text-[10px]">
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="h-10 w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#0A0A0A] pl-10 pr-4 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] overflow-hidden">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#86868b]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-[#86868b]">
            <MailOpen className="h-10 w-10 mb-3 opacity-40" />
            <p>No contacts found.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1A1A1A]/5 dark:divide-[#E5E5E5]/5">
            {filtered.map((contact) => (
              <div
                key={contact.id}
                onClick={() => openDetail(contact)}
                className={`group flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors hover:bg-[#F0F0F0] dark:hover:bg-[#111] ${!contact.isRead
                    ? "bg-[#E8F4E8]/30 dark:bg-[#1a3d2a]/20"
                    : ""
                  }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateContact(contact.id, {
                      isImportant: !contact.isImportant,
                    });
                  }}
                  className="shrink-0"
                >
                  <Star
                    className={`h-5 w-5 transition-colors ${contact.isImportant
                        ? "fill-amber-400 text-amber-400"
                        : "text-[#86868b] opacity-0 group-hover:opacity-100"
                      }`}
                  />
                </button>
                <div className="shrink-0">
                  {!contact.isRead ? (
                    <Mail className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
                  ) : (
                    <MailOpen className="h-5 w-5 text-[#86868b]" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${!contact.isRead
                          ? "text-[#1A1A1A] dark:text-[#E5E5E5]"
                          : "text-[#86868b]"
                        }`}
                    >
                      {contact.name}
                    </span>
                    <span className="text-xs text-[#86868b]">
                      &lt;{contact.email}&gt;
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                    {contact.selectedProducts.map((product) => (
                      <span
                        key={product.id}
                        className="max-w-40 truncate rounded-full bg-[#E8F4E8] px-2 py-0.5 text-[10px] font-medium text-[#2D5A3D] dark:bg-[#1a3d2a] dark:text-[#4ADE80]"
                      >
                        {product.name}
                      </span>
                    ))}
                    <p className="min-w-0 flex-1 truncate text-sm text-[#86868b]">
                      {contact.message}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 text-xs text-[#86868b] sm:block">
                  {formatDistanceToNow(new Date(contact.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reusable Dialog */}
      <ContactDetailDialog
        contact={selected}
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open);
          if (!open) setSelected(null);
        }}
        onUpdate={updateContact}
      />
    </div>
  );
}