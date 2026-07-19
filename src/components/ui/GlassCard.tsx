"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  hoverGlow?: boolean;
  animate?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  id?: string;
}

export function GlassCard({
  className,
  children,
  delay = 0,
  hoverGlow = true,
  animate = true,
  onClick,
  style,
  id,
}: GlassCardProps) {
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        onClick={onClick}
        style={style}
        id={id}
        className={cn(
          "glass rounded-2xl p-6 relative overflow-hidden transition-all duration-500",
          hoverGlow && "hover:border-[#7C3AED]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:translate-y-[-5px]",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        {children}
      </motion.div>
    );
  }

  return (
    <div
      onClick={onClick}
      style={style}
      id={id}
      className={cn(
        "glass rounded-2xl p-6 relative overflow-hidden transition-all duration-500",
        hoverGlow && "hover:border-[#7C3AED]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:translate-y-[-5px]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </div>
  );
}
