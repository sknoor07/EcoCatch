"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const founders = [
  {
    initials: "YR",
    name: "Yugal Roy",
    role: "Founder & Managing Director",
    photo: "",
    bio: "A visionary entrepreneur who saw opportunity in India's agricultural waste. With deep expertise spanning biogas, waste processing, oil & gas, cement, industrial automation, and energy audits, Yugal built EcoCatch into a full-service EPC company trusted by 150+ clients across the nation.",
    extra: "Under his leadership, EcoCatch has bridged global technology with local execution — importing cutting-edge equipment from Italy, Northern Ireland, UK, and the US, while maintaining a strong Make-in-India fabrication presence in Vasai.",
    phone: "+919892906496",
    email: "yugal.roy@ecocatch.in",
    linkedin: "https://www.linkedin.com/in/yugal-roy-385661152/",
    location: "Mumbai, Maharashtra, India",
    gradient: "from-[#1B4332] to-[#2D5A3D]",
  },
  {
    initials: "ZM",
    name: "Zulkif Mukhtar",
    role: "Co-Founder & CTO",
    photo: "",
    bio: "Biomethanation & Sustainable Waste Management Specialist Holding an M.Tech in Green Technology from the Institute of Chemical Technology (ICT), Mumbai, Zulkif Shaikh is a seasoned professional in the field of waste-to-energy, with a specific focus on biomethanation. He has over nine years of expertise in designing, commissioning, and managing decentralized biogas systems, integrating community stakeholders, industries, and ULBs.",
    extra: "He leads R&D partnerships with European technology providers and ensures every plant design meets the highest efficiency and safety standards.",
    phone: "+919876543210",
    email: "amit@ecocatch.in",
    linkedin: "https://www.linkedin.com/in/zulkif-shaikh-01b1617a/",
    location: "Mumbai, Maharashtra, India",
    gradient: "from-[#0F2E1F] to-[#1B4332]",
  },
  {
    initials: "AP",
    name: "ABHAYKUMAR PATIL",
    role: "Co-Founder & COO",
    photo: "",
    bio: "A seasoned engineering professional with 35+ years of expertise in industrial electronics, electrical panel design, automation systems, corrosion protection, STP/biogas/WtE technologies, and international technical marketing. Demonstrated ability to lead complex engineering assignments, deliver sustainable infrastructure solutions, and support global industrial clients. Recognized for combining deep technical insight with practical execution across power plants, oil & gas, waste management, and manufacturing ecosystems.",
    extra: "Her background in industrial automation and energy audits ensures seamless integration of imported technology with local fabrication and on-ground execution.",
    phone: "+919812345678",
    email: "sneha@ecocatch.in",
    linkedin: "https://linkedin.com/in/sneha-patel",
    location: "Mumbai, Maharashtra, India",
    gradient: "from-[#2D5A3D] to-[#1B4332]",
  },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function FounderProfile() {
  return (
    <section className="relative overflow-hidden py-24 px-4 bg-[#F0F0F0] dark:bg-[#0A0A0A]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[#4ADE80]/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#2D5A3D]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium tracking-[0.25em] text-[#86868b] uppercase">
              The People Behind the Mission
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
              Meet Our <span className="text-[#2D5A3D] dark:text-[#4ADE80]">Leadership</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {founders.map((founder, idx) => (
            <ScrollReveal key={founder.initials} delay={idx * 0.15}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#4ADE80]/10">

                {/* Green Header */}
                <div className={`relative h-36 bg-gradient-to-br ${founder.gradient}`}>
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>

                {/* Avatar - ALWAYS circular, overlapping header & body */}
                <div className="relative flex justify-center">
                  <div className="absolute -top-16">
                    <div className=" relative h-32 w-32 rounded-full border-4 border-white dark:border-[#111] bg-[#1B4332] shadow-xl overflow-hidden transition-transform duration-500 group-hover:scale-105">
                      {founder.photo.trim() ? (
                        <Image
                          src={founder.photo}
                          alt={founder.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-3xl font-bold text-white">
                            {founder.initials}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col px-7 pt-20 pb-7 text-center">
                  <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#E5E5E5]">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold tracking-wide text-[#2D5A3D] dark:text-[#4ADE80] uppercase">
                    {founder.role}
                  </p>

                  <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#86868b] text-left">
                    <p>{founder.bio}</p>
                    <p>{founder.extra}</p>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="mb-4 flex items-center justify-center gap-2 text-xs text-[#86868b]">
                      <MapPin className="h-3.5 w-3.5" />
                      {founder.location}
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      {/* <a
                        href={`tel:${founder.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F0F0] dark:bg-[#1A1A1A] px-3 py-1.5 text-xs font-medium text-[#1A1A1A] dark:text-[#E5E5E5] transition-colors hover:bg-[#2D5A3D] hover:text-white dark:hover:bg-[#4ADE80] dark:hover:text-[#0A0A0A]"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call
                      </a> */}
                      <a
                        href={`mailto:${founder.email}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F0F0] dark:bg-[#1A1A1A] px-3 py-1.5 text-xs font-medium text-[#1A1A1A] dark:text-[#E5E5E5] transition-colors hover:bg-[#2D5A3D] hover:text-white dark:hover:bg-[#4ADE80] dark:hover:text-[#0A0A0A]"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Email
                      </a>
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F0F0] dark:bg-[#1A1A1A] px-3 py-1.5 text-xs font-medium text-[#1A1A1A] dark:text-[#E5E5E5] transition-colors hover:bg-[#0077b5] hover:text-white"
                      >
                        <LinkedInIcon className="h-3.5 w-3.5" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#2D5A3D] to-[#4ADE80] transition-all duration-500 group-hover:w-full" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}