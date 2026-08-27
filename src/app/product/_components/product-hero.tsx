"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function ProductHero() {
  return (
    <section className="relative flex min-h-[60vh] items-end bg-[#FAF9F6] dark:bg-[#0A0A0A] pb-20 pt-32 px-4">
      <div className="mx-auto max-w-7xl w-full">
        <ScrollReveal>
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase">
            Our Solutions
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-6xl md:text-7xl leading-[1.1]">
            Engineered equipment.<br />
            Proven performance.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[#86868b] leading-relaxed">
            From Italian DODA pumps and separators to AMAG RETI odorizing systems — 
            we import, install, and support world-class biogas equipment across India.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}