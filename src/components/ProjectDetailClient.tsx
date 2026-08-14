"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ShieldCheck, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { getAssetPath } from "@/lib/utils";
import { useGameSystem } from "@/context/GameContext";

import MediaGalleryViewer, { GalleryItem } from "@/components/MediaGalleryViewer";

import { useTheme } from "@/context/ThemeContext";

interface ClientProps {
  project: ProjectItem;
}

export default function ProjectDetailClient({ project }: ClientProps) {
  const { playClick } = useGameSystem();
  const { theme } = useTheme();

  const hasVideo = !!(project.videos && project.videos.length > 0) || !!project.videoUrl;

  const galleryItems: GalleryItem[] = hasVideo
    ? (project.videos || [project.videoUrl!]).map((url) => ({ type: "video" as const, url }))
    : project.gallery && project.gallery.length > 0
    ? project.gallery.map((url) => ({ type: "image" as const, url }))
    : [{ type: "image" as const, url: project.image }];

  return (
    <div className="pt-14 pb-6 sm:pt-20 sm:pb-10 bg-transparent relative overflow-hidden select-none z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 space-y-5 relative z-10">
        
        {/* Back Link */}
        <div className="text-left">
          <Link 
            href="/projects" 
            onClick={playClick}
            style={{ color: theme === "light" ? "#1E293B" : "#CBD5E1" }}
            className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>

        {/* 2-Column Responsive Layout (Mobile: Gallery FIRST, Desktop: Side-by-Side) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 lg:gap-10 items-start">
          
          {/* GALLERY COLUMN (FIRST ON MOBILE [order-1], RIGHT ON DESKTOP [md:order-2]) */}
          <div className="order-1 md:order-2 md:col-span-7 lg:col-span-8 text-left w-full">
            <MediaGalleryViewer items={galleryItems} projectTitle={project.title} />
          </div>

          {/* LEFT COLUMN: STICKY INFO SIDEBAR (SECOND ON MOBILE [order-2], LEFT ON DESKTOP [md:order-1]) */}
          <div className="order-2 md:order-1 md:col-span-5 lg:col-span-4 md:sticky md:top-24 space-y-5 w-full">
            <div 
              className="retro-card p-5 sm:p-6 rounded-2xl space-y-4 text-left"
            >
              <div className="space-y-3">
                <div 
                  style={{
                    backgroundColor: theme === "light" ? "#DBEAFE" : "rgba(192, 132, 252, 0.2)",
                    color: theme === "light" ? "#1E40AF" : "#C084FC",
                    borderColor: theme === "light" ? "#93C5FD" : "rgba(192, 132, 252, 0.3)"
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border font-sans text-xs font-bold uppercase tracking-wider"
                >
                  {project.category}
                </div>
                <h1 
                  style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
                  className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-tight leading-tight"
                >
                  {project.title}
                </h1>
                <p 
                  style={{ color: theme === "light" ? "#334155" : "#CBD5E1" }}
                  className="text-xs font-sans font-medium leading-relaxed"
                >
                  {project.description}
                </p>
                
                {/* Software Used Badges */}
                <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-2">
                  <span className="font-sans text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    SOFTWARE USED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.1)",
                          color: theme === "light" ? "#0F172A" : "#F8FAFC",
                          borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.15)"
                        }}
                        className="px-2.5 py-1 rounded-lg border text-[11px] font-sans font-bold shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
