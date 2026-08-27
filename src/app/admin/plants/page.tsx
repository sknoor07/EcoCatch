"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter, Loader2, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/db/api-client";
import { PlantModal } from "./_components/plant-modal";
import { DeleteDialog } from "./_components/delete-dialog";


export interface Plant {
  id: number;
  name: string;
  owner: string;
  location: string | null;
  capacityKw: number | null;
  status: string;
  createdAt: string;
}

export default function PlantsPage() {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchPlants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/plants", {
        params: { search, status: statusFilter, page },
      });
      setPlants(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  const handleSave = () => {
    setModalOpen(false);
    setEditingPlant(null);
    fetchPlants();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/admin/plants/${deleteId}`);
      setDeleteId(null);
      fetchPlants();
    } catch {
      // handled
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E5E5E5]">Plants</h1>
          <p className="text-sm text-[#86868b]">Manage all biogas plants and installations</p>
        </div>
        <Button
          onClick={() => {
            setEditingPlant(null);
            setModalOpen(true);
          }}
          className="rounded-full bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] dark:hover:bg-[#3ec46e] font-semibold"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Plant
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            placeholder="Search by name, owner, or location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#111] pl-10 pr-4 py-2.5 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#86868b]" />
          {["all", "active", "inactive"].map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-[#2D5A3D] text-white dark:bg-[#4ADE80] dark:text-[#0A0A0A]"
                  : "bg-white dark:bg-[#111] text-[#86868b] border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 hover:text-[#1A1A1A] dark:hover:text-[#E5E5E5]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Plant Name</th>
                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Owner</th>
                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Location</th>
                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Capacity</th>
                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Status</th>
                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Added</th>
                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-[#86868b]">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : plants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-[#86868b]">
                    No plants found. Add your first plant to get started.
                  </td>
                </tr>
              ) : (
                plants.map((plant) => (
                  <tr
                    key={plant.id}
                    className="border-b border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 last:border-0 hover:bg-[#FAF9F6] dark:hover:bg-[#0A0A0A]/50 transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                      {plant.name}
                    </td>
                    <td className="px-5 py-3 text-[#86868b]">{plant.owner}</td>
                    <td className="px-5 py-3 text-[#86868b]">{plant.location || "—"}</td>
                    <td className="px-5 py-3 text-[#86868b]">
                      {plant.capacityKw ? `${plant.capacityKw} kW` : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          plant.status === "active"
                            ? "bg-[#E8F4E8] dark:bg-[#1a3d2a] text-[#2D5A3D] dark:text-[#4ADE80]"
                            : "bg-[#F0F0F0] dark:bg-[#1a1a1a] text-[#86868b]"
                        }`}
                      >
                        {plant.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#86868b]">
                      {new Date(plant.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => router.push(`/admin/plants/${plant.id}`)}
                          className="rounded-lg p-1.5 text-[#86868b] hover:bg-[#E8F4E8] dark:hover:bg-[#1a3d2a] hover:text-[#2D5A3D] dark:hover:text-[#4ADE80] transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingPlant(plant);
                            setModalOpen(true);
                          }}
                          className="rounded-lg p-1.5 text-[#86868b] hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(plant.id)}
                          className="rounded-lg p-1.5 text-[#86868b] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 px-5 py-3">
            <p className="text-xs text-[#86868b]">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg text-xs"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <PlantModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingPlant(null);
        }}
        onSave={handleSave}
        plant={editingPlant}
      />

      <DeleteDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}