"use client";


import { ScrollReveal } from "@/components/scroll-reveal";
import { Factory, Hammer, Wrench, Shield } from "lucide-react";

const capabilities = [
  { icon: Factory, title: "Industrial Fabrication", desc: "Custom metal fabrication for biogas plant components and industrial equipment." },
  { icon: Hammer, title: "Repair & Maintenance", desc: "On-site and in-house repair for pumps, extruders, separators, and shredders." },
  { icon: Wrench, title: "Assembly & Testing", desc: "Pre-commissioning assembly and pressure testing before site deployment." },
  { icon: Shield, title: "Quality Assurance", desc: "Every fabricated component is inspected to meet global standards." },
];

export function WorkshopSection() {
  return (
    <section className="relative py-24 px-4 bg-[#F0F0F0] dark:bg-[#111]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase">
                Our Infrastructure
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
                Vasai Industrial Estate
              </h2>
              <p className="text-lg text-[#86868b] leading-relaxed">
                Our workshop in Vasai Industrial Estate is the backbone of our Make-in-India commitment. 
                While we import specialized equipment from Europe and the US, we fabricate, assemble, 
                and repair critical components right here in Maharashtra.
              </p>
              <p className="text-[#86868b] leading-relaxed">
                For select industrial products, EcoCatch sources directly from manufacturers — 
                whether based in India or abroad — ensuring the best quality at the most competitive cost.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.title} delay={i * 0.12}>
                <div className="h-full rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] p-6 transition-all hover:shadow-lg">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F4E8] dark:bg-[#1a3d2a]">
                    <cap.icon className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[#86868b] leading-relaxed">
                    {cap.desc}
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