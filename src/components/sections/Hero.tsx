"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGameSystem } from "@/context/GameContext";

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
  { text: "Visual Content Creator with 4+ years of experience crafting engaging visual experiences through ", highlight: false },
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

  // Typewriter effect on mount
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setTypedLength(current);
      if (current >= totalCharacters) {
        clearInterval(interval);
      }
    }, 30);
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
      className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden bg-[#FAF6EE]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 w-full">
        
        {/* LEFT COLUMN: RPG TEXT & STATUS SCREEN */}
        <div className="md:col-span-7 flex flex-col items-start space-y-8 md:space-y-6">
          
          {/* Badge indicator */}
          <motion.div
            onMouseEnter={() => setBadgeHover(true)}
            onMouseLeave={() => setBadgeHover(false)}
            onClick={() => {
              setBadgeClicked(true);
              const id = Date.now() + Math.random();
              setBadgeBursts((prev) => [...prev, id]);
              setTimeout(() => {
                setBadgeClicked(false);
                setBadgeBursts((prev) => prev.filter((item) => item !== id));
              }, 450);
            }}
            animate={
              badgeClicked
                ? { scale: 0.95, y: 2, boxShadow: "1px 1px 0px #000" }
                : badgeHover
                ? { scale: 1.05, y: -5, boxShadow: "4px 4px 10px rgba(255, 89, 100, 0.4)", backgroundColor: "#FF707B" }
                : { 
                    y: [0, -3, 0], 
                    boxShadow: ["2.5px 2.5px 0px #000", "2.5px 2.5px 12px rgba(255, 89, 100, 0.4)", "2.5px 2.5px 0px #000"],
                    backgroundColor: "#FF5964"
                  }
            }
            transition={
              badgeHover
                ? { type: "spring", stiffness: 220, damping: 12 }
                : { 
                    y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                    default: { duration: 0.15 }
                  }
            }
            className="inline-flex items-center justify-center px-3.5 py-1.5 border-3 border-black text-white font-retro text-[8.5px] sm:text-[9px] uppercase select-none rounded-sm relative overflow-hidden cursor-pointer w-auto text-center"
          >
            {/* Diagonal sheen sweep */}
            <motion.div
              animate={{ left: ["-30%", "130%"] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: "linear" }}
              className="absolute top-0 bottom-0 w-2.5 bg-white/40 skew-x-12 pointer-events-none"
            />

            {/* Hover corner sparkles */}
            {badgeHover && (
              <>
                <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 1.0, repeat: Infinity }} className="absolute -top-1 -left-1 w-0.5 h-0.5 bg-[#FFDE47]" />
                <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 1.0, repeat: Infinity }} className="absolute -bottom-1 -right-1 w-0.5 h-0.5 bg-[#FFDE47]" />
              </>
            )}

            HI THERE!

            {/* Click particle bursts */}
            <AnimatePresence>
              {badgeBursts.map((id) => (
                <div key={id} className="absolute inset-0 pointer-events-none overflow-visible">
                  <motion.div initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: -14, y: -14, opacity: 0 }} exit={{ opacity: 0 }} className="absolute top-0 left-0 w-1 h-1 bg-[#FFDE47]" />
                  <motion.div initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: 14, y: -14, opacity: 0 }} exit={{ opacity: 0 }} className="absolute top-0 right-0 w-1 h-1 bg-[#FFDE47]" />
                  <motion.div initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: -14, y: 14, opacity: 0 }} exit={{ opacity: 0 }} className="absolute bottom-0 left-0 w-1 h-1 bg-[#FFDE47]" />
                  <motion.div initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: 14, y: 14, opacity: 0 }} exit={{ opacity: 0 }} className="absolute bottom-0 right-0 w-1 h-1 bg-[#FFDE47]" />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="space-y-5 md:space-y-4 w-full">
            <h1 className="font-retro text-2xl sm:text-3.5xl lg:text-4.5xl font-bold tracking-tight text-black uppercase leading-none select-none">
              SHUBHAM SHUKLA
            </h1>
            <p className="font-retro text-[10px] sm:text-xs text-[#FF5964] uppercase tracking-wider leading-none">
              VISUAL CONTENT CREATOR
            </p>
            <p className="font-retro text-[8px] sm:text-[9px] text-black/50 uppercase tracking-widest leading-none mt-1">
              4+ YEARS OF EXPERIENCE • INDIA
            </p>
          </div>

          {/* RPG DIALOGUE SPEECH BOX */}
          <div className="w-full retro-card p-5 sm:p-6 bg-[#FFFFFF] border-4 border-black relative">
            {/* Small speaker badge */}
            <div className="absolute top-[-14px] left-6 px-3 py-1 bg-black text-white font-retro text-[8px] uppercase rounded-sm select-none">
              ABOUT ME
            </div>
            
            <div className="font-mono text-xs sm:text-sm text-[#1A1A1A] leading-relaxed min-h-[70px] select-text whitespace-pre-line">
              {(() => {
                let remaining = typedLength;
                return briefSegments.map((seg, i) => {
                  if (remaining <= 0) return null;
                  const visibleText = seg.text.slice(0, remaining);
                  remaining -= seg.text.length;
                  return (
                    <span
                      key={i}
                      className={seg.highlight ? "text-[#FF5964] font-bold" : ""}
                    >
                      {visibleText}
                    </span>
                  );
                });
              })()}
              <span className={cn(
                "inline-block w-2.5 h-4 bg-black ml-1 align-middle",
                typedLength < totalCharacters ? "animate-[heartPulse_0.8s_infinite]" : ""
              )} />
            </div>
          </div>

          {/* CHARACTER STATS SCREEN */}
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="retro-card p-4 flex flex-col justify-center">
              <div className="font-retro text-[8px] text-black/50 uppercase leading-none mb-2 select-none">EXPERIENCE (EXP)</div>
              <div className="flex items-center justify-between font-retro text-[10px] text-black font-bold select-none">
                <span>4 YEARS</span>
                <span className="text-[#3BCEAC]">MAX</span>
              </div>
              <div className="w-full h-3 border-2 border-black bg-[#FAF6EE] mt-2 p-[2px] rounded-sm select-none">
                <div className="h-full bg-[#3BCEAC] w-full" />
              </div>
            </div>

            <div className="retro-card p-4 flex flex-col justify-center" onClick={triggerCelebrate}>
              <div className="font-retro text-[8px] text-black/50 uppercase leading-none mb-2 select-none">HP STATS (CREATIVITY)</div>
              <div className="flex items-center justify-between font-retro text-[10px] text-black font-bold select-none">
                <span>99 / 99</span>
                <span className="text-[#FF5964]">❤❤❤</span>
              </div>
              <div className="w-full h-3 border-2 border-black bg-[#FAF6EE] mt-2 p-[2px] rounded-sm select-none">
                <div className="h-full bg-[#FF5964] w-full" />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
            <button 
              onClick={handleStartGame} 
              className="w-full sm:w-auto"
            >
              <div className="retro-btn w-full sm:w-auto shadow-[3.5px_3.5px_0px_#000] flex items-center justify-center gap-2">
                <span>🎨</span> View Projects
              </div>
            </button>
            
            <a
              href="https://drive.google.com/file/d/1FT6n0wjmBkwOFaMGGtooEYybnv6iXhd_/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn retro-btn-outline w-full sm:w-auto shadow-[3.5px_3.5px_0px_#000] gap-2"
              onClick={() => unlockAchievement("view-resume", "Read Resume.TXT", "📑")}
            >
              <span>📄</span> Download Resume
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: PIXEL AVATAR & COLLECTIBLE TOOL SLOTS */}
        <div 
          className="md:col-span-5 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[420px]"
          ref={avatarRef}
        >
          {/* Concentric Dotted Retro Orbits */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[280px] h-[280px] border-3 border-dashed border-[#FFDE47]/30 rounded-full" />
            <div className="w-[340px] h-[340px] border-2 border-dashed border-[#FF5964]/20 rounded-full absolute hidden md:block" />
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
                    "aspect-square rounded-sm border-2 border-black flex items-center justify-center cursor-help bg-white relative transition-all duration-100 shadow-[2px_2px_0px_#000]",
                    isHovered && "bg-[#FFDE47] shadow-[3.5px_3.5px_0px_#000] border-black"
                  )}
                  onClick={() => unlockAchievement(`tool-${tool.name.toLowerCase()}`, `Collected ${tool.name}!`, "🛠")}
                >
                  {tool.customIcon ? (
                    tool.customIcon
                  ) : (
                    <Image
                      src={tool.iconPath}
                      alt={tool.name}
                      width={20}
                      height={20}
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
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 p-3.5 retro-card border-3 border-black bg-[#FFFFFF] shadow-[3.5px_3.5px_0px_#000] pointer-events-none min-w-[170px] z-50 text-center flex flex-col items-center gap-1"
                      >
                        <div className="font-retro text-[8px] font-bold text-black uppercase leading-none mb-1">
                          {tool.name}
                        </div>
                        <div className="font-retro text-[8px] text-[#FF5964] font-bold leading-none mb-1">
                          LVL: {tool.proficiency}
                        </div>
                        <div className="font-sans text-[10px] text-gray-500 font-light leading-snug">
                          {tool.tagline}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

      {/* FULL SCREEN RETRO LOADING SCREEN */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#FAF6EE] border-8 border-black flex flex-col items-center justify-center p-6 cursor-pointer select-none"
            onClick={skipLoading}
          >
            <div className="w-full max-w-md retro-card p-6 bg-[#FFFFFF] border-4 border-black shadow-[6px_6px_0px_#000] space-y-6 relative text-left">
              <div className="absolute top-[-14px] left-6 px-3 py-1 bg-black text-white font-retro text-[8px] uppercase rounded-sm">
                BIOS_LOADER
              </div>

              {/* Stepped Typewriter steps */}
              <div className="font-retro text-[9px] sm:text-[10px] text-black space-y-3 leading-loose min-h-[140px]">
                {loadingStep >= 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    &gt; LOADING ASSETS... DONE.
                  </motion.div>
                )}
                {loadingStep >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    &gt; GENERATING CREATIVITY... OK.
                  </motion.div>
                )}
                {loadingStep >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    &gt; PREPARING PORTFOLIO... STABLE.
                  </motion.div>
                )}
                {loadingStep >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="text-[#FF5964] font-bold mt-4"
                  >
                    &gt; WELCOME PLAYER 1
                    <br />
                    &gt; MISSION: EXPLORE MY WORK
                  </motion.div>
                )}
              </div>

              {/* Fills Progress Loader Bar */}
              <div className="space-y-2">
                <div className="flex justify-between font-retro text-[8px] text-black/50">
                  <span>PROGRESS</span>
                  <span>{progressVal}%</span>
                </div>
                <div className="w-full border-3 border-black bg-[#FAF6EE] p-[3px] rounded-sm">
                  <motion.div 
                    className="h-4 bg-[#FFDE47]" 
                    style={{ width: `${progressVal}%` }} 
                  />
                </div>
              </div>

              <div className="text-center font-retro text-[8px] text-black/30 pt-2 animate-[heartPulse_1.2s_infinite]">
                CLICK ANYWHERE TO SKIP INTRO
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
