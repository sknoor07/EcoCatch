"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { ProductGallery } from "./product-gallery";
import { Check, ArrowRight, Mail } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types/admin";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function ProductDetail({ product }: { product: Product }) {
  const pathname = usePathname();
  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  return (
    <div className="space-y-16">
      {/* Header */}
      <ScrollReveal>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {product.brand && (
              <span className="rounded-full bg-[#E8F4E8] dark:bg-[#1a3d2a] px-3 py-1 text-xs font-bold text-[#2D5A3D] dark:text-[#4ADE80]">
                {product.brand}
              </span>
            )}
            {product.brandOrigin && (
              <span className="text-xs text-[#86868b]">
                Made in {product.brandOrigin}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
            {product.name}
          </h1>
          <p className="text-xl text-[#2D5A3D] dark:text-[#4ADE80] font-medium">
            {product.tagline}
          </p>
          <p className="max-w-2xl text-[#86868b] leading-relaxed">
            {product.longDescription || product.description}
          </p>
        </div>
      </ScrollReveal>
      {/* Gallery */}
      <ScrollReveal>
        <ProductGallery slug={product.slug} images={product.image} productName={product.name} />
      </ScrollReveal>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <ScrollReveal>
          <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6 md:p-8">
            <h2 className="mb-6 text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
              Key Features
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F4E8] dark:bg-[#1a3d2a]">
                    <Check className="h-3 w-3 text-[#2D5A3D] dark:text-[#4ADE80]" />
                  </div>
                  <span className="text-sm text-[#86868b] leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Specs */}
      {product.specs && product.specs.length > 0 && (
        <ScrollReveal>
          <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6 md:p-8">
            <h2 className="mb-6 text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
              Technical Specifications
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between rounded-lg bg-[#F0F0F0] dark:bg-[#1a1a1a] px-4 py-3"
                >
                  <span className="text-sm text-[#86868b]">{spec.label}</span>
                  <span className="text-sm font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Applications */}
      {product.applications && product.applications.length > 0 && (
        <ScrollReveal>
          <div>
            <h2 className="mb-6 text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
              Applications
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.applications.map((app) => (
                <span
                  key={app}
                  className="rounded-full border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#111] px-4 py-2 text-sm text-[#1A1A1A] dark:text-[#E5E5E5]"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* CTA */}
      <ScrollReveal>
        <div className="rounded-2xl bg-[#1B4332] dark:bg-[#1a3d2a] p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Interested in {product.shortName}?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">
            Our engineers will help you select the right configuration for your plant size, feedstock, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#contact"
              onClick={(e) => handleQuoteClick(e)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-white text-[#1B4332] hover:bg-[#E8F4E8] font-semibold px-6 inline-flex items-center justify-center text-decoration-none"
              )}
            >
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="mailto:info@ecocatch.in"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent inline-flex items-center justify-center text-decoration-none"
              )}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Us
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}