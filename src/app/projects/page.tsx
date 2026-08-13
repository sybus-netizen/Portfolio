"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { getAssetPath } from "@/lib/utils";
import { projectsData } from "@/data/projects";
const categories = ["All", "Brand Identity", "Social & Marketing", "Video & Motion"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen py-24 bg-transparent relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-2xl text-left">
          <FadeIn direction="up">
            <span className="inline-block px-3 py-1 bg-[#3A86C8] border-2 border-black text-white font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">
              CATALOG
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h1 className="font-retro text-2xl sm:text-3.5xl font-bold tracking-tight text-foreground uppercase leading-none">
              Portfolio Projects
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
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
              className={`relative px-4 py-2 font-retro text-[8px] sm:text-[9px] uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-lg border ${
                activeCategory === category
                  ? "bg-[#C084FC] text-[#131130] border-[#C084FC] font-bold shadow-[0_0_15px_rgba(192,132,252,0.4)]"
                  : "bg-card/70 text-slate-300 border-white/10 hover:text-white hover:bg-card/90 hover:border-white/20"
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
                  <div className="retro-card p-5 h-full flex flex-col justify-between shadow-2xl rounded-2xl group relative overflow-hidden text-left hover:border-[#C084FC]/50 hover:shadow-[0_0_30px_rgba(192,132,252,0.25)] transition-all duration-300">
                    
                    {/* Card Header Category Pill */}
                    <div className="flex justify-between items-center pb-3 mb-4 border-b border-white/10 select-none">
                      <span className="px-2.5 py-1 rounded-full bg-[#C084FC]/20 text-[#C084FC] border border-[#C084FC]/30 font-sans text-[10px] font-bold uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {/* Image Container */}
                    <div className="relative aspect-[3/2] w-full overflow-hidden border border-white/10 bg-neutral-900 mb-4 rounded-xl">
                      <Image
                        src={getAssetPath(project.image)}
                        alt={project.title}
                        fill
                        unoptimized={true}
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10 p-4">
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold font-sans text-xs uppercase tracking-wider rounded-xl shadow-lg">
                          VIEW CASE STUDY ➔
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-grow justify-between text-left space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-sans text-base font-extrabold text-white uppercase group-hover:text-[#C084FC] transition-colors leading-tight">
                          {project.title}
                        </h3>
                        
                        <p className="text-xs text-slate-300 font-sans font-normal leading-relaxed line-clamp-2 md:line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Badges Footer */}
                      <div className="pt-3 border-t border-white/10 space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[10px] font-sans font-semibold uppercase tracking-wider"
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
