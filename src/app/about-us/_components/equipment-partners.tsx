"use client";


import { ScrollReveal } from "@/components/scroll-reveal";
import { Ship, Wrench, Cog, Factory } from "lucide-react";

const equipment = [
  { name: "Pumps", origin: "Italy / UK", icon: Ship },
  { name: "Farm Equipment", origin: "US / UK", icon: Cog },
  { name: "ORC Systems", origin: "Italy", icon: Factory },
  { name: "Extruders", origin: "Northern Ireland", icon: Wrench },
  { name: "Separators", origin: "Italy / US", icon: Cog },
  { name: "Shredders", origin: "UK / US", icon: Wrench },
];

const countries = [
  { name: "Italy", flag: "🇮🇹", desc: "Pumps, ORC, Separators" },
  { name: "Northern Ireland", flag: "🇬🇧", desc: "Extruders & processing" },
  { name: "United Kingdom", flag: "🇬🇧", desc: "Pumps, Shredders, Farm equipment" },
  { name: "United States", flag: "🇺🇸", desc: "Farm equipment, Separators" },
];

export function EquipmentPartners() {
  return (
    <section className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              Global Sourcing
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
              World-class equipment, Indian execution
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-[#86868b]">
              We supply, install, and provide post-sale support for imported equipment from leading manufacturers across Europe and North America.
            </p>
          </div>
        </ScrollReveal>

        {/* Countries */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {countries.map((c, i) => (
            <ScrollReveal key={c.name} delay={i * 0.1}>
              <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6 text-center transition-all hover:shadow-lg">
                <div className="text-4xl mb-3">{c.flag}</div>
                <h3 className="font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] mb-1">{c.name}</h3>
                <p className="text-xs text-[#86868b]">{c.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {equipment.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 0.08}>
              <div className="group flex items-center gap-4 rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-5 transition-all hover:border-[#2D5A3D]/30 dark:hover:border-[#4ADE80]/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F4E8] dark:bg-[#1a3d2a] transition-colors group-hover:bg-[#2D5A3D] dark:group-hover:bg-[#4ADE80]">
                  <item.icon className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80] transition-colors group-hover:text-white dark:group-hover:text-[#0A0A0A]" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">{item.name}</p>
                  <p className="text-xs text-[#86868b]">{item.origin}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 rounded-2xl bg-[#1B4332] dark:bg-[#1a3d2a] p-8 md:p-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Italian Technology — Now in India
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-6">
              We are authorized partners for AMAG RETI odorizing systems — predesigned, ready-to-install units 
              deployed by experienced technicians trained by the principal company.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              Sell & Service feature available Pan-India
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}