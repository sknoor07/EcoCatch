"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/db/api-client";
import { formatDistanceToNow } from "date-fns";
import {
    Mail,
    MailOpen,
    Star,
    Reply,
    Loader2,
    User,
    Calendar,
    Phone,
    Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Contact, ContactReply } from "@/types/admin";

interface ContactDetailDialogProps {
    contact: Contact | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate?: (id: number, updates: Partial<Contact>) => void;
}

export function ContactDetailDialog({
    contact,
    open,
    onOpenChange,
    onUpdate,
}: ContactDetailDialogProps) {
    const [replyText, setReplyText] = useState("");
    const [replyLoading, setReplyLoading] = useState(false);
    const [replies, setReplies] = useState<ContactReply[]>([]);
    const [detailLoading, setDetailLoading] = useState(false);

    const onUpdateRef = useRef(onUpdate);
    onUpdateRef.current = onUpdate;

    useEffect(() => {
        if (!contact) {
            setReplies([]);
            setReplyText("");
            return;
        }

        if (!contact.isRead && onUpdateRef.current) {
            onUpdateRef.current(contact.id, { isRead: true });
        }

        setReplyText("");
        setDetailLoading(true);

        api
            .get(`/admin/contacts/${contact.id}`)
            .then((res) => {
                setReplies(res.data.data.replies || []);
            })
            .catch(() => {
                toast.error("Failed to load conversation history");
            })
            .finally(() => {
                setDetailLoading(false);
            });
    }, [contact?.id]);

    const handleReply = async () => {
        if (!contact || !replyText.trim()) return;

        setReplyLoading(true);
        try {
            await api.post(`/admin/contacts/${contact.id}/reply`, {
                to: contact.email,
                subject: "Re: Your inquiry to EcoCatch",
                message: replyText,
            });

            toast.success("Reply sent successfully");
            setReplyText("");

            const res = await api.get(`/admin/contacts/${contact.id}`);
            setReplies(res.data.data.replies || []);
        } catch {
            toast.error("Failed to send reply");
        } finally {
            setReplyLoading(false);
        }
    };

    const handleToggleRead = () => {
        if (!contact || !onUpdate) return;
        onUpdate(contact.id, { isRead: !contact.isRead });
    };

    const handleToggleImportant = () => {
        if (!contact || !onUpdate) return;
        onUpdate(contact.id, { isImportant: !contact.isImportant });
    };

    if (!contact) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-white dark:bg-[#0A0A0A] border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 p-0 overflow-hidden flex flex-col max-h-[85vh]">
                {/* Header — fixed at top */}
                <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
                    <DialogTitle className="text-left text-lg text-[#1A1A1A] dark:text-[#E5E5E5]">
                        Message Details
                    </DialogTitle>
                    <p className="text-sm text-[#86868b]">
                        From {contact.name} via contact form
                    </p>
                    {/* Sender Info */}
                    <div className="flex items-center gap-3 rounded-xl bg-[#F0F0F0] dark:bg-[#111] p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D5A3D] dark:bg-[#4ADE80]">
                            <User className="h-5 w-5 text-white dark:text-[#0A0A0A]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] truncate">
                                {contact.name}
                            </p>
                            <p className="text-xs text-[#86868b] truncate">{contact.email}</p>
                            {contact.phone && (
                                <p className="flex items-center gap-1 text-xs text-[#86868b]">
                                    <Phone className="h-3 w-3" />
                                    {contact.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2 text-xs text-[#86868b]">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDistanceToNow(new Date(contact.createdAt), {
                            addSuffix: true,
                        })}
                    </div>

                    {/* Products */}
                    {contact.selectedProducts.length > 0 && (
                        <div className="rounded-xl border border-[#2D5A3D]/15 bg-[#E8F4E8]/50 p-4 dark:border-[#4ADE80]/20 dark:bg-[#1a3d2a]/30">
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2D5A3D] dark:text-[#4ADE80]">
                                <Package className="h-4 w-4" />
                                Products of interest
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {contact.selectedProducts.map((product) => (
                                    <span
                                        key={product.id}
                                        className="rounded-full border border-[#2D5A3D]/15 bg-white/80 px-2.5 py-1 text-xs font-medium text-[#1A1A1A] dark:border-[#4ADE80]/20 dark:bg-[#0A0A0A]/70 dark:text-[#E5E5E5]"
                                    >
                                        {product.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                </DialogHeader>

                {/* Scrollable middle content */}
                <div className="px-6 space-y-4 overflow-y-auto flex-1 min-h-0 py-2">

                    {/* Original Message */}
                    <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#111] p-4">
                        <p className="text-sm leading-relaxed text-[#1A1A1A] dark:text-[#E5E5E5] whitespace-pre-wrap">
                            {contact.message}
                        </p>
                    </div>

                    {/* Replies */}
                    <div className="space-y-4 pb-2">
                        {detailLoading ? (
                            <div className="flex justify-center py-4">
                                <Loader2 className="h-4 w-4 animate-spin text-[#86868b]" />
                            </div>
                        ) : replies.length === 0 ? (
                            <div className="text-center py-2 text-xs text-[#86868b]">
                                No replies yet
                            </div>
                        ) : (
                            replies
                                .slice()
                                .reverse()
                                .map((reply) => (
                                    <div
                                        key={reply.id}
                                        className="rounded-xl border border-[#2D5A3D]/20 dark:border-[#4ADE80]/20 bg-[#E8F4E8]/50 dark:bg-[#1a3d2a]/30 p-4 ml-8"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-xs font-semibold text-[#2D5A3D] dark:text-[#4ADE80]">
                                                {reply.sentBy}
                                            </p>
                                            <p className="text-[10px] text-[#86868b]">
                                                {formatDistanceToNow(new Date(reply.createdAt), {
                                                    addSuffix: true,
                                                })}
                                            </p>
                                        </div>
                                        <p className="text-sm leading-relaxed text-[#1A1A1A] dark:text-[#E5E5E5] whitespace-pre-wrap">
                                            {reply.message}
                                        </p>
                                    </div>
                                ))
                        )}
                    </div>
                </div>

                {/* Footer — fixed at bottom */}
                <div className="shrink-0 px-6 py-4 border-t border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] space-y-3">
                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleToggleRead}
                            className="rounded-full border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 text-xs"
                        >
                            {contact.isRead ? (
                                <>
                                    <MailOpen className="mr-1 h-3.5 w-3.5" /> Mark Unread
                                </>
                            ) : (
                                <>
                                    <Mail className="mr-1 h-3.5 w-3.5" /> Mark Read
                                </>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleToggleImportant}
                            className="rounded-full border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 text-xs"
                        >
                            <Star
                                className={`mr-1 h-3.5 w-3.5 ${contact.isImportant
                                    ? "fill-amber-400 text-amber-400"
                                    : ""
                                    }`}
                            />
                            {contact.isImportant ? "Unpin" : "Pin"}
                        </Button>
                    </div>

                    {/* Reply Input */}
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        rows={3}
                        className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#111] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] resize-none"
                    />

                    <Button
                        onClick={handleReply}
                        disabled={replyLoading || !replyText.trim()}
                        className="w-full rounded-xl bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] dark:hover:bg-[#3ec46e] font-semibold disabled:opacity-60"
                    >
                        {replyLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Reply className="mr-2 h-4 w-4" />
                        )}
                        Send Reply
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}