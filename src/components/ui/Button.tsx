"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGameSystem } from "@/context/GameContext";

// Sparkle Star SVG
const SparkleStar = () => (
  <svg width="8" height="8" viewBox="0 0 10 10" fill="#FFDE47" className="animate-sparkle select-none pointer-events-none">
    <rect x="4" y="0" width="2" height="10" />
    <rect x="0" y="4" width="10" height="2" />
    <rect x="3" y="3" width="4" height="4" />
  </svg>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  onClick,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [clickBursts, setClickBursts] = useState<number[]>([]);

  const { playClick } = useGameSystem();

  // Trigger tactile particle burst on click
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();

    // Spawn a unique ID to represent click burst instance
    const id = Date.now() + Math.random();
    setClickBursts((prev) => [...prev, id]);
    
    // Auto-remove particles after animation completes (450ms)
    setTimeout(() => {
      setClickBursts((prev) => prev.filter((item) => item !== id));
    }, 450);

    if (onClick) onClick(e);
  };

  // Shadow details based on variant
  const shadowColor = "#000000";

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOnClick}
      
      // Idle Float loop: subtle bounce and brightness pulse every 3-5 seconds
      animate={{
        y: isHovered ? -4 : [0, -1.5, 0],
        filter: isHovered ? "brightness(1.06)" : ["brightness(1)", "brightness(1.03)", "brightness(1)"],
        scale: isHovered ? 1.03 : 1,
        boxShadow: isHovered 
          ? `4.5px 4.5px 0px ${shadowColor}` 
          : `3px 3px 0px ${shadowColor}`
      }}
      transition={
        isHovered
          ? { type: "spring", stiffness: 220, damping: 14 }
          : {
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 },
              filter: { duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 },
              default: { duration: 0.2 }
            }
      }
      whileTap={{
        y: 2.5,
        scale: 0.97,
        boxShadow: `1px 1px 0px ${shadowColor}`
      }}
      className={cn(
        "relative inline-flex items-center justify-center font-retro text-[9px] uppercase tracking-wide border-3 border-black select-none cursor-pointer rounded-sm outline-none overflow-visible",
        {
          // Sizes
          "px-4 py-2 text-[8px]": size === "sm",
          "px-6 py-3.5 text-[9px]": size === "md",
          "px-8 py-4 text-[10px]": size === "lg",
          
          // Variants
          "bg-[#FFDE47] text-black": variant === "primary",
          "bg-[#3BCEAC] text-black": variant === "secondary",
          "bg-white text-black": variant === "outline",
          "text-black bg-transparent border-transparent shadow-none": variant === "ghost",
        },
        className
      )}
      {...(props as any)}
    >
      {/* Visual background diagonal sheen sweep */}
      {isHovered && variant !== "ghost" && (
        <motion.div
          initial={{ left: "-20%" }}
          animate={{ left: "120%" }}
          transition={{ duration: 0.75, ease: "linear" }}
          className="absolute top-0 bottom-0 w-3 bg-white/35 skew-x-12 pointer-events-none z-10"
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Corner Sparkles on Hover */}
      {isHovered && variant !== "ghost" && (
        <>
          <div className="absolute top-[-7px] left-[-7px] z-20">
            <SparkleStar />
          </div>
          <div className="absolute bottom-[-7px] right-[-7px] z-20">
            <SparkleStar />
          </div>
        </>
      )}

      {/* Tactile Click Corner Bursts */}
      <AnimatePresence>
        {clickBursts.map((id) => (
          <div key={id} className="absolute inset-0 z-20 pointer-events-none overflow-visible">
            {/* Top-Left Particle */}
            <motion.div
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: -16, y: -16, opacity: 0, scale: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#FF5964]"
            />
            {/* Top-Right Particle */}
            <motion.div
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: 16, y: -16, opacity: 0, scale: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#FFDE47]"
            />
            {/* Bottom-Left Particle */}
            <motion.div
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: -16, y: 16, opacity: 0, scale: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#3BCEAC]"
            />
            {/* Bottom-Right Particle */}
            <motion.div
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: 16, y: 16, opacity: 0, scale: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#3A86C8]"
            />
          </div>
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
