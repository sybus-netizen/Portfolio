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

  // Initialize Falling Software Icons (max 7 active)
  useEffect(() => {
    if (!isTitleActive) return;

    const initialIcons: FallingIcon[] = Array.from({ length: 7 }).map((_, index) => {
      const template = SOFTWARE_ICONS[index % SOFTWARE_ICONS.length];
      const side = Math.random() > 0.5 ? "left" : "right";
      const leftCol = side === "left" 
        ? 3 + Math.random() * 25 // 3% to 28%
        : 72 + Math.random() * 23; // 72% to 95%
      
      iconIdCounter.current += 1;
      return {
        id: iconIdCounter.current,
        src: template.src,
        color: template.color,
        name: template.name,
        left: leftCol,
        top: -20 - (Math.random() * 40), // Staggered spawn heights
        size: 42 + Math.floor(Math.random() * 24), // 42px to 66px
        opacity: 0.75 + Math.random() * 0.25,
        speed: 0.12 + Math.random() * 0.12,
        rotation: -20 + Math.random() * 40,
        rotDir: -0.4 + Math.random() * 0.8,
        drift: -0.06 + Math.random() * 0.12,
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
      // ── STANDARD INDEFINITE FALLING PHASE ──
      setFallingIcons((prev) => {
        return prev.map((icon) => {
          let top = icon.top + icon.speed;
          let left = icon.left + icon.drift;
          let speed = icon.speed;
          let bounceCount = icon.bounceCount;
          let opacity = icon.opacity;
          let rotation = icon.rotation + icon.rotDir;

          // Keep within horizontal bounds per column
          if (left < 1 || (left > 30 && left < 70) || left > 98) {
            // Reverse drift direction on bounds collision
            icon.drift = -icon.drift;
          }

          // Bottom Platform Ground Bounce trigger (starts at approx 84% height)
          if (top >= 83 && bounceCount === 0) {
            speed = -speed * 0.45; // Bounce up
            bounceCount = 1;
            opacity = opacity * 0.65; // Fade slightly on impact
          }

          // Second impact fall off
          if (bounceCount === 1 && speed > 0 && top >= 84) {
            speed = -speed * 0.3; // Small second bounce
            bounceCount = 2;
            opacity = opacity * 0.4;
          }

          // Respawn once completely off-screen or faded
          if (top >= 92 || opacity <= 0.1) {
            const template = SOFTWARE_ICONS[Math.floor(Math.random() * SOFTWARE_ICONS.length)];
            const side = Math.random() > 0.5 ? "left" : "right";
            const leftCol = side === "left" 
              ? 3 + Math.random() * 25 // 3% to 28%
              : 72 + Math.random() * 23; // 72% to 95%
            
            top = -12;
            left = leftCol;
            speed = 0.12 + Math.random() * 0.12;
            bounceCount = 0;
            opacity = 0.75 + Math.random() * 0.25;
            rotation = -20 + Math.random() * 40;
          }

          return {
            ...icon,
            top,
            left,
            speed,
            bounceCount,
            opacity,
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
            className="fixed inset-0 z-[9998] bg-[#FAF6EE] flex flex-col justify-between p-6 select-none cursor-pointer"
            onClick={handleStart}
          >
            {/* CRT Screen Scanline & Vignette filters */}
            <div className="crt-overlay crt-flicker" />
            <div className="retro-vignette" />

            {/* Repeating Warm Pixel Grid Backdrop */}
            <div className="absolute inset-0 pixel-grid opacity-100 pointer-events-none" />

            {/* Subtle Ambient Background Animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              
              {/* Star sparkles */}
              <PixelStarMini style={{ top: "18%", left: "15%", animationDelay: "0.2s" }} />
              <PixelStarMini style={{ top: "25%", right: "18%", animationDelay: "1.4s" }} />
              <PixelStarMini style={{ top: "72%", left: "20%", animationDelay: "0.8s" }} />
              <PixelStarMini style={{ top: "54%", right: "10%", animationDelay: "1.9s" }} />
              
              {/* Drifting Clouds */}
              <div style={{ position: "absolute", top: "12%", opacity: 0.45, left: "-80px", animationDelay: "0s" }} className="text-white drop-shadow-[2.5px_2.5px_0_rgba(0,0,0,0.04)] animate-cloud-slow">
                <PixelCloudMini />
              </div>
              <div style={{ position: "absolute", top: "45%", opacity: 0.35, left: "-80px", animationDelay: "-20s" }} className="text-white drop-shadow-[2.5px_2.5px_0_rgba(0,0,0,0.04)] animate-cloud-slow">
                <PixelCloudMini />
              </div>

              {/* Falling Software Icons */}
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
                    filter: "drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.15))"
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

              {/* Pixel Burst Explosion Particles */}
              {particles.map((p) => (
                <div
                  key={p.id}
                  style={{
                    position: "absolute",
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    opacity: p.opacity,
                    transform: "translate(-50%, -50%)",
                    boxShadow: "1px 1px 0px rgba(0,0,0,0.15)"
                  }}
                  className="pointer-events-none rounded-none"
                />
              ))}

            </div>

            {/* HEADER HUD METADATA */}
            <div className="flex justify-between items-center text-[7px] font-retro text-black/35 select-none relative z-10">
              <div className="flex items-center gap-2">
                <span>SYSTEM: 8-BIT_CPU</span>
                <Equalizer />
              </div>
              <span>1P READY</span>
            </div>

            {/* CENTER TITLE & START BUTTON */}
            <div className="flex flex-col items-center justify-center flex-grow text-center space-y-12 relative z-10">
              
              <div className="space-y-4">
                <h1 className="font-retro text-2.5xl sm:text-4.5xl font-bold tracking-tight text-black uppercase leading-none select-none drop-shadow-[3px_3px_0px_#FFDE47]">
                  SHUBHAM SHUKLA
                </h1>
                <h2 className="font-retro text-xs sm:text-sm tracking-[0.25em] text-[#FF5964] font-bold uppercase select-none">
                  PIXEL PORTFOLIO
                </h2>
                <div className="h-1 w-24 bg-black mx-auto mt-6" />
                <p className="text-[10px] text-gray-500 font-sans tracking-wide">
                  Graphic Designer • Video Editor • Motion Designer
                </p>
              </div>

              {/* Pulsing PRESS START */}
              <motion.div
                onMouseEnter={() => setStartHover(true)}
                onMouseLeave={() => setStartHover(false)}
                animate={
                  startClicked
                    ? { scale: 0.95, y: 3, backgroundColor: "#FFFFFF", boxShadow: "1px 1px 0px #000" }
                    : startHover
                    ? { scale: 1.05, y: -4, boxShadow: "5px 5px 0px #000" }
                    : { opacity: [1, 0.45, 1], y: 0, boxShadow: "3px 3px 0px #000", backgroundColor: "#FFDE47" }
                }
                transition={
                  startHover
                    ? { type: "spring", stiffness: 220, damping: 10 }
                    : { duration: 1.0, repeat: Infinity, ease: "easeInOut" }
                }
                className="font-retro text-xs sm:text-sm text-black tracking-wider py-3.5 px-6 border-3 border-black bg-[#FFDE47] shadow-[3px_3px_0px_#000] cursor-pointer select-none relative overflow-hidden rounded-sm z-10"
              >
                {/* Diagonal sheen sweep */}
                <motion.div
                  animate={{ left: ["-30%", "130%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.2, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-3 bg-white/40 skew-x-12 pointer-events-none"
                />

                {/* Hover Particles */}
                {startHover && (
                  <>
                    <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute -top-1.5 -left-1.5 w-1 h-1 bg-[#FFDE47]" />
                    <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute -bottom-1.5 -right-1.5 w-1 h-1 bg-[#FFDE47]" />
                    <motion.div animate={{ x: [-4, 4, -4] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute -top-1.5 -right-1.5 w-1 h-1 bg-[#FFDE47]" />
                    <motion.div animate={{ x: [4, -4, 4] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute -bottom-1.5 -left-1.5 w-1 h-1 bg-[#FFDE47]" />
                  </>
                )}

                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block mr-2"
                >
                  ▶
                </motion.span>
                PRESS START
              </motion.div>

            </div>

            {/* PLATFORM GROUND SCENERY (Mario Style) */}
            <div className="absolute bottom-0 left-0 right-0 h-14 border-t-4 border-black bg-[#FAF6EE] z-10 flex items-center px-8 justify-between select-none pointer-events-none">
              
              {/* Bottom Ground check pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.035)_50%,transparent_50%)] bg-[length:16px_100%] pointer-events-none" />

              {/* Left Side Scenery: Pixel Studio & Swaying Plants */}
              <div className="flex items-end gap-2 absolute bottom-14 left-6 pointer-events-none z-10">
                <PixelStudio />
                <PixelGrass className="w-4 h-3 text-[#1A1A1A]" />
                <PixelFlower className="w-3.5 h-5" />
              </div>

              {/* Permanent Standing Character on the ground (Breathing, Blinks, Jumps) */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "54px",
                  right: "120px",
                  zIndex: 20,
                  transformOrigin: "bottom center"
                }}
                animate={
                  bgCharState === "jump" 
                    ? { y: [0, -20, 0] }
                    : bgCharState === "look"
                    ? { rotate: [0, 4, -4, 0] }
                    : { y: [0, -1.5, 0] }
                }
                transition={
                  bgCharState === "jump"
                    ? { duration: 0.55, ease: "easeOut" }
                    : { duration: 1.8, repeat: bgCharState === "idle" ? Infinity : 0, ease: "easeInOut" }
                }
              >
                <PixelCharacter frame={0} state={bgCharState} />
              </motion.div>

              {/* Right Side Plants */}
              <div className="flex items-end gap-1.5 absolute bottom-14 right-8 pointer-events-none z-10">
                <PixelGrass className="w-3.5 h-3 text-[#1A1A1A]" />
                <PixelGrass className="w-4 h-3.5 text-[#1A1A1A]" style={{ animationDelay: "0.2s" }} />
                <PixelFlower className="w-3.5 h-5" style={{ animationDelay: "0.4s" }} />
              </div>

            </div>

            {/* FOOTER STATS */}
            <div className="flex justify-between items-end text-[8px] font-retro text-black/40 select-none relative z-20 pb-4">
              <span>v1.0</span>
              <span>© 2026 Shubham Shukla</span>
            </div>

            {/* INACTIVITY EASTER EGG CHARACTER */}
            <div 
              style={{
                position: "absolute",
                bottom: "54px",
                left: `${charX}px`,
                zIndex: 50,
                pointerEvents: "auto",
                transition: (eggState === "waving" || eggState === "shrug") ? "none" : "left 0.1s linear"
              }}
              className="flex items-end cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleStart();
              }}
            >
              <PixelCharacter frame={walkFrame} state={eggState === "shrug" ? "shrug" : eggState === "waving" ? "wave" : "idle"} />

              {/* Dialogue Box speech bubble */}
              <AnimatePresence>
                {dialogueOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 15 }}
                    className="absolute bottom-16 left-6 p-3 retro-card border-3 border-black bg-white shadow-[3px_3px_0px_#000] min-w-[170px] text-left relative z-[60]"
                  >
                    <div className="absolute bottom-[-10px] left-4 border-t-8 border-t-black border-x-8 border-x-transparent" />
                    <div className="absolute bottom-[-6px] left-[17px] border-t-6 border-t-white border-x-6 border-x-transparent" />
                    
                    <span className="font-retro text-[8px] leading-relaxed text-black">
                      💬 "Go ahead... press START."
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
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
