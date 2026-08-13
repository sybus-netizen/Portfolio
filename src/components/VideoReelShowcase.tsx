"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Film
} from "lucide-react";
import { useGameSystem } from "@/context/GameContext";

export interface ClipItem {
  url?: string;
  title?: string;
  desc?: string;
  likes?: number;
}

interface VideoReelShowcaseProps {
  videos: string[];
  clipDetails?: ClipItem[];
  projectTitle: string;
}

export default function VideoReelShowcase({
  videos,
  clipDetails,
  projectTitle,
}: VideoReelShowcaseProps) {
  const { playClick } = useGameSystem();
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalClips = videos.length;
  const currentVideoUrl = videos[currentIndex];

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let cleanUrl = url;
    if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
      const hasQuery = cleanUrl.includes("?");
      return cleanUrl + (hasQuery ? "&rel=0" : "?rel=0");
    }
    return cleanUrl;
  };

  const handlePrev = () => {
    playClick();
    setCurrentIndex((prev) => (prev === 0 ? totalClips - 1 : prev - 1));
  };

  const handleNext = () => {
    playClick();
    setCurrentIndex((prev) => (prev === totalClips - 1 ? 0 : prev + 1));
  };



  // Keyboard navigation arrow listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalClips]);

  const currentDetails = clipDetails?.[currentIndex] || {
    title: `Reel Clip ${String(currentIndex + 1).padStart(2, "0")}`,
    desc: "Vertical Promotional Short & Motion Graphics Edit"
  };

  const prevIndex = (currentIndex - 1 + totalClips) % totalClips;
  const nextIndex = (currentIndex + 1) % totalClips;

  return (
    <div className="w-full space-y-8 select-none">
      


      {/* Main 3D Reels Carousel Stage */}
      <div className="relative w-full flex items-center justify-center min-h-[480px] sm:min-h-[600px] py-4 overflow-hidden">
        
        {/* Left Circular Navigation Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous Clip"
          className="absolute left-2 sm:left-6 md:left-12 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white text-black font-extrabold flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3]" />
        </button>

        {/* 3D Stacked Carousel Cards Wrapper */}
        <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto">
          
          {/* PREVIOUS REEL PREVIEW CARD (LEFT) */}
          {totalClips > 1 && (
            <motion.div
              key={`prev-${prevIndex}`}
              onClick={handlePrev}
              className="absolute left-4 sm:left-12 md:left-20 w-[200px] sm:w-[240px] aspect-[9/16] rounded-2xl border border-white/10 bg-[#131130]/90 shadow-2xl opacity-40 blur-[1px] scale-85 hover:opacity-60 cursor-pointer hidden sm:flex flex-col items-center justify-center overflow-hidden z-10 transition-all duration-300"
              whileHover={{ scale: 0.88, opacity: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <iframe
                src={videos[prevIndex]}
                title="Previous Clip"
                className="w-full h-full pointer-events-none opacity-60"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                <span className="font-sans text-[10px] text-[#C084FC] font-extrabold uppercase tracking-wider block">
                  PREVIOUS
                </span>
                <span className="font-sans text-xs text-white font-bold truncate block">
                  Clip {String(prevIndex + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          )}

          {/* ACTIVE CENTER REEL CARD */}
          <motion.div
            key={`active-${currentIndex}`}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-[260px] xs:w-[280px] sm:w-[320px] md:w-[340px] aspect-[9/16] rounded-3xl border-2 border-white/20 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(192,132,252,0.2)] overflow-hidden z-20 group"
          >
            {/* The Video Iframe */}
            <iframe
              src={getEmbedUrl(currentVideoUrl)}
              title={`${projectTitle} - Clip ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full border-0 object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>

          {/* NEXT REEL PREVIEW CARD (RIGHT) */}
          {totalClips > 1 && (
            <motion.div
              key={`next-${nextIndex}`}
              onClick={handleNext}
              className="absolute right-4 sm:right-12 md:right-20 w-[200px] sm:w-[240px] aspect-[9/16] rounded-2xl border border-white/10 bg-[#131130]/90 shadow-2xl opacity-40 blur-[1px] scale-85 hover:opacity-60 cursor-pointer hidden sm:flex flex-col items-center justify-center overflow-hidden z-10 transition-all duration-300"
              whileHover={{ scale: 0.88, opacity: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <iframe
                src={videos[nextIndex]}
                title="Next Clip"
                className="w-full h-full pointer-events-none opacity-60"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                <span className="font-sans text-[10px] text-[#FFA5A5] font-extrabold uppercase tracking-wider block">
                  NEXT
                </span>
                <span className="font-sans text-xs text-white font-bold truncate block">
                  Clip {String(nextIndex + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          )}

        </div>

        {/* Right Circular Navigation Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next Clip"
          className="absolute right-2 sm:right-6 md:right-12 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-black font-extrabold flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
        </button>

      </div>

      {/* Horizontal Scrolling Video Gallery Strip */}
      <div className="w-full p-4 rounded-2xl bg-[#131130]/80 border border-white/10 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" /> Video Reels Gallery Strip
          </span>
          <span className="text-slate-400 font-semibold">
            {currentIndex + 1} of {totalClips} Clips (Scroll ➔)
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-[#C084FC]/40 scrollbar-track-white/5 snap-x">
          {videos.map((_, idx) => {
            const isActive = currentIndex === idx;
            const details = clipDetails?.[idx];
            return (
              <button
                key={idx}
                onClick={() => {
                  playClick();
                  setCurrentIndex(idx);
                }}
                className={`snap-center shrink-0 w-32 sm:w-40 p-3 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-br from-[#C084FC]/30 to-[#FFA5A5]/30 border-[#C084FC] shadow-[0_0_20px_rgba(192,132,252,0.4)] scale-102"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`px-2 py-0.5 rounded-md font-sans text-[9px] font-extrabold uppercase ${
                    isActive ? "bg-[#C084FC] text-[#131130]" : "bg-white/10 text-slate-300"
                  }`}>
                    CLIP {String(idx + 1).padStart(2, "0")}
                  </span>
                  {isActive && <Film className="w-3.5 h-3.5 text-[#C084FC]" />}
                </div>

                <span className="font-sans text-xs font-bold text-white truncate block">
                  {details?.title || `Clip ${String(idx + 1).padStart(2, "0")}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
