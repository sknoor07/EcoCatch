"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Cog, Droplets, Flame, Wind, Wrench, Factory } from "lucide-react";

const equipment = [
  { name: "Pumps", spec: "Progressive cavity & centrifugal", origin: "Italy / UK", icon: Droplets },
  { name: "Extruders", spec: "High-torque screw presses", origin: "Northern Ireland", icon: Cog },
  { name: "Separators", spec: "Solid-liquid separation", origin: "Italy / US", icon: Wind },
  { name: "Shredders", spec: "Industrial waste shredders", origin: "UK / US", icon: Wrench },
  { name: "ORC Systems", spec: "Organic Rankine Cycle turbines", origin: "Italy", icon: Flame },
  { name: "Farm Equipment", spec: "Feedstock handling & prep", origin: "US / UK", icon: Factory },
];

export function EquipmentGallery() {
  return (
    <section className="relative py-24 px-4 bg-[#F0F0F0] dark:bg-[#111]">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              Equipment
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
              Imported. Installed. Supported.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-[#86868b]">
              We source world-class machinery from Italy, Northern Ireland, UK, and the US — 
              and provide Pan-India installation and post-sale support.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 0.08}>
              <div className="group rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] p-6 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F4E8] dark:bg-[#1a3d2a] transition-colors group-hover:bg-[#2D5A3D] dark:group-hover:bg-[#4ADE80]">
                  <item.icon className="h-6 w-6 text-[#2D5A3D] dark:text-[#4ADE80] transition-colors group-hover:text-white dark:group-hover:text-[#0A0A0A]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-[#86868b] mb-3">{item.spec}</p>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F0F0] dark:bg-[#1a1a1a] px-2.5 py-1 text-xs text-[#86868b]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                  {item.origin}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}