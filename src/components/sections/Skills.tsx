"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { useGameSystem } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";

interface ToolItem {
  name: string;
  subLabel: string;
  brandColor: string;
  proficiency: number;
}

interface SkillCategory {
  title: string;
  iconEmoji: string;
  tools: ToolItem[];
}

const categories: SkillCategory[] = [
  {
    title: "Graphic Design",
    iconEmoji: "🎨",
    tools: [
      { name: "Photoshop", subLabel: "Image Manipulation", brandColor: "#31A8FF", proficiency: 95 },
      { name: "Illustrator", subLabel: "Vector Layouts", brandColor: "#FF9A00", proficiency: 90 },
      { name: "Canva", subLabel: "Quick Graphics Templates", brandColor: "#00C4CC", proficiency: 95 },
    ]
  },
  {
    title: "Video Editing & Motion",
    iconEmoji: "🎬",
    tools: [
      { name: "Premiere Pro", subLabel: "Video Timeline Cuts", brandColor: "#EA77FF", proficiency: 92 },
      { name: "After Effects", subLabel: "Keyframe Motion VFX", brandColor: "#9999FF", proficiency: 85 },
      { name: "Audition", subLabel: "Sound Design Mixing", brandColor: "#00C896", proficiency: 75 },
    ]
  },
  {
    title: "Web & Digital",
    iconEmoji: "🌐",
    tools: [
      { name: "WordPress", subLabel: "Web Themes Publishing", brandColor: "#21759B", proficiency: 80 },
      { name: "Adobe Express", subLabel: "Social Creative Collaterals", brandColor: "#FF3F56", proficiency: 85 },
    ]
  }
];

function ToolRow({ tool }: { tool: ToolItem }) {
  const [isHovered, setIsHovered] = useState(false);

  const renderLogo = () => {
    switch (tool.name) {
      case "Photoshop":
        return (
          <div className="w-7 h-7 rounded border border-[#00C8FF] bg-[#001c3d]/90 flex items-center justify-center font-sans font-extrabold text-[10px] text-[#00C8FF] shadow-[0_0_12px_rgba(0,200,255,0.25)] select-none">
            Ps
          </div>
        );
      case "Illustrator":
        return (
          <div className="w-7 h-7 rounded border border-[#FF9F00] bg-[#261300]/90 flex items-center justify-center font-sans font-extrabold text-[10px] text-[#FF9F00] shadow-[0_0_12px_rgba(255,159,0,0.25)] select-none">
            Ai
          </div>
        );
      case "Canva":
        return (
          <div className="w-7 h-7 rounded-full bg-[#00c4cc] flex items-center justify-center font-sans italic font-extrabold text-[10px] text-white shadow-[0_0_12px_rgba(0,196,204,0.25)] select-none">
            C
          </div>
        );
      case "Premiere Pro":
        return (
          <div className="w-7 h-7 rounded border border-[#E053FF] bg-[#1E0029]/90 flex items-center justify-center font-sans font-extrabold text-[10px] text-[#E053FF] shadow-[0_0_12px_rgba(224,83,255,0.25)] select-none">
            Pr
          </div>
        );
      case "After Effects":
        return (
          <div className="w-7 h-7 rounded border border-[#9999FF] bg-[#0D002B]/90 flex items-center justify-center font-sans font-extrabold text-[10px] text-[#9999FF] shadow-[0_0_12px_rgba(153,153,255,0.25)] select-none">
            Ae
          </div>
        );
      case "Audition":
        return (
          <div className="w-7 h-7 rounded border border-[#00E5A3] bg-[#001C15]/90 flex items-center justify-center font-sans font-extrabold text-[10px] text-[#00E5A3] shadow-[0_0_12px_rgba(0,229,163,0.25)] select-none">
            Au
          </div>
        );
      case "WordPress":
        return (
          <div className="w-7 h-7 rounded-full bg-[#21759B] border border-[#00A0D2]/20 flex items-center justify-center font-sans font-extrabold text-[11px] text-white shadow-[0_0_12px_rgba(33,117,155,0.25)] select-none">
            W
          </div>
        );
      case "Adobe Express":
        return (
          <div className="w-7 h-7 rounded border border-[#FF5F72]/30 bg-[#FF3F56] flex items-center justify-center font-sans font-extrabold text-[10px] text-white shadow-[0_0_12px_rgba(255,63,86,0.25)] select-none">
            Ex
          </div>
        );
      default:
        return (
          <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-xs">
            🛠
          </div>
        );
    }
  };

  const { theme } = useTheme();

  return (
    <div 
      className="space-y-1.5 text-left group transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between font-sans text-xs font-bold tracking-wide">
        <span 
          style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
          className="flex items-center gap-2.5 min-w-0 pr-2 transition-colors duration-200"
        >
          <motion.div
            animate={isHovered ? { scale: 1.18, rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0"
          >
            {renderLogo()}
          </motion.div>
          <span className="truncate font-extrabold">{tool.name}</span>
        </span>
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <div 
            style={{
              backgroundColor: theme === "light" ? "#E2E8F0" : "rgba(255, 255, 255, 0.1)",
              borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.1)"
            }}
            className="w-20 xs:w-24 sm:w-28 h-2.5 rounded-full overflow-hidden border relative shrink-0"
          >
            <motion.div 
              className="h-full rounded-full absolute left-0 top-0 overflow-hidden"
              initial={{ width: "0%" }}
              whileInView={{ width: `${tool.proficiency}%` }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                width: { duration: 1.4, ease: [0.25, 1, 0.5, 1] },
                boxShadow: { duration: 0.2 }
              }}
              animate={{ 
                boxShadow: isHovered 
                  ? `0 0 12px ${tool.brandColor}, 0 0 4px ${tool.brandColor}` 
                  : `0 0 4px ${tool.brandColor}/20`
              }}
              style={{ backgroundColor: tool.brandColor }}
            >
              {/* Fluid Animated Wavy Shimmer Line */}
              <motion.div
                className="absolute inset-0 w-full h-full rounded-full"
                style={{
                  backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)",
                  backgroundSize: "200% 100%"
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </motion.div>
          </div>
          <motion.span 
            style={{ color: theme === "light" ? "#0F172A" : "#94A3B8" }}
            className="font-sans text-xs font-extrabold w-8 text-right shrink-0"
          >
            {tool.proficiency}%
          </motion.span>
        </div>
      </div>
      <p 
        style={{ color: theme === "light" ? "#475569" : "#94A3B8" }}
        className="text-[11px] font-sans font-medium pl-9.5 leading-normal transition-colors duration-200"
      >
        {tool.subLabel}
      </p>
    </div>
  );
}

export default function Skills() {
  const { unlockQuest } = useGameSystem();
  const { theme } = useTheme();

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 border-t border-slate-300 dark:border-white/10 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-[1.5px] bg-gradient-to-r from-transparent via-slate-400/60 dark:via-white/20 to-transparent" />
      <motion.div
        onViewportEnter={() => unlockQuest("skills", "Skills")}
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
            TECHNICAL PROFICIENCY
          </div>
          <h2 
            style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
            className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-none"
          >
            Creative Toolkit
          </h2>
          <p 
            style={{ color: theme === "light" ? "#334155" : "#CBD5E1" }}
            className="text-xs sm:text-sm font-sans leading-relaxed font-medium"
          >
            Equipped with industry-standard software tools and creative suites for professional visual production.
          </p>
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: theme === "light" ? "#FFFFFF" : undefined,
                borderColor: theme === "light" ? "#CBD5E1" : undefined
              }}
              className="retro-card p-6 rounded-2xl shadow-xl flex flex-col justify-between border"
            >
              <div className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
                  <span className="text-2xl select-none">{cat.iconEmoji}</span>
                  <h3 
                    style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
                    className="font-sans text-sm font-bold uppercase tracking-wider"
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* Tools Status Bars */}
                <div className="space-y-5">
                  {cat.tools.map((tool, tIdx) => (
                    <ToolRow key={tIdx} tool={tool} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
