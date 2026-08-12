"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameSystem } from "@/context/GameContext";
import { getAssetPath } from "@/lib/utils";

// ── RETRO GAME PROCEDURAL SVG COMPONENT DECORATIONS ──

// Swaying Grass
const PixelGrass = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="#1A1A1A" className={className} style={style}>
    <rect x="2" y="6" width="2" height="4" />
    <rect x="4" y="3" width="2" height="7" />
    <rect x="6" y="0" width="2" height="10" />
    <rect x="8" y="5" width="2" height="5" />
  </svg>
);

// Swaying Flower
const PixelFlower = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" className={className} style={style}>
    <rect x="4" y="5" width="2" height="9" fill="#3BCEAC" />
    <rect x="2" y="2" width="6" height="4" fill="#FFDE47" />
    <rect x="3" y="1" width="4" height="6" fill="#FF5964" />
    <rect x="4" y="3" width="2" height="2" fill="#000000" />
  </svg>
);

// Procedural Pixel Cloud SVG
const PixelCloudMini = () => (
  <svg width="60" height="32" viewBox="0 0 60 32" fill="currentColor">
    <rect x="16" y="4" width="28" height="24" />
    <rect x="8" y="12" width="44" height="16" />
    <rect x="4" y="16" width="52" height="12" />
    <rect x="24" y="0" width="12" height="28" />
  </svg>
);

// Procedural Pixel Studio Building
const PixelStudio = () => (
  <svg width="90" height="72" viewBox="0 0 90 72" fill="none" className="drop-shadow-[3px_3px_0px_rgba(0,0,0,0.06)]">
    <rect x="10" y="20" width="70" height="52" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
    <polygon points="5,20 45,2 85,20" fill="#FF5964" stroke="#000000" strokeWidth="2.5" />
    <rect x="36" y="44" width="18" height="28" fill="#FFDE47" stroke="#000000" strokeWidth="2" />
    <rect x="39" y="58" width="2" height="2" fill="#000000" />
    <rect x="18" y="32" width="12" height="12" fill="#3A86C8" stroke="#000000" strokeWidth="1.5" />
    <rect x="60" y="32" width="12" height="12" fill="#3A86C8" stroke="#000000" strokeWidth="1.5" />
    <rect x="30" y="24" width="30" height="8" fill="#000000" />
    <rect x="32" y="26" width="26" height="4" fill="#FFFFFF" />
  </svg>
);

// Star sparkle blinking
const PixelStarMini = ({ style }: { style?: React.CSSProperties }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="#FFDE47" className="absolute pointer-events-none animate-sparkle" style={style}>
    <rect x="4" y="0" width="2" height="10" />
    <rect x="0" y="4" width="10" height="2" />
    <rect x="3" y="3" width="4" height="4" />
  </svg>
);

// Corner music equalizer bar
const Equalizer = () => (
  <div className="flex items-end gap-[2.5px] h-6 w-9 select-none bg-white border-2 border-black p-1 rounded-sm shadow-[1.5px_1.5px_0px_#000]">
    <div className="w-[3px] bg-[#FF5964] animate-[heartPulse_0.6s_infinite] h-4" />
    <div className="w-[3px] bg-[#FFDE47] animate-[heartPulse_0.9s_infinite] h-5" />
    <div className="w-[3px] bg-[#3BCEAC] animate-[heartPulse_0.7s_infinite] h-2" />
    <div className="w-[3px] bg-[#3A86C8] animate-[heartPulse_0.8s_infinite] h-4.5" />
  </div>
);

// ── FULL BODY IDLE OR WALKING CHARACTER DESIGN ──
interface CharacterProps {
  frame: number;
  state?: "idle" | "look" | "jump" | "wave" | "shrug";
}

const PixelCharacter = ({ frame, state = "idle" }: CharacterProps) => {
  const isLeftLegUp = frame !== -99 && frame % 2 === 0;
  
  return (
    <svg width="42" height="58" viewBox="0 0 16 22" fill="none" className="image-render-pixelated select-none">
      {/* Hair */}
      <rect x="4" y="1" width="8" height="2" fill="#1A1A1A" />
      <rect x="3" y="3" width="10" height="2" fill="#1A1A1A" />
      {/* Skin */}
      <rect x="4" y="5" width="8" height="6" fill="#FFCDA3" />
      {/* Sunglasses */}
      <rect x="4" y="6" width="3" height="2" fill="#000000" />
      <rect x="9" y="6" width="3" height="2" fill="#000000" />
      <rect x="8" y="7" width="1" height="1" fill="#000000" />
      <rect x="5" y="7" width="1" height="1" fill="#FFFFFF" />
      <rect x="10" y="7" width="1" height="1" fill="#FFFFFF" />
      {/* Mouth */}
      <rect x="7" y="10" width="2" height="1" fill="#FF5964" />
      {/* Shirt */}
      <rect x="4" y="11" width="8" height="6" fill="#FF5964" />
      
      {/* Arms */}
      {state === "wave" || frame === -99 ? (
        <>
          <rect x="1" y="11" width="2" height="4" fill="#FF5964" />
          <rect x="13" y="6" width="2" height="4" fill="#FFCDA3" />
          <rect x="12" y="9" width="2" height="3" fill="#FF5964" />
        </>
      ) : state === "shrug" ? (
        <>
          <rect x="1" y="9" width="2" height="3" fill="#FFCDA3" />
          <rect x="2" y="11" width="2" height="2" fill="#FF5964" />
          <rect x="13" y="9" width="2" height="3" fill="#FFCDA3" />
          <rect x="12" y="11" width="2" height="2" fill="#FF5964" />
        </>
      ) : (
        <>
          <rect x="2" y="11" width="2" height="4" fill="#FF5964" />
          <rect x="12" y="11" width="2" height="4" fill="#FF5964" />
        </>
      )}

      {/* Legs */}
      {isLeftLegUp ? (
        <>
          <rect x="4" y="17" width="3" height="3" fill="#1A1A1A" />
          <rect x="9" y="17" width="3" height="2" fill="#1A1A1A" />
        </>
      ) : (
        <>
          <rect x="4" y="17" width="3" height="2" fill="#1A1A1A" />
          <rect x="9" y="17" width="3" height="3" fill="#1A1A1A" />
        </>
      )}
    </svg>
  );
};

// ── CORE DATA FOR INCLUDED SOFTWARE ICONS ──
const SOFTWARE_ICONS = [
  { src: "/icons/photoshop.svg", color: "#3A86C8", name: "Photoshop" },
  { src: "/icons/illustrator.svg", color: "#FF9F1C", name: "Illustrator" },
  { src: "/icons/premiere-pro.svg", color: "#EA5455", name: "Premiere Pro" },
  { src: "/icons/after-effects.svg", color: "#9D4EDD", name: "After Effects" },
  { src: "/icons/audition.svg", color: "#00F5D4", name: "Audition" },
  { src: "/icons/canva.svg", color: "#00B4D8", name: "Canva" }
];

interface FallingIcon {
  id: number;
  src: string;
  name: string;
  color: string;
  left: number; // percentage
  top: number; // percentage
  size: number; // px
  opacity: number;
  speed: number;
  rotation: number;
  rotDir: number;
  drift: number;
  bounceCount: number;
}

interface PixelParticle {
  id: number;
  left: number; // percent
  top: number; // percent
  vx: number; // velocity x
  vy: number; // velocity y
  color: string;
  opacity: number;
  size: number; // px
}

export default function RetroTitleScreen() {
  const { isTitleActive, deactivateTitle, playStart } = useGameSystem();
  
  // Transition / Exit state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [checkerActive, setCheckerActive] = useState(false);
  const [startHover, setStartHover] = useState(false);
  const [startClicked, setStartClicked] = useState(false);

  // Background Character States
  const [bgCharState, setBgCharState] = useState<"idle" | "look" | "jump" | "wave">("idle");
  
  // Easter Egg Inactivity States
  const [inactivityCount, setInactivityCount] = useState(0);
  const [eggState, setEggState] = useState<"offscreen" | "walking-in" | "waiting" | "shrug" | "waving" | "walking-out" | "gone">("offscreen");
  const [charX, setCharX] = useState(-80);
  const [walkFrame, setWalkFrame] = useState(0);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [hasTriggeredEgg, setHasTriggeredEgg] = useState(false);

  // ── FALLING SOFTWARE ICONS & EXPLOSION PARTICLES ──
  const [fallingIcons, setFallingIcons] = useState<FallingIcon[]>([]);
  const [particles, setParticles] = useState<PixelParticle[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const requestRef = useRef<number | null>(null);
  const iconIdCounter = useRef(0);
  const particleIdCounter = useRef(0);

  // Initialize Software Icons pre-positioned on screen (no drop-in from top)
  useEffect(() => {
    if (!isTitleActive) return;

    const initialPositions = [
      { left: 8, top: 22, vy: 0.06, rotDir: 0.2 },
      { left: 22, top: 62, vy: -0.07, rotDir: -0.25 },
      { left: 12, top: 76, vy: 0.05, rotDir: 0.15 },
      { left: 78, top: 24, vy: -0.06, rotDir: 0.2 },
      { left: 88, top: 54, vy: 0.07, rotDir: -0.2 },
      { left: 80, top: 78, vy: -0.05, rotDir: 0.18 }
    ];

    const initialIcons: FallingIcon[] = initialPositions.map((pos, index) => {
      const template = SOFTWARE_ICONS[index % SOFTWARE_ICONS.length];
      iconIdCounter.current += 1;
      return {
        id: iconIdCounter.current,
        src: template.src,
        color: template.color,
        name: template.name,
        left: pos.left,
        top: pos.top,
        size: 48 + (index % 3) * 6,
        opacity: 0.85,
        speed: pos.vy,
        rotation: (index * 45) % 360,
        rotDir: pos.rotDir,
        drift: 0,
        bounceCount: 0
      };
    });

    setFallingIcons(initialIcons);
  }, [isTitleActive]);

  // Main Loop for RequestAnimationFrame physics
  const updatePhysics = () => {
    if (isMerging) {
      // ── ATTRACTION MERGE PHASE ──
      setFallingIcons((prev) => {
        let reachedCenterCount = 0;
        const next = prev.map((icon) => {
          // Attract towards center 50%, 50%
          const dx = 50 - icon.left;
          const dy = 44 - icon.top; // Title center is slightly raised
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 3.2) {
            reachedCenterCount += 1;
            return null; // Merge finished
          }

          // Move faster as they get closer (attraction physics)
          const pull = 0.12;
          return {
            ...icon,
            left: icon.left + dx * pull,
            top: icon.top + dy * pull,
            size: Math.max(15, icon.size - 2.5), // Shrink on pull merge
            rotation: icon.rotation + 8,
          };
        }).filter(Boolean) as FallingIcon[];

        // If icons reached center, trigger pixel burst explosion!
        if (reachedCenterCount > 0 && next.length === 0) {
          triggerExplosion();
        }

        return next;
      });

      // Update active particles if present
      setParticles((prev) => {
        return prev.map((p) => {
          const nextOpacity = p.opacity - 0.038;
          if (nextOpacity <= 0) return null;
          return {
            ...p,
            left: p.left + p.vx,
            top: p.top + p.vy,
            vx: p.vx * 0.94, // friction
            vy: p.vy * 0.94, // friction
            opacity: nextOpacity,
          };
        }).filter(Boolean) as PixelParticle[];
      });

    } else {
      // ── CONTINUOUS FLOATING BOUNCE PHASE ──
      setFallingIcons((prev) => {
        return prev.map((icon) => {
          let top = icon.top + icon.speed;
          let speed = icon.speed;
          let rotation = icon.rotation + icon.rotDir;

          // Gentle smooth bounce off top boundary (15%) and bottom boundary (80%)
          if (top <= 15) {
            top = 15;
            speed = Math.abs(speed); // Bounce downwards
          } else if (top >= 80) {
            top = 80;
            speed = -Math.abs(speed); // Bounce upwards
          }

          return {
            ...icon,
            top,
            speed,
            rotation
          };
        });
      });
    }

    requestRef.current = requestAnimationFrame(updatePhysics);
  };

  // Trigger loop ref mounting
  useEffect(() => {
    if (isTitleActive) {
      requestRef.current = requestAnimationFrame(updatePhysics);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isTitleActive, isMerging]);

  // Trigger Pixel Burst Explosion
  const triggerExplosion = () => {
    const explosionParticles: PixelParticle[] = [];
    
    // Spawn 36 particles of various colors corresponding to software suites
    for (let i = 0; i < 36; i++) {
      const angle = (i * 10 * Math.PI) / 180;
      const speed = 0.6 + Math.random() * 1.4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      const template = SOFTWARE_ICONS[i % SOFTWARE_ICONS.length];
      
      particleIdCounter.current += 1;
      explosionParticles.push({
        id: particleIdCounter.current,
        left: 50,
        top: 44,
        vx,
        vy,
        color: template.color,
        opacity: 1.0,
        size: 5 + Math.floor(Math.random() * 4) // 5px to 8px
      });
    }

    setParticles(explosionParticles);

    // Stagger transition slightly to allow particles to scatter
    setTimeout(() => {
      triggerDissolve();
    }, 700);
  };

  // Background Character loop (changes states randomly)
  useEffect(() => {
    if (!isTitleActive) return;
    const bgTimer = setInterval(() => {
      const states: ("idle" | "look" | "jump" | "wave")[] = ["idle", "look", "idle", "jump", "wave", "idle"];
      const random = states[Math.floor(Math.random() * states.length)];
      setBgCharState(random);
      
      if (random === "jump" || random === "wave") {
        setTimeout(() => setBgCharState("idle"), 900);
      }
    }, 3800);
    return () => clearInterval(bgTimer);
  }, [isTitleActive]);

  // Keyboard/Mouse activity monitor: trigger in 5s
  useEffect(() => {
    if (!isTitleActive || hasTriggeredEgg) return;

    const resetTimer = () => {
      setInactivityCount(0);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    
    const inactivityTicker = setInterval(() => {
      setInactivityCount((prev) => {
        const next = prev + 1;
        if (next >= 5 && !hasTriggeredEgg) {
          clearInterval(inactivityTicker);
          triggerEasterEgg();
        }
        return next;
      });
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearInterval(inactivityTicker);
    };
  }, [isTitleActive, hasTriggeredEgg]);

  // Trigger Easter Egg Walk-In
  const triggerEasterEgg = () => {
    setHasTriggeredEgg(true);
    setEggState("walking-in");
  };

  // Walk-In Frame Animation Loop
  useEffect(() => {
    if (eggState === "walking-in") {
      const walkTimer = setInterval(() => {
        setWalkFrame((f) => f + 1);
        setCharX((x) => {
          if (x >= 40) {
            clearInterval(walkTimer);
            setEggState("waiting");
            setDialogueOpen(true);
            return 40;
          }
          return x + 4;
        });
      }, 100);
      return () => clearInterval(walkTimer);
    }
  }, [eggState]);

  // Character waiting loop: auto-shrugs and walks out after 6 seconds
  useEffect(() => {
    if (eggState === "waiting") {
      const shrugTimer = setTimeout(() => {
        setDialogueOpen(false);
        setEggState("shrug");
        
        setTimeout(() => {
          handleWalkOut();
        }, 1200);
      }, 6500);

      return () => clearTimeout(shrugTimer);
    }
  }, [eggState]);

  // Walk-Out Frame Animation Loop
  const handleWalkOut = () => {
    setDialogueOpen(false);
    setEggState("walking-out");
    
    const walkTimer = setInterval(() => {
      setWalkFrame((f) => f + 1);
      setCharX((x) => {
        if (x <= -80) {
          clearInterval(walkTimer);
          setEggState("gone");
          return -80;
        }
        return x - 4;
      });
    }, 100);
  };

  const handleStart = () => {
    if (isTransitioning || isMerging) return;
    playStart();
    setStartClicked(true);
    setIsMerging(true);

    setTimeout(() => {
      setStartClicked(false);
    }, 600);

    if (eggState === "waiting" || eggState === "walking-in") {
      setDialogueOpen(false);
      setEggState("waving");
      setWalkFrame(-99); // Special waving arm frame indicator
      
      setTimeout(() => {
        handleWalkOut();
      }, 650);
    }
  };

  // Staggered Pixel Checkerboard Dissolve Transition
  const triggerDissolve = () => {
    setCheckerActive(true);
    
    setTimeout(() => {
      deactivateTitle();
      document.body.style.overflow = "";
      
      setTimeout(() => {
        setCheckerActive(false);
        setIsTransitioning(false);
        setIsMerging(false);
      }, 500);
    }, 850);
  };

  // Lock scrolling while active
  useEffect(() => {
    if (isTitleActive) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isTitleActive]);

  if (!isTitleActive && !checkerActive) return null;

  const gridBlocks = Array.from({ length: 144 });

  return (
    <>
      <AnimatePresence>
        {isTitleActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="fixed inset-0 z-[9998] bg-[#0E0C22] flex flex-col justify-between p-8 select-none cursor-pointer overflow-hidden"
            onClick={handleStart}
          >
            {/* Background Ambient RGB Glows */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute top-[-20%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#C084FC]/25 to-transparent blur-[120px] animate-rgb-glow" />
              <div className="absolute bottom-[-20%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#FFA5A5]/20 to-transparent blur-[120px] animate-rgb-glow-reverse" />
              <div className="absolute inset-0 pixel-grid opacity-60" />
            </div>

            {/* Floating Software Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {fallingIcons.map((icon) => (
                <div
                  key={icon.id}
                  style={{
                    position: "absolute",
                    left: `${icon.left}%`,
                    top: `${icon.top}%`,
                    width: `${icon.size}px`,
                    height: `${icon.size}px`,
                    opacity: icon.opacity,
                    transform: `rotate(${icon.rotation}deg)`,
                    transition: isMerging ? "none" : "transform 0.05s linear",
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))"
                  }}
                  className="pointer-events-none"
                >
                  <img
                    src={getAssetPath(icon.src)}
                    alt={icon.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* TOP HEADER HUD */}
            <div className="flex justify-between items-center text-xs font-sans text-slate-400 font-semibold tracking-widest uppercase select-none relative z-10">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A7F3D0] shadow-[0_0_10px_#A7F3D0] animate-pulse" />
                <span className="text-foreground">SHUBHAM SHUKLA | PORTFOLIO</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-slate-400">
                <span>INDIA</span>
                <span>•</span>
                <span>AVAILABLE FOR FREELANCE & FULL-TIME</span>
              </div>
            </div>

            {/* CENTER HERO & ENTER BUTTON */}
            <div className="flex flex-col items-center justify-center flex-grow text-center space-y-10 relative z-10 my-auto">
              
              <div className="space-y-6 max-w-2xl">
                {/* Category Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#FFA5A5] font-sans text-xs font-bold tracking-widest uppercase shadow-lg">
                  ✨ VISUAL CONTENT CREATOR & DESIGNER
                </div>

                {/* Main Name Heading with RGB Glow */}
                <h1 className="relative font-sans text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent uppercase leading-none select-none">
                  <span className="absolute -inset-4 bg-gradient-to-r from-[#C084FC]/35 via-[#FFA5A5]/35 to-[#A7F3D0]/35 rounded-3xl blur-3xl opacity-70 pointer-events-none z-[-1] animate-pulse" />
                  SHUBHAM SHUKLA
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-300 font-sans tracking-widest uppercase font-medium">
                  GRAPHIC DESIGNER • VIDEO EDITOR • MOTION ARTIST
                </p>
              </div>

              {/* Glowing Enter Dashboard Button */}
              <motion.div
                onMouseEnter={() => setStartHover(true)}
                onMouseLeave={() => setStartHover(false)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="font-sans text-sm sm:text-base font-extrabold tracking-wider py-4 px-8 border border-white/20 bg-gradient-to-r from-[#C084FC] via-[#FFA5A5] to-[#FFE082] text-[#131130] shadow-[0_0_35px_rgba(192,132,252,0.45)] cursor-pointer select-none relative overflow-hidden rounded-2xl z-10 flex items-center gap-3 transition-all duration-200"
              >
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block text-lg"
                >
                  ▶
                </motion.span>
                <span>EXPLORE PORTFOLIO</span>
              </motion.div>

            </div>

            {/* BOTTOM FOOTER HUD */}
            <div className="flex justify-between items-center text-xs font-sans text-slate-400 select-none relative z-10 pt-4 border-t border-white/10 px-2 sm:px-0">
              <span className="tracking-widest uppercase pl-10 sm:pl-0 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC] animate-ping" />
                [ CLICK ANYWHERE TO EXPLORE ]
              </span>
              <span>© 2026 SHUBHAM SHUKLA</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* CHECKERBOARD PIXEL DISSOLVE TRANSITION OVERLAY */}
      <AnimatePresence>
        {checkerActive && (
          <div className="fixed inset-0 z-[99999] grid grid-cols-12 grid-rows-12 pointer-events-none overflow-hidden">
            {gridBlocks.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.random() * 0.45,
                  ease: "easeInOut"
                }}
                className="bg-[#000000] w-full h-full border border-black/10"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
