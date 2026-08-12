"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { useGameSystem } from "@/context/GameContext";
import { getAssetPath } from "@/lib/utils";

import { projectsData } from "@/data/projects";

const projects = projectsData.slice(0, 3);

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
      className="py-20 border-t border-white/10 bg-transparent relative overflow-hidden"
    >
      <motion.div
        onViewportEnter={() => unlockQuest("projects", "Work Completed")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 w-full text-left">
          <FadeIn direction="left" className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C084FC]/20 text-[#C084FC] border border-[#C084FC]/30 font-sans text-xs font-bold uppercase tracking-wider select-none">
              PORTFOLIO SHOWCASE
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
              Featured Work
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              A handpicked selection of my latest commercial video edits, graphic designs, and motion assets.
            </p>
          </FadeIn>
          <FadeIn direction="right" className="shrink-0">
            <Link href="/projects">
              <div className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans text-xs font-bold uppercase transition-all shadow-lg">
                SHOWCASE ➔
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
                {/* Modern Glass Project Card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  whileTap={{ y: 2, scale: 0.985 }}
                  className="retro-card p-5 bg-[#131130]/80 backdrop-blur-xl border border-white/10 h-full flex flex-col justify-between shadow-2xl rounded-2xl group relative overflow-hidden text-left hover:border-[#C084FC]/50 hover:shadow-[0_0_30px_rgba(192,132,252,0.25)] transition-all duration-300"
                >
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
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center pointer-events-none z-10 p-4">
                      <div className="px-4 py-2 bg-gradient-to-r from-[#C084FC] to-[#FFA5A5] text-[#131130] font-sans font-bold text-xs uppercase rounded-full shadow-[0_0_20px_rgba(192,132,252,0.5)] scale-90 group-hover:scale-100 transition-transform duration-300 tracking-wider flex items-center gap-2">
                        <span>VIEW PROJECT</span>
                        <span>➔</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-grow justify-between text-left space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-sans text-base font-bold text-white uppercase group-hover:text-[#C084FC] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs text-slate-300 font-sans font-normal leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Technology Chips */}
                    <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[10px] font-sans font-medium"
                        >
                          {tech}
                        </span>
                      ))}
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
