"use client";

import { useEffect, useState } from "react";
import { Factory, Mail, Users, TrendingUp, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import api from "@/db/api-client";

import type { Contact } from "@/types/admin";
import { ContactDetailDialog } from "../_components/contact-detail-dialog";

interface Stats {
  totalContacts: number;
  totalPlants: number;
  activePlants: number;
  recentContacts: Contact[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    totalPlants: 0,
    activePlants: 0,
    recentContacts: [],
  });
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsRes = await api.get("/admin/contacts");
        const contacts: Contact[] = contactsRes.data.data || [];
        setStats((s) => ({
          ...s,
          totalContacts: contacts.length,
          recentContacts: contacts.slice(0, 5),
        }));
      } catch {
        // static fallback
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantsRes = await api.get("/admin/plants");
        const plants = plantsRes.data.data || [];
        setStats((s) => ({
          ...s,
          totalPlants: plants.length,
          activePlants: plants.filter((p: any) => p.status === "active").length,
        }));
      } catch {
        console.log("Failed to load plants");
      }
    };
    fetchPlants();
  }, []);

  const notifyUnreadChange = (delta: number) => {
    window.dispatchEvent(
      new CustomEvent("notifications-updated", { detail: { delta } })
    );
  };

  const updateContact = async (id: number, updates: Partial<Contact>) => {
    const current = stats.recentContacts.find((c) => c.id === id);
    try {
      await api.put(`/admin/contacts/${id}`, updates);
      setStats((prev) => ({
        ...prev,
        recentContacts: prev.recentContacts.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        ),
      }));
      // FIX: Also update selectedContact so the dialog UI reflects the change
      setSelectedContact((prev) =>
        prev?.id === id ? { ...prev, ...updates } : prev
      );
      if (updates.isRead === false && current?.isRead === true)
        notifyUnreadChange(1);
      if (updates.isRead === true && current?.isRead === false)
        notifyUnreadChange(-1);
    } catch {
      // silently fail on dashboard
    }
  };

  const openContact = (contact: Contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
  };

  const cards = [
    {
      label: "Total Contacts",
      value: stats.totalContacts,
      icon: Mail,
      color:
        "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Total Plants",
      value: stats.totalPlants,
      icon: Factory,
      color:
        "bg-[#E8F4E8] dark:bg-[#1a3d2a] text-[#2D5A3D] dark:text-[#4ADE80]",
    },
    {
      label: "Active Plants",
      value: stats.activePlants,
      icon: TrendingUp,
      color:
        "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    },
    {
      label: "Team Members",
      value: 1,
      icon: Users,
      color:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E5E5E5]">
          Dashboard
        </h1>
        <p className="text-sm text-[#86868b]">
          Overview of your EcoCatch operations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-5"
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}
            >
              <card.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E5E5E5]">
              {card.value}
            </p>
            <p className="text-xs text-[#86868b]">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Queries */}
      <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
          Recent Queries
        </h2>
        {stats.recentContacts.length === 0 ? (
          <p className="text-sm text-[#86868b]">No contact submissions yet.</p>
        ) : (
          <div className="space-y-3">
            {stats.recentContacts.map((c) => (
              <div
                key={c.id}
                onClick={() => openContact(c)}
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors hover:bg-[#F0F0F0] dark:hover:bg-[#1A1A1A]/40 ${!c.isRead
                  ? "border-[#2D5A3D]/20 bg-[#E8F4E8]/30 dark:border-[#4ADE80]/20 dark:bg-[#1a3d2a]/20"
                  : "border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5"
                  }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-medium ${!c.isRead
                        ? "text-[#1A1A1A] dark:text-[#E5E5E5]"
                        : "text-[#86868b]"
                        }`}
                    >
                      {c.name}
                    </p>
                    {!c.isRead && (
                      <span className="h-2 w-2 rounded-full bg-[#2D5A3D] dark:bg-[#4ADE80]" />
                    )}
                    {c.isImportant && (
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    )}
                  </div>
                  <p className="text-xs text-[#86868b] truncate">
                    {c.email} — {c.phone || "No phone"}
                  </p>
                  {c.selectedProducts.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {c.selectedProducts.map((p) => (
                        <span
                          key={p.id}
                          className="rounded-full bg-[#E8F4E8] px-2 py-0.5 text-[10px] font-medium text-[#2D5A3D] dark:bg-[#1a3d2a] dark:text-[#4ADE80]"
                        >
                          {p.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="shrink-0 text-xs text-[#86868b] ml-4">
                  {formatDistanceToNow(new Date(c.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reusable Dialog */}
      <ContactDetailDialog
        contact={selectedContact}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelectedContact(null);
        }}
        onUpdate={updateContact}
      />
    </div>
  );
}