"use client";

import { useRef, useEffect } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { label: "Organic Waste", x: 50, y: 20 },
  { label: "Shredding", x: 50, y: 35 },
  { label: "Anaerobic Digestion", x: 50, y: 50 },
  { label: "Biogas", x: 30, y: 65 },
  { label: "Bio-CNG", x: 30, y: 80 },
  { label: "Digestate", x: 70, y: 65 },
  { label: "Organic Fertilizer", x: 70, y: 80 },
];

export function ProcessFlow() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll(".flow-path");
    const nodes = svg.querySelectorAll(".flow-node");

    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength?.() || 200;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: svg,
          start: "top 75%",
        },
      });
    });

    nodes.forEach((node, i) => {
      gsap.from(node, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: svg,
          start: "top 75%",
        },
      });
    });
  }, []);

  return (
    <section className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
              How It Works
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
              From waste to wealth
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative rounded-3xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-6 md:p-10 overflow-hidden">
            <svg
              ref={svgRef}
              viewBox="0 0 100 100"
              className="w-full h-auto"
              style={{ maxHeight: "600px" }}
            >
              {/* Connecting paths */}
              <path className="flow-path" d="M50 25 L50 32" stroke="#2D5A3D" strokeWidth="0.5" fill="none" />
              <path className="flow-path" d="M50 38 L50 47" stroke="#2D5A3D" strokeWidth="0.5" fill="none" />
              <path className="flow-path" d="M50 53 L35 62" stroke="#4ADE80" strokeWidth="0.5" fill="none" />
              <path className="flow-path" d="M50 53 L65 62" stroke="#0EA5E9" strokeWidth="0.5" fill="none" />
              <path className="flow-path" d="M30 68 L30 77" stroke="#4ADE80" strokeWidth="0.5" fill="none" />
              <path className="flow-path" d="M70 68 L70 77" stroke="#0EA5E9" strokeWidth="0.5" fill="none" />

              {/* Nodes */}
              <g className="flow-node">
                <circle cx="50" cy="20" r="4" fill="#2D5A3D" />
                <text x="50" y="14" textAnchor="middle" fill="currentColor" fontSize="3" className="text-[#1A1A1A] dark:text-[#E5E5E5]">
                  Organic Waste
                </text>
              </g>

              <g className="flow-node">
                <circle cx="50" cy="35" r="3.5" fill="#374151" />
                <text x="50" y="42" textAnchor="middle" fill="currentColor" fontSize="3" className="text-[#1A1A1A] dark:text-[#E5E5E5]">
                  Shredding
                </text>
              </g>

              <g className="flow-node">
                <rect x="38" y="48" width="24" height="6" rx="1" fill="#1B4332" />
                <text x="50" y="52" textAnchor="middle" fill="white" fontSize="2.5">
                  Anaerobic Digestion
                </text>
              </g>

              <g className="flow-node">
                <circle cx="30" cy="65" r="3.5" fill="#4ADE80" />
                <text x="30" y="72" textAnchor="middle" fill="currentColor" fontSize="3" className="text-[#1A1A1A] dark:text-[#E5E5E5]">
                  Biogas
                </text>
              </g>

              <g className="flow-node">
                <rect x="22" y="78" width="16" height="5" rx="1" fill="#4ADE80" />
                <text x="30" y="81.5" textAnchor="middle" fill="#0A0A0A" fontSize="2.5">
                  Bio-CNG
                </text>
              </g>

              <g className="flow-node">
                <circle cx="70" cy="65" r="3.5" fill="#0EA5E9" />
                <text x="70" y="72" textAnchor="middle" fill="currentColor" fontSize="3" className="text-[#1A1A1A] dark:text-[#E5E5E5]">
                  Digestate
                </text>
              </g>

              <g className="flow-node">
                <rect x="62" y="78" width="16" height="5" rx="1" fill="#0EA5E9" />
                <text x="70" y="81.5" textAnchor="middle" fill="white" fontSize="2.5">
                  Fertilizer
                </text>
              </g>
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}