"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, ImageOff } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  slug: string;
  images: string[] | null;
  productName: string;
}

const swipeConfidenceThreshold = 80;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function ProductGallery({ slug, images, productName }: ProductGalleryProps) {
  const [gallery, setGallery] = useState<string[]>(images ?? []);
  const [isSyncing, setIsSyncing] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Keep the initially server-rendered images visible instantly (good for
  // SEO + no layout shift), then quietly refresh from the API in case the
  // DB has changed since this page was last built/cached.
  useEffect(() => {
    let cancelled = false;

    axios
      .get<{ images: string[] }>(`/api/products/${slug}`)
      .then((res) => {
        if (cancelled) return;
        const fresh = res.data?.images ?? [];
        if (fresh.length > 0) {
          setGallery(fresh);
        }
      })
      .catch(() => {
        // Silently keep whatever we already have (server-rendered fallback).
      })
      .finally(() => {
        if (!cancelled) setIsSyncing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const goTo = useCallback(
    (index: number, dir: number) => {
      if (gallery.length === 0) return;
      const next = (index + gallery.length) % gallery.length;
      setDirection(dir);
      setActiveIndex(next);
    },
    [gallery.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);

  const openLightboxAt = (index: number) => {
    setDirection(0);
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -swipeConfidenceThreshold) {
      goNext();
    } else if (info.offset.x > swipeConfidenceThreshold) {
      goPrev();
    }
  };

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, goNext, goPrev]);

  // No images at all (even after the API check) — show a clean empty state
  // instead of silently rendering nothing.
  if (!isSyncing && gallery.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-white dark:bg-[#111] p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F0F0] dark:bg-[#1a1a1a]">
          <ImageOff className="h-5 w-5 text-[#86868b]" />
        </div>
        <p className="text-sm text-[#86868b]">
          Product images for {productName} are coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#111] p-4 md:p-6">
      {/* Main preview */}
      <button
        type="button"
        onClick={() => gallery.length > 0 && openLightboxAt(activeIndex)}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#F0F0F0] dark:bg-[#1a1a1a] cursor-zoom-in"
        aria-label={`View ${productName} images, image ${activeIndex + 1} of ${gallery.length}`}
      >
        {gallery.length === 0 ? (
          <div className="flex h-full w-full animate-pulse items-center justify-center">
            <ImageOff className="h-8 w-8 text-[#86868b]/40" />
          </div>
        ) : (
          <Image
            src={gallery[activeIndex]}
            alt={`${productName} — image ${activeIndex + 1}`}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
            priority
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/10 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
            <Expand className="h-3.5 w-3.5" />
            Click to enlarge
          </span>
        </div>

        {/* Counter badge */}
        {gallery.length > 1 && (
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {activeIndex + 1} / {gallery.length}
          </span>
        )}
      </button>

      {/* Thumbnail row */}
      {gallery.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              className={cn(
                "relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-[#F0F0F0] dark:bg-[#1a1a1a] transition-colors",
                i === activeIndex
                  ? "border-[#2D5A3D] dark:border-[#4ADE80]"
                  : "border-transparent hover:border-[#1A1A1A]/15 dark:hover:border-[#E5E5E5]/15"
              )}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === activeIndex}
            >
                <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton
          className="max-w-[95vw] w-full gap-0 overflow-hidden rounded-2xl border border-[#1A1A1A]/10 bg-white p-0 sm:max-w-3xl lg:max-w-5xl dark:border-[#E5E5E5]/10 dark:bg-[#111]"
        >
          <DialogTitle className="sr-only">
            {productName} — image {activeIndex + 1} of {gallery.length}
          </DialogTitle>

          <div className="relative flex h-[70vh] max-h-[600px] w-full flex-col bg-white dark:bg-black sm:h-[75vh]">
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  drag={gallery.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0"
                >
                  <Image
                    src={gallery[activeIndex]}
                    alt={`${productName} — image ${activeIndex + 1}`}
                    fill
                    sizes="(min-width: 1024px) 1024px, 95vw"
                    className="object-contain p-3    "
                    priority
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {gallery.length > 1 && (
                <>
                  <motion.button
                    type="button"
                    onClick={goPrev}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-black/30 sm:left-4  "
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 " />
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={goNext}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-black/30 sm:right-4 "
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>

                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {activeIndex + 1} / {gallery.length}
                  </span>
                </>
              )}
            </div>

            {/* In-dialog thumbnail strip */}
            {gallery.length > 1 && (
              <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-white/10 bg-black/40 p-3 [scrollbar-width:thin]">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                    className={cn(
                      "relative h-12 w-12 shrink-0 overflow-hidden rounded-md border-2 transition-colors sm:h-14 sm:w-14",
                      i === activeIndex
                        ? "border-[#4ADE80]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}