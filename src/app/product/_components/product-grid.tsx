"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Product } from "@/types/admin";
import { ArrowUpRight, Cog, Droplets, Wind, Zap, Settings, FlaskConical, Wrench } from "lucide-react";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  agitation: Cog,
  feeding: Droplets,
  mixing: Settings,
  separation: Wind,
  pumping: Zap,
  odorizing: FlaskConical,
  solution: Wrench,
};

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="relative py-24 px-4 bg-[#F0F0F0] dark:bg-[#111]">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              Core Solutions
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl max-w-2xl">
              Seven ways we power your plant
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => {
            const Icon = categoryIcons[product.category] || Cog;
            return (
              <ScrollReveal key={product.slug} delay={i * 0.08}>
                <Link
                  href={`/product/${product.slug}`}
                  className="group relative flex h-full flex-col rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] p-6 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F4E8] dark:bg-[#1a3d2a] transition-colors group-hover:bg-[#2D5A3D] dark:group-hover:bg-[#4ADE80]">
                      <Icon className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80] transition-colors group-hover:text-white dark:group-hover:text-[#0A0A0A]" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-[#86868b] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                    {product.name}
                  </h3>
                  <p className="mb-4 text-sm text-[#86868b] leading-relaxed flex-grow">
                    {product.tagline}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-medium text-[#2D5A3D] dark:text-[#4ADE80]">
                    Explore
                    <span className="h-[1px] w-4 bg-current transition-all group-hover:w-6" />
                  </div>

                  {product.brand && (
                    <div className="mt-4 inline-flex self-start items-center gap-1.5 rounded-full bg-[#F0F0F0] dark:bg-[#1a1a1a] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#86868b] uppercase">
                      {product.brand}
                    </div>
                  )}
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}