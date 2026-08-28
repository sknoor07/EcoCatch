"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLoading } from "./loading-provider";

interface ScrollSequenceProps {
  framePath?: string;
  framePrefix?: string;
  frameExtension?: string;
  startFrame?: number;
  totalFrames?: number;
  framePadding?: number;
  className?: string;
}

export function ScrollSequence({ framePath = "/images/", framePrefix = "ezgif-frame-", frameExtension = ".jpg", startFrame = 1, totalFrames = 300, framePadding = 3, className = "" }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const drawRafRef = useRef<number | null>(null);
  const frameCountRef = useRef(totalFrames);
  const [loadedCount, setLoadedCount] = useState(0);
  const [frameCount, setFrameCount] = useState(totalFrames);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { setFramesReady } = useLoading();

  const getFrameName = useCallback((index: number) => `${framePath}${framePrefix}${index.toString().padStart(framePadding, "0")}${frameExtension}`, [frameExtension, framePadding, framePath, framePrefix]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const image = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !image?.complete || !image.naturalWidth) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const scale = Math.max(width / image.width, height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const step = isMobile ? 4 : 1;
    const frameNumbers = Array.from({ length: Math.ceil((totalFrames - startFrame + 1) / step) }, (_, index) => Math.min(startFrame + index * step, totalFrames));
    if (frameNumbers.at(-1) !== totalFrames) frameNumbers.push(totalFrames);

    let cancelled = false;
    let loaded = 0;
    const images = frameNumbers.map(() => new Image());
    images.forEach((image) => {
      image.decoding = "async";
      const complete = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadedCount(loaded);
        if (loaded === 1) {
          setFrameCount(frameNumbers.length);
          setFramesReady(true);
        }
        if (loaded === frameNumbers.length) setIsLoaded(true);
      };
      image.onload = complete;
      image.onerror = complete;
    });
    imagesRef.current = images;
    frameCountRef.current = frameNumbers.length;

    // Paint a first frame before background-loading the rest of the sequence.
    images[0].src = getFrameName(frameNumbers[0]);
    const timer = window.setTimeout(() => {
      images.slice(1).forEach((image, index) => { image.src = getFrameName(frameNumbers[index + 1]); });
    }, 120);
    return () => { cancelled = true; window.clearTimeout(timer); imagesRef.current = []; };
  }, [getFrameName, setFramesReady, startFrame, totalFrames]);

  useEffect(() => {
    if (!isLoaded) return;
    const container = containerRef.current;
    if (!container) return;
    const updateFrame = () => {
      drawRafRef.current = null;
      const progress = Math.max(0, Math.min(1, (window.scrollY - container.offsetTop) / (container.offsetHeight - window.innerHeight)));
      setScrollProgress(progress);
      drawFrame(Math.round(progress * (frameCountRef.current - 1)));
    };
    const onScroll = () => {
      if (drawRafRef.current === null) drawRafRef.current = requestAnimationFrame(updateFrame);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (drawRafRef.current !== null) cancelAnimationFrame(drawRafRef.current);
    };
  }, [drawFrame, isLoaded]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: "600vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {!isLoaded && <div className="absolute inset-0 z-20 flex items-center justify-center bg-black text-xs text-white">Loading experience: {Math.floor((loadedCount / frameCount) * 100)}%</div>}
        <canvas ref={canvasRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <ScrollTextOverlay progress={scrollProgress} start={0.1} end={0.25}>A NEW ERA</ScrollTextOverlay>
          <ScrollTextOverlay progress={scrollProgress} start={0.35} end={0.5}>ENGINEERED<br />FORWARD</ScrollTextOverlay>
          <ScrollTextOverlay progress={scrollProgress} start={0.6} end={0.75}>PRECISION<br />IN EVERY DETAIL</ScrollTextOverlay>
          <ScrollTextOverlay progress={scrollProgress} start={0.85} end={1}>THE FUTURE<br />IS HERE</ScrollTextOverlay>
        </div>
      </div>
    </div>
  );
}

function ScrollTextOverlay({ children, progress, start, end }: { children: React.ReactNode; progress: number; start: number; end: number }) {
  const sceneProgress = (progress - start) / (end - start);
  const visible = progress >= start && progress <= end;
  return <div className="absolute text-center text-4xl font-semibold tracking-tight text-white will-change-[opacity,transform] sm:text-5xl md:text-7xl" style={{ opacity: visible ? Math.sin(sceneProgress * Math.PI) : 0, transform: `translateY(${visible ? 40 - sceneProgress * 80 : progress < start ? 40 : -40}px)` }}>{children}</div>;
}
