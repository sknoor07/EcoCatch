"use client";


import { ScrollReveal } from "@/components/scroll-reveal";
import { Tv, Sprout, Globe, Zap } from "lucide-react";

const pillars = [
  {
    icon: Tv,
    title: "The Spark",
    desc: "A 2016 TV news broadcast on the global energy crisis made us ask: why hunt for energy when it can be grown?",
  },
  {
    icon: Sprout,
    title: "Farm to Factory",
    desc: "We believe energy can be cultivated in agricultural fields and around socio-economic habitats.",
  },
  {
    icon: Globe,
    title: "Global Presence",
    desc: "We source world-class equipment from Italy, Northern Ireland, UK, and the US — with local Indian expertise.",
  },
  {
    icon: Zap,
    title: "Complete Solutions",
    desc: "From biogas and Bio-CBG to waste water treatment and energy audits — we think local, act global.",
  },
];

export function OriginStory() {
  return (
    <section className="relative py-24 px-4 bg-[#F0F0F0] dark:bg-[#111]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase">
                Why We Exist
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
                Catching the ECO factor
              </h2>
              <p className="text-lg text-[#86868b] leading-relaxed">
                ECOCATCH has been formed with main focus about the nature. In a world where people are talking, 
                discussing, and finding reasons behind the global crisis of energy — we looked deeper. Into the fields, 
                into the waste, into the communities.
              </p>
              <p className="text-lg text-[#86868b] leading-relaxed">
                We always look into complete and long-term economical solutions. Whether it is operation, supply, 
                or execution — we study, advise, and deliver. Within the jurisdiction of your premises.
              </p>
              <div className="pt-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#0A0A0A] px-5 py-2.5 text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
                  <span className="h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  A small step can make a bigger footprint
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.15}>
                <div className="group h-full rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F4E8] dark:bg-[#1a3d2a]">
                    <pillar.icon className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#86868b]">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}