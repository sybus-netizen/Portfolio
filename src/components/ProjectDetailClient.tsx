"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ShieldCheck, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { getAssetPath } from "@/lib/utils";
import { useGameSystem } from "@/context/GameContext";

interface ClientProps {
  project: ProjectItem;
}

export default function ProjectDetailClient({ project }: ClientProps) {
  const { playClick } = useGameSystem();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(
    project.videoUrl || (project.videos && project.videos.length > 0 ? project.videos[0] : "")
  );

  const accentColor = project.cartridgeColor.includes("bg-[#FFDE47]")
    ? "border-[#FFDE47]"
    : project.cartridgeColor.includes("bg-[#FF5964]")
    ? "border-[#FF5964]"
    : "border-[#3A86C8]";

  const accentBg = project.cartridgeColor.includes("bg-[#FFDE47]")
    ? "bg-[#FFDE47]"
    : project.cartridgeColor.includes("bg-[#FF5964]")
    ? "bg-[#FF5964]"
    : "bg-[#3A86C8]";

  return (
    <div className="min-h-screen pt-32 pb-32 mb-12 bg-transparent relative overflow-hidden select-none z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 space-y-6 relative z-10">
        
        {/* Back Link */}
        <div className="text-left">
          <Link 
            href="/projects" 
            onClick={playClick}
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          
          {/* LEFT COLUMN: STICKY INFO SIDEBAR */}
          <div className="md:col-span-5 md:sticky md:top-28 space-y-6">
            <div className="retro-card p-5 sm:p-6 bg-[#131130]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl space-y-5 text-left">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C084FC]/20 border border-[#C084FC]/30 text-[#C084FC] font-sans text-xs font-bold uppercase tracking-wider">
                  {project.category}
                </div>
                <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white leading-tight">
                  {project.title}
                </h1>
                <p className="text-xs text-slate-300 font-sans font-normal leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Specs Table */}
              <div className="bg-white/5 border border-white/10 p-4 space-y-2.5 font-sans rounded-xl backdrop-blur-md">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                  <span className="font-sans text-xs text-slate-400 flex items-center gap-2 uppercase font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Role
                  </span>
                  <span className="font-bold text-white">{project.role}</span>
                </div>
                <div className="flex flex-col gap-1.5 text-xs pt-1">
                  <span className="font-sans text-xs text-slate-400 flex items-center gap-2 uppercase font-medium">
                    <Tag className="w-3.5 h-3.5 text-slate-400" /> Tools
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200 text-[10px] font-sans font-semibold uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Media Stream Metadata */}
              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs font-sans text-slate-400">
                <span>PROJECT SHOWCASE</span>
                <span className="text-[#A7F3D0] font-semibold">
                  {project.gallery ? `${project.gallery.length} FRAMES` : 'VIDEO SHOWCASE'}
                </span>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: COMPACT MEDIA SHOWCASE STREAM */}
          <div className="md:col-span-7 space-y-6 text-left">
            
            {/* Video Section (if video exists) */}
            {currentVideoUrl && (
              <div className="space-y-4">
                <div className={
                  project.videoAspectRatio === "portrait"
                    ? "relative w-full max-w-[240px] sm:max-w-[260px] mx-auto aspect-[9/16] border border-white/10 bg-black shadow-2xl rounded-2xl overflow-hidden"
                    : "relative w-full aspect-video border border-white/10 bg-black shadow-2xl rounded-2xl overflow-hidden"
                }>
                  <iframe
                    src={currentVideoUrl}
                    title={project.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Video Clip Rack Selector */}
                {project.videos && project.videos.length > 0 && (
                  <div className="space-y-2.5 p-4 rounded-2xl bg-[#131130]/80 border border-white/10 backdrop-blur-xl">
                    <span className="font-sans text-[11px] text-slate-400 uppercase font-semibold tracking-wider block">
                      Select Video Clip
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {project.videos.map((vidUrl, index) => {
                        const isActive = currentVideoUrl === vidUrl;
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              playClick();
                              setCurrentVideoUrl(vidUrl);
                            }}
                            className={`px-2 py-1.5 rounded-lg border font-sans text-[10px] uppercase flex items-center justify-center transition-all ${
                              isActive
                                ? "bg-[#C084FC] text-[#131130] border-[#C084FC] font-extrabold shadow-[0_0_12px_rgba(192,132,252,0.4)]"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                            }`}
                          >
                            CLIP {String(index + 1).padStart(2, "0")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Gallery Grid (Compact 2-column for multiple images) */}
            {project.gallery && project.gallery.length > 0 ? (
              <div className="space-y-3">
                <span className="font-sans text-[11px] text-slate-400 uppercase font-semibold tracking-wider block">
                  Gallery Showcase ({project.gallery.length} Frames)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, index) => (
                    <div 
                      key={index}
                      onClick={() => {
                        playClick();
                        setActiveImage(img);
                      }}
                      className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#131130]/90 shadow-xl backdrop-blur-md cursor-zoom-in hover:border-[#C084FC]/50 hover:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300"
                    >
                      {/* Frame Indicator Pill */}
                      <div className="absolute top-2.5 left-2.5 z-20 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 font-sans text-[9px] font-bold uppercase tracking-widest">
                        {String(index + 1).padStart(2, "0")} / {String(project.gallery?.length || 0).padStart(2, "0")}
                      </div>

                      <div className="relative w-full aspect-square overflow-hidden">
                        <Image
                          src={getAssetPath(img)}
                          alt={`${project.title} frame ${index + 1}`}
                          fill
                          unoptimized={true}
                          sizes="(max-w-768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : !currentVideoUrl ? (
              /* Single Featured Image */
              <div 
                onClick={() => {
                  playClick();
                  setActiveImage(project.image);
                }}
                className="group relative w-full max-w-xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#131130]/90 shadow-2xl backdrop-blur-md cursor-zoom-in hover:border-[#C084FC]/50 hover:shadow-[0_0_30px_rgba(192,132,252,0.25)] transition-all duration-300"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={getAssetPath(project.image)}
                    alt={project.title}
                    fill
                    unoptimized={true}
                    sizes="(max-w-768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </div>
            ) : null}

          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playClick();
              setActiveImage(null);
            }}
            className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-center p-6 cursor-zoom-out backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                setActiveImage(null);
              }}
              className="absolute top-6 right-6 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-sans text-xs font-semibold backdrop-blur-md transition-all shadow-xl z-[100000]"
            >
              Close ✕
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              src={getAssetPath(activeImage)}
              alt="Expanded view"
              className="max-h-[80vh] max-w-[85vw] w-auto h-auto object-contain border border-white/20 rounded-2xl shadow-2xl select-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
