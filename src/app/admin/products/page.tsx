"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Loader2, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/db/api-client";
import { Product } from "@/types/admin";

import { DeleteDialog } from "../plants/_components/delete-dialog"; // Reusing the plant delete dialog
import { toast } from "sonner";
import { ProductModal } from "./_components/product-modal";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/admin/products", { params: { search } });
            setProducts(res.data.data);
        } catch {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleToggleActive = async (product: Product) => {
        try {
            await api.put(`/admin/products/${product.id}`, { isActive: !product.isActive });
            toast.success(`${product.name} ${!product.isActive ? "enabled" : "disabled"}`);
            fetchProducts();
        } catch {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/admin/products/${deleteId}`);
            toast.success("Product deleted");
            setDeleteId(null);
            fetchProducts();
        } catch {
            toast.error("Failed to delete product");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E5E5E5]">Products & Equipment</h1>
                    <p className="text-sm text-[#86868b]">Manage solutions and equipment shown on the website</p>
                </div>
                <Button
                    onClick={() => {
                        setEditingProduct(null);
                        setModalOpen(true);
                    }}
                    className="rounded-full bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] font-semibold"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#111] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#2D5A3D]"
                />
            </div>

            <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
                                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Name</th>
                                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Type</th>
                                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Category</th>
                                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] text-center">Status</th>
                                <th className="px-5 py-3 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-12 text-center text-[#86868b]">
                                        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-12 text-center text-[#86868b]">No products found.</td>
                                </tr>
                            ) : (
                                products.map((p) => (
                                    <tr key={p.id} className="border-b border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 hover:bg-[#FAF9F6] dark:hover:bg-[#0A0A0A]/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">{p.name}</p>
                                            <p className="text-xs text-[#86868b]">/{p.slug}</p>
                                        </td>
                                        <td className="px-5 py-4 capitalize text-[#86868b]">{p.productType}</td>
                                        <td className="px-5 py-4 capitalize text-[#86868b]">{p.category}</td>
                                        <td className="px-5 py-4 text-center">
                                            <button
                                                onClick={() => handleToggleActive(p)}
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${p.isActive
                                                    ? "bg-[#E8F4E8] text-[#2D5A3D] dark:bg-[#1a3d2a] dark:text-[#4ADE80]"
                                                    : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                                                    }`}
                                            >
                                                {p.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                                                {p.isActive ? "Active" : "Hidden"}
                                            </button>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => { setEditingProduct(p); setModalOpen(true); }}
                                                    className="rounded-lg p-1.5 text-[#86868b] hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(p.id)}
                                                    className="rounded-lg p-1.5 text-[#86868b] hover:bg-red-50 hover:text-red-600 transition-colors"
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
            </div>

            <ProductModal
                open={modalOpen}
                onClose={() => { setModalOpen(false); setEditingProduct(null); }}
                onSave={() => { setModalOpen(false); fetchProducts(); }}
                product={editingProduct}
            />
            <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
        </div>
    );
}