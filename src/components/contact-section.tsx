"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, MapPin, Phone, Mail, CheckCircle, Loader2 } from "lucide-react";
import api from "@/db/api-client";
import { Product } from "@/types/admin";
import { isAxiosError } from "axios";

export function ContactSection({ products }: { products: Product[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    selectedProductIds: [] as number[],
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/contact", form);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "", selectedProductIds: [] });
    } catch (err: unknown) {
      setError(
        isAxiosError(err) ? err.response?.data?.error || "Something went wrong. Please try again." : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleProduct = (productId: number) => {
    setForm((current) => ({
      ...current,
      selectedProductIds: current.selectedProductIds.includes(productId)
        ? current.selectedProductIds.filter((id) => id !== productId)
        : [...current.selectedProductIds, productId],
    }));
  };

  return (
    <section id="contact" className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
            Start your green journey
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <div className="space-y-8">
            <p className="text-lg text-[#86868b] leading-relaxed">
              Ready to turn waste into wealth? Whether you are a farm, factory, or
              municipality — we will design a BioGAS solution tailored to your needs.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F4E8] dark:bg-[#1a3d2a]">
                  <MapPin className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                    Head Office
                  </h4>
                  <p className="text-[#86868b]">Mumbai, Maharashtra, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F4E8] dark:bg-[#1a3d2a]">
                  <Phone className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                    Phone
                  </h4>
                  <p className="text-[#86868b]">+91 98929 06496</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F4E8] dark:bg-[#1a3d2a]">
                  <Mail className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                    Email
                  </h4>
                  <p className="text-[#86868b]">info@ecocatch.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#111] p-6 sm:p-8 shadow-sm"
          >
            {submitted ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 text-center">
                <CheckCircle className="h-12 w-12 text-[#4ADE80]" />
                <h3 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                  Message Sent!
                </h3>
                <p className="text-[#86868b]">
                  We will get back to you within 24 hours.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full cursor-pointer"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                      Products you are interested in <span className="text-[#2D5A3D] dark:text-[#4ADE80]">*</span>
                    </label>
                    <span className="text-xs text-[#86868b]">Select one or more</span>
                  </div>
                  <div className="grid max-h-52 grid-cols-1 gap-2 overflow-y-auto rounded-xl border border-[#1A1A1A]/10 bg-[#FAF9F6] p-2 dark:border-[#E5E5E5]/10 dark:bg-[#0A0A0A] sm:grid-cols-2">
                    {products.map((product) => {
                      const selected = form.selectedProductIds.includes(product.id);
                      return (
                        <label
                          key={product.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${selected
                            ? "border-[#2D5A3D] bg-[#E8F4E8] text-[#1A1A1A] dark:border-[#4ADE80] dark:bg-[#1a3d2a] dark:text-[#E5E5E5]"
                            : "border-transparent text-[#1A1A1A] hover:bg-white dark:text-[#E5E5E5] dark:hover:bg-[#111]"
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleProduct(product.id)}
                            className="h-4 w-4 shrink-0 accent-[#2D5A3D] dark:accent-[#4ADE80]"
                          />
                          <span className="min-w-0 truncate">{product.shortName || product.name}</span>
                        </label>
                      );
                    })}
                  </div>
                  {products.length === 0 && (
                    <p className="text-sm text-red-600 dark:text-red-400">Products are temporarily unavailable. Please try again later.</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading || form.selectedProductIds.length === 0 || products.length === 0}
                  className="w-full rounded-xl cursor-pointer bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] dark:hover:bg-[#3ec46e] transition-colors font-semibold py-3 h-auto disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
