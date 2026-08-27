"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Phone, Mail, MapPin } from "lucide-react";

export function FounderProfile() {
  return (
    <section className="relative py-24 px-4 bg-[#F0F0F0] dark:bg-[#111]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-3xl bg-[#1B4332] dark:bg-[#1a3d2a] overflow-hidden">
                {/* Placeholder for Yugal Roy photo */}
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-4xl font-bold text-white">
                      YR
                    </div>
                    <p className="text-sm text-white/60">Photo placeholder</p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[#4ADE80]/20 blur-2xl" />
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[#2D5A3D]/20 blur-2xl" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase">
                Leadership
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
                Yugal Roy
              </h2>
              <p className="text-lg font-medium text-[#2D5A3D] dark:text-[#4ADE80]">
                Founder & Managing Director
              </p>
              <p className="text-[#86868b] leading-relaxed">
                A visionary entrepreneur who saw opportunity in India's agricultural waste. 
                With deep expertise spanning biogas, waste processing, oil & gas, cement, 
                industrial automation, and energy audits, Yugal built EcoCatch into a 
                full-service EPC company trusted by 150+ clients across the nation.
              </p>
              <p className="text-[#86868b] leading-relaxed">
                Under his leadership, EcoCatch has bridged global technology with local execution — 
                importing cutting-edge equipment from Italy, Northern Ireland, UK, and the US, 
                while maintaining a strong Make-in-India fabrication presence in Vasai.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="tel:+919892906496"
                  className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-[#0A0A0A] border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 px-4 py-2 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] hover:border-[#2D5A3D] dark:hover:border-[#4ADE80] transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#2D5A3D] dark:text-[#4ADE80]" />
                  +91 98929 06496
                </a>
                <a
                  href="mailto:info@ecocatch.in"
                  className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-[#0A0A0A] border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 px-4 py-2 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] hover:border-[#2D5A3D] dark:hover:border-[#4ADE80] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#2D5A3D] dark:text-[#4ADE80]" />
                  info@ecocatch.in
                </a>
              </div>

              <div className="flex items-center gap-2 pt-2 text-sm text-[#86868b]">
                <MapPin className="h-4 w-4" />
                Mumbai, Maharashtra, India
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}