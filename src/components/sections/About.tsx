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
    <section id="about" className="py-20 border-t-3 border-black bg-[#FAF6EE] relative overflow-hidden">
      <motion.div
        onViewportEnter={() => unlockQuest("about", "About")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5964] border-2 border-black text-white font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">
            SPECIFICATION
          </div>
          <h2 className="font-retro text-xl sm:text-2xl md:text-3.5xl font-bold tracking-tight text-black uppercase leading-none">
            What I Create
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
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
                  className={`retro-card p-4 flex items-center justify-between cursor-pointer select-none text-left border-3 transition-all duration-100 ${
                    isSelected 
                      ? "bg-[#FFDE47] border-black translate-x-1 shadow-[2px_2px_0px_#000]" 
                      : "bg-[#FFFFFF] border-black/80 hover:bg-[#FFFDF9]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-lg">{cat.statusEmoji}</span>
                    <span className="font-retro text-[9px] sm:text-[10px] uppercase font-bold text-black">
                      {cat.title}
                    </span>
                  </div>
                  <span className="font-retro text-[8px] text-black/40">
                    {isSelected ? "◀ ACTIVE" : "SELECT"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT PANEL: SELECTED DETAIL (STATS SCREEN) */}
          <div className="lg:col-span-7">
            {selectedIdx !== -1 && (
              <div className="retro-card p-6 sm:p-8 bg-[#FFFFFF] border-4 border-black lg:h-full h-auto flex flex-col justify-between shadow-[6px_6px_0px_#000] relative">
                
                {/* Corner tech specs */}
                <div className="absolute top-4 right-6 font-retro text-[8px] text-black/30">
                  LOG_ID: {categories[selectedIdx].id.toUpperCase()}
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categories[selectedIdx].statusEmoji}</span>
                      <h3 className="font-retro text-base sm:text-lg font-bold text-black uppercase leading-none">
                        {categories[selectedIdx].title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                      {categories[selectedIdx].description}
                    </p>
                  </div>

                  {/* Deliverables / Inventory */}
                  <div className="space-y-3">
                    <div className="font-retro text-[8px] text-black/50 uppercase leading-none">INVENTORY DELIVERABLES</div>
                    <div className="flex flex-wrap gap-2">
                      {categories[selectedIdx].deliverables.map((del, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-[#FAF6EE] border-2 border-black text-black font-sans text-xs rounded-sm shadow-[1.5px_1.5px_0px_#000]"
                        >
                          🧰 {del}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Primary Tools */}
                  <div className="space-y-3">
                    <div className="font-retro text-[8px] text-black/50 uppercase leading-none">EQUIPPED TOOLS</div>
                    <div className="flex flex-wrap gap-2">
                      {categories[selectedIdx].tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white border-2 border-black text-black font-retro text-[9px] rounded-sm shadow-[1.5px_1.5px_0px_#000] flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tool.brandColor }} />
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status bar */}
                <div className="mt-8 pt-4 border-t-2 border-dashed border-black/20 flex justify-between items-center text-left">
                  <div className="font-retro text-[8px] text-black/40">QUEST LEVEL: 04</div>
                  <div className="font-retro text-[9px] text-[#3BCEAC] font-bold">READY TO DEPLOY ➔</div>
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
                  className={`retro-card p-4 flex items-center justify-between cursor-pointer select-none text-left border-3 transition-all duration-100 ${
                    isSelected 
                      ? "bg-[#FFDE47] border-black translate-x-1 shadow-[2px_2px_0px_#000]" 
                      : "bg-[#FFFFFF] border-black/80 hover:bg-[#FFFDF9]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-lg">{cat.statusEmoji}</span>
                    <span className="font-retro text-[9px] sm:text-[10px] uppercase font-bold text-black">
                      {cat.title}
                    </span>
                  </div>
                  <span className="font-retro text-[8px] text-black/40">
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
                      <div className="retro-card p-5 sm:p-6 bg-[#FFFFFF] border-3 border-black shadow-[4px_4px_0px_#000] relative">
                        {/* Corner tech specs */}
                        <div className="absolute top-3 right-4 font-retro text-[7px] text-black/30">
                          LOG_ID: {cat.id.toUpperCase()}
                        </div>

                        <div className="space-y-5">
                          {/* Description */}
                          <div className="space-y-1 mt-2">
                            <p className="text-xs text-[#555555] font-sans leading-relaxed">
                              {cat.description}
                            </p>
                          </div>

                          {/* Deliverables / Inventory */}
                          <div className="space-y-2">
                            <div className="font-retro text-[7px] text-black/50 uppercase leading-none">INVENTORY DELIVERABLES</div>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.deliverables.map((del, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 bg-[#FAF6EE] border-2 border-black text-black font-sans text-[11px] rounded-sm shadow-[1px_1px_0px_#000]"
                                >
                                  🧰 {del}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Primary Tools */}
                          <div className="space-y-2">
                            <div className="font-retro text-[7px] text-black/50 uppercase leading-none">EQUIPPED TOOLS</div>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.tools.map((tool, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 bg-white border-2 border-black text-black font-retro text-[8px] rounded-sm shadow-[1px_1px_0px_#000] flex items-center gap-1"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tool.brandColor }} />
                                  {tool.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Status bar */}
                        <div className="mt-6 pt-3 border-t-2 border-dashed border-black/20 flex justify-between items-center text-left">
                          <div className="font-retro text-[7px] text-black/40">QUEST LEVEL: 04</div>
                          <div className="font-retro text-[8px] text-[#3BCEAC] font-bold">READY TO DEPLOY ➔</div>
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
