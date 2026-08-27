"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw, Factory, Tractor, Building2, Home } from "lucide-react";

type Option = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  result: string;
};

const options: Option[] = [
  { label: "I run a farm or dairy", icon: Tractor, result: "biogas" },
  { label: "I manage a factory or industry", icon: Factory, result: "water" },
  { label: "I represent a municipality", icon: Building2, result: "waste" },
  { label: "I want to cut energy costs", icon: Home, result: "audit" },
];

const results: Record<string, { title: string; desc: string; cta: string; href: string }> = {
  biogas: {
    title: "BioGAS Plant",
    desc: "Your organic waste is a goldmine. We will design a digester system that turns manure, crop residue, or food waste into clean cooking fuel and electricity.",
    cta: "Get a BioGAS Quote",
    href: "#contact",
  },
  water: {
    title: "ETP / STP Solution",
    desc: "Industrial discharge compliance is non-negotiable. We will audit your effluent and design a treatment plant that meets PCB norms while recovering reusable water.",
    cta: "Book a Site Survey",
    href: "#contact",
  },
  waste: {
    title: "Solid Waste Management",
    desc: "From RDF processing to landfill diversion, we help municipalities and large campuses achieve zero-waste goals with proven mechanical and biological systems.",
    cta: "Schedule a Consultation",
    href: "#contact",
  },
  audit: {
    title: "Energy Audit",
    desc: "Before you invest in new equipment, let us find the leaks. Our audit typically identifies 15–30% energy savings through optimization alone.",
    cta: "Request an Audit",
    href: "#contact",
  },
};

export function SolutionQuiz() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = selected ? results[selected] : null;

  return (
    <section className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              Solution Finder
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
              Which solution is right for you?
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-3xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6 md:p-10">
            {!result ? (
              <div className="space-y-6">
                <p className="text-center text-[#86868b]">Select the option that best describes you:</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setSelected(opt.result)}
                      className="flex items-center gap-4 rounded-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] p-5 text-left transition-all hover:border-[#2D5A3D]/30 dark:hover:border-[#4ADE80]/30 hover:shadow-md group"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F4E8] dark:bg-[#1a3d2a] transition-colors group-hover:bg-[#2D5A3D] dark:group-hover:bg-[#4ADE80]">
                        <opt.icon className="h-5 w-5 text-[#2D5A3D] dark:text-[#4ADE80] transition-colors group-hover:text-white dark:group-hover:text-[#0A0A0A]" />
                      </div>
                      <span className="font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">{opt.label}</span>
                      <ArrowRight className="ml-auto h-4 w-4 text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F4E8] dark:bg-[#1a3d2a]">
                  <RotateCcw
                    className="h-8 w-8 text-[#2D5A3D] dark:text-[#4ADE80] cursor-pointer"
                    onClick={() => setSelected(null)}
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E5E5E5]">
                  {result.title}
                </h3>
                <p className="max-w-lg mx-auto text-[#86868b] leading-relaxed">
                  {result.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    render={<a href={result.href} />}
                    className="rounded-full bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] dark:hover:bg-[#3ec46e] font-semibold px-6"
                  >
                    {result.cta}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelected(null)}
                    className="rounded-full border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 text-[#1A1A1A] dark:text-[#E5E5E5] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}