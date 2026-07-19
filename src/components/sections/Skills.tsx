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

// Helper to render heart containers based on skill percentages
function HeartMeter({ percentage }: { percentage: number }) {
  const total = 5;
  const filled = Math.round((percentage / 100) * total);
  
  return (
    <div className="flex items-center gap-1 text-[#FF5964]">
      {Array.from({ length: total }).map((_, i) => (
        <span 
          key={i} 
          className={`text-sm ${i < filled ? "animate-[heartPulse_1.5s_infinite]" : "opacity-30"}`}
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  const { unlockQuest } = useGameSystem();

  return (
    <section id="skills" className="py-20 border-t-3 border-black bg-[#FAF6EE] relative overflow-hidden">
      <motion.div
        onViewportEnter={() => unlockQuest("skills", "Skills")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3BCEAC] border-2 border-black text-black font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">
            POWER STATUS
          </div>
          <h2 className="font-retro text-xl sm:text-2xl md:text-3.5xl font-bold tracking-tight text-black uppercase leading-none">
            Creative Toolkit
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
            Equipped with industry-standard software tools and frameworks calibrated to professional levels.
          </p>
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="retro-card p-6 bg-[#FFFFFF] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b-2 border-black/10 pb-4">
                  <span className="text-2xl select-none">{cat.iconEmoji}</span>
                  <h3 className="font-retro text-[10px] sm:text-xs font-bold text-black uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>

                {/* Tools Status Bars */}
                <div className="space-y-5">
                  {cat.tools.map((tool, tIdx) => (
                    <div key={tIdx} className="space-y-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-retro text-[9px] sm:text-[10px] uppercase font-bold text-black flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tool.brandColor }} />
                          {tool.name}
                        </span>
                        <HeartMeter percentage={tool.proficiency} />
                      </div>
                      <p className="text-[10px] text-gray-500 font-sans font-light pl-3.5 leading-normal">
                        {tool.subLabel}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-8 pt-4 border-t border-dashed border-black/10 text-left">
                <span className="font-retro text-[8px] text-black/30">SKILL_SYS_LVL: STABLE</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
