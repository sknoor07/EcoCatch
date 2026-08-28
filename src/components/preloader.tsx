"use client";

import { useLoading } from "./loading-provider";
import { usePathname } from "next/navigation";

export function Preloader() {
  const { framesReady } = useLoading();
  const pathname = usePathname();
  if (pathname !== "/") return null;

  // The first hero frame is enough to show a complete, usable page. The
  // remaining animation frames continue loading in the background.
  const done = framesReady;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-[#0A0A0A] transition-all duration-1000 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-[240px] text-center">
        <div className="mb-6 text-xs tracking-[0.3em] text-[#86868b] uppercase">
          EcoCatch
        </div>
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-[#4ADE80] transition-all duration-300"
            style={{
              width: framesReady ? "100%" : "0%",
            }}
          />
        </div>
        <div className="mt-3 text-xs text-[#86868b]">
          {framesReady ? "Ready" : "Loading homepage..."}
        </div>
      </div>
    </div>
  );
}
