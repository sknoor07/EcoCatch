"use client";



import { ScrollReveal } from "@/components/scroll-reveal";
import { Building2, Leaf, Factory, Landmark } from "lucide-react";

const clientTypes = [
  { icon: Building2, label: "Industries", desc: "Food processing, cement, oil & gas" },
  { icon: Factory, label: "Factories", desc: "Manufacturing units with ETP/STP needs" },
  { icon: Landmark, label: "Municipalities", desc: "City corporations & public utilities" },
  { icon: Leaf, label: "Farms", desc: "Dairy cooperatives & agricultural estates" },
];

export function ClientsTrust() {
  return (
    <section className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              Trusted By
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
              Who we work with
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clientTypes.map((c, i) => (
            <ScrollReveal key={c.label} delay={i * 0.1}>
              <div className="group text-center rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-8 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F4E8] dark:bg-[#1a3d2a] transition-colors group-hover:bg-[#2D5A3D] dark:group-hover:bg-[#4ADE80]">
                  <c.icon className="h-7 w-7 text-[#2D5A3D] dark:text-[#4ADE80] transition-colors group-hover:text-white dark:group-hover:text-[#0A0A0A]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] mb-1">
                  {c.label}
                </h3>
                <p className="text-xs text-[#86868b]">{c.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-16 text-center">
            <p className="text-[#86868b]">
              We supply, install, and provide post-sale support <span className="font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">Pan-India</span>.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}