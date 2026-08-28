"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

export function BiogasPlant3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const frameCountRef = useRef(300);
  const [loadedCount, setLoadedCount] = useState(0);
  const [frameCount, setFrameCount] = useState(300);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);

  const getFrameName = useCallback((index: number) => `/images/explode/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px 0px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isNearViewport) return;
    const step = window.matchMedia("(max-width: 767px)").matches ? 4 : 1;
    const numbers = Array.from({ length: Math.ceil(300 / step) }, (_, index) => Math.min(1 + index * step, 300));
    if (numbers.at(-1) !== 300) numbers.push(300);
    let cancelled = false;
    let loaded = 0;
    const images = numbers.map((number) => {
      const image = new Image();
      image.decoding = "async";
      const complete = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadedCount(loaded);
        if (loaded === 1) setFrameCount(numbers.length);
        if (loaded === numbers.length) setIsLoaded(true);
      };
      image.onload = complete;
      image.onerror = complete;
      image.src = getFrameName(number);
      return image;
    });
    imagesRef.current = images;
    frameCountRef.current = numbers.length;
    return () => { cancelled = true; imagesRef.current = []; };
  }, [getFrameName, isNearViewport]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    const image = imagesRef.current[frameIndex];
    if (!canvas || !container || !ctx || !image?.naturalWidth) return;
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const scale = Math.max(rect.width / image.width, rect.height / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.drawImage(image, (rect.width - width) / 2, (rect.height - height) / 2, width, height);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const animate = () => {
      const difference = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(difference) < 0.1) {
        currentFrameRef.current = targetFrameRef.current;
        drawFrame(Math.round(currentFrameRef.current));
        rafRef.current = null;
        return;
      }
      currentFrameRef.current += difference * 0.04;
      drawFrame(Math.round(currentFrameRef.current));
      rafRef.current = requestAnimationFrame(animate);
    };
    if (rafRef.current === null && currentFrameRef.current !== targetFrameRef.current) rafRef.current = requestAnimationFrame(animate);
    else drawFrame(Math.round(currentFrameRef.current));
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); rafRef.current = null; };
  }, [drawFrame, isExploded, isLoaded]);

  useEffect(() => {
    const onResize = () => isLoaded && drawFrame(Math.round(currentFrameRef.current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame, isLoaded]);

  const toggleExplode = () => {
    if (!isLoaded) return;
    setIsExploded((value) => {
      targetFrameRef.current = value ? 0 : frameCountRef.current - 1;
      return !value;
    });
  };

  return (
    <section ref={sectionRef} id="plants" className="relative bg-[#FAF9F6] px-4 py-24 dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#86868b]">Explore</p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">Interactive Plant Model</h2>
          <p className="mx-auto mt-4 max-w-xl text-[#86868b]">Click the visualizer to explore the internals of the plant.</p>
        </div>
        <div ref={containerRef} className="relative h-[400px] w-full cursor-pointer overflow-hidden rounded-3xl border border-[#1A1A1A]/10 bg-[#050505] shadow-2xl dark:border-[#E5E5E5]/10 sm:h-[500px] md:h-[600px]" onClick={toggleExplode}>
          {!isLoaded && <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505] text-white"><Loader2 className="mb-4 h-8 w-8 animate-spin text-[#4ADE80]" /><p className="text-xs text-[#86868b]">{isNearViewport ? `Loading model: ${Math.floor((loadedCount / frameCount) * 100)}%` : "Model will load when you reach this section"}</p></div>}
          <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`} />
          {isLoaded && <div className="absolute bottom-6 left-6 rounded-full border border-[#1A1A1A]/5 bg-white/90 px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] shadow-lg backdrop-blur-md dark:border-[#E5E5E5]/10 dark:bg-black/90 dark:text-[#E5E5E5]">{isExploded ? "Click to assemble" : "Click to explode"}</div>}
        </div>
      </div>
    </section>
  );
}
