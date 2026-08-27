"use client";

import { ScrollSequence } from "./scroll-sequence";

export function HeroSection() {
  return (
    <section className="relative">
      {/* Static hero intro (above the fold before scroll) */}
      <div className="relative flex h-screen flex-col items-center justify-center text-center px-4">
        <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[#86868b] dark:text-[#86868b] uppercase animate-fade-in">
          Introducing
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-7xl md:text-8xl lg:text-9xl">
          CLEAN ENERGY
        </h1>
        <p className="max-w-xl text-lg text-[#86868b] dark:text-[#86868b]">
          Scroll to explore how EcoCatch transforms organic waste into
          sustainable BioGAS for a greener India.
        </p>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-widest text-[#86868b] uppercase">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-[#86868b]" />
        </div>
      </div>

      {/* Scroll-driven canvas sequence */}
      <ScrollSequence
        framePath="/images/powerplant/"
        framePrefix="ezgif-frame-"
        frameExtension=".jpg"
        totalFrames={276}
        smoothing={0.08}
      />
    </section>
  );
}