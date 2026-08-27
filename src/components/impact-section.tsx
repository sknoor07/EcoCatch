"use client";

import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Plants Installed" },
  { value: 50, suffix: "MW", label: "Energy Generated" },
  { value: 8, suffix: " Years", label: "of Excellence" },
  { value: 100, suffix: "%", label: "Make in India" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl font-bold text-[#2D5A3D] dark:text-[#4ADE80] sm:text-6xl tabular-nums">
      {count}{suffix}
    </div>
  );
}

export function ImpactSection() {
  return (
    <section id="impact" className="relative py-24 px-4 bg-[#F0F0F0] dark:bg-[#111] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[#4ADE80] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#2D5A3D] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
            Our Impact
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
            Numbers that matter
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="group space-y-3">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="h-[1px] w-8 mx-auto bg-[#2D5A3D]/30 dark:bg-[#4ADE80]/30 transition-all duration-500 group-hover:w-16" />
              <p className="text-sm font-medium text-[#86868b] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}