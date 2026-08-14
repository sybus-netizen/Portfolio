"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGameSystem } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";

interface SoftwareTool {
  name: string;
  brandColor: string;
}

interface CategoryCard {
  number: string;
  id: string;
  title: string;
  iconEmoji: string;
  capabilities: string[];
  tools: SoftwareTool[];
}

const categoryCards: CategoryCard[] = [
  {
    number: "01",
    id: "brand-graphic-design",
    title: "BRAND & GRAPHIC DESIGN",
    iconEmoji: "🎨",
    capabilities: [
      "Logo Design",
      "Brand Identity",
      "Marketing Graphics",
      "Social Media Creatives"
    ],
    tools: [
      { name: "Photoshop", brandColor: "#31A8FF" },
      { name: "Illustrator", brandColor: "#FF9A00" },
      { name: "Canva", brandColor: "#00C4CC" }
    ]
  },
  {
    number: "02",
    id: "video-motion",
    title: "VIDEO & MOTION",
    iconEmoji: "🎬",
    capabilities: [
      "Video Editing",
      "Reels & Shorts",
      "Promotional Videos",
      "Motion Graphics",
      "Logo Animation"
    ],
    tools: [
      { name: "Premiere Pro", brandColor: "#EA77FF" },
      { name: "After Effects", brandColor: "#9999FF" },
      { name: "Audition", brandColor: "#00C896" }
    ]
  },
  {
    number: "03",
    id: "web-digital",
    title: "WEB & DIGITAL",
    iconEmoji: "🌐",
    capabilities: [
      "Website Content",
      "Digital Graphics",
      "Marketing Content",
      "Online Publishing"
    ],
    tools: [
      { name: "WordPress", brandColor: "#21759B" },
      { name: "Adobe Express", brandColor: "#FF3F56" }
    ]
  }
];

function renderToolBadge(name: string) {
  switch (name) {
    case "Photoshop":
      return (
        <div className="w-5 h-5 rounded border border-[#00C8FF] bg-[#001c3d]/90 flex items-center justify-center font-sans font-extrabold text-[9px] text-[#00C8FF] shadow-[0_0_8px_rgba(0,200,255,0.3)] select-none shrink-0">
          Ps
        </div>
      );
    case "Illustrator":
      return (
        <div className="w-5 h-5 rounded border border-[#FF9F00] bg-[#261300]/90 flex items-center justify-center font-sans font-extrabold text-[9px] text-[#FF9F00] shadow-[0_0_8px_rgba(255,159,0,0.3)] select-none shrink-0">
          Ai
        </div>
      );
    case "Canva":
      return (
        <div className="w-5 h-5 rounded-full bg-[#00c4cc] flex items-center justify-center font-sans italic font-extrabold text-[9px] text-white shadow-[0_0_8px_rgba(0,196,204,0.3)] select-none shrink-0">
          C
        </div>
      );
    case "Premiere Pro":
      return (
        <div className="w-5 h-5 rounded border border-[#E053FF] bg-[#1E0029]/90 flex items-center justify-center font-sans font-extrabold text-[9px] text-[#E053FF] shadow-[0_0_8px_rgba(224,83,255,0.3)] select-none shrink-0">
          Pr
        </div>
      );
    case "After Effects":
      return (
        <div className="w-5 h-5 rounded border border-[#9999FF] bg-[#0D002B]/90 flex items-center justify-center font-sans font-extrabold text-[9px] text-[#9999FF] shadow-[0_0_8px_rgba(153,153,255,0.3)] select-none shrink-0">
          Ae
        </div>
      );
    case "Audition":
      return (
        <div className="w-5 h-5 rounded border border-[#00E5A3] bg-[#001C15]/90 flex items-center justify-center font-sans font-extrabold text-[9px] text-[#00E5A3] shadow-[0_0_8px_rgba(0,229,163,0.3)] select-none shrink-0">
          Au
        </div>
      );
    case "WordPress":
      return (
        <div className="w-5 h-5 rounded-full bg-[#21759B] border border-[#00A0D2]/20 flex items-center justify-center font-sans font-extrabold text-[9px] text-white shadow-[0_0_8px_rgba(33,117,155,0.3)] select-none shrink-0">
          W
        </div>
      );
    case "Adobe Express":
      return (
        <div className="w-5 h-5 rounded border border-[#FF5F72]/30 bg-[#FF3F56] flex items-center justify-center font-sans font-extrabold text-[9px] text-white shadow-[0_0_8px_rgba(255,63,86,0.3)] select-none shrink-0">
          Ex
        </div>
      );
    default:
      return (
        <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[9px] shrink-0">
          🛠
        </div>
      );
  }
}

function CategoryCardItem({ card }: { card: CategoryCard }) {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="retro-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-6 text-left cursor-pointer"
    >
      <div className="space-y-5">
        
        {/* HEADER: ICON + NUMBER + TITLE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl select-none">{card.iconEmoji}</span>
              <span 
                style={{ color: theme === "light" ? "#2563EB" : "#C084FC" }}
                className="font-sans text-xs font-extrabold tracking-widest uppercase"
              >
                {card.number}
              </span>
            </div>
          </div>
          <h3
            style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
            className="font-sans text-base sm:text-lg font-extrabold uppercase tracking-wide leading-tight"
          >
            {card.title}
          </h3>
        </div>

        {/* DIVIDER 1 */}
        <div className="border-b border-black/10 dark:border-white/10" />

        {/* WHAT I CREATE SECTION */}
        <div className="space-y-3">
          <span
            style={{ color: theme === "light" ? "#475569" : "#94A3B8" }}
            className="font-sans text-[10px] font-extrabold uppercase tracking-wider block"
          >
            WHAT I CREATE
          </span>
          <div className="flex flex-wrap gap-2">
            {card.capabilities.map((cap, i) => (
              <span
                key={i}
                className="glass-pill px-3 py-1.5 rounded-xl font-sans text-xs font-bold flex items-center gap-1.5 select-none"
              >
                <span style={{ color: theme === "light" ? "#2563EB" : "#C084FC" }}>✦</span>
                <span>{cap}</span>
              </span>
            ))}
          </div>
        </div>

        {/* DIVIDER 2 */}
        <div className="border-b border-black/10 dark:border-white/10" />

        {/* TOOLS I USE SECTION (VISUALLY SECONDARY) */}
        <div className="space-y-2.5 pt-1">
          <span
            style={{ color: theme === "light" ? "#64748B" : "#64748B" }}
            className="font-sans text-[10px] font-extrabold uppercase tracking-wider block"
          >
            TOOLS I USE
          </span>
          <div className="flex flex-wrap gap-2">
            {card.tools.map((tool, i) => (
              <div
                key={i}
                className="glass-pill px-2.5 py-1 rounded-xl font-sans text-xs font-semibold flex items-center gap-2 select-none"
              >
                {renderToolBadge(tool.name)}
                <span className="font-extrabold text-[11px]">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function About() {
  const { unlockQuest } = useGameSystem();
  const { theme } = useTheme();

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 border-t border-slate-200/80 dark:border-white/5 bg-[#E5E7EB]/40 dark:bg-[#1B1E24]/40 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-[1.5px] bg-gradient-to-r from-transparent via-slate-400/60 dark:via-white/20 to-transparent" />
      <motion.div
        onViewportEnter={() => unlockQuest("about", "About")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 md:mb-12 space-y-3">
          <div 
            style={{
              backgroundColor: theme === "light" ? "#2563EB" : "rgba(192, 132, 252, 0.2)",
              color: theme === "light" ? "#FFFFFF" : "#C084FC",
              borderColor: theme === "light" ? "#1D4ED8" : "rgba(192, 132, 252, 0.3)"
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border font-sans text-xs font-extrabold uppercase tracking-wider select-none shadow-sm"
          >
            SPECIFICATION
          </div>
          <h2 
            style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
            className="font-sans text-3xl sm:text-4xl font-extrabold uppercase tracking-tight"
          >
            WHAT I CREATE
          </h2>
        </div>

        {/* 3 Interactive Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
          {categoryCards.map((card) => (
            <CategoryCardItem key={card.id} card={card} />
          ))}
        </div>

      </motion.div>
    </section>
  );
}
