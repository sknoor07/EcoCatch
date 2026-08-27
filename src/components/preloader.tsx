"use client";

import { useLoading } from "./loading-provider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Preloader() {
  const { framesReady, sceneReady, setFramesReady, setSceneReady } = useLoading();
  const pathname = usePathname();
  const isHome = pathname === "/";
  if (pathname !== "/") return null;

  // On non-home pages, auto-mark everything as ready so preloader dismisses
  useEffect(() => {
    if (!isHome) {
      setFramesReady(true);
      setSceneReady(true);
    }
  }, [isHome, setFramesReady, setSceneReady]);

  const done = framesReady && sceneReady;

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
              width: `${((framesReady ? 1 : 0) + (sceneReady ? 1 : 0)) * 50}%`,
            }}
          />
        </div>
        <div className="mt-3 text-xs text-[#86868b]">
          {framesReady
            ? sceneReady
              ? "Ready"
              : "Preparing 3D scene..."
            : "Loading frames..."}
        </div>
      </div>
    </div>
  );
}