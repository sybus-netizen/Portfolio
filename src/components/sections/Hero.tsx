"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Award } from "lucide-react";
import { cn, getAssetPath } from "@/lib/utils";
import { useGameSystem } from "@/context/GameContext";
import { experienceItems } from "@/data/experience";

interface OrbitTool {
  name: string;
  iconPath: string;
  brandColor: string;
  tagline: string;
  proficiency: string;
  customIcon?: React.ReactNode;
}

function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.24 2 7 4.24 7 7c0 1.63.78 3.08 2 4-.61.45-1.16 1.03-1.6 1.7-.85.12-1.63.53-2.15 1.18-.85.12-1.63.53-2.15 1.18-.32.41-.5.92-.5 1.44v3c0 1.38 1.12 2.5 2.5 2.5h3c.52 0 1.03-.18 1.44-.5.65-.52 1.06-1.3 1.18-2.15.67-.44 1.25-.99 1.7-1.6.92 1.22 2.37 2 4 2 2.76 0 5-2.24 5-5v-1.5c0-.97-.28-1.87-.76-2.63.48-.76.76-1.66.76-2.63v-3c0-2.76-2.24-5-5-5z" fill="#000000" />
      <circle cx="9.5" cy="7" r="2.5" fill="#FF5964" />
      <circle cx="14.5" cy="7" r="2.5" fill="#3BCEAC" />
      <circle cx="9.5" cy="12" r="2.5" fill="#3A86C8" />
      <circle cx="14.5" cy="12" r="2.5" fill="#FFDE47" />
      <path d="M9.5 14.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V14.5z" fill="#FF5964" />
    </svg>
  );
}

function WordPressIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#000000" />
      <circle cx="12" cy="12" r="8.5" fill="#FFDE47" />
      <path d="M16 8.5l-2.5 6.5-2-4.5-2 4.5-2.5-6.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const orbitTools: OrbitTool[] = [
  { name: "Photoshop", iconPath: "/icons/photoshop.svg", brandColor: "#31A8FF", proficiency: "95%", tagline: "Image Editing" },
  { name: "Illustrator", iconPath: "/icons/illustrator.svg", brandColor: "#FF9A00", proficiency: "90%", tagline: "Brand Identity" },
  { name: "Premiere Pro", iconPath: "/icons/premiere-pro.svg", brandColor: "#EA77FF", proficiency: "92%", tagline: "Video Editing" },
  { name: "After Effects", iconPath: "/icons/after-effects.svg", brandColor: "#9999FF", proficiency: "85%", tagline: "Motion Graphics" },
  { name: "Adobe Audition", iconPath: "/icons/audition.svg", brandColor: "#00F5D4", proficiency: "90%", tagline: "Audio Editing" },
  { name: "Canva", iconPath: "/icons/canva.svg", brandColor: "#00C4CC", proficiency: "95%", tagline: "Quick Layouts" }
];

// SVG Pixel Star Sparkle helper
const PixelSparkleMini = ({ style }: { style?: React.CSSProperties }) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="#FFDE47" className="absolute pointer-events-none" style={style}>
    <rect x="3" y="0" width="2" height="8" />
    <rect x="0" y="3" width="8" height="2" />
    <rect x="2" y="2" width="4" height="4" />
  </svg>
);

const briefSegments = [
  { text: "Visual Content Creator with 3.8 years of experience crafting engaging visual experiences through ", highlight: false },
  { text: "Graphic Design", highlight: true },
  { text: ", ", highlight: false },
  { text: "Branding", highlight: true },
  { text: ", ", highlight: false },
  { text: "Video Editing", highlight: true },
  { text: ", and ", highlight: false },
  { text: "Motion Graphics", highlight: true },
  { text: ". Passionate about turning ideas into impactful digital content.", highlight: false }
];

export default function Hero() {
  const { unlockQuest, unlockAchievement } = useGameSystem();
  
  // Interactive dialogue typing
  const [typedLength, setTypedLength] = useState(0);
  
  // States for Character Animations
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [isCelebrated, setIsCelebrated] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  
  // Coordinates for Eye-Tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);
  
  // Loading Screen States
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [progressVal, setProgressVal] = useState(0);
  const [badgeHover, setBadgeHover] = useState(false);
  const [badgeClicked, setBadgeClicked] = useState(false);
  const [badgeBursts, setBadgeBursts] = useState<number[]>([]);

  const totalCharacters = useMemo(() => briefSegments.reduce((sum, seg) => sum + seg.text.length, 0), []);

  // Typewriter effect on mount (Fast, snappy typing)
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 3;
      setTypedLength(current);
      if (current >= totalCharacters) {
        setTypedLength(totalCharacters);
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [totalCharacters]);

  // Eye tracking: Mouse coordinate listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const avX = rect.left + rect.width / 2;
      const avY = rect.top + rect.height / 2;
      
      const dx = e.clientX - avX;
      const dy = e.clientY - avY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 400) {
        // Clamp pupils shifts inside glasses borders
        const angle = Math.atan2(dy, dx);
        const shiftX = Math.cos(angle) * 1.5;
        const shiftY = Math.sin(angle) * 1.2;
        setMousePos({ x: shiftX, y: shiftY });
      } else {
        setMousePos({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking loop (blinks for 150ms every 3.5s)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Waving loop (waves for 1.5s every 7.5s)
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1500);
    }, 7500);
    return () => clearInterval(waveInterval);
  }, []);

  // Start game loading screen simulation
  const handleStartGame = () => {
    setShowLoading(true);
    setLoadingStep(0);
    setProgressVal(0);
    unlockAchievement("start-game", "Level 1 Loaded!", "🎮");

    // Stepped loader triggers
    const steps = [
      { text: "Loading Assets...", delay: 250 },
      { text: "Generating Creativity...", delay: 550 },
      { text: "Preparing Portfolio...", delay: 900 },
      { text: "Welcome Player 1", delay: 1300 }
    ];

    const progressTimer = setInterval(() => {
      setProgressVal((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    const stepTimers = steps.map((st, idx) => {
      return setTimeout(() => {
        setLoadingStep(idx + 1);
        if (idx === steps.length - 1) {
          // Finished loading
          setTimeout(() => {
            skipLoading();
          }, 450);
        }
      }, st.delay);
    });

    return () => {
      clearInterval(progressTimer);
      stepTimers.forEach(clearTimeout);
    };
  };

  const skipLoading = () => {
    setShowLoading(false);
    unlockQuest("about", "About");
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerCelebrate = () => {
    setIsCelebrated(true);
    setTimeout(() => setIsCelebrated(false), 800);
  };

  return (
    <section 
      id="home" 
      className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 w-full">
        
        {/* LEFT COLUMN: RPG TEXT & STATUS SCREEN */}
        <motion.div
          className="md:col-span-7 flex flex-col items-start space-y-8 md:space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } }
          }}
        >
                   {/* Badge indicator */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            className="inline-flex items-center justify-center px-4 py-1.5 border border-[#C084FC]/40 bg-[#C084FC]/20 text-[#C084FC] font-sans text-xs font-bold uppercase tracking-wider rounded-full select-none"
          >
            WELCOME TO MY PORTFOLIO
          </motion.div>

          <motion.div className="space-y-3 w-full" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <h1 className="relative font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-none select-none">
              <span className="absolute -inset-2 bg-gradient-to-r from-[#C084FC]/25 to-[#FFA5A5]/25 rounded-xl blur-2xl opacity-45 pointer-events-none z-[-1] animate-pulse" />
              SHUBHAM SHUKLA
            </h1>
            <p className="font-sans text-xs sm:text-sm font-bold text-[#FFA5A5] uppercase tracking-wider leading-none">
              VISUAL CONTENT CREATOR & GRAPHIC DESIGNER
            </p>
            <p className="font-sans text-xs text-slate-300 uppercase tracking-widest leading-none mt-1">
              3.8+ YEARS OF PROFESSIONAL EXPERIENCE • INDIA
            </p>
          </motion.div>

          {/* PROFESSIONAL INTRO GLASS BOX */}
          <motion.div className="w-full retro-card p-5 sm:p-6 bg-[#131130]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl relative" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <div className="absolute top-[-12px] left-6 px-3 py-1 bg-[#C084FC]/20 border border-[#C084FC]/30 text-[#C084FC] font-sans text-xs font-bold uppercase tracking-wider rounded-full select-none">
              ABOUT ME
            </div>
            
            <div className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed min-h-[70px] select-text whitespace-pre-line pt-1">
              {(() => {
                let remaining = typedLength;
                return briefSegments.map((seg, i) => {
                  if (remaining <= 0) return null;
                  const visibleText = seg.text.slice(0, remaining);
                  remaining -= seg.text.length;
                  return (
                    <span
                      key={i}
                      className={seg.highlight ? "text-[#FFA5A5] font-bold" : ""}
                    >
                      {visibleText}
                    </span>
                  );
                });
              })()}
              <span className={cn(
                "inline-block w-2.5 h-4 bg-[#C084FC] ml-1 align-middle",
                typedLength < totalCharacters ? "animate-pulse" : ""
              )} />
            </div>
          </motion.div>

          {/* WORK EXPERIENCE GLASS CARD */}
          <motion.div className="w-full retro-card p-5 bg-[#131130]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl relative" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <div className="absolute top-[-12px] left-6 px-3 py-1 bg-[#C084FC]/20 border border-[#C084FC]/30 text-[#C084FC] font-sans text-xs font-bold uppercase tracking-wider rounded-full select-none">
              WORK EXPERIENCE
            </div>
            <div className="space-y-3 pt-2">
              {experienceItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-left border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                  <div>
                    <div className="font-sans text-xs font-bold text-white uppercase leading-tight">
                      {item.role}
                    </div>
                    <div className="text-xs text-slate-400 font-sans font-medium leading-tight mt-0.5">
                      {item.company}
                    </div>
                  </div>
                  <div className="font-sans text-xs text-[#A7F3D0] font-bold shrink-0 sm:text-right leading-tight">
                    {item.duration}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* RIGHT COLUMN: PIXEL AVATAR & COLLECTIBLE TOOL SLOTS */}
        <motion.div 
          className="md:col-span-5 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[420px]"
          ref={avatarRef}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {/* Pulsing Ambient Glow behind Avatar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[320px] h-[320px] rounded-full bg-[#C084FC]/15 blur-[70px] animate-pulse" />
          </div>

          {/* Central Interactive Pixel Avatar */}
          <motion.div 
            className="relative z-10 cursor-pointer"
            onClick={triggerCelebrate}
            animate={
              isCelebrated 
                ? { y: [0, -32, 0], rotate: [0, 8, -8, 0] } 
                : { y: [0, -3, 0] }
            }
            transition={
              isCelebrated 
                ? { duration: 0.65, ease: "easeOut" } 
                : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <svg 
              width="220" 
              height="220" 
              viewBox="0 0 32 32" 
              fill="none" 
              className="w-full max-w-[240px] md:max-w-[280px] mx-auto select-none" 
              style={{ imageRendering: "pixelated" }}
            >
              <circle cx="16" cy="16" r="15" fill="#FFE45E" stroke="#000000" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="13" fill="#FFFFFF" stroke="#000000" strokeWidth="1" strokeDasharray="2, 2" />
              
              {/* Hair */}
              <rect x="8" y="5" width="16" height="4" fill="#1A1A1A" />
              <rect x="6" y="9" width="20" height="3" fill="#1A1A1A" />
              {/* Skin */}
              <rect x="8" y="12" width="16" height="11" fill="#FFCDA3" />
              <rect x="6" y="15" width="2" height="4" fill="#FFCDA3" />
              <rect x="24" y="15" width="2" height="4" fill="#FFCDA3" />
              
              {/* Sunglasses backing (black frame) */}
              <rect x="8" y="14" width="7" height="4" fill="#000000" />
              <rect x="17" y="14" width="7" height="4" fill="#000000" />
              <rect x="15" y="15" width="2" height="2" fill="#000000" />

              {/* Eye Pupils shifts based on cursor coordinate calculations */}
              {!isBlinking ? (
                <>
                  <rect x={10 + mousePos.x} y={15 + mousePos.y} width="2" height="1" fill="#FFFFFF" />
                  <rect x={19 + mousePos.x} y={15 + mousePos.y} width="2" height="1" fill="#FFFFFF" />
                </>
              ) : (
                /* Blink mode horizontal black bar override */
                <>
                  <rect x="8" y="15" width="7" height="2" fill="#1A1A1A" />
                  <rect x="17" y="15" width="7" height="2" fill="#1A1A1A" />
                </>
              )}

              {/* Mouth */}
              <rect x="13" y="20" width="6" height="2" fill="#1A1A1A" />
              <rect x="14" y="21" width="4" height="1" fill="#FF5964" />
              
              {/* Waving Arm / Celebration actions */}
              {isWaving ? (
                /* Arm up waving */
                <>
                  <rect x="24" y="16" width="3" height="6" fill="#FF5964" />
                  <rect x="26" y="12" width="3" height="4" fill="#FFCDA3" />
                </>
              ) : null}

              {/* Shirt & Collar */}
              <rect x="10" y="23" width="12" height="6" fill="#FF5964" />
              <rect x="8" y="25" width="16" height="4" fill="#FF5964" />
              <rect x="13" y="23" width="6" height="2" fill="#FAF6EE" />
            </svg>
            
            {/* Sparkle bursts when celebrating */}
            {isCelebrated && (
              <>
                <PixelSparkleMini style={{ top: "-10px", left: "20px" }} />
                <PixelSparkleMini style={{ top: "30px", right: "-10px" }} />
                <PixelSparkleMini style={{ bottom: "10px", left: "-5px" }} />
              </>
            )}
          </motion.div>

          {/* Software inventory slots */}
          <div className="grid grid-cols-6 gap-2 w-full max-w-[340px] mt-6 relative z-20 select-none">
            {orbitTools.map((tool, idx) => {
              const isHovered = hoveredIcon === idx;
              return (
                <motion.div
                  key={tool.name}
                  onMouseEnter={() => setHoveredIcon(idx)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  whileHover={{ scale: 1.15, rotate: 6, y: -4 }}
                  className={cn(
                    "aspect-square rounded-sm border-2 border-black flex items-center justify-center cursor-help bg-card relative transition-all duration-100 shadow-[2px_2px_0px_#000]",
                    isHovered && "bg-[#FFDE47] shadow-[3.5px_3.5px_0px_#000] border-black"
                  )}
                  onClick={() => unlockAchievement(`tool-${tool.name.toLowerCase()}`, `Collected ${tool.name}!`, "🛠")}
                >
                  {tool.customIcon ? (
                    tool.customIcon
                  ) : (
                    <Image
                      src={getAssetPath(tool.iconPath)}
                      alt={tool.name}
                      width={20}
                      height={20}
                      unoptimized={true}
                      className="object-contain w-5 h-5"
                    />
                  )}

                  {/* Fainted sparkles on hovered slot item */}
                  {isHovered && (
                    <>
                      <PixelSparkleMini style={{ top: "-4px", left: "-4px" }} />
                      <PixelSparkleMini style={{ bottom: "-4px", right: "-4px" }} />
                    </>
                  )}
                  
                  {/* Tooltip Overlay */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 p-3.5 bg-[#131130]/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl pointer-events-none min-w-[170px] z-50 text-center flex flex-col items-center gap-1"
                      >
                        <div className="font-sans text-xs font-bold text-white uppercase leading-none mb-1">
                          {tool.name}
                        </div>
                        <div className="font-sans text-[11px] text-[#A7F3D0] font-bold leading-none mb-1">
                          PROFICIENCY: {tool.proficiency}
                        </div>
                        <div className="font-sans text-xs text-slate-300 font-normal leading-snug">
                          {tool.tagline}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[340px] mt-6 relative z-20">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} 
              className="w-full sm:flex-1"
            >
              <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C084FC] to-[#FFA5A5] text-[#131130] font-sans text-xs font-bold uppercase shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span>🎨</span>
                <span>View Projects</span>
              </div>
            </button>
            
            <a
              href="https://drive.google.com/file/d/1XoeKfryks6UOD8sv-GLEQMDtKPDIy7hV/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans text-xs font-bold uppercase transition-all shadow-lg flex items-center justify-center gap-2"
              onClick={() => unlockAchievement("view-resume", "Read Resume.TXT", "📑")}
            >
              <span>📄</span>
              <span>Download Resume</span>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
