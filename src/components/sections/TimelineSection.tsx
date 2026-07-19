"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { useGameSystem } from "@/context/GameContext";

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

export const experienceItems: TimelineItem[] = [
  {
    id: "digital-clouds-iot",
    role: "Graphic Designer & Video Editor",
    company: "Digital Clouds IoT Pvt Ltd",
    duration: "Jan 2026 - Present",
    location: "Bangalore, India",
    description: [
      "Designed social media creatives and branding visuals for digital campaigns.",
      "Created healthcare marketing creatives for Northwest Hospital.",
      "Edited promotional videos and collaborated with marketing and SEO teams.",
    ],
  },
  {
    id: "siva-academy-job",
    role: "Visual Content Creator & Trainer",
    company: "Siva Academy",
    duration: "Nov 2024 - Oct 2025",
    location: "Bangalore, India",
    description: [
      "Designed marketing creatives and social media campaigns.",
      "Trained students in video editing and content creation.",
    ],
  },
  {
    id: "arts-film-academy-job",
    role: "Graphic Designer & Video Editor",
    company: "Arts Film Academy",
    duration: "Oct 2022 - Nov 2024",
    location: "Bangalore, India",
    description: [
      "Produced graphics for educational and promotional campaigns.",
      "Edited short films and promotional videos.",
      "Served as Visiting Faculty conducting design workshops.",
    ],
  },
];

export default function TimelineSection() {
  const { unlockQuest } = useGameSystem();

  return (
    <section id="timeline" className="py-20 border-t-3 border-black bg-[#FAF6EE] relative overflow-hidden">
      <motion.div
        onViewportEnter={() => unlockQuest("timeline", "Quest Timeline")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl mx-auto px-6 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE47] border-2 border-black text-black font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">
            STAGE 04
          </div>
          <h2 className="font-retro text-xl sm:text-2xl md:text-3.5xl font-bold tracking-tight text-black uppercase leading-none">
            Quest Timeline
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-sans">
            A chronological timeline of my professional positions, visual creations, and corporate contributions.
          </p>
        </div>

        {/* Level Map Grid Paths */}
        <div className="relative border-l-4 border-dashed border-black/30 pl-8 ml-4 sm:ml-8 space-y-12">
          {experienceItems.map((item, idx) => {
            const stageNum = experienceItems.length - idx;
            const isCurrent = idx === 0;
            
            return (
              <FadeIn key={item.id} direction="left" delay={idx * 0.1} className="relative">
                
                {/* Custom Checkpoint Node (Pixel cart indicator) */}
                <div 
                  className={`absolute left-[-49px] top-1.5 w-7 h-7 rounded-sm border-2 border-black flex items-center justify-center text-xs shadow-[1.5px_1.5px_0px_#000] ${
                    isCurrent ? "bg-[#FF5964] text-white" : "bg-[#FFFFFF] text-black"
                  }`}
                >
                  {isCurrent ? "★" : stageNum}
                </div>

                {/* Level Detail Card */}
                <div className="retro-card p-6 bg-[#FFFFFF] border-3 border-black text-left shadow-[4px_4px_0px_#000] relative">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b-2 border-black/10 pb-3.5 mb-4 select-none w-full text-left">
                    <div className="space-y-2 flex-grow">
                      <div className="inline-block px-2 py-0.5 bg-[#3BCEAC]/20 border border-[#3BCEAC] text-[#3BCEAC] font-retro text-[8px] uppercase rounded-sm">
                        {isCurrent ? "BOSS STAGE" : `LEVEL 0${stageNum}`}
                      </div>
                      <h3 className="font-retro text-[9px] sm:text-[10px] font-bold text-black uppercase leading-[1.3] max-w-xl break-words">
                        {item.role}
                      </h3>
                    </div>
                    <span className="font-retro text-[8px] text-[#FF5964] font-bold shrink-0 sm:pt-1">
                      [{item.duration}]
                    </span>
                  </div>

                  {/* Company info */}
                  <div className="space-y-4 font-sans text-xs sm:text-sm">
                    <div className="flex justify-between items-center text-gray-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide">
                      <span>{item.company}</span>
                      <span>{item.location}</span>
                    </div>

                    {/* Quest Deliverables list */}
                    <ul className="space-y-2.5 text-gray-700 font-light text-left pl-3 list-disc marker:text-[#FF5964]">
                      {item.description.map((desc, dIdx) => (
                        <li key={dIdx} className="leading-relaxed">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </FadeIn>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
