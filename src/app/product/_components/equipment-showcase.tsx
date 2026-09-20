"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Product } from "@/types/admin";
import { ArrowUpRight, Droplets, Wind, Zap, FlaskConical, Truck } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ElementType<{ className?: string }>> = {
  pumping: Droplets,
  separation: Wind,
  odorizing: FlaskConical,
  feeding: Truck,
};

export function EquipmentShowcase({ categories }: { categories: Product[] }) {
  return (
    <section className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              Equipment Range
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl max-w-2xl">
              BioGas Components
            </h2>
            <p className="mt-4 max-w-xl text-[#86868b]">
              Imported from Italy, Northern Ireland, UK, and the US. Installed and supported Pan-India.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.category] || Zap;
            return (
              <ScrollReveal key={cat.slug} delay={i * 0.08}>
                <Link
                  href={`/product/${cat.slug}`}
                  className="group relative flex h-full flex-col rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] p-6 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                <div >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F4E8] dark:bg-[#1a3d2a]">
                      <Icon className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
                    </div>
                    {cat.brandOrigin && (
                      <span className="text-[10px] font-bold tracking-wider text-[#86868b] uppercase">
                        {cat.brandOrigin}
                      </span>
                    )}
                    <ArrowUpRight className="h-5 w-5 text-[#86868b] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[#86868b] leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cat.features?.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-[#F0F0F0] dark:bg-[#1a1a1a] px-2.5 py-1 text-[10px] text-[#86868b]"
                      >
                        {f.split(" ")[0]}
                      </span>
                    ))}
                  </div>

                  <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#4ADE80]/5 blur-2xl transition-transform group-hover:scale-150" />
                </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}