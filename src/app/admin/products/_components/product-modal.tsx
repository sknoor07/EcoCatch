"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/db/api-client";
import { Product } from "@/types/admin";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    product: Product | null;
}

export function ProductModal({ open, onClose, onSave, product }: Props) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<Partial<Product>>({
        name: "", slug: "", shortName: "", tagline: "", description: "", longDescription: "",
        productType: "solution", category: "agitation", brand: "", brandOrigin: "",
        features: [""], applications: [""], specs: []
    });

    useEffect(() => {
        if (product) {
            setForm(product);
        } else {
            setForm({
                name: "", slug: "", shortName: "", tagline: "", description: "", longDescription: "",
                productType: "solution", category: "agitation", brand: "", brandOrigin: "",
                features: [""], applications: [""], specs: []
            });
        }
    }, [product, open]);

    if (!open) return null;

    const handleArrayChange = (field: "features" | "applications", index: number, val: string) => {
        const arr = [...(form[field] || [])];
        arr[index] = val;
        setForm({ ...form, [field]: arr });
    };

    const addArrayItem = (field: "features" | "applications") => {
        setForm({ ...form, [field]: [...(form[field] || []), ""] });
    };

    const removeArrayItem = (field: "features" | "applications", index: number) => {
        const arr = [...(form[field] || [])];
        arr.splice(index, 1);
        setForm({ ...form, [field]: arr });
    };

    const handleSpecChange = (index: number, key: "label" | "value", val: string) => {
        const arr = [...(form.specs || [])];
        arr[index] = { ...arr[index], [key]: val };
        setForm({ ...form, specs: arr });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Clean up empty array items before sending
        const payload = {
            ...form,
            features: form.features?.filter(f => f.trim() !== ""),
            applications: form.applications?.filter(a => a.trim() !== ""),
            specs: form.specs?.filter(s => s.label.trim() !== "" && s.value.trim() !== ""),
        };

        try {
            if (product?.id) {
                await api.put(`/admin/products/${product.id}`, payload);
                toast.success("Product updated");
            } else {
                await api.post("/admin/products", payload);
                toast.success("Product created");
            }
            onSave();
        } catch (err: any) {
            toast.error(err.response?.data?.error || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#111] p-6 shadow-2xl custom-scrollbar">
                <div className="mb-5 flex items-center justify-between sticky top-0 bg-white dark:bg-[#111] pb-2 z-10 border-b border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10">
                    <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                        {product ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button onClick={onClose} className="rounded-lg p-1 text-[#86868b] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basics */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Name *</label>
                            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">URL Slug *</label>
                            <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm" placeholder="e.g. bio-separator" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Short Name * (Used in Menus)</label>
                            <input required value={form.shortName} onChange={(e) => setForm({ ...form, shortName: e.target.value })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Tagline *</label>
                            <input required value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm" />
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="grid gap-4 sm:grid-cols-4">
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-sm font-medium">Type *</label>
                            <select value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm">
                                <option value="solution">Core Solution</option>
                                <option value="equipment">Equipment</option>
                            </select>
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-sm font-medium">Category *</label>
                            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm">
                                <option value="agitation">Agitation</option>
                                <option value="feeding">Feeding</option>
                                <option value="mixing">Mixing</option>
                                <option value="separation">Separation</option>
                                <option value="pumping">Pumping</option>
                                <option value="odorizing">Odorizing</option>
                                <option value="solution">Total Solution</option>
                            </select>
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-sm font-medium">Brand</label>
                            <input value={form.brand || ""} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm" />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-sm font-medium">Brand Origin</label>
                            <input value={form.brandOrigin || ""} onChange={(e) => setForm({ ...form, brandOrigin: e.target.value })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm" placeholder="e.g. Italy" />
                        </div>
                    </div>

                    {/* Text Areas */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Short Description *</label>
                        <textarea required rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm resize-none" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Long Description</label>
                        <textarea rows={4} value={form.longDescription || ""} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} className="w-full rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-2.5 text-sm resize-none" />
                    </div>

                    {/* Dynamic Arrays: Features */}
                    <div className="space-y-2 p-4 border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 rounded-xl">
                        <label className="text-sm font-medium flex items-center justify-between">
                            Features
                            <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("features")} className="h-7 text-xs">
                                <Plus className="h-3 w-3 mr-1" /> Add
                            </Button>
                        </label>
                        {form.features?.map((feat, i) => (
                            <div key={i} className="flex gap-2">
                                <input value={feat} onChange={(e) => handleArrayChange("features", i, e.target.value)} className="flex-1 rounded-lg border border-[#1A1A1A]/10 bg-[#FAF9F6] px-3 py-1.5 text-sm" placeholder="Feature..." />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("features", i)} className="h-8 w-8 text-red-500 shrink-0"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Arrays: Specs */}
                    <div className="space-y-2 p-4 border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 rounded-xl">
                        <label className="text-sm font-medium flex items-center justify-between">
                            Technical Specs
                            <Button type="button" variant="outline" size="sm" onClick={() => setForm({ ...form, specs: [...(form.specs || []), { label: "", value: "" }] })} className="h-7 text-xs">
                                <Plus className="h-3 w-3 mr-1" /> Add
                            </Button>
                        </label>
                        {form.specs?.map((spec, i) => (
                            <div key={i} className="flex gap-2">
                                <input value={spec.label} onChange={(e) => handleSpecChange(i, "label", e.target.value)} className="w-1/3 rounded-lg border border-[#1A1A1A]/10 bg-[#FAF9F6] px-3 py-1.5 text-sm" placeholder="Label (e.g. Power)" />
                                <input value={spec.value} onChange={(e) => handleSpecChange(i, "value", e.target.value)} className="flex-1 rounded-lg border border-[#1A1A1A]/10 bg-[#FAF9F6] px-3 py-1.5 text-sm" placeholder="Value (e.g. 22 kW)" />
                                <Button type="button" variant="ghost" size="icon" onClick={() => { const s = [...(form.specs || [])]; s.splice(i, 1); setForm({ ...form, specs: s }) }} className="h-8 w-8 text-red-500 shrink-0"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 sticky bottom-0 bg-white dark:bg-[#111] py-2">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">Cancel</Button>
                        <Button type="submit" disabled={loading} className="flex-1 rounded-xl bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] font-semibold">
                            {loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : product ? "Save Changes" : "Create Product"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}