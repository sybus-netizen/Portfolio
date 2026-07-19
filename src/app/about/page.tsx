"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { experienceItems } from "@/components/sections/TimelineSection";

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
    <div className="min-h-screen py-24 bg-[#FAF6EE] relative select-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16 sm:space-y-24 relative z-10">
        
        {/* Header - Real bio text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          <div className="lg:col-span-5 space-y-4">
            <FadeIn direction="up">
              <span className="inline-block px-3 py-1 bg-[#FF5964] border-2 border-black text-white font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">THE ARTIST</span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-retro text-2xl sm:text-3.5xl font-bold tracking-tight text-black uppercase leading-tight">
                About <br />
                Shubham Shukla
              </h1>
            </FadeIn>
          </div>
          <div className="lg:col-span-7 pt-4">
            <FadeIn direction="up" delay={0.2} className="text-gray-700 leading-relaxed font-sans text-sm sm:text-base max-w-xl font-light">
              <p>
                I'm a Graphic Designer and Video Editor with nearly 4 years of experience creating branding, social media creatives, YouTube videos, advertisements, promotional content, and educational videos. I combine creativity with strategy to create visuals that are engaging, impactful, and purpose-driven.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Content Expertise Section */}
        <div className="space-y-10 pt-6 text-left">
          <div className="space-y-4">
            <FadeIn direction="up">
              <span className="inline-block px-3 py-1 bg-[#3A86C8] border-2 border-black text-white font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">SPECIALIZATION</span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h2 className="font-retro text-xl sm:text-2xl font-bold text-black uppercase leading-none">
                Content Expertise
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {expertiseItems.map((item, index) => (
              <FadeIn key={index} direction="up" delay={index * 0.04}>
                <div className="retro-card p-4 bg-[#FFFFFF] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center gap-3 select-none h-full hover:bg-[#FFDE47]/10 transition-colors">
                  <span className="text-xl shrink-0">{item.emoji}</span>
                  <span className="font-retro text-[8px] sm:text-[9px] font-bold text-black uppercase tracking-wider leading-tight">
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
              <span className="inline-block px-3 py-1 bg-[#3BCEAC] border-2 border-black text-black font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">CORE FOCUS</span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h2 className="font-retro text-xl sm:text-2xl font-bold text-black uppercase leading-none">
                Creative Philosophy
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {philosophies.map((philo, index) => (
              <FadeIn key={index} direction="up" delay={index * 0.08}>
                <div className="retro-card p-6 bg-[#FFFFFF] border-3 border-black shadow-[4px_4px_0px_#000] h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="w-11 h-11 rounded-sm border-2 border-black bg-[#FAF6EE] flex items-center justify-center text-xl shadow-[1.5px_1.5px_0px_#000] select-none">
                      {philo.emoji}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-retro text-[10px] sm:text-xs font-bold text-black uppercase tracking-wider">
                        {philo.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed font-sans font-light">
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
                <span className="inline-block px-3 py-1 bg-[#FFDE47] border-2 border-black text-black font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">EXPERIENCE</span>
              </FadeIn>
              <h2 className="font-retro text-xl sm:text-2xl font-bold text-black uppercase leading-none">
                Work History
              </h2>
            </div>

            <div className="border-l-4 border-dashed border-black/20 pl-6 space-y-8">
              {experienceItems.map((item, idx) => (
                <div key={item.id} className="relative space-y-2">
                  <div className="absolute left-[-32px] top-1.5 w-4 h-4 rounded-full border-2 border-black bg-[#FFDE47]" />
                  <div className="retro-card p-5 bg-[#FFFFFF] border-3 border-black shadow-[3px_3px_0px_#000]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black/10 pb-2 mb-3">
                      <h3 className="font-retro text-[9px] sm:text-[10px] font-bold text-black uppercase leading-none">{item.role}</h3>
                      <span className="font-retro text-[7px] text-[#FF5964] font-bold">[{item.duration}]</span>
                    </div>
                    <div className="font-sans text-xs space-y-3">
                      <div className="flex justify-between items-center text-gray-500 font-bold uppercase text-[9px]">
                        <span>{item.company}</span>
                        <span>{item.location}</span>
                      </div>
                      <ul className="list-disc pl-3 leading-relaxed text-gray-600 font-light space-y-1 ml-1 marker:text-[#FF5964]">
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
                <span className="inline-block px-3 py-1 bg-[#FF5964] border-2 border-black text-white font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">ACADEMIC</span>
              </FadeIn>
              <h2 className="font-retro text-xl sm:text-2xl font-bold text-black uppercase leading-none">
                Education
              </h2>
            </div>

            <div className="border-l-4 border-dashed border-black/20 pl-6 space-y-8">
              {educationItems.map((item, idx) => (
                <div key={item.id} className="relative space-y-2">
                  <div className="absolute left-[-32px] top-1.5 w-4 h-4 rounded-full border-2 border-black bg-[#FF5964]" />
                  <div className="retro-card p-5 bg-[#FFFFFF] border-3 border-black shadow-[3px_3px_0px_#000]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black/10 pb-2 mb-3">
                      <h3 className="font-retro text-[9px] sm:text-[10px] font-bold text-black uppercase leading-none">{item.role}</h3>
                      <span className="font-retro text-[7px] text-[#FFDE47] font-bold">[{item.duration}]</span>
                    </div>
                    <div className="font-sans text-xs space-y-3">
                      <div className="flex justify-between items-center text-gray-500 font-bold uppercase text-[9px]">
                        <span>{item.company}</span>
                        <span>{item.location}</span>
                      </div>
                      <ul className="list-disc pl-3 leading-relaxed text-gray-600 font-light space-y-1 ml-1 marker:text-[#FFDE47]">
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
