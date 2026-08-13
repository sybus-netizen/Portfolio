"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { useGameSystem } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";

interface Tool {
  name: string;
  brandColor: string;
}

interface CreativeCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  deliverables: string[];
  tools: Tool[];
  statusEmoji: string;
}

const categories: CreativeCategory[] = [
  {
    id: "brand-identity",
    title: "Brand Identity",
    description: "",
    image: "/assets/projects/brand_identity_showcase.jpg",
    deliverables: ["Logos", "Brand Kits", "Visual Identity", "Vector Systems"],
    tools: [
      { name: "Photoshop", brandColor: "#31A8FF" },
      { name: "Illustrator", brandColor: "#FF9A00" }
    ],
    statusEmoji: "🎨"
  },
  {
    id: "social-marketing",
    title: "Social & Marketing",
    description: "",
    image: "/assets/projects/social_media_showcase.jpg",
    deliverables: ["Social Media", "Advertisements", "Marketing Creatives", "Ad Templates"],
    tools: [
      { name: "Canva", brandColor: "#00C4CC" },
      { name: "Illustrator", brandColor: "#FF9A00" },
      { name: "Photoshop", brandColor: "#31A8FF" }
    ],
    statusEmoji: "📱"
  },
  {
    id: "video-motion",
    title: "Video & Motion",
    description: "",
    image: "/assets/projects/motion_graphics_showcase.jpg",
    deliverables: ["Video Editing", "Motion Graphics", "YouTube Shorts & Reels", "Keyframe Animation"],
    tools: [
      { name: "Premiere Pro", brandColor: "#EA77FF" },
      { name: "After Effects", brandColor: "#9999FF" },
      { name: "Adobe Audition", brandColor: "#00F5D4" }
    ],
    statusEmoji: "🎬"
  }
];

export default function About() {
  const [selectedIdx, setSelectedIdx] = useState(1); // Default to Social & Marketing
  const { unlockQuest } = useGameSystem();
  const { theme } = useTheme();

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 border-t border-slate-300 dark:border-white/10 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-[1.5px] bg-gradient-to-r from-transparent via-slate-400/60 dark:via-white/20 to-transparent" />
      <motion.div
        onViewportEnter={() => unlockQuest("about", "About")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 md:mb-10 space-y-3">
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
            What I Create
          </h2>
        </div>

        {/* INTERACTIVE RPG LAYOUT */}
        
        {/* DESKTOP LAYOUT (SPLIT PANEL) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch w-full">
          
          {/* LEFT PANEL: CAPABILITIES LIST (QUEST LOG) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {categories.map((cat, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedIdx(idx)}
                  style={{
                    backgroundColor: isSelected
                      ? theme === "light" ? "#2563EB" : undefined
                      : theme === "light" ? "#FFFFFF" : undefined,
                    color: isSelected
                      ? "#FFFFFF"
                      : theme === "light" ? "#0F172A" : "#E2E8F0",
                    borderColor: isSelected
                      ? theme === "light" ? "#1D4ED8" : "rgba(192,132,252,0.7)"
                      : theme === "light" ? "#CBD5E1" : "rgba(255,255,255,0.15)"
                  }}
                  className={`p-4 rounded-xl flex items-center justify-between cursor-pointer select-none text-left border transition-all duration-300 shadow-md ${
                    isSelected 
                      ? theme === "light" 
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-lg scale-[1.02]" 
                        : "bg-gradient-to-r from-[#C084FC]/30 to-[#FFA5A5]/20 border-[#C084FC]/70 text-white shadow-[0_0_25px_rgba(192,132,252,0.3)] translate-x-1" 
                      : "hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-lg">{cat.statusEmoji}</span>
                    <span className="font-sans text-xs sm:text-sm font-bold uppercase">
                      {cat.title}
                    </span>
                  </div>
                  <span 
                    style={{
                      color: isSelected
                        ? theme === "light" ? "#FFFFFF" : "#A7F3D0"
                        : theme === "light" ? "#64748B" : "#94A3B8"
                    }}
                    className="font-sans text-xs font-bold"
                  >
                    {isSelected ? "◀ ACTIVE" : "SELECT"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT PANEL: SELECTED DETAIL (STATS SCREEN) */}
          <div className="lg:col-span-7">
            {selectedIdx !== -1 && (
              <div 
                style={{
                  backgroundColor: theme === "light" ? "#FFFFFF" : undefined,
                  borderColor: theme === "light" ? "#CBD5E1" : undefined
                }}
                className="retro-card p-6 sm:p-8 lg:h-full h-auto flex flex-col justify-between shadow-2xl rounded-2xl relative text-left"
              >
                
                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categories[selectedIdx].statusEmoji}</span>
                      <h3 
                        style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
                        className="font-sans text-lg sm:text-xl font-bold uppercase leading-none"
                      >
                        {categories[selectedIdx].title}
                      </h3>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3">
                    <div 
                      style={{ color: theme === "light" ? "#475569" : "#94A3B8" }}
                      className="font-sans text-[10px] font-bold uppercase tracking-wider"
                    >
                      KEY POINTS
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories[selectedIdx].deliverables.map((del, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.05)",
                            color: theme === "light" ? "#0F172A" : "#F1F5F9",
                            borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.15)"
                          }}
                          className="px-3 py-1.5 rounded-lg border font-sans text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                        >
                          <span style={{ color: theme === "light" ? "#2563EB" : "#C084FC" }}>✦</span>
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Tools */}
                  <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                    <div 
                      style={{ color: theme === "light" ? "#475569" : "#94A3B8" }}
                      className="font-sans text-[10px] font-bold uppercase tracking-wider"
                    >
                      PRIMARY SOFTWARE
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories[selectedIdx].tools.map((tool, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.05)",
                            color: theme === "light" ? "#0F172A" : "#F1F5F9",
                            borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.15)"
                          }}
                          className="px-3 py-1.5 rounded-lg border font-sans text-xs font-semibold flex items-center gap-2 shadow-sm"
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.brandColor }} />
                          <span>{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* MOBILE LAYOUT (ACCORDION) */}
        <div className="flex flex-col gap-3 lg:hidden w-full text-left">
          {categories.map((cat, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div key={cat.id} className="flex flex-col gap-2">
                {/* Category Row Item */}
                <div
                  onClick={() => setSelectedIdx(isSelected ? -1 : idx)}
                  className={`retro-card p-4 flex items-center justify-between cursor-pointer select-none text-left border transition-all duration-200 rounded-xl ${
                    isSelected 
                      ? "bg-[#C084FC]/20 border-[#C084FC]/50 text-white" 
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-lg">{cat.statusEmoji}</span>
                    <span className="font-sans text-xs uppercase font-bold text-white">
                      {cat.title}
                    </span>
                  </div>
                  <span className="font-sans text-xs font-bold text-slate-400">
                    {isSelected ? "▲ CLOSE" : "▼ SELECT"}
                  </span>
                </div>

                {/* Details Accordion Panel */}
                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 4 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="retro-card p-5 rounded-2xl relative text-left space-y-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">KEY POINTS</div>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.deliverables.map((del, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-200 font-sans text-xs font-bold rounded-xl"
                                >
                                  ✦ {del}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">PRIMARY SOFTWARE</div>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.tools.map((tool, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 bg-white/5 border border-white/10 text-white font-sans text-xs font-semibold rounded-xl flex items-center gap-1.5"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tool.brandColor }} />
                                  {tool.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}

        </div>
      </motion.div>
    </section>
  );
}
