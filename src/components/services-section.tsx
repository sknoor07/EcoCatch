"use client";

import { Flame, Droplets, Tractor, ClipboardCheck, Zap, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const services = [
  {
    id: "biogas",
    title: "BioGAS Plants",
    description: "End-to-end design, manufacturing, and installation of biogas and Bio-CNG plants for farms, factories, and municipalities.",
    icon: Flame,
    className: "md:col-span-2",
    bg: "bg-[#1B4332] text-white",
    iconBg: "bg-white/10",
  },
  {
    id: "water",
    title: "Water Treatment",
    description: "Advanced effluent, STP & ETP solutions ensuring environmental compliance.",
    icon: Droplets,
    className: "md:col-span-2",
    bg: "bg-[#E8F4E8] dark:bg-[#112211] text-[#1A1A1A] dark:text-[#E5E5E5]",
    iconBg: "bg-[#2D5A3D]/10 dark:bg-[#4ADE80]/10",
  },
  {
    id: "agri",
    title: "Agriculture",
    description: "Sustainable farming practices and organic waste-to-energy consulting.",
    icon: Tractor,
    className: "md:col-span-2",
    bg: "bg-[#F5F0E8] dark:bg-[#1a1814] text-[#1A1A1A] dark:text-[#E5E5E5]",
    iconBg: "bg-[#92400E]/10 dark:bg-[#F59E0B]/10",
  },
  {
    id: "audit",
    title: "Energy Audit",
    description: "Examination of electrical equipment, compressors, chillers, and industrial systems.",
    icon: Zap,
    className: "md:col-span-2",
    bg: "bg-[#FFF7ED] dark:bg-[#2a1810] text-[#1A1A1A] dark:text-[#E5E5E5]",
    iconBg: "bg-[#EA580C]/10 dark:bg-[#FB923C]/10",
  },
  {
    id: "consulting",
    title: "EPC Consulting",
    description: "Complete engineering, procurement, and construction management from concept to commissioning.",
    icon: ClipboardCheck,
    className: "md:col-span-4",
    bg: "bg-[#111] dark:bg-[#E5E5E5] text-white dark:text-[#0A0A0A]",
    iconBg: "bg-white/10 dark:bg-black/10",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              What We Do
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl max-w-2xl">
              Solutions for a circular economy
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.1} className={service.className}>
              <div
                className={`group relative h-full overflow-hidden rounded-2xl p-6 md: transition-all duration-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${service.bg}`}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className={`rounded-xl ${service.iconBg} p-2.5 backdrop-blur-sm`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-md">{service.description}</p>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-transform duration-500 group-hover:scale-150" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}