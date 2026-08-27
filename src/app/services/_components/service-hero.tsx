"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function ServiceHero() {
  return (
    <section className="relative flex min-h-[60vh] items-end bg-[#FAF9F6] dark:bg-[#0A0A0A] pb-20 pt-22 px-4 mt-20">
      <div className="mx-auto max-w-7xl w-full">
        <ScrollReveal>
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase">
            What We Do
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-6xl md:text-7xl leading-[1.1]">
            Complete solutions.<br />
            From concept to commissioning.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[#86868b] leading-relaxed">
            We do not just advise — we study, design, supply, install, and support. 
            Within the jurisdiction of your premises, with global technology and local execution.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}