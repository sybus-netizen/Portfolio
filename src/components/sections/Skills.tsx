"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { useGameSystem } from "@/context/GameContext";

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

// Helper to render modern progress bar based on skill percentages
function ProgressBar({ percentage, brandColor }: { percentage: number; brandColor: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-20 sm:w-24 h-2 bg-white/10 rounded-full overflow-hidden border border-white/10">
        <div 
          className="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          style={{ width: `${percentage}%`, backgroundColor: brandColor }}
        />
      </div>
      <span className="font-sans text-xs font-bold text-slate-300">
        {percentage}%
      </span>
    </div>
  );
}

export default function Skills() {
  const { unlockQuest } = useGameSystem();

  return (
    <section id="skills" className="py-20 border-t border-white/10 bg-transparent relative overflow-hidden">
      <motion.div
        onViewportEnter={() => unlockQuest("skills", "Skills")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C084FC]/20 text-[#C084FC] border border-[#C084FC]/30 font-sans text-xs font-bold uppercase tracking-wider select-none">
            TECHNICAL PROFICIENCY
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
            Creative Toolkit
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Equipped with industry-standard software tools and creative suites for professional visual production.
          </p>
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="retro-card p-6 bg-[#131130]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-2xl select-none">{cat.iconEmoji}</span>
                  <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>

                {/* Tools Status Bars */}
                <div className="space-y-5">
                  {cat.tools.map((tool, tIdx) => (
                    <div key={tIdx} className="space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs font-bold text-slate-200 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.brandColor }} />
                          {tool.name}
                        </span>
                        <ProgressBar percentage={tool.proficiency} brandColor={tool.brandColor} />
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans font-normal pl-4 leading-normal">
                        {tool.subLabel}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Indicator */}
              <div className="mt-8 pt-4 border-t border-white/10 text-left">
                <span className="font-sans text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  ADVANCED PROFICIENCY
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
