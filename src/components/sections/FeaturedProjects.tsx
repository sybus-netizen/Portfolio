"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { useGameSystem } from "@/context/GameContext";
import { getAssetPath } from "@/lib/utils";

const projects = [
  {
    id: "nebula-branding",
    title: "Nebula Brand Identity",
    category: "Graphic Design",
    role: "Lead Designer",
    year: "2025",
    description: "A complete visual identity redesign for a creative agency, featuring neon-minimal packaging, custom corporate typography, and stationery mockups.",
    image: "/assets/projects/branding.jpg",
    technologies: ["Photoshop", "Illustrator", "Figma"],
    tags: ["Visual Identity", "Branding Assets", "Packaging Layout"],
    cartridgeColor: "bg-[#FFDE47]" // yellow cartridge
  },
  {
    id: "vanguard-film",
    title: "Vanguard Short Film",
    category: "Video Editing",
    role: "Lead Editor",
    year: "2024",
    description: "High-end cinematic video assembly featuring custom sound design, dramatic color grading, complex multitrack pacing, and emotional rhythm.",
    image: "/assets/projects/video.jpg",
    technologies: ["Premiere Pro", "After Effects", "Resolve"],
    tags: ["Color Grading", "Cinematic Cut", "Sound Design"],
    cartridgeColor: "bg-[#FF5964]" // red cartridge
  },
  {
    id: "abstract-dimensions",
    title: "Abstract Dimensions",
    category: "Motion Graphics",
    role: "VFX Artist",
    year: "2025",
    description: "Dynamic VFX composition rendering futuristic floating geometric structures, light trails, keyframe animation, and custom glow layers.",
    image: "/assets/projects/motion.jpg",
    technologies: ["After Effects", "Cinema 4D", "VFX Suite"],
    tags: ["3D Compositing", "Keyframe Animation", "Glow Effects"],
    cartridgeColor: "bg-[#3A86C8]" // blue cartridge
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const { unlockQuest, unlockAchievement, playClick } = useGameSystem();

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="py-20 border-t-3 border-black bg-[#FAF6EE] overflow-hidden"
    >
      <motion.div
        onViewportEnter={() => unlockQuest("projects", "Work Completed")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 w-full text-left">
          <FadeIn direction="left" className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3A86C8] border-2 border-black text-white font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">
              STAGE 03
            </div>
            <h2 className="font-retro text-xl sm:text-2xl md:text-3.5xl font-bold tracking-tight text-black uppercase leading-none">
              Featured Work
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-sans">
              A handpicked selection of my latest design products, commercial video edits, and motion graphic assets.
            </p>
          </FadeIn>
          <FadeIn direction="right" className="shrink-0">
            <Link href="/projects">
              <div className="retro-btn shadow-[3px_3px_0px_#000] text-[9px]">
                Browse Catalog ➔
              </div>
            </Link>
          </FadeIn>
        </div>

        {/* Project Cartridges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch">
          {projects.map((project) => (
            <div
              key={project.id}
              className="h-full flex flex-col"
            >
              <Link 
                href={`/projects/${project.id}`} 
                onClick={() => {
                  playClick();
                  unlockAchievement("view-project", "Viewed First Project", "📂");
                }}
                className="block h-full cursor-pointer select-none"
              >
                {/* Chunky Game Cartridge Layout with dynamic hover spring */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.015, boxShadow: "6px 6px 0px #000" }}
                  whileTap={{ y: 2, scale: 0.985, boxShadow: "2px 2px 0px #000" }}
                  className="retro-card p-4 bg-[#FFFFFF] border-3 border-black h-full flex flex-col justify-between shadow-[4px_4px_0px_#000] group relative overflow-hidden text-left"
                >
                  
                  {/* Cartridge Header Ridge */}
                  <div className="flex justify-between items-center border-b-2 border-black pb-3 mb-4 select-none">
                    <span className="font-retro text-[7px] text-black/40">MODEL: S-SLOT_{project.year}</span>
                    <div className="flex gap-1">
                      <span className="w-2.5 h-2.5 border border-black bg-black/10 rounded-full" />
                      <span className="w-2.5 h-2.5 border border-black bg-black/10 rounded-full" />
                    </div>
                  </div>

                  {/* Cartridge Label Image Container */}
                  <div className="relative aspect-[3/2.1] w-full overflow-hidden border-2 border-black bg-neutral-900 mb-4 rounded-sm">
                    <Image
                      src={getAssetPath(project.image)}
                      alt={project.title}
                      fill
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay - Flashing PRESS ENTER TO LOAD */}
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center pointer-events-none z-10 p-4">
                      <div className="px-3.5 py-2 bg-[#FFDE47] border-2 border-black text-black font-retro text-[8px] uppercase shadow-[2.5px_2.5px_0px_#000] scale-90 group-hover:scale-100 transition-transform duration-200 animate-[heartPulse_0.8s_infinite] tracking-wider">
                        Press Enter to Load ▶
                      </div>
                    </div>
                  </div>

                  {/* Cartridge Content Details */}
                  <div className="flex flex-col flex-grow justify-between text-left space-y-4">
                    <div className="space-y-3">
                      {/* Metadata Header */}
                      <div className="flex items-center justify-between text-[8px] font-retro uppercase text-[#FF5964] font-bold">
                        <span>{project.category}</span>
                        <span className="text-black/30 font-mono">[{project.year}]</span>
                      </div>

                      <h3 className="font-retro text-[9px] sm:text-[10px] font-bold text-black uppercase group-hover:text-[#FF5964] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs text-[#555555] font-sans font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Inventory Labels / Tags */}
                    <div className="pt-3 border-t-2 border-dashed border-black/10 space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-sans text-black/60 bg-[#FAF6EE] border border-black/20 px-2 py-0.5 rounded-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[8px] font-retro font-bold text-[#3A86C8] uppercase tracking-wide mr-1.5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                </motion.div>
              </Link>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
