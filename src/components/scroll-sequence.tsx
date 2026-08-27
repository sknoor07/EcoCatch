"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLoading } from "./loading-provider";

// Inside ScrollSequence component:


interface ScrollSequenceProps {
  framePath?: string;
  framePrefix?: string;
  frameExtension?: string;
  startFrame?: number;
  totalFrames?: number;
  framePadding?: number;
  smoothing?: number;
  className?: string;
}

export function ScrollSequence({
  framePath = "/images/",
  framePrefix = "ezgif-frame-",
  frameExtension = ".jpg",
  startFrame = 1,
  totalFrames = 300,
  framePadding = 3,
  smoothing = 0.08,
  className = "",
}: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafRef = useRef<number>(0);
  const { setFramesReady } = useLoading();

  const getFrameName = useCallback(
    (index: number) => {
      const padded = index.toString().padStart(framePadding, "0");
      return `${framePath}${framePrefix}${padded}${frameExtension}`;
    },
    [framePath, framePrefix, frameExtension, framePadding]
  );

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = startFrame; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFrameName(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) setIsLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
    return () => {
      imagesRef.current = [];
    };
  }, [getFrameName, startFrame, totalFrames]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    if (imagesRef.current[Math.round(currentFrameRef.current) - 1]) {
      drawFrame(Math.round(currentFrameRef.current));
    }
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex - 1];
    if (!canvas || !ctx || !img || !img.complete) return;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    const x = (canvasWidth - drawWidth) / 2;
    const y = (canvasHeight - drawHeight) / 2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const sectionTop = container.offsetTop;
      const sectionHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      let progress = (scrollTop - sectionTop) / (sectionHeight - viewportHeight);
      progress = Math.max(0, Math.min(1, progress));
      targetFrameRef.current = 1 + progress * (totalFrames - 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalFrames]);

  useEffect(() => {
    if (!isLoaded) return;
    const loop = () => {
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * smoothing;
      drawFrame(Math.round(currentFrameRef.current));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isLoaded, smoothing, drawFrame]);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (isLoaded) resizeCanvas();
  }, [isLoaded, resizeCanvas]);

  useEffect(() => {
  if (loadedCount === totalFrames) {
    setFramesReady(true);
  }
}, [loadedCount, totalFrames, setFramesReady]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: "600vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
            <div className="w-[200px] text-center">
              <div className="mb-4 text-xs tracking-[0.2em] text-[#86868b]">LOADING EXPERIENCE</div>
              <div className="h-[2px] w-full overflow-hidden rounded bg-white/10">
                <div className="h-full bg-white transition-all duration-100" style={{ width: `${Math.floor((loadedCount / totalFrames) * 100)}%` }} />
              </div>
              <div className="mt-2 text-xs text-white">{Math.floor((loadedCount / totalFrames) * 100)}%</div>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <ScrollTextOverlay progress={scrollProgress} start={0.1} end={0.25}>
            <h3 className="text-center text-4xl font-semibold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] sm:text-5xl md:text-7xl">
              A NEW ERA
            </h3>
          </ScrollTextOverlay>
          <ScrollTextOverlay progress={scrollProgress} start={0.35} end={0.5}>
            <h3 className="text-center text-4xl font-semibold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] sm:text-5xl md:text-7xl">
              ENGINEERED<br />FORWARD
            </h3>
          </ScrollTextOverlay>
          <ScrollTextOverlay progress={scrollProgress} start={0.6} end={0.75}>
            <h3 className="text-center text-4xl font-semibold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] sm:text-5xl md:text-7xl">
              PRECISION<br />IN EVERY DETAIL
            </h3>
          </ScrollTextOverlay>
          <ScrollTextOverlay progress={scrollProgress} start={0.85} end={1.0}>
            <h3 className="text-center text-4xl font-semibold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] sm:text-5xl md:text-7xl">
              THE FUTURE<br />IS HERE
            </h3>
          </ScrollTextOverlay>
        </div>
        <div className="fixed right-5 top-1/2 z-10 hidden -translate-y-1/2 md:block">
          <div className="h-[100px] w-[2px] rounded-full bg-white/10">
            <div
              className="w-full rounded-full bg-white transition-all duration-75"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollTextOverlay({
  children,
  progress,
  start,
  end,
}: {
  children: React.ReactNode;
  progress: number;
  start: number;
  end: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const duration = end - start;
    const sceneProgress = (progress - start) / duration;

    if (progress < start || progress > end) {
      el.style.opacity = "0";
      const transformY = progress < start ? 40 : -40;
      el.style.transform = `translateY(${transformY}px)`;
      return;
    }

    const opacity = Math.sin(sceneProgress * Math.PI);
    const transformY = 40 - sceneProgress * 80;

    el.style.opacity = opacity.toFixed(3);
    el.style.transform = `translateY(${transformY}px)`;
  }, [progress, start, end]);

  return (
    <div
      ref={ref}
      className="absolute will-change-[opacity,transform]"
      style={{ opacity: 0, transform: "translateY(40px)" }}
    >
      {children}
    </div>
  );
}