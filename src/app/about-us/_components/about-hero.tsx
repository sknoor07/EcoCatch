"use client";

import { ScrollReveal } from "@/components/scroll-reveal";



export function AboutHero() {
  return (
    <section className="relative flex min-h-[60vh] items-end bg-[#FAF9F6] dark:bg-[#0A0A0A] pb-20 pt-32 px-4">
      <div className="mx-auto max-w-7xl w-full">
        <ScrollReveal>
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase">
            Our Story
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-6xl md:text-7xl leading-[1.1]">
            Born from a news broadcast.<br />
            Built for the planet.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[#86868b] leading-relaxed">
            In 2016, a television report on the global energy crisis sparked an idea: 
            what if energy could be grown in India's agricultural fields? That question became EcoCatch.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}