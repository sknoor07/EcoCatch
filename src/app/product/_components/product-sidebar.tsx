"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Product } from "@/types/admin";

interface Props {
  activeSlug: string;
  allProducts: Product[];
}

export function ProductSidebar({ activeSlug, allProducts }: Props) {
  const solutions = allProducts.filter(p => p.productType === "solution");
  const equipment = allProducts.filter(p => p.productType === "equipment");

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-bold tracking-wider text-[#86868b] uppercase">
          Our Solutions
        </p>
        <nav className="space-y-1">
          {solutions.map((p) => (
            <Link
              key={p.slug}
              href={`/product/${p.slug}`}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition-colors",
                activeSlug === p.slug
                  ? "bg-[#E8F4E8] dark:bg-[#1a3d2a] font-medium text-[#2D5A3D] dark:text-[#4ADE80]"
                  : "text-[#86868b] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5 hover:text-[#1A1A1A] dark:hover:text-[#E5E5E5]"
              )}
            >
              {p.shortName}
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold tracking-wider text-[#86868b] uppercase">
          Equipment
        </p>
        <nav className="space-y-1">
          {equipment.map((p) => (
            <Link
              key={p.slug}
              href={`/product/${p.slug}`}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition-colors",
                activeSlug === p.slug
                  ? "bg-[#E8F4E8] dark:bg-[#1a3d2a] font-medium text-[#2D5A3D] dark:text-[#4ADE80]"
                  : "text-[#86868b] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5 hover:text-[#1A1A1A] dark:hover:text-[#E5E5E5]"
              )}
            >
              {p.shortName}
            </Link>
          ))}
        </nav>
      </div>

      <div className="rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-4">
        <p className="text-xs font-medium text-[#1A1A1A] dark:text-[#E5E5E5] mb-1">
          Need help choosing?
        </p>
        <p className="text-xs text-[#86868b] mb-3">
          Our engineers can recommend the right equipment for your feedstock.
        </p>
        <Link 
          href="/#contact"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D5A3D] dark:text-[#4ADE80] hover:underline"
        >
          Get a consultation →
        </Link>
      </div>
    </div>
  );
}