"use client";

import { useEffect, useState } from "react";
import { Cog, Activity, Droplets, Wind, Gauge, Loader2, type LucideIcon } from "lucide-react";
import api from "@/db/api-client";

const iconMap: Record<string, LucideIcon> = {
  agitation: Cog,
  pumping: Droplets,
  storage: Wind,
  sensor: Gauge,
};

interface Machine {
  id: number;
  name: string;
  type: string | null;
}

export function MachineList({ plantId }: { plantId: string }) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await api.get(`/admin/plants/${plantId}/machines`);
        setMachines(res.data.data);
      } catch {
        // handled
      } finally {
        setLoading(false);
      }
    };
    fetchMachines();
  }, [plantId]);

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-[#86868b]" />
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {machines.map((machine) => {
        const Icon = iconMap[machine.type || ""] || Activity;
        return (
          <div
            key={machine.id}
            className="group flex items-center gap-4 rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] p-4 transition-all hover:border-[#2D5A3D]/20 dark:hover:border-[#4ADE80]/20"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F4E8] dark:bg-[#1a3d2a]">
              <Icon className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                {machine.name}
              </p>
              <p className="text-xs text-[#86868b] capitalize">
                {machine.type || "Equipment"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}