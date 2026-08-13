"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function RetroBackground() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* HERO SECTION GLOW: ELECTRIC VIOLET / PURPLE (TOP LEFT) */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.15, 0.9, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: theme === "light"
            ? "radial-gradient(circle, rgba(168, 85, 247, 0.32) 0%, rgba(168, 85, 247, 0.08) 55%, transparent 75%)"
            : "radial-gradient(circle, rgba(168, 85, 247, 0.48) 0%, rgba(147, 51, 234, 0.20) 55%, transparent 80%)"
        }}
        className="absolute -top-20 -left-20 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[60px] sm:blur-[85px]"
      />

      {/* MID SECTION GLOW: COBALT / INDIGO BLUE (MIDDLE RIGHT) */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -50, 0],
          scale: [1, 0.9, 1.15, 1]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          background: theme === "light"
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.32) 0%, rgba(99, 102, 241, 0.08) 55%, transparent 75%)"
            : "radial-gradient(circle, rgba(37, 99, 235, 0.48) 0%, rgba(59, 130, 246, 0.20) 55%, transparent 80%)"
        }}
        className="absolute top-[30%] -right-20 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[60px] sm:blur-[85px]"
      />

      {/* CONTACT SECTION GLOW: ROSE / MAGENTA (BOTTOM CENTER) */}
      <motion.div
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.92, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          background: theme === "light"
            ? "radial-gradient(circle, rgba(244, 63, 94, 0.28) 0%, rgba(236, 72, 153, 0.06) 55%, transparent 75%)"
            : "radial-gradient(circle, rgba(236, 72, 153, 0.42) 0%, rgba(217, 70, 239, 0.16) 55%, transparent 80%)"
        }}
        className="absolute -bottom-20 left-[15%] sm:left-[25%] w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full blur-[65px] sm:blur-[90px]"
      />

      {/* CENTER ACCENT GLOW: EMERALD / CYAN (MIDDLE LEFT) */}
      <motion.div
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.2, 0.88, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          background: theme === "light"
            ? "radial-gradient(circle, rgba(16, 185, 129, 0.24) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(16, 185, 129, 0.38) 0%, transparent 70%)"
        }}
        className="absolute top-[55%] -left-20 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full blur-[60px] sm:blur-[80px]"
      />

    </div>
  );
}
