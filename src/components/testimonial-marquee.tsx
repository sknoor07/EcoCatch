"use client";

const testimonials = [
  { name: "GreenField Farms", location: "Pune, MH", quote: "EcoCatch reduced our energy costs by 70% within the first year." },
  { name: "AgroTech Industries", location: "Nashik, MH", quote: "The EPC team delivered our 500kW plant ahead of schedule." },
  { name: "Municipal Corp", location: "Indore, MP", quote: "Turning city waste into city power — truly transformative." },
  { name: "DairyCooperative", location: "Anand, GJ", quote: "Slurry from the plant became our best organic fertilizer." },
  { name: "RiceMill Association", location: "Karnal, HR", quote: "Husk and paddy straw now power our entire facility." },
];

export function TestimonialMarquee() {
  return (
    <section className="relative overflow-hidden bg-[#F0F0F0] dark:bg-[#111] py-20">
      <div className="mb-12 text-center px-4">
        <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">Trusted Across India</p>
        <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-4xl">
          Voices of change
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee gap-6 px-3 whitespace-nowrap">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[340px] shrink-0 rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] p-6 shadow-sm"
            >
              <p className="mb-4 text-sm leading-relaxed text-[#1A1A1A] dark:text-[#E5E5E5] whitespace-normal">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F4E8] dark:bg-[#1a3d2a] text-xs font-bold text-[#2D5A3D] dark:text-[#4ADE80]">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">{t.name}</p>
                  <p className="text-xs text-[#86868b]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}