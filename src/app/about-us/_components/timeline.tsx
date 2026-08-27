"use client";

import { ScrollReveal } from "@/components/scroll-reveal";




const milestones = [
  {
    year: "2016",
    title: "The Beginning",
    desc: "EcoCatch is founded in Mumbai by Yugal Roy after a TV news report on the global energy crisis sparks a vision for farm-grown energy.",
  },
  {
    year: "2017",
    title: "First Installations",
    desc: "Completed first biogas plant installations across Maharashtra, proving the concept of waste-to-energy at scale.",
  },
  {
    year: "2018",
    title: "Global Partnerships",
    desc: "Partnered with equipment manufacturers in Italy, Northern Ireland, UK, and US to bring world-class technology to India.",
  },
  {
    year: "2019",
    title: "Workshop Expansion",
    desc: "Established a dedicated fabrication and repair workshop in Vasai Industrial Estate to support in-house manufacturing.",
  },
  {
    year: "2020",
    title: "Diversification",
    desc: "Expanded into water treatment (STP/ETP), energy audits, and solid waste management — becoming a full EPC solutions provider.",
  },
  {
    year: "2024",
    title: "150+ Plants",
    desc: "Crossed 150 successful biogas and Bio-CNG plant installations across India, serving farms, factories, and municipalities.",
  },
];

export function Timeline() {
  return (
    <section className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A] overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              Our Journey
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
              From idea to impact
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#1A1A1A]/10 dark:bg-[#E5E5E5]/10 md:-translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <ScrollReveal key={item.year} delay={i * 0.1}>
                  <div className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row-reverse" : ""} items-start md:items-center gap-8`}>
                    {/* Content */}
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
                      <div className={`${isLeft ? "md:text-right" : "md:text-left"}`}>
                        <span className="inline-block rounded-full bg-[#E8F4E8] dark:bg-[#1a3d2a] px-3 py-1 text-xs font-bold text-[#2D5A3D] dark:text-[#4ADE80] mb-3">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#86868b] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#FAF9F6] dark:border-[#0A0A0A] bg-[#2D5A3D] dark:bg-[#4ADE80] shadow-[0_0_0_4px_rgba(45,90,61,0.2)] dark:shadow-[0_0_0_4px_rgba(74,222,128,0.2)]" />

                    {/* Spacer for other side */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}