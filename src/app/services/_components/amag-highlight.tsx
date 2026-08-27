"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { BadgeCheck, Wrench, Truck, Headphones } from "lucide-react";

const features = [
  { icon: BadgeCheck, label: "Predesigned & Built", desc: "Ready-to-install odorizing systems" },
  { icon: Wrench, label: "Trained Technicians", desc: "Installed by principal-trained experts" },
  { icon: Truck, label: "Pan-India Service", desc: "Sales, supply & post-sale support" },
  { icon: Headphones, label: "Authorized Partner", desc: "Official AMAG RETI representative" },
];

export function AmagHighlight() {
  return (
    <section className="relative py-24 px-4 bg-[#1B4332] dark:bg-[#0f2e1a] overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#4ADE80]/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#2D5A3D]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#4ADE80] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                Italian Technology in India
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                AMAG RETI Odorizing Systems
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                EcoCatch is proud to bring AMAG RETI&apos;s world-class odorizing technology to India. 
                These systems are predesigned, built, and ready to install — ensuring safe and precise 
                odorization of natural gas and biogas across your distribution network.
              </p>
              <p className="text-white/70 leading-relaxed">
                Installation is carried out by experienced and trained technicians directly authorized 
                by the principal company. We provide complete sell-and-service support Pan-India.
              </p>
              <div className="pt-2">
                <p className="text-xs text-white/40">
                  The above information is the property of AMAG RETI. The principal has right to change without any prior notice.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <ScrollReveal key={f.label} delay={i * 0.1}>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#4ADE80]/20">
                    <f.icon className="h-5 w-5 text-[#4ADE80]" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{f.label}</h3>
                  <p className="text-sm text-white/60">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}