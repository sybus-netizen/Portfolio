"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay for the entrance animation (seconds). Default 0. */
  delay?: number;
  /** How far the section travels upward on entrance (px). Default 12 for premium subtlety. */
  distance?: number;
  /** Whether the exit (scale-down) effect is applied. Default true. */
  exitScale?: boolean;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  distance = 12,
  exitScale = true,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress ONLY within this element's own scroll range
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Entrance: section rises from slightly below as it enters the bottom of the viewport
  // exit: section very subtly shrinks as it leaves the top
  const y = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [distance, 0, 0, -(distance * 0.4)]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, exitScale ? 0.4 : 1]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    shouldReduceMotion
      ? [1, 1, 1, 1]
      : [0.985, 1, 1, exitScale ? 0.97 : 1]
  );

  return (
    <div ref={ref} className="relative w-full">
      {/* ── Animated Horizontal Divider construction line (left to right) ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        style={{ originX: 0 }}
        className="w-full h-[3px] bg-black absolute top-0 left-0 z-20 pointer-events-none"
      />

      {/* ── Section Content reveal ── */}
      <motion.div
        style={{ 
          y, 
          opacity, 
          scale, 
          willChange: "transform, opacity" 
        }}
        transition={delay > 0 ? { delay: delay + 0.35 } : { delay: 0.35 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
