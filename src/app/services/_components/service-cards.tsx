"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Flame, Droplets, Zap, Recycle, ClipboardCheck, Sprout, ChevronDown } from "lucide-react";

const services = [
  {
    id: "biogas",
    num: "01",
    title: "BioGAS & Bio-CBG Plants",
    short: "Renewable energy from organic waste.",
    full: "End-to-end design, manufacturing, and installation of biogas and Bio-CNG (CBG) plants. We handle everything from feedstock analysis and digester sizing to gas upgrading and grid injection. Suitable for farms, dairies, food processing units, and municipalities.",
    icon: Flame,
    color: "text-[#2D5A3D] dark:text-[#4ADE80]",
    bg: "bg-[#E8F4E8] dark:bg-[#1a3d2a]",
    border: "border-[#2D5A3D]/20 dark:border-[#4ADE80]/20",
  },
  {
    id: "water",
    num: "02",
    title: "Water Treatment — STP & ETP",
    short: "Effluent, sewage & environmental compliance.",
    full: "Advanced effluent treatment plants (ETP) and sewage treatment plants (STP) designed for industrial and municipal compliance. We integrate biological, chemical, and mechanical processes to ensure discharge standards are met sustainably.",
    icon: Droplets,
    color: "text-[#0EA5E9] dark:text-[#38BDF8]",
    bg: "bg-[#E0F2FE] dark:bg-[#0c2e4a]",
    border: "border-[#0EA5E9]/20 dark:border-[#38BDF8]/20",
  },
  {
    id: "audit",
    num: "03",
    title: "Energy Audit",
    short: "Examine, analyze, optimize.",
    full: "Comprehensive examination of electrical equipment, air compressors, chillers, industrial fans, HVAC systems, and lighting. We identify inefficiencies and recommend actionable upgrades that reduce energy bills and carbon footprint.",
    icon: Zap,
    color: "text-[#EA580C] dark:text-[#FB923C]",
    bg: "bg-[#FFF7ED] dark:bg-[#2a1810]",
    border: "border-[#EA580C]/20 dark:border-[#FB923C]/20",
  },
  {
    id: "waste",
    num: "04",
    title: "Solid Waste & Shredders",
    short: "RDF processing and equipment repair.",
    full: "Refuse-derived fuel (RDF) processing lines, shredder supply and repair, and complete solid waste management solutions. We help industries convert waste into a valuable energy resource while maintaining equipment uptime.",
    icon: Recycle,
    color: "text-[#7C3AED] dark:text-[#A78BFA]",
    bg: "bg-[#F3E8FF] dark:bg-[#1e1038]",
    border: "border-[#7C3AED]/20 dark:border-[#A78BFA]/20",
  },
  {
    id: "epc",
    num: "05",
    title: "EPC Consulting",
    short: "Engineering, procurement, construction.",
    full: "Full EPC project management from feasibility study and detailed engineering to procurement, construction, and commissioning. We act as your single point of accountability for complex renewable energy and environmental projects.",
    icon: ClipboardCheck,
    color: "text-[#1A1A1A] dark:text-[#E5E5E5]",
    bg: "bg-[#F0F0F0] dark:bg-[#1a1a1a]",
    border: "border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10",
  },
  {
    id: "agri",
    num: "06",
    title: "Agriculture & Environment",
    short: "Farm-to-factory sustainability.",
    full: "Organic waste-to-energy consulting for agricultural estates, dairy cooperatives, and food processing clusters. We design circular systems where farm waste becomes biogas, and digested slurry becomes organic fertilizer.",
    icon: Sprout,
    color: "text-[#16A34A] dark:text-[#4ADE80]",
    bg: "bg-[#DCFCE7] dark:bg-[#0f2e1a]",
    border: "border-[#16A34A]/20 dark:border-[#4ADE80]/20",
  },
];

export function ServiceCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="relative py-24 px-4 bg-[#F0F0F0] dark:bg-[#111]">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              Our Verticals
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl max-w-2xl">
              Six pillars of sustainable infrastructure
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const isOpen = expanded === s.id;
            return (
              <ScrollReveal key={s.id} delay={i * 0.08}>
                <div
                  className={`group relative h-full rounded-2xl border ${s.border} bg-white dark:bg-[#0A0A0A] p-6 transition-all hover:shadow-lg cursor-pointer`}
                  onClick={() => setExpanded(isOpen ? null : s.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.bg}`}>
                      <s.icon className={`h-6 w-6 ${s.color}`} />
                    </div>
                    <span className="text-xs font-bold text-[#86868b]">{s.num}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] mb-2">
                    {s.title}
                  </h3>

                  <p className="text-sm text-[#86868b] leading-relaxed mb-3">
                    {isOpen ? s.full : s.short}
                  </p>

                  <div className="flex items-center gap-1 text-xs font-medium text-[#2D5A3D] dark:text-[#4ADE80]">
                    {isOpen ? "Show less" : "Read more"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}