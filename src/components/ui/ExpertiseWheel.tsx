"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { YoutubeIcon } from "@/components/ui/CustomIcons";
import { 
  BookOpen, 
  Film, 
  Tv, 
  Smartphone, 
  Layers, 
  Palette, 
  BarChart,
  ArrowUpRight
} from "lucide-react";

interface ExpertiseItem {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const expertiseItems: ExpertiseItem[] = [
  { 
    name: "YouTube Videos", 
    icon: <YoutubeIcon className="w-4 h-4" />,
    description: "High-retention video packaging, multitrack pacing, and engaging visual editing."
  },
  { 
    name: "Educational Content", 
    icon: <BookOpen className="w-4 h-4" />,
    description: "Clear and structured edits designed for maximum comprehension and pacing."
  },
  { 
    name: "Promotional Videos", 
    icon: <Film className="w-4 h-4" />,
    description: "Cinematic commercial assemblies, sound design, and brand storytelling."
  },
  { 
    name: "Advertisements", 
    icon: <Tv className="w-4 h-4" />,
    description: "High-impact visual promotional campaigns designed to convert viewers."
  },
  { 
    name: "Social Reels & Shorts", 
    icon: <Smartphone className="w-4 h-4" />,
    description: "Fast-paced vertical videos optimized for social media feeds and algorithms."
  },
  { 
    name: "Motion Graphics", 
    icon: <Layers className="w-4 h-4" />,
    description: "Dynamic keyframe visual animations, lighting effects, and particle renders."
  },
  { 
    name: "Branding & Visuals", 
    icon: <Palette className="w-4 h-4" />,
    description: "Memorable logo marks, visual system designs, and vector identity assets."
  },
  { 
    name: "Marketing Creatives", 
    icon: <BarChart className="w-4 h-4" />,
    description: "Clean, conversion-oriented creatives aligned with corporate marketing strategies."
  }
];

export function ExpertiseWheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [rotationOffset, setRotationOffset] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Scroll spy scroll progress of the About container section (full lifecycle)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animated properties mapped to scroll progress
  // Enters: 0.0 -> 0.4, Active: 0.4 -> 0.6, Exits: 0.6 -> 0.95
  const wheelScale = useTransform(
    scrollYProgress, 
    [0, 0.35, 0.65, 0.95], 
    [0.75, 1, 1, 0.82]
  );
  
  const wheelOpacity = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.7, 0.9], 
    [0, 1, 1, 0]
  );
  
  const wheelRotate = useTransform(
    scrollYProgress, 
    [0, 0.35, 0.65, 0.95], 
    [-45, 0, 0, 45]
  );

  // Blueprint background circles fade out slower to transition into projects section
  const blueprintOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 0.98],
    [0, 0.05, 0.05, 0]
  );

  const blueprintScale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.75, 0.98],
    [0.75, 1, 1, 1.1]
  );

  // Handle subtle rotation offset on hover
  useEffect(() => {
    if (hoveredIdx !== null) {
      setRotationOffset(hoveredIdx * 45); // Rotates core toward hovered index
    }
  }, [hoveredIdx]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center select-none"
    >
      {/* Blueprint background construction guides (Expand on scroll) */}
      <motion.svg 
        style={{
          scale: blueprintScale,
          opacity: blueprintOpacity
        }}
        className="absolute inset-0 w-full h-full pointer-events-none text-white z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50%" cy="50%" r="160" stroke="#FFFFFF" strokeWidth="1" fill="none" />
        <circle cx="50%" cy="50%" r="90" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="4, 8" fill="none" />
        {/* Radial construction lines to each node */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          const x2 = 230 + Math.cos(angle) * 160;
          const y2 = 230 + Math.sin(angle) * 160;
          return (
            <line 
              key={i} 
              x1="50%" 
              y1="50%" 
              x2={x2} 
              y2={y2} 
              stroke="#FFFFFF" 
              strokeWidth="0.5" 
              strokeOpacity="0.4"
            />
          );
        })}
      </motion.svg>

      {/* Main Wheel Container driven by Scroll Progress */}
      <motion.div
        style={{
          scale: wheelScale,
          opacity: wheelOpacity,
          rotate: shouldReduceMotion ? 0 : wheelRotate,
        }}
        className="w-full h-full relative flex items-center justify-center z-10"
      >
        {/* CENTRAL GLOWING CORE (Visually matches the Creative Core!) */}
        <div 
          className="relative w-[180px] h-[180px] rounded-full border border-white/5 bg-[#111111]/85 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center z-30 shadow-[0_12px_36px_rgba(0,0,0,0.65)] hover:border-[#7C3AED]/25 transition-all duration-300"
          style={{
            boxShadow: hoveredIdx !== null 
              ? `0 12px 36px rgba(0,0,0,0.65), 0 0 16px rgba(124, 58, 237, 0.2)`
              : "0 12px 36px rgba(0,0,0,0.65)"
          }}
        >
          {/* Concentric rotating glass core detail */}
          <motion.div
            animate={{
              rotate: shouldReduceMotion ? 0 : [0, 360],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-2.5 rounded-full border border-white/[0.03] pointer-events-none -z-10"
          />

          {/* Dynamic Details Content display */}
          <AnimatePresence mode="wait">
            {hoveredIdx !== null ? (
              <motion.div
                key={`desc-${hoveredIdx}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="space-y-1.5 pointer-events-none"
              >
                <div className="text-[9px] uppercase tracking-widest text-[#7C3AED] font-display font-semibold">
                  Focus
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider line-clamp-1">
                  {expertiseItems[hoveredIdx].name}
                </div>
                <div className="text-[8px] text-[#A1A1AA] font-sans font-light leading-relaxed px-1">
                  {expertiseItems[hoveredIdx].description}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="core-default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1"
              >
                <span className="text-xl">⚡</span>
                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-white leading-none">
                  Expertise
                </div>
                <div className="text-[8px] text-[#A1A1AA] uppercase tracking-wider font-light leading-none pt-0.5">
                  Hover nodes to explore
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 8 PERIPHERAL CAPABILITY NODES */}
        {expertiseItems.map((item, idx) => {
          const angle = (idx * 2 * Math.PI) / expertiseItems.length;
          const radius = 160; // radius spacing
          const posX = Math.cos(angle) * radius;
          const posY = Math.sin(angle) * radius;

          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.name}
              style={{
                transform: `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px))`,
              }}
              className="absolute top-1/2 left-1/2 z-40"
            >
              {/* Outer Connector Line (revealed on hover) */}
              <svg className="absolute inset-0 w-[200px] h-[200px] pointer-events-none overflow-visible -translate-x-1/2 -translate-y-1/2 -z-10">
                <motion.line
                  x1="100"
                  y1="100"
                  x2={100 - posX}
                  y2={100 - posY}
                  stroke="#7C3AED"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: isHovered ? 1 : 0,
                    opacity: isHovered ? 0.35 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </svg>

              {/* Node Glass Capsule Button */}
              <button
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="w-10 h-10 rounded-full border border-white/5 bg-[#111111]/90 hover:border-[#7C3AED]/40 flex items-center justify-center transition-all duration-300 relative group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50"
                style={{
                  boxShadow: isHovered 
                    ? `0 6px 16px rgba(0,0,0,0.5), 0 0 10px ${isHovered ? "rgba(124, 58, 237, 0.25)" : "transparent"}`
                    : "0 4px 12px rgba(0,0,0,0.3)"
                }}
                aria-label={`View details for ${item.name}`}
              >
                {/* Node icon with rotation effect on hover */}
                <div 
                  className="text-white/60 group-hover:text-white transition-all duration-300 group-hover:rotate-[8deg] group-hover:scale-108"
                  style={{ color: isHovered ? "#A855F7" : undefined }}
                >
                  {item.icon}
                </div>
              </button>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
