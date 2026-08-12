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
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen py-24 bg-[#FAF6EE] relative select-none">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8 relative z-10">
        
        {/* Back Link */}
        <div className="text-left">
          <Link 
            href="/projects" 
            onClick={playClick}
            className="inline-flex items-center gap-2 font-retro text-[8px] sm:text-[9px] uppercase tracking-wider text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Catalog
          </Link>
        </div>

        {/* main retro cartridge container */}
        <div className={`retro-card p-6 sm:p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000] relative overflow-hidden text-left border-t-[16px] ${accentColor}`}>
          
          {/* Cartridge Header Ridge details */}
          <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-6 select-none">
            <div className="flex flex-col">
              <span className="font-retro text-[8px] text-black/40">SYSTEM: PORTFOLIO_OS</span>
              <span className="font-retro text-[7px] text-black/30">ID: {project.id.toUpperCase()}</span>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 border border-black bg-black/10 rounded-full" />
              <span className="w-3 h-3 border border-black bg-black/10 rounded-full" />
            </div>
          </div>

          {isLoading ? (
            <div className="bg-[#111111] border-3 border-black p-6 sm:p-8 font-retro text-[8px] sm:text-[9px] text-[#3BCEAC] min-h-[350px] sm:min-h-[400px] flex flex-col justify-between rounded-sm relative overflow-hidden select-none">
              {/* Scanlines Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/15 to-transparent bg-[length:100%_4px] opacity-40" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center text-white/40 text-[7px] tracking-wider">
                  <span>BIOS VERSION 1.0.8</span>
                  <span className="animate-pulse">● READY</span>
                </div>
                <div className="space-y-3 font-mono pt-4 leading-relaxed uppercase">
                  <p className="flex justify-between"><span>💾 READING ROM FILES...</span> <span className="text-white font-bold">OK</span></p>
                  <p className="flex justify-between"><span>📦 UNPACKING RESOURCE ASSETS...</span> <span className="text-white font-bold">100%</span></p>
                  <p className="flex justify-between"><span>🎮 CARTRIDGE INDEX:</span> <span className="text-[#FFDE47] font-bold">[{project.id.toUpperCase()}]</span></p>
                  <p className="text-[#FF5964] animate-pulse pt-2 text-[7px] tracking-wide">⚡ EXECUTING GRAPHICS PIPELINE...</p>
                </div>
              </div>

              {/* Progress bar footer */}
              <div className="space-y-3 pt-6 border-t border-[#3BCEAC]/20 relative z-10">
                <div className="flex justify-between text-[7px] text-[#3BCEAC]/60">
                  <span>SYSTEM: OK</span>
                  <span className="animate-[heartPulse_0.6s_infinite]">BOOTING TAPE ▶</span>
                </div>
                <div className="w-full border-2 border-[#3BCEAC] p-0.5 rounded-sm bg-black/40">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.0, ease: "easeInOut" }}
                    className="h-2.5 bg-[#3BCEAC] rounded-xs"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Left Info Column */}
                <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`inline-flex items-center gap-2 px-2.5 py-1 ${accentBg} border-2 border-black text-black font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000]`}>
                      {project.category}
                    </div>
                    <h1 className="font-retro text-lg sm:text-xl font-bold uppercase tracking-tight text-black leading-tight">
                      {project.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#555555] font-sans font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Specs Table */}
                  <div className="border-2 border-black bg-[#FAF6EE] p-4 space-y-3 font-sans rounded-sm">
                    <div className="flex items-center justify-between text-xs border-b border-black/10 pb-1.5">
                      <span className="font-retro text-[7px] text-black/40 flex items-center gap-1.5 uppercase">
                        <ShieldCheck className="w-3 h-3 text-black/40" /> Role
                      </span>
                      <span className="font-bold text-black">{project.role}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-black/10 pb-1.5">
                      <span className="font-retro text-[7px] text-black/40 flex items-center gap-1.5 uppercase">
                        <Calendar className="w-3 h-3 text-black/40" /> Release
                      </span>
                      <span className="font-bold text-black">{project.year}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-xs pt-0.5">
                      <span className="font-retro text-[7px] text-black/40 flex items-center gap-1.5 uppercase">
                        <Tag className="w-3 h-3 text-black/40" /> Tools
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="text-[8px] font-retro font-bold text-[#3A86C8] uppercase tracking-wide">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Showcase Media Column */}
                <div className="md:col-span-7 space-y-6">
                  
                  {/* Video Player Embed */}
                  {currentVideoUrl ? (
                    <div className="space-y-4">
                      <span className="font-retro text-[8px] text-black/40 uppercase block select-none">
                        Video Output [Loaded]
                      </span>
                      <div className={
                        project.videoAspectRatio === "portrait"
                          ? "relative w-full max-w-[300px] mx-auto aspect-[9/16] border-3 border-black bg-black shadow-[4px_4px_0px_#000] rounded-sm overflow-hidden"
                          : "relative w-full aspect-video border-3 border-black bg-black shadow-[4px_4px_0px_#000] rounded-sm overflow-hidden"
                      }>
                        <iframe
                          src={currentVideoUrl}
                          title={project.title}
                          className="absolute inset-0 w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>

                      {/* VHS Cassette Playlist Shelf */}
                      {project.videos && project.videos.length > 0 && (
                        <div className="space-y-3 pt-4 border-t-2 border-black/10">
                          <span className="font-retro text-[8px] text-black/40 uppercase block select-none">
                            VHS Cassette Rack (Select Tape to Play)
                          </span>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                            {project.videos.map((vidUrl, index) => {
                              const isActive = currentVideoUrl === vidUrl;
                              return (
                                <button
                                  key={index}
                                  onClick={() => {
                                    playClick();
                                    setCurrentVideoUrl(vidUrl);
                                  }}
                                  className={`relative border-2 border-black p-2 font-retro text-[8px] uppercase flex flex-col items-center justify-center transition-all ${
                                    isActive
                                      ? `${accentBg} text-black shadow-none translate-y-0.5`
                                      : "bg-[#1E1E1E] text-white shadow-[2px_2px_0px_#000] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none"
                                  } rounded-sm`}
                                >
                                  <div className="flex gap-1.5 mb-1 opacity-60">
                                    <span className={`w-2 h-2 border rounded-full ${isActive ? 'border-black bg-black/20' : 'border-white bg-white/20'}`} />
                                    <span className={`w-2 h-2 border rounded-full ${isActive ? 'border-black bg-black/20' : 'border-white bg-white/20'}`} />
                                  </div>
                                  <span>TAPE {String(index + 1).padStart(2, "0")}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : project.gallery && project.gallery.length > 0 ? (
                    <div className="space-y-4">
                      <span className="font-retro text-[8px] text-black/40 uppercase block select-none">
                        Image Gallery [{project.gallery.length} frames] (Click to Expand)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.gallery.map((img, index) => (
                          <div 
                            key={index} 
                            onClick={() => {
                              playClick();
                              setActiveImage(img);
                            }}
                            className="relative aspect-square w-full overflow-hidden border-2 border-black bg-neutral-900 group hover:shadow-[3px_3px_0px_#000] transition-shadow rounded-sm cursor-zoom-in"
                          >
                            <Image
                              src={getAssetPath(img)}
                              alt={`${project.title} screenshot ${index + 1}`}
                              fill
                              unoptimized={true}
                              sizes="(max-w-768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => {
                        playClick();
                        setActiveImage(project.image);
                      }}
                      className="relative aspect-[4/3] w-full overflow-hidden border-3 border-black bg-neutral-900 shadow-[4px_4px_0px_#000] rounded-sm cursor-zoom-in group hover:shadow-[6px_6px_0px_#000] transition-shadow"
                    >
                      <Image
                        src={getAssetPath(project.image)}
                        alt={project.title}
                        fill
                        unoptimized={true}
                        sizes="(max-w-768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* Subtext info */}
              <div className="border-t-2 border-black pt-4 mt-8 flex justify-between items-center select-none text-[8px]">
                <span className="font-retro text-black/40">HOST_IP: LOCALHOST</span>
                <span className="font-retro text-[#FF5964] font-bold">CARTRIDGE LOADED OK ▶</span>
              </div>
            </>
          )}

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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                setActiveImage(null);
              }}
              className="absolute top-6 right-6 retro-btn bg-[#FF5964] border-2 border-black text-white py-1.5 px-3.5 text-[8px] font-retro shadow-[2px_2px_0px_#000]"
            >
              CLOSE [X]
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              src={getAssetPath(activeImage)}
              alt="Expanded view"
              className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain border-4 border-black bg-transparent shadow-[8px_8px_0px_#000] rounded-sm select-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
