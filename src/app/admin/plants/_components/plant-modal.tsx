"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/db/api-client";
import { Plant } from "@/types/admin";

interface PlantFormData {
  name: string;
  owner: string;
  location: string;
  capacityKw: string;
  status: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  plant: Plant | null;
}

export function PlantModal({ open, onClose, onSave, plant }: Props) {
  const [form, setForm] = useState<PlantFormData>({
    name: "",
    owner: "",
    location: "",
    capacityKw: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (plant) {
      setForm({
        name: plant.name,
        owner: plant.owner,
        location: plant.location || "",
        capacityKw: plant.capacityKw?.toString() || "",
        status: plant.status || "active",
      });
    } else {
      setForm({ name: "", owner: "", location: "", capacityKw: "", status: "active" });
    }
  }, [plant, open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (plant?.id) {
        await api.put(`/admin/plants/${plant.id}`, form);
      } else {
        await api.post("/admin/plants", form);
      }
      onSave();
    } catch {
      // handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#111] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
            {plant ? "Edit Plant" : "Add New Plant"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#86868b] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              Plant Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
              placeholder="e.g. Vasai Biogas Plant 1"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              Owner
            </label>
            <input
              required
              value={form.owner}
              onChange={(e) => setForm({ ...form, owner: e.target.value })}
              className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
              placeholder="e.g. GreenField Farms Pvt. Ltd."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              Location
            </label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
              placeholder="e.g. Vasai, Maharashtra"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                Capacity (kW)
              </label>
              <input
                type="number"
                value={form.capacityKw}
                onChange={(e) => setForm({ ...form, capacityKw: e.target.value })}
                className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
                placeholder="500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] dark:hover:bg-[#3ec46e] font-semibold disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : plant ? (
                "Save Changes"
              ) : (
                "Add Plant"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}