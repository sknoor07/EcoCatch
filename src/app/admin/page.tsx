"use client";

import { useEffect, useState } from "react";
import { Factory, Mail, Users, TrendingUp } from "lucide-react";
import api from "@/db/api-client";


interface Stats {
  totalContacts: number;
  totalPlants: number;
  activePlants: number;
  recentContacts: any[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    totalPlants: 0,
    activePlants: 0,
    recentContacts: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsRes = await api.get("/admin/contacts");
        const contacts = contactsRes.data.data || [];
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

  //totalplants
  useEffect(()=>{
    const fetctPlants= async ()=>{
      try {
        const plantsRes = await api.get("/admin/plants");
        const plants = plantsRes.data.data || [];
        console.log(plants)
        setStats((s) => ({
          ...s,
          totalPlants: plants.length,
          activePlants: plants.filter((p: any) => p.status==="active").length,
        }));
      } catch {
        console.log("Failed to load plants");
      }
    };
    fetctPlants();
  }, []);

  const cards = [
    { label: "Total Contacts", value: stats.totalContacts, icon: Mail, color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
    { label: "Total Plants", value: stats.totalPlants, icon: Factory, color: "bg-[#E8F4E8] dark:bg-[#1a3d2a] text-[#2D5A3D] dark:text-[#4ADE80]" },
    { label: "Active Plants", value: stats.activePlants, icon: TrendingUp, color: "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" },
    { label: "Team Members", value: 1, icon: Users, color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E5E5E5]">Dashboard</h1>
        <p className="text-sm text-[#86868b]">Overview of your EcoCatch operations</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-5"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.color}">
              <card.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E5E5E5]">{card.value}</p>
            <p className="text-xs text-[#86868b]">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Recent Queries</h2>
        {stats.recentContacts.length === 0 ? (
          <p className="text-sm text-[#86868b]">No contact submissions yet.</p>
        ) : (
          <div className="space-y-3">
            {stats.recentContacts.map((c: any) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">{c.name}</p>
                  <p className="text-xs text-[#86868b]">{c.email} — {c.phone || "No phone"}</p>
                </div>
                <span className="text-xs text-[#86868b]">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}