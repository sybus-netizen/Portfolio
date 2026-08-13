"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { useGameSystem } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";

interface ToolItem {
  name: string;
  subLabel: string;
  tags: string[];
  brandColor: string;
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
      {
        name: "Photoshop",
        subLabel: "Image manipulation · Compositing · Social media design",
        tags: ["Image manipulation", "Compositing", "Social media design"],
        brandColor: "#31A8FF"
      },
      {
        name: "Illustrator",
        subLabel: "Vector layouts · Illustration · Branding",
        tags: ["Vector layouts", "Illustration", "Branding"],
        brandColor: "#FF9A00"
      },
      {
        name: "Canva",
        subLabel: "Social media creatives · Templates · Marketing content",
        tags: ["Social media creatives", "Templates", "Marketing content"],
        brandColor: "#00C4CC"
      }
    ]
  },
  {
    title: "Video Editing & Motion",
    iconEmoji: "🎬",
    tools: [
      {
        name: "Premiere Pro",
        subLabel: "Video editing · Short-form content · Promotional videos",
        tags: ["Video editing", "Short-form content", "Promotional videos"],
        brandColor: "#EA77FF"
      },
      {
        name: "After Effects",
        subLabel: "Motion graphics · Logo animation · Visual effects",
        tags: ["Motion graphics", "Logo animation", "Visual effects"],
        brandColor: "#9999FF"
      },
      {
        name: "Audition",
        subLabel: "Audio editing · Sound cleanup · Sound mixing",
        tags: ["Audio editing", "Sound cleanup", "Sound mixing"],
        brandColor: "#00C896"
      }
    ]
  },
  {
    title: "Web & Digital",
    iconEmoji: "🌐",
    tools: [
      {
        name: "WordPress",
        subLabel: "Website content · Visual customization · Publishing",
        tags: ["Website content", "Visual customization", "Publishing"],
        brandColor: "#21759B"
      },
      {
        name: "Adobe Express",
        subLabel: "Quick graphics · Social media content · Marketing creatives",
        tags: ["Quick graphics", "Social media content", "Marketing creatives"],
        brandColor: "#FF3F56"
      }
    ]
  }
];

function renderLogo(name: string) {
  switch (name) {
    case "Photoshop":
      return (
        <div className="w-8 h-8 rounded-lg border border-[#00C8FF] bg-[#001c3d]/90 flex items-center justify-center font-sans font-extrabold text-xs text-[#00C8FF] shadow-[0_0_14px_rgba(0,200,255,0.3)] select-none">
          Ps
        </div>
      );
    case "Illustrator":
      return (
        <div className="w-8 h-8 rounded-lg border border-[#FF9F00] bg-[#261300]/90 flex items-center justify-center font-sans font-extrabold text-xs text-[#FF9F00] shadow-[0_0_14px_rgba(255,159,0,0.3)] select-none">
          Ai
        </div>
      );
    case "Canva":
      return (
        <div className="w-8 h-8 rounded-full bg-[#00c4cc] flex items-center justify-center font-sans italic font-extrabold text-xs text-white shadow-[0_0_14px_rgba(0,196,204,0.3)] select-none">
          C
        </div>
      );
    case "Premiere Pro":
      return (
        <div className="w-8 h-8 rounded-lg border border-[#E053FF] bg-[#1E0029]/90 flex items-center justify-center font-sans font-extrabold text-xs text-[#E053FF] shadow-[0_0_14px_rgba(224,83,255,0.3)] select-none">
          Pr
        </div>
      );
    case "After Effects":
      return (
        <div className="w-8 h-8 rounded-lg border border-[#9999FF] bg-[#0D002B]/90 flex items-center justify-center font-sans font-extrabold text-xs text-[#9999FF] shadow-[0_0_14px_rgba(153,153,255,0.3)] select-none">
          Ae
        </div>
      );
    case "Audition":
      return (
        <div className="w-8 h-8 rounded-lg border border-[#00E5A3] bg-[#001C15]/90 flex items-center justify-center font-sans font-extrabold text-xs text-[#00E5A3] shadow-[0_0_14px_rgba(0,229,163,0.3)] select-none">
          Au
        </div>
      );
    case "WordPress":
      return (
        <div className="w-8 h-8 rounded-full bg-[#21759B] border border-[#00A0D2]/20 flex items-center justify-center font-sans font-extrabold text-xs text-white shadow-[0_0_14px_rgba(33,117,155,0.3)] select-none">
          W
        </div>
      );
    case "Adobe Express":
      return (
        <div className="w-8 h-8 rounded-lg border border-[#FF5F72]/30 bg-[#FF3F56] flex items-center justify-center font-sans font-extrabold text-xs text-white shadow-[0_0_14px_rgba(255,63,86,0.3)] select-none">
          Ex
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">
          🛠
        </div>
      );
  }
}

function ToolCard({ tool }: { tool: ToolItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: isHovered 
          ? theme === "light" ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)"
          : theme === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.02)",
        borderColor: isHovered 
          ? tool.brandColor 
          : theme === "light" ? "#E2E8F0" : "rgba(255, 255, 255, 0.08)",
        boxShadow: isHovered 
          ? `0 8px 24px -6px ${tool.brandColor}30` 
          : theme === "light" ? "0 2px 8px rgba(0,0,0,0.04)" : "none"
      }}
      className="p-4 rounded-xl border transition-all duration-200 text-left space-y-3 group cursor-pointer"
    >
      {/* Header: Icon + Name */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={isHovered ? { scale: 1.12, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          {renderLogo(tool.name)}
        </motion.div>
        <div>
          <h4 
            style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
            className="font-sans text-sm font-extrabold uppercase tracking-wide transition-colors duration-200"
          >
            {tool.name}
          </h4>
        </div>
      </div>

      {/* Capability Tags */}
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {tool.tags.map((tag, tIdx) => (
          <span
            key={tIdx}
            style={{
              backgroundColor: isHovered
                ? theme === "light" ? `${tool.brandColor}15` : `${tool.brandColor}25`
                : theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.06)",
              color: isHovered
                ? theme === "light" ? tool.brandColor : "#F8FAFC"
                : theme === "light" ? "#334155" : "#CBD5E1",
              borderColor: isHovered
                ? `${tool.brandColor}60`
                : theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.12)"
            }}
            className="px-2.5 py-1 rounded-md border font-sans text-[11px] font-semibold transition-all duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
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
            SOFTWARE & CAPABILITIES
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
            Core software tools and creative suites used to create visual content, animations, graphics, and digital media.
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
              <div className="space-y-5">
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
                  <span className="text-2xl select-none">{cat.iconEmoji}</span>
                  <h3 
                    style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
                    className="font-sans text-sm font-bold uppercase tracking-wider text-left"
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* Tools Cards */}
                <div className="space-y-3.5">
                  {cat.tools.map((tool, tIdx) => (
                    <ToolCard key={tIdx} tool={tool} />
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
