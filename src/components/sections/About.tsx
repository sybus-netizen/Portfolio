"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { useGameSystem } from "@/context/GameContext";

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
    description: "Distinctive logo marks, corporate branding guides, and cohesive vector systems to define your identity.",
    image: "/assets/projects/brand_identity_showcase.jpg",
    deliverables: ["Logos", "Brand Kits", "Visual Identity"],
    tools: [
      { name: "Photoshop", brandColor: "#31A8FF" },
      { name: "Illustrator", brandColor: "#FF9A00" }
    ],
    statusEmoji: "🎨"
  },
  {
    id: "social-marketing",
    title: "Social & Marketing",
    description: "High-impact visual promotional campaigns, template grids, and digital assets optimized for social platforms.",
    image: "/assets/projects/social_media_showcase.jpg",
    deliverables: ["Social Media", "Advertisements", "Marketing Creatives"],
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
    description: "High-retention video packaging, multitrack pacing, keyframe visual animations, lighting effects, and particle renders.",
    image: "/assets/projects/motion_graphics_showcase.jpg",
    deliverables: ["Video Editing", "Motion Graphics", "YouTube Videos"],
    tools: [
      { name: "Premiere Pro", brandColor: "#EA77FF" },
      { name: "After Effects", brandColor: "#9999FF" },
      { name: "Adobe Audition", brandColor: "#00F5D4" }
    ],
    statusEmoji: "🎬"
  }
];

export default function About() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { unlockQuest } = useGameSystem();

  return (
    <section id="about" className="py-12 md:py-16 border-t border-white/10 bg-transparent relative overflow-hidden">
      <motion.div
        onViewportEnter={() => unlockQuest("about", "About")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 md:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C084FC]/20 text-[#C084FC] border border-[#C084FC]/30 font-sans text-xs font-bold uppercase tracking-wider select-none">
            SPECIFICATION
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            What I Create
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            From branding systems to motion graphics, I create visual experiences that help businesses communicate, grow and stand out.
          </p>
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
                  className={`retro-card p-4 rounded-xl flex items-center justify-between cursor-pointer select-none text-left transition-all duration-300 border ${
                    isSelected 
                      ? "bg-gradient-to-r from-[#C084FC]/25 to-[#FFA5A5]/15 border-[#C084FC]/60 text-white shadow-[0_0_25px_rgba(192,132,252,0.25)] translate-x-1" 
                      : "bg-[#131130]/90 border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-lg">{cat.statusEmoji}</span>
                    <span className="font-sans text-xs sm:text-sm font-bold uppercase text-white">
                      {cat.title}
                    </span>
                  </div>
                  <span className={`font-sans text-xs font-bold ${isSelected ? 'text-[#A7F3D0]' : 'text-slate-400'}`}>
                    {isSelected ? "◀ ACTIVE" : "SELECT"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT PANEL: SELECTED DETAIL (STATS SCREEN) */}
          <div className="lg:col-span-7">
            {selectedIdx !== -1 && (
              <div className="retro-card p-6 sm:p-8 bg-[#131130]/90 backdrop-blur-xl border border-white/10 lg:h-full h-auto flex flex-col justify-between shadow-2xl rounded-2xl relative text-left">
                
                {/* Corner tech specs */}
                <div className="absolute top-4 right-6 font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  FIELD: {categories[selectedIdx].id.toUpperCase()}
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categories[selectedIdx].statusEmoji}</span>
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-white uppercase leading-none">
                        {categories[selectedIdx].title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      {categories[selectedIdx].description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3">
                    <div className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">KEY DELIVERABLES</div>
                    <div className="flex flex-wrap gap-2">
                      {categories[selectedIdx].deliverables.map((del, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-200 font-sans text-xs rounded-xl"
                        >
                          ✦ {del}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Primary Tools */}
                  <div className="space-y-3">
                    <div className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">PRIMARY SOFTWARE</div>
                    <div className="flex flex-wrap gap-2">
                      {categories[selectedIdx].tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 text-white font-sans text-xs font-semibold rounded-xl flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.brandColor }} />
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status bar */}
                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-left">
                  <div className="font-sans text-xs text-slate-400 font-medium">EXPERIENCE: 3.8+ YEARS</div>
                  <div className="font-sans text-xs text-[#A7F3D0] font-bold uppercase">EXPLORE WORK ➔</div>
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
                      : "bg-[#131130]/90 border-white/10 text-slate-300 hover:border-white/20"
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
                      <div className="retro-card p-5 sm:p-6 bg-[#131130]/90 backdrop-blur-xl border border-white/10 rounded-2xl relative text-left space-y-4">
                        <div className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          FIELD: {cat.id.toUpperCase()}
                        </div>

                        <div className="space-y-4">
                          <p className="text-xs text-slate-300 font-sans leading-relaxed">
                            {cat.description}
                          </p>

                          <div className="space-y-2">
                            <div className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">KEY DELIVERABLES</div>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.deliverables.map((del, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-200 font-sans text-xs rounded-xl"
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
                                  className="px-2.5 py-1 bg-white/5 border border-white/10 text-white font-sans text-xs font-semibold rounded-xl flex items-center gap-1.5"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tool.brandColor }} />
                                  {tool.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-left">
                          <div className="font-sans text-xs text-slate-400 font-medium">EXPERIENCE: 3.8+ YEARS</div>
                          <div className="font-sans text-xs text-[#A7F3D0] font-bold uppercase">EXPLORE WORK ➔</div>
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
