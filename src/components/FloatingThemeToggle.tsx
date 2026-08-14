"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useGameSystem } from "@/context/GameContext";

export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { playClick } = useGameSystem();

  return (
    <motion.button
      onClick={() => {
        playClick();
        toggleTheme();
      }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer select-none shadow-[0_4px_24px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-xl border border-white/15 bg-[#1a1636]/80 hover:bg-[#2a2256]/90 dark:bg-[#1a1636]/80 dark:hover:bg-[#2a2256]/90 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_4px_30px_rgba(192,132,252,0.4),0_0_0_1px_rgba(192,132,252,0.3)]"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      whileHover={{ rotate: 15 }}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        className="text-lg leading-none"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </motion.span>
    </motion.button>
  );
}
