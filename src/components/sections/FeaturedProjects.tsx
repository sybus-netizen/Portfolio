"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { useGameSystem } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";
import { getAssetPath } from "@/lib/utils";

import { projectsData } from "@/data/projects";

const projects = projectsData.slice(0, 3);

export default function FeaturedProjects() {
  const { unlockQuest, unlockAchievement, playClick } = useGameSystem();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="py-12 sm:py-16 md:py-20 border-t border-slate-300 dark:border-white/10 bg-transparent relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-[1.5px] bg-gradient-to-r from-transparent via-slate-400/60 dark:via-white/20 to-transparent" />
      <motion.div
        onViewportEnter={() => unlockQuest("projects", "Work Completed")}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-6 w-full text-left">
          <FadeIn direction="left" className="space-y-4 max-w-xl">
            <div 
              style={{
                backgroundColor: theme === "light" ? "#2563EB" : "rgba(192, 132, 252, 0.2)",
                color: theme === "light" ? "#FFFFFF" : "#C084FC",
                borderColor: theme === "light" ? "#1D4ED8" : "rgba(192, 132, 252, 0.3)"
              }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border font-sans text-xs font-extrabold uppercase tracking-wider select-none shadow-sm"
            >
              PORTFOLIO SHOWCASE
            </div>
            <h2 
              style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
              className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-none"
            >
              Featured Work
            </h2>
            <p 
              style={{ color: theme === "light" ? "#334155" : "#CBD5E1" }}
              className="text-xs sm:text-sm font-sans leading-relaxed font-medium"
            >
              A selection of my recent graphic designs, video edits, and motion work.
            </p>
          </FadeIn>
          <FadeIn direction="right" className="shrink-0">
            <Link href="/projects">
              <div 
                style={{
                  backgroundColor: theme === "light" ? "#E2E8F0" : "rgba(255, 255, 255, 0.1)",
                  color: theme === "light" ? "#0F172A" : "#FFFFFF",
                  borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.2)"
                }}
                className="px-4 py-2 rounded-xl border font-sans text-xs font-bold uppercase transition-all shadow-md hover:scale-105"
              >
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
                  style={{
                    backgroundColor: theme === "light" ? "#FFFFFF" : undefined,
                    borderColor: theme === "light" ? "#CBD5E1" : undefined
                  }}
                  className="retro-card p-5 h-full flex flex-col justify-between shadow-2xl rounded-2xl group relative overflow-hidden text-left hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 border"
                >
                  {/* Card Header Category Pill */}
                  <div className="flex justify-between items-center pb-3 mb-4 border-b border-black/10 dark:border-white/10 select-none">
                    <span 
                      style={{
                        backgroundColor: theme === "light" ? "#DBEAFE" : "rgba(192, 132, 252, 0.2)",
                        color: theme === "light" ? "#1E40AF" : "#C084FC",
                        borderColor: theme === "light" ? "#93C5FD" : "rgba(192, 132, 252, 0.3)"
                      }}
                      className="px-2.5 py-1 rounded-full border font-sans text-[10px] font-bold uppercase tracking-wider"
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Thumbnail Image Container */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/10 group-hover:scale-[1.02] transition-transform duration-300">
                    <Image
                      src={getAssetPath(project.image)}
                      alt={project.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content Area */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
                        className="font-sans text-base font-extrabold uppercase tracking-tight group-hover:text-blue-600 transition-colors"
                      >
                        {project.title}
                      </h3>
                      <p 
                        style={{ color: theme === "light" ? "#334155" : "#CBD5E1" }}
                        className="font-sans text-xs line-clamp-2 mt-1 leading-relaxed font-medium"
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.08)",
                            color: theme === "light" ? "#0F172A" : "#E2E8F0",
                            borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.15)"
                          }}
                          className="px-2 py-0.5 rounded-md border text-[10px] font-sans font-bold shadow-sm"
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
