"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FileText, Award } from "lucide-react";
import { cn, getAssetPath } from "@/lib/utils";
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
  { text: "Visual Content Creator, Graphic Designer, and Trainer with 3.8 years of experience in ", highlight: false },
  { text: "Graphic Design", highlight: true },
  { text: ", ", highlight: false },
  { text: "Branding", highlight: true },
  { text: ", ", highlight: false },
  { text: "Video Editing", highlight: true },
  { text: ", and ", highlight: false },
  { text: "Motion Graphics", highlight: true },
  { text: ". Skilled in creating digital content and training students in professional design and video production workflows.", highlight: false }
];

interface FloatingIconConfig {
  id: string;
  name: string;
  src: string;
  sizeClass: string;
  position: React.CSSProperties;
  xKeyframes: number[];
  yKeyframes: number[];
  rotateKeyframes: number[];
  opacityKeyframes: number[];
  duration: number;
  delay: number;
  zIndex: number;
}

const floatingCreativeIcons: FloatingIconConfig[] = [
  {
    id: "photo",
    name: "Photo Icon",
    src: "/assets/media_1786616672274.png",
    sizeClass: "w-7 h-7 sm:w-11 sm:h-11 md:w-13 md:h-13",
    position: { top: "6%", left: "6%" },
    xKeyframes: [0, 10, -6, 4, 0],
    yKeyframes: [0, -12, -4, -15, 0],
    rotateKeyframes: [0, 7, -6, 8, 0],
    opacityKeyframes: [0.85, 1, 0.9, 0.98, 0.85],
    duration: 11.5,
    delay: 0,
    zIndex: 15
  },
  {
    id: "camera",
    name: "Camera Icon",
    src: "/assets/media_1786616672275.png",
    sizeClass: "w-7 h-7 sm:w-11 sm:h-11 md:w-13 md:h-13",
    position: { top: "12%", right: "2%" },
    xKeyframes: [0, -8, 6, -8, 0],
    yKeyframes: [0, -15, -5, -18, 0],
    rotateKeyframes: [0, -9, 8, -7, 0],
    opacityKeyframes: [0.9, 1, 0.88, 1, 0.9],
    duration: 9.2,
    delay: 1.2,
    zIndex: 25
  },
  {
    id: "pen-tool",
    name: "Pen Tool Vector Icon",
    src: "/assets/media_1786661521951.png",
    sizeClass: "w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12",
    position: { top: "48%", left: "1%" },
    xKeyframes: [0, 12, -4, 8, 0],
    yKeyframes: [0, -10, -18, -8, 0],
    rotateKeyframes: [0, -12, 9, -6, 0],
    opacityKeyframes: [0.88, 0.98, 1, 0.92, 0.88],
    duration: 13.8,
    delay: 2.4,
    zIndex: 20
  },
  {
    id: "filmstrip",
    name: "Filmstrip Reel Icon",
    src: "/assets/media_1786661521932.png",
    sizeClass: "w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12",
    position: { top: "38%", right: "8%" },
    xKeyframes: [0, -10, 8, -6, 0],
    yKeyframes: [0, -14, -6, -12, 0],
    rotateKeyframes: [0, 10, -9, 7, 0],
    opacityKeyframes: [0.92, 1, 0.85, 0.98, 0.92],
    duration: 7.8,
    delay: 0.7,
    zIndex: 20
  },
  {
    id: "design",
    name: "Design Palette Icon",
    src: "/assets/media_1786616672277.png",
    sizeClass: "w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11",
    position: { bottom: "10%", left: "10%" },
    xKeyframes: [0, -8, 10, -4, 0],
    yKeyframes: [0, -14, -4, -10, 0],
    rotateKeyframes: [0, 6, -8, 6, 0],
    opacityKeyframes: [0.86, 0.96, 1, 0.9, 0.86],
    duration: 12.2,
    delay: 1.8,
    zIndex: 15
  },
  {
    id: "video-cam",
    name: "Video Camera Icon",
    src: "/assets/media_1786616672294.png",
    sizeClass: "w-7 h-7 sm:w-11 sm:h-11 md:w-13 md:h-13",
    position: { bottom: "16%", right: "4%" },
    xKeyframes: [0, 8, -10, 6, 0],
    yKeyframes: [0, -16, -8, -14, 0],
    rotateKeyframes: [0, -8, 11, -6, 0],
    opacityKeyframes: [0.9, 1, 0.92, 0.98, 0.9],
    duration: 10.4,
    delay: 3.1,
    zIndex: 25
  }
];

import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { unlockQuest, unlockAchievement } = useGameSystem();
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReducedMotion);
  
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

  // Typewriter effect on mount (Snappy typing pace)
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setTypedLength(current);
      if (current >= totalCharacters) {
        setTypedLength(totalCharacters);
        clearInterval(interval);
      }
    }, 20);
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
      className="min-h-[calc(100vh-80px)] pt-14 pb-8 md:pt-24 md:pb-16 flex items-center justify-center relative overflow-hidden bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center relative z-10 w-full">
        
        {/* LEFT COLUMN: RPG TEXT & STATUS SCREEN */}
        <motion.div
          className="md:col-span-7 flex flex-col items-start justify-center space-y-4 sm:space-y-8 w-full text-left"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } }
          }}
        >
         

          <motion.div className="space-y-2.5 sm:space-y-3 w-full" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <h1 
              style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
              className="relative font-sans text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-none select-none break-words"
            >
              <span className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-2xl opacity-45 pointer-events-none z-[-1] animate-pulse" />
              SHUBHAM SHUKLA
            </h1>
            <p 
              style={{ color: theme === "light" ? "#1D4ED8" : "#FFA5A5" }}
              className="font-sans text-[10px] xs:text-xs sm:text-sm font-extrabold uppercase tracking-wider leading-snug"
            >
              VISUAL CONTENT CREATOR & GRAPHIC DESIGNER
            </p>
          </motion.div>

          {/* PROFESSIONAL INTRO GLASS BOX */}
          <motion.div 
            style={{
              backgroundColor: theme === "light" ? "#FFFFFF" : undefined,
              borderColor: theme === "light" ? "#CBD5E1" : undefined
            }}
            className="w-full retro-card chromatic-glass p-5 sm:p-6 shadow-2xl rounded-2xl relative border text-left" 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
          >
            <div 
              style={{
                backgroundColor: theme === "light" ? "#2563EB" : "rgba(192, 132, 252, 0.2)",
                color: theme === "light" ? "#FFFFFF" : "#C084FC",
                borderColor: theme === "light" ? "#1D4ED8" : "rgba(192, 132, 252, 0.3)"
              }}
              className="absolute top-[-12px] left-6 px-3 py-1 border font-sans text-xs font-extrabold uppercase tracking-wider rounded-full select-none shadow-sm"
            >
              ABOUT ME
            </div>
            
            <div 
              style={{ color: theme === "light" ? "#0F172A" : "#E2E8F0" }}
              className="font-sans text-xs sm:text-sm font-medium leading-relaxed min-h-[70px] select-text whitespace-pre-line pt-1 text-left"
            >
              {(() => {
                let remaining = typedLength;
                return briefSegments.map((seg, i) => {
                  if (remaining <= 0) return null;
                  const visibleText = seg.text.slice(0, remaining);
                  remaining -= seg.text.length;
                  return (
                    <span
                      key={i}
                      style={{
                        color: seg.highlight
                          ? theme === "light" ? "#2563EB" : "#FFA5A5"
                          : undefined,
                        fontWeight: seg.highlight ? 700 : undefined
                      }}
                    >
                      {visibleText}
                    </span>
                  );
                });
              })()}
              <span 
                style={{ backgroundColor: theme === "light" ? "#2563EB" : "#C084FC" }}
                className="inline-block w-2 h-4 ml-1 align-middle animate-pulse rounded-xs" 
              />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: PIXEL AVATAR WITH GRAVITY FLOATING/FALLING ICONS & ACTION BUTTONS */}
        <div className="md:col-span-5 flex flex-col items-center justify-center gap-4 sm:gap-6 w-full pt-0">
          
          {/* CHARACTER SHOWCASE BOX */}
          <motion.div 
            className="w-full max-w-md flex flex-col items-center justify-center relative pt-2 pb-4 md:pt-10 md:pb-14 rounded-3xl min-h-[250px] sm:min-h-[320px] md:min-h-[420px]"
            ref={avatarRef}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {/* Pulsing Ambient Glow behind Avatar */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full bg-[#C084FC]/15 blur-[60px] animate-pulse" />
            </div>

            {/* Constant Rain of Falling Creative Icons (Gravity Effect) */}
            {[
              { id: 1, src: getAssetPath("/assets/media_1786616672274.png"), size: 20, left: "15%", delay: 0, speed: 6.5 },
              { id: 2, src: getAssetPath("/assets/media_1786616672275.png"), size: 24, left: "75%", delay: 1.5, speed: 7.2 },
              { id: 3, src: getAssetPath("/assets/media_1786616672277.png"), size: 18, left: "30%", delay: 0.8, speed: 5.8 },
              { id: 4, src: getAssetPath("/assets/media_1786616672294.png"), size: 22, left: "60%", delay: 2.2, speed: 6.8 },
              { id: 5, src: getAssetPath("/assets/media_1786661521932.png"), size: 20, left: "45%", delay: 1.2, speed: 6.2 },
              { id: 6, src: getAssetPath("/assets/media_1786661521951.png"), size: 22, left: "88%", delay: 3.5, speed: 7.0 },
            ].map((item) => (
              <motion.img
                key={item.id}
                src={item.src}
                alt=""
                className="absolute pointer-events-none z-0 opacity-15 dark:opacity-10 blur-[0.5px]"
                style={{ left: item.left, width: item.size, height: item.size }}
                animate={{
                  y: ["-15%", "115%"],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: item.speed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: item.delay,
                }}
              />
            ))}

            {/* Organic Floating Creative Workspace Icons (Alive Zero-Gravity Motion) */}
            {floatingCreativeIcons.map((icon) => (
              <motion.img
                key={icon.id}
                src={getAssetPath(icon.src)}
                alt={icon.name}
                className={cn(
                  "absolute pointer-events-auto cursor-pointer select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(192,132,252,0.7)]",
                  icon.sizeClass
                )}
                style={{
                  ...icon.position,
                  zIndex: icon.zIndex
                }}
                animate={
                  shouldReduceMotion
                    ? { x: 0, y: 0, rotate: 0, opacity: 1 }
                    : {
                        x: icon.xKeyframes,
                        y: icon.yKeyframes,
                        rotate: icon.rotateKeyframes,
                        opacity: icon.opacityKeyframes,
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: icon.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: icon.delay,
                      }
                }
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.18,
                        y: -6,
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                      }
                }
              />
            ))}

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
          </motion.div>

          {/* ACTION BUTTONS (Moved under the character box) */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 w-full max-w-[420px] pt-1 relative z-20"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
          >
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} 
              className="w-full sm:flex-1 animate-pulse hover:animate-none"
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
          </motion.div>

        </div>

      </div>
    </section>
  );
}
