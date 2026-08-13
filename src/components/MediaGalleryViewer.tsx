"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Film, Maximize2 } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { useGameSystem } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";

export interface GalleryItem {
  type: "image" | "video";
  url: string;
  title?: string;
  caption?: string;
}

interface MediaGalleryViewerProps {
  items: GalleryItem[];
  projectTitle: string;
}

export default function MediaGalleryViewer({ items, projectTitle }: MediaGalleryViewerProps) {
  const { playClick } = useGameSystem();
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Touch Swipe Gesture State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Thumbnail Container Ref for Auto-Scroll
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const totalItems = items.length;
  const currentItem = items[currentIndex] || items[0];

  const handlePrev = () => {
    playClick();
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  const handleNext = () => {
    playClick();
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  };

  // Auto Scroll Gallery Strip to Keep Selected Thumbnail Centered
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[currentIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  // Touch Swipe Gesture Handlers for Mobile
  const minSwipeDistance = 40;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalItems]);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full select-none text-left">
      
      {/* ALL-IN-ONE OVERLAY DISPLAY FRAME */}
      <div 
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative w-full max-w-xl mx-auto rounded-2xl border border-black/10 dark:border-white/15 bg-black shadow-2xl overflow-hidden group"
      >
        
        {/* Top-Left Counter Badge (Theme Adaptive Light/Dark Glass Pill) */}
        <div 
          style={{
            backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)",
            color: theme === "light" ? "#0F172A" : "#FFFFFF",
            borderColor: theme === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)"
          }}
          className="absolute top-2.5 left-2.5 z-30 px-2.5 py-1 rounded-lg backdrop-blur-md border font-sans text-xs font-extrabold tracking-wider shadow-md"
        >
          {String(currentIndex + 1).padStart(2, "0")}/{String(totalItems).padStart(2, "0")}
        </div>

        {/* Top-Right Fullscreen Expand for Images (Theme Adaptive Pill) */}
        {currentItem.type === "image" && (
          <button
            onClick={() => {
              playClick();
              setFullscreenImage(currentItem.url);
            }}
            style={{
              backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)",
              color: theme === "light" ? "#0F172A" : "#FFFFFF",
              borderColor: theme === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)"
            }}
            className="absolute top-2.5 right-2.5 z-30 p-1.5 rounded-lg backdrop-blur-md border hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            title="Expand Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Left Floating Arrow Overlay Button */}
        {totalItems > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous"
            style={{
              backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(0, 0, 0, 0.8)",
              color: theme === "light" ? "#0F172A" : "#FFFFFF",
              borderColor: theme === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)"
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Right Floating Arrow Overlay Button */}
        {totalItems > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next"
            style={{
              backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(0, 0, 0, 0.8)",
              color: theme === "light" ? "#0F172A" : "#FFFFFF",
              borderColor: theme === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)"
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Display Container (Image or Video) */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[420px] flex items-center justify-center bg-black overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full relative flex items-center justify-center"
            >
              {currentItem.type === "video" ? (
                <iframe
                  src={currentItem.url}
                  title={`${projectTitle} - Clip ${currentIndex + 1}`}
                  className="w-full h-full border-0 object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div 
                  className="relative w-full h-full cursor-zoom-in"
                  onClick={() => {
                    playClick();
                    setFullscreenImage(currentItem.url);
                  }}
                >
                  <Image
                    src={getAssetPath(currentItem.url)}
                    alt={`${projectTitle} - Item ${currentIndex + 1}`}
                    fill
                    unoptimized={true}
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Floating Thumbnail Filmstrip Overlay (Compact & Auto-Scrolling) */}
        {totalItems > 1 && (
          <div 
            style={{
              backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.88)" : "rgba(0, 0, 0, 0.85)",
              borderColor: theme === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)"
            }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 max-w-[88%] px-1.5 py-1 rounded-xl backdrop-blur-md border flex gap-1.5 overflow-x-auto scrollbar-none snap-x shadow-2xl"
          >
            {items.map((item, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={idx}
                  ref={(el) => {
                    thumbnailRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`snap-center shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-lg relative overflow-hidden border transition-all cursor-pointer ${
                    isActive
                      ? "border-[#C084FC] ring-2 ring-[#C084FC] scale-105"
                      : "border-black/20 dark:border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  {item.type === "image" ? (
                    <Image
                      src={getAssetPath(item.url)}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      unoptimized={true}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0E0C22] flex flex-col items-center justify-center gap-0.5 text-white">
                      <Film className="w-3 h-3 text-[#C084FC]" />
                      <span className="font-sans text-[7px] font-bold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-xl"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImage(null);
              }}
              className="absolute top-6 right-6 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-sans text-xs font-semibold backdrop-blur-md transition-all shadow-xl z-[100000]"
            >
              Close ✕
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              src={getAssetPath(fullscreenImage)}
              alt="Expanded View"
              className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain border border-white/20 rounded-2xl shadow-2xl select-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
