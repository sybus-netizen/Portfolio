"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { experienceItems } from "@/data/experience";

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

const educationItems: TimelineItem[] = [
  {
    id: "edu-arts-film",
    role: "Graphic Designing & Video Editing",
    company: "Arts Film Academy",
    duration: "2021 – 2022",
    location: "Bangalore, India",
    description: [
      "Focused on conceptual graphics layouts, design principles, and hands-on video compilation workflows.",
    ],
  },
  {
    id: "edu-arena",
    role: "VFX Prime (Certified VFX Professional)",
    company: "Arena Animation",
    duration: "2019 – 2021",
    location: "Bangalore, India",
    description: [
      "Specialized in high-end VFX compositing, tracking, rotoscoping, chroma-keying, and dynamic render compositions.",
    ],
  },
  {
    id: "edu-kv",
    role: "High School Graduation",
    company: "Kendriya Vidyalaya",
    duration: "2013",
    location: "India",
    description: [
      "Secondary education with focusing interests in visual content and media layouts.",
    ],
  },
];

const expertiseItems = [
  { name: "YouTube Videos", emoji: "📺" },
  { name: "Educational Content", emoji: "🎓" },
  { name: "Promotional Videos", emoji: "🎬" },
  { name: "Advertisements", emoji: "📢" },
  { name: "Social Media Reels & Shorts", emoji: "📱" },
  { name: "Motion Graphics", emoji: "⚡" },
  { name: "Branding & Visual Identity", emoji: "🎨" },
  { name: "Marketing Creatives", emoji: "📈" },
];

export default function AboutPage() {
  const philosophies = [
    {
      emoji: "🎨",
      title: "Branding & Identity",
      description: "Design isn't just decoration; it's how a business expresses its core character. I build strategic visual systems that align with brand positioning and establish authority.",
    },
    {
      emoji: "🎬",
      title: "Visual Storytelling",
      description: "Whether in static layouts or dynamic cuts, stories are the hook. I craft visual pacing, typographic layouts, and audio design to capture and hold target attention.",
    },
    {
      emoji: "⚡",
      title: "Motion Graphics",
      description: "Adding motion brings static art to life. I create premium keyframed title transitions, branding stings, and visual overlays to add a premium touch to digital films.",
    }
  ];

  return (
    <div className="min-h-screen py-24 bg-transparent relative select-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16 sm:space-y-24 relative z-10">
        
        {/* Header - Real bio text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          <div className="lg:col-span-5 space-y-4">
            <FadeIn direction="up">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C084FC]/20 border border-[#C084FC]/30 text-[#C084FC] font-sans text-xs font-bold uppercase tracking-wider select-none">THE ARTIST</span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-sans text-2xl sm:text-3.5xl font-extrabold tracking-tight text-foreground uppercase leading-tight">
                About <br />
                Shubham Shukla
              </h1>
            </FadeIn>
          </div>
          <div className="lg:col-span-7 pt-4">
            <FadeIn direction="up" delay={0.2} className="text-slate-300 leading-relaxed font-sans text-sm sm:text-base max-w-xl font-light">
              <p>
                I'm a Graphic Designer and Video Editor with over 3.8 years of experience creating branding, social media creatives, YouTube videos, advertisements, promotional content, and educational videos. I combine creativity with strategy to create visuals that are engaging, impactful, and purpose-driven.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Content Expertise Section */}
        <div className="space-y-10 pt-6 text-left">
          <div className="space-y-4">
            <FadeIn direction="up">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C084FC]/20 border border-[#C084FC]/30 text-[#C084FC] font-sans text-xs font-bold uppercase tracking-wider select-none">SPECIALIZATION</span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h2 className="font-retro text-xl sm:text-2xl font-bold text-foreground uppercase leading-none">
                Content Expertise
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {expertiseItems.map((item, index) => (
              <FadeIn key={index} direction="up" delay={index * 0.04}>
                <div className="retro-card p-4 flex items-center gap-3 select-none h-full hover:bg-white/10 transition-colors">
                  <span className="text-xl shrink-0">{item.emoji}</span>
                  <span className="font-retro text-[8px] sm:text-[9px] font-bold text-foreground uppercase tracking-wider leading-tight">
                    {item.name}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="space-y-10 text-left">
          <div className="space-y-4">
            <FadeIn direction="up">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C084FC]/20 border border-[#C084FC]/30 text-[#C084FC] font-sans text-xs font-bold uppercase tracking-wider select-none">CORE FOCUS</span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-foreground uppercase leading-none">
                Creative Philosophy
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {philosophies.map((philo, index) => (
              <FadeIn key={index} direction="up" delay={index * 0.08}>
                <div className="retro-card p-6 h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="w-11 h-11 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-xl shadow-lg select-none">
                      {philo.emoji}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                        {philo.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                        {philo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Career Timeline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 text-left items-start">
          
          {/* Work Experience */}
          <div className="space-y-10">
            <div className="space-y-4">
              <FadeIn direction="up">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C084FC]/20 border border-[#C084FC]/30 text-[#C084FC] font-sans text-xs font-bold uppercase tracking-wider select-none">EXPERIENCE</span>
              </FadeIn>
              <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-foreground uppercase leading-none">
                Work History
              </h2>
            </div>

            <div className="border-l-2 border-dashed border-white/20 pl-6 space-y-8">
              {experienceItems.map((item, idx) => (
                <div key={item.id} className="relative space-y-2">
                  <div className="absolute left-[-32px] top-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#C084FC] shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                  <div className="retro-card p-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-2 mb-3">
                      <h3 className="font-sans text-xs font-bold text-foreground uppercase leading-none">{item.role}</h3>
                      <span className="font-sans text-[10px] text-[#C084FC] font-bold">[{item.duration}]</span>
                    </div>
                    <div className="font-sans text-xs space-y-3">
                      <div className="flex justify-between items-center text-slate-400 font-bold uppercase text-[9px]">
                        <span>{item.company}</span>
                        <span>{item.location}</span>
                      </div>
                      <ul className="list-disc pl-3 leading-relaxed text-slate-300 font-light space-y-1 ml-1 marker:text-[#C084FC]">
                        {item.description.map((desc, dIdx) => (
                          <li key={dIdx}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-10">
            <div className="space-y-4">
              <FadeIn direction="up">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C084FC]/20 border border-[#C084FC]/30 text-[#C084FC] font-sans text-xs font-bold uppercase tracking-wider select-none">ACADEMIC</span>
              </FadeIn>
              <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-foreground uppercase leading-none">
                Education
              </h2>
            </div>

            <div className="border-l-2 border-dashed border-white/20 pl-6 space-y-8">
              {educationItems.map((item, idx) => (
                <div key={item.id} className="relative space-y-2">
                  <div className="absolute left-[-32px] top-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#C084FC] shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                  <div className="retro-card p-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-2 mb-3">
                      <h3 className="font-sans text-xs font-bold text-foreground uppercase leading-none">{item.role}</h3>
                      <span className="font-sans text-[10px] text-[#C084FC] font-bold">[{item.duration}]</span>
                    </div>
                    <div className="font-sans text-xs space-y-3">
                      <div className="flex justify-between items-center text-slate-400 font-bold uppercase text-[9px]">
                        <span>{item.company}</span>
                        <span>{item.location}</span>
                      </div>
                      <ul className="list-disc pl-3 leading-relaxed text-slate-300 font-light space-y-1 ml-1 marker:text-[#C084FC]">
                        {item.description.map((desc, dIdx) => (
                          <li key={dIdx}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
