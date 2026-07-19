"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** If true, animation only plays once (default). If false, replays on each viewport entry. */
  once?: boolean;
  /** Travel distance in px. Defaults to 22 (more cinematic than original 30). */
  distance?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  distance,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const travel = shouldReduceMotion ? 0 : (distance ?? 22);

  const directions = {
    up:    { y:  travel, x: 0 },
    down:  { y: -travel, x: 0 },
    left:  { x:  travel, y: 0 },
    right: { x: -travel, y: 0 },
    none:  { x: 0,       y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0.3, delay }
          : { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
