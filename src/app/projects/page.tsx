"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

const categories = ["All", "Brand Identity", "Social & Marketing", "Video & Motion"];

const projectsData = [
  {
    id: "nebula-branding",
    title: "Nebula Brand Identity",
    category: "Brand Identity",
    role: "Lead Designer",
    year: "2025",
    description: "A complete visual identity redesign for a creative agency, featuring neon-minimal packaging, custom corporate typography, and stationery mockups.",
    image: "/assets/projects/branding.jpg",
    technologies: ["Photoshop", "Illustrator", "Figma"],
    tags: ["Visual Identity", "Branding Assets", "Packaging Layout"],
    cartridgeColor: "bg-[#FFDE47]"
  },
  {
    id: "vanguard-film",
    title: "Vanguard Short Film",
    category: "Video & Motion",
    role: "Lead Editor",
    year: "2024",
    description: "High-end cinematic video assembly featuring custom sound design, dramatic color grading, complex multitrack pacing, and emotional rhythm.",
    image: "/assets/projects/video.jpg",
    technologies: ["Premiere Pro", "After Effects", "Resolve"],
    tags: ["Color Grading", "Cinematic Cut", "Sound Design"],
    cartridgeColor: "bg-[#FF5964]"
  },
  {
    id: "abstract-dimensions",
    title: "Abstract Dimensions",
    category: "Video & Motion",
    role: "VFX Artist",
    year: "2025",
    description: "Dynamic VFX composition rendering futuristic floating geometric structures, light trails, keyframe animation, and custom glow layers.",
    image: "/assets/projects/motion.jpg",
    technologies: ["After Effects", "Cinema 4D", "VFX Suite"],
    tags: ["3D Compositing", "Keyframe Animation", "Glow Effects"],
    cartridgeColor: "bg-[#3A86C8]"
  },
  {
    id: "aurora-poster",
    title: "Aurora Poster Series",
    category: "Social & Marketing",
    role: "Visual Artist",
    year: "2025",
    description: "A series of futuristic poster designs exploring cosmic layouts, abstract glowing shapes, and vibrant dual-tone gradients.",
    image: "/assets/projects/branding.jpg",
    technologies: ["Photoshop", "Illustrator"],
    tags: ["Print Layout", "Color Theory", "Composition"],
    cartridgeColor: "bg-[#FFDE47]"
  },
  {
    id: "music-video",
    title: "Chroma Beat Promo",
    category: "Video & Motion",
    role: "Lead Editor",
    year: "2024",
    description: "Rhythmic and fast-paced editing sequence utilizing digital light glitches, split-screen configurations, and precision beat mapping.",
    image: "/assets/projects/video.jpg",
    technologies: ["Premiere Pro", "After Effects"],
    tags: ["Beat Syncing", "Glitch Effects", "Fast Cut"],
    cartridgeColor: "bg-[#FF5964]"
  },
  {
    id: "logo-reveal",
    title: "Vortex Logo Sting",
    category: "Video & Motion",
    role: "Animator",
    year: "2025",
    description: "A high-impact animated logo reveal for a digital media corporation, featuring vector morphing and particle glow effects.",
    image: "/assets/projects/motion.jpg",
    technologies: ["After Effects", "Illustrator"],
    tags: ["Logo Animation", "Morphing Assets", "Particles"],
    cartridgeColor: "bg-[#3A86C8]"
  }
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen py-24 bg-[#FAF6EE] relative select-none">

      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-2xl text-left">
          <FadeIn direction="up">
            <span className="inline-block px-3 py-1 bg-[#3A86C8] border-2 border-black text-white font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">
              CATALOG
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h1 className="font-retro text-2xl sm:text-3.5xl font-bold tracking-tight text-black uppercase leading-none">
              Portfolio Projects
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-xs sm:text-sm text-[#555555] font-sans">
              Dive deep into my full creative catalog. Filter by specialization to view specific design concepts, video edits, and motion design renders.
            </p>
          </FadeIn>
        </div>

        {/* Filter Navigation */}
        <FadeIn direction="up" delay={0.3} className="flex flex-wrap items-center gap-3 border-b-2 border-black/10 pb-8 justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 py-2 border-2 border-black font-retro text-[8px] sm:text-[9px] uppercase tracking-wider transition-all duration-100 cursor-pointer rounded-sm ${
                activeCategory === category
                  ? "bg-[#FFDE47] text-black shadow-[2px_2px_0px_#000] translate-y-[-1px]"
                  : "bg-white text-black/60 shadow-[1.5px_1.5px_0px_#000] active:translate-y-0.5 active:shadow-none hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </FadeIn>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={project.id}
                className="h-full flex flex-col"
              >
                <Link href={`/projects/${project.id}`} className="block h-full cursor-pointer select-none">
                  <div className="retro-card p-4 bg-[#FFFFFF] border-3 border-black h-full flex flex-col justify-between shadow-[4px_4px_0px_#000] group relative overflow-hidden">
                    
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
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center pointer-events-none z-10 p-4">
                        <div className="px-3.5 py-2 bg-[#FFDE47] border-2 border-black text-black font-retro text-[9px] uppercase shadow-[2.5px_2.5px_0px_#000] scale-90 group-hover:scale-100 transition-transform duration-200">
                          Insert Cartridge ▶
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-grow justify-between text-left space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[8px] font-retro uppercase text-[#FF5964] font-bold">
                          <span>{project.category}</span>
                          <span className="text-black/30 font-mono">[{project.year}]</span>
                        </div>

                        <h3 className="font-retro text-[10px] sm:text-xs font-bold text-black uppercase group-hover:text-[#FF5964] transition-colors leading-tight">
                          {project.title}
                        </h3>
                        
                        <p className="text-xs text-[#555555] font-sans font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Badges Footer */}
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

                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
