"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Factory, MapPin, User, Zap, Calendar, Activity, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SensorCharts } from "./_components/sensor-charts";
import { MachineList } from "./_components/machine-list";
import { Plant } from "@/types/admin";
import api from "@/db/api-client";

export default function PlantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await api.get(`/admin/plants/${params.id}`);
        setPlant(res.data.data);
      } catch {
        router.push("/admin/plants");
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2D5A3D] border-t-transparent dark:border-[#4ADE80]" />
      </div>
    );
  }

  if (!plant) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin/plants")}
          className="rounded-lg text-[#86868b] hover:text-[#1A1A1A] dark:hover:text-[#E5E5E5]"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Plant Info Card */}
      <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F4E8] dark:bg-[#1a3d2a]">
                <Factory className="h-6 w-6 text-[#2D5A3D] dark:text-[#4ADE80]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E5E5E5]">
                  {plant.name}
                </h1>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    plant.status === "active"
                      ? "bg-[#E8F4E8] dark:bg-[#1a3d2a] text-[#2D5A3D] dark:text-[#4ADE80]"
                      : "bg-[#F0F0F0] dark:bg-[#1a1a1a] text-[#86868b]"
                  }`}
                >
                  {plant.status}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#86868b]">Plant ID</p>
            <p className="font-mono text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              #{plant.id.toString().padStart(4, "0")}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-[#86868b]">
              <User className="h-3.5 w-3.5" />
              Owner
            </div>
            <p className="font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">{plant.owner}</p>
          </div>
          <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-[#86868b]">
              <MapPin className="h-3.5 w-3.5" />
              Location
            </div>
            <p className="font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              {plant.location || "Not specified"}
            </p>
          </div>
          <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-[#86868b]">
              <Zap className="h-3.5 w-3.5" />
              Capacity
            </div>
            <p className="font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              {plant.capacityKw ? `${plant.capacityKw} kW` : "Not specified"}
            </p>
          </div>
          <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-[#86868b]">
              <Calendar className="h-3.5 w-3.5" />
              Added On
            </div>
            <p className="font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              {plant.createdAt
                ? new Date(plant.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Machines */}
      <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
          <h2 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
            Machines & Equipment
          </h2>
        </div>
        <MachineList plantId={params.id as string} />
      </div>

      {/* Sensor Data */}
      <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
          <h2 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
            Sensor Data
          </h2>
        </div>
        <SensorCharts plantId={params.id as string} />
      </div>
    </div>
  );
}