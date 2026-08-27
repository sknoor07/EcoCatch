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
  Send,
  X,
  Reply,
  User,
  Calendar,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean | null;
  isImportant: boolean | null;
  createdAt: string;
};

export function ContactsClient() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "important">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [replies, setReplies] = useState<any[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);


  useEffect(() => {
    fetchContacts();
  }, [filter]);

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
      if (selected?.id === id) setSelected((s) => (s ? { ...s, ...updates } : s));

      if (updates.isRead === false && current?.isRead === true) notifyUnreadChange(1);
      if (updates.isRead === true && current?.isRead === false) notifyUnreadChange(-1);
    } catch {
      toast.error("Update failed");
    }
  };

  const openDetail = async (contact: Contact) => {
    setSelected(contact);
    setDetailOpen(true);
    setReplyText("");
    setDetailLoading(true);
    if (!contact.isRead) updateContact(contact.id, { isRead: true });

    try {
      const res = await api.get(`/admin/contacts/${contact.id}`);
      setReplies(res.data.data.replies || []);
    } catch {
      toast.error("Failed to load conversation history");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleReply = async () => {
    if (!selected || !replyText.trim()) return;
    setReplyLoading(true);
    try {
      await api.post(`/admin/contacts/${selected.id}/reply`, {
        to: selected.email,
        subject: `Re: Your inquiry to EcoCatch`,
        message: replyText,
      });
      toast.success("Reply sent successfully");
      setReplyText("");
      //refresh with new reply
      const res = await api.get(`/admin/contacts/${selected.id}`);
      setReplies(res.data.data.replies || []);
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setReplyLoading(false);
    }
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { key: "all" as const, label: "All", count: contacts.length },
    { key: "unread" as const, label: "Unread", count: contacts.filter((c) => !c.isRead).length },
    { key: "important" as const, label: "Important", count: contacts.filter((c) => c.isImportant).length },
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
                className={`group flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors hover:bg-[#F0F0F0] dark:hover:bg-[#111] ${!contact.isRead ? "bg-[#E8F4E8]/30 dark:bg-[#1a3d2a]/20" : ""
                  }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateContact(contact.id, { isImportant: !contact.isImportant });
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
                  <p className="truncate text-sm text-[#86868b]">
                    {contact.message}
                  </p>
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

      {/* Detail Dialog with Card */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-[#0A0A0A] border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 p-0 overflow-hidden">
          {selected && (
            <div className="space-y-0">
              <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="text-left text-lg text-[#1A1A1A] dark:text-[#E5E5E5]">
                  Message Details
                </DialogTitle>
                <p className="text-sm text-[#86868b]">
                  From {selected.name} via contact form
                </p>
              </DialogHeader>

              <div className="px-6 space-y-4 pb-6">
                {/* Sender Info */}
                <div className="flex items-center gap-3 rounded-xl bg-[#F0F0F0] dark:bg-[#111] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D5A3D] dark:bg-[#4ADE80]">
                    <User className="h-5 w-5 text-white dark:text-[#0A0A0A]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] truncate">
                      {selected.name}
                    </p>
                    <p className="text-xs text-[#86868b] truncate">{selected.email}</p>
                    {selected.phone && (
                      <p className="flex items-center gap-1 text-xs text-[#86868b]">
                        <Phone className="h-3 w-3" />
                        {selected.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-[#86868b]">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDistanceToNow(new Date(selected.createdAt), {
                    addSuffix: true,
                  })}
                </div>

                {/* Message */}
                <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#111] p-4">
                  <p className="text-sm leading-relaxed text-[#1A1A1A] dark:text-[#E5E5E5] whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
                <div className="space-y-4">
                  {detailLoading ? (
                    <div className="flex justify-center py-4"><Loader2 className="h-4 w-4 animate-spin text-[#86868b]" /></div>
                  ) : (
                    replies.slice().reverse().map(reply => (
                      <div key={reply.id} className="rounded-xl border border-[#2D5A3D]/20 dark:border-[#4ADE80]/20 bg-[#E8F4E8]/50 dark:bg-[#1a3d2a]/30 p-4 ml-8">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-xs font-semibold text-[#2D5A3D] dark:text-[#4ADE80]">{reply.sentBy}</p>
                          <p className="text-[10px] text-[#86868b]">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <p className="text-sm leading-relaxed text-[#1A1A1A] dark:text-[#E5E5E5] whitespace-pre-wrap">
                          {reply.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateContact(selected.id, { isRead: !selected.isRead })
                    }
                    className="rounded-full border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 text-xs"
                  >
                    {selected.isRead ? "Mark Unread" : "Mark Read"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateContact(selected.id, {
                        isImportant: !selected.isImportant,
                      })
                    }
                    className="rounded-full border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 text-xs"
                  >
                    <Star
                      className={`mr-1 h-3.5 w-3.5 ${selected.isImportant ? "fill-amber-400 text-amber-400" : ""
                        }`}
                    />
                    {selected.isImportant ? "Unpin" : "Pin"}
                  </Button>
                </div>

                {/* Reply */}
                <div className="space-y-3 pt-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={4}
                    className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#111] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleReply}
                    disabled={replyLoading || !replyText.trim()}
                    className="flex-1 rounded-xl bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] dark:hover:bg-[#3ec46e] font-semibold disabled:opacity-60"
                  >
                    {replyLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Reply className="mr-2 h-4 w-4" />
                    )}
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}