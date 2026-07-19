"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION-AWARE DATA POOLS
// ═══════════════════════════════════════════════════════════════════════════════

const sectionWords: Record<string, string[]> = {
  home:     ["CREATE", "VISUAL", "DESIGN", "STORY", "COMPOSE", "BUILD", "ANIMATE", "FRAME"],
  about:    ["BRAND", "TYPOGRAPHY", "GRID", "DESIGN", "CONTENT", "COMPOSE", "BUILD", "MARKETING"],
  projects: ["MOTION", "EDIT", "FRAME", "ANIMATE", "STORY", "COMPOSE", "VISUAL", "DESIGN"],
  timeline: ["BUILD", "CONTENT", "EDIT", "FRAME", "MOTION", "DESIGN", "STORY", "TYPOGRAPHY"],
  contact:  ["CREATE", "CONNECT", "BUILD", "VISUAL", "STORY", "DESIGN", "COMPOSE", "BRAND"],
};

const sectionLabels: Record<string, string[]> = {
  home:     ["X:240", "GRID-08", "R=240px", "PATH 01", "NODE", "Anchor", "Scale 1.25", "Opacity 80%", "Y:360", "Frame 120", "Bezier"],
  about:    ["GRID-12", "W:1920", "H:1080", "Bezier", "Anchor", "Vector", "Path 02", "Opacity 80%", "NODE", "Scale 1.0", "Timeline"],
  projects: ["Frame 120", "Timeline", "FPS:60", "Scale 1.0", "Pacing", "NODE 03", "Opacity 100%", "Keyframe", "X:480", "R=160px", "GRID-04"],
  timeline: ["Anchor", "NODE", "GRID-08", "Timeline", "Scale 1.25", "Frame 240", "Path 03", "Bezier", "Y:720", "Opacity 60%", "Vector"],
  contact:  ["X:1080", "Y:1920", "NODE", "GRID-08", "Path 01", "R=180px", "Scale 1.00", "Anchor", "Frame 001", "Vector", "Opacity 100%"],
};

// ═══════════════════════════════════════════════════════════════════════════════
// SVG GRAPHIC COMPONENTS — inline blueprint vector elements
// ═══════════════════════════════════════════════════════════════════════════════

function BezierCurve() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="text-white/[0.04]">
      <path d="M 8,52 C 16,8 64,8 72,4" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="8" cy="52" r="2.5" fill="currentColor" />
      <circle cx="72" cy="4" r="2.5" fill="currentColor" />
      <line x1="8" y1="52" x2="24" y2="18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
      <circle cx="24" cy="18" r="1.5" fill="currentColor" />
      <line x1="72" y1="4" x2="56" y2="38" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
      <circle cx="56" cy="38" r="1.5" fill="currentColor" />
    </svg>
  );
}

function KeyframeDiamond() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#7C3AED]/[0.06]">
      <rect x="5" y="5" width="7.07" height="7.07" transform="rotate(45 10 10)" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="10" cy="10" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TimelineTicks() {
  return (
    <svg width="100" height="14" viewBox="0 0 100 14" fill="none" className="text-white/[0.03]">
      <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeWidth="0.6" />
      {[0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100].map((x) => (
        <line key={x} x1={x} y1="10" x2={x} y2={x % 25 === 0 ? 2 : 5} stroke="currentColor" strokeWidth={x % 25 === 0 ? 0.9 : 0.5} />
      ))}
    </svg>
  );
}

function ConstructionCircle() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-white/[0.025]">
      <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3,3" />
      <line x1="40" y1="4" x2="40" y2="76" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,4" />
      <line x1="4" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,4" />
    </svg>
  );
}

function CropMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/[0.04]">
      <path d="M2,8 L2,2 L8,2" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function MeasurementArrow() {
  return (
    <svg width="90" height="16" viewBox="0 0 90 16" fill="none" className="text-white/[0.03]">
      <line x1="6" y1="10" x2="84" y2="10" stroke="currentColor" strokeWidth="0.5" />
      <path d="M10,7 L6,10 L10,13" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <path d="M80,7 L84,10 L80,13" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <text x="45" y="6" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="currentColor" opacity="0.7">240px</text>
    </svg>
  );
}

function VectorHandle() {
  return (
    <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="text-[#7C3AED]/[0.04]">
      <line x1="24" y1="20" x2="8" y2="6" stroke="currentColor" strokeWidth="0.6" />
      <line x1="24" y1="20" x2="40" y2="34" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="24" cy="20" r="2.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <circle cx="8" cy="6" r="1.5" fill="currentColor" />
      <circle cx="40" cy="34" r="1.5" fill="currentColor" />
    </svg>
  );
}

function WireframeRect() {
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" fill="none" className="text-white/[0.025]">
      <rect x="2" y="2" width="60" height="36" stroke="currentColor" strokeWidth="0.5" rx="2" />
      <line x1="2" y1="2" x2="62" y2="38" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,3" />
      <line x1="62" y1="2" x2="2" y2="38" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,3" />
    </svg>
  );
}

function RegistrationMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white/[0.04]">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="0.5" />
      <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="0.4" />
      <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

function GridOverlay() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-white/[0.015]">
      {[0, 15, 30, 45, 60].map((v) => (
        <React.Fragment key={v}>
          <line x1={v} y1="0" x2={v} y2="60" stroke="currentColor" strokeWidth="0.4" />
          <line x1="0" y1={v} x2="60" y2={v} stroke="currentColor" strokeWidth="0.4" />
        </React.Fragment>
      ))}
    </svg>
  );
}

const sectionGraphics: Record<string, React.FC[]> = {
  home:     [ConstructionCircle, CropMark, MeasurementArrow, RegistrationMark, GridOverlay],
  about:    [VectorHandle, BezierCurve, CropMark, WireframeRect, GridOverlay],
  projects: [TimelineTicks, KeyframeDiamond, MeasurementArrow, ConstructionCircle, VectorHandle],
  timeline: [TimelineTicks, KeyframeDiamond, ConstructionCircle, BezierCurve, CropMark],
  contact:  [ConstructionCircle, CropMark, VectorHandle, RegistrationMark, GridOverlay],
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLOT POSITION PRESETS
// ═══════════════════════════════════════════════════════════════════════════════

interface SlotPosition {
  left?: string; right?: string; top?: string; bottom?: string;
}

// 8 word slots distributed around edges (never center where content lives)
const WORD_SLOTS: (SlotPosition & { depth: "near" | "mid" | "far" })[] = [
  { left: "3%",  top: "8%",   depth: "near" },
  { right: "4%", top: "15%",  depth: "mid"  },
  { left: "5%",  top: "40%",  depth: "far"  },
  { right: "3%", top: "50%",  depth: "near" },
  { left: "4%",  bottom: "18%", depth: "mid" },
  { right: "5%", bottom: "10%", depth: "far" },
  { left: "28%", top: "5%",   depth: "far"  },
  { right: "25%", bottom: "6%", depth: "mid" },
];

// 24 blueprint label/graphic slots scattered across all regions
const BLUEPRINT_SLOTS: SlotPosition[] = [
  // Top band
  { left: "12%", top: "4%" },    { left: "38%", top: "9%" },
  { right: "12%", top: "6%" },   { right: "35%", top: "3%" },
  // Upper mid band
  { left: "18%", top: "22%" },   { right: "20%", top: "26%" },
  { left: "52%", top: "18%" },   { right: "48%", top: "30%" },
  // Center band (edges only)
  { left: "8%",  top: "38%" },   { right: "6%",  top: "42%" },
  { left: "22%", top: "48%" },   { right: "22%", top: "52%" },
  // Lower mid band
  { left: "14%", top: "62%" },   { right: "16%", top: "65%" },
  { left: "44%", top: "58%" },   { right: "40%", top: "70%" },
  // Bottom band
  { left: "10%", bottom: "18%" },{ right: "10%", bottom: "22%" },
  { left: "36%", bottom: "14%" },{ right: "30%", bottom: "8%" },
  { left: "6%",  bottom: "6%" }, { right: "8%",  bottom: "4%" },
  { left: "56%", bottom: "20%" },{ right: "55%", bottom: "16%" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SEEDED RANDOM HELPER — deterministic per-slot to avoid hydration mismatch
// ═══════════════════════════════════════════════════════════════════════════════

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// WORD ELEMENT — uses pure CSS animation
// ═══════════════════════════════════════════════════════════════════════════════

function WordElement({
  word,
  position,
  depth,
  seed,
}: {
  word: string;
  position: SlotPosition;
  depth: "near" | "mid" | "far";
  seed: number;
}) {
  const rand = seededRandom(seed);

  const opacity = depth === "near" ? 0.055 : depth === "mid" ? 0.035 : 0.022;
  const duration = 6 + rand() * 6;      // 6s–12s
  const delay = rand() * 8;             // 0–8s stagger
  const driftY = -(8 + rand() * 14);    // -8 to -22px upward drift
  const driftX = rand() * 10 - 5;       // -5 to +5px lateral
  const rotation = rand() * 3 - 1.5;    // -1.5 to +1.5 deg
  const scale = 0.98 + rand() * 0.04;   // 0.98 to 1.02

  const sizeClass =
    depth === "near"
      ? "text-[6vw] md:text-[5vw] lg:text-[4.5vw]"
      : depth === "mid"
      ? "text-[5vw] md:text-[4vw] lg:text-[3.5vw]"
      : "text-[4vw] md:text-[3vw] lg:text-[2.8vw]";

  return (
    <div
      style={{
        position: "absolute",
        ...position,
        opacity: 0,
        animation: `bgFloat ${duration}s ${delay}s ease-in-out infinite alternate`,
        ["--bg-drift-y" as string]: `${driftY}px`,
        ["--bg-drift-x" as string]: `${driftX}px`,
        ["--bg-rotate" as string]: `${rotation}deg`,
        ["--bg-scale" as string]: scale,
        ["--bg-opacity" as string]: opacity,
        willChange: "transform, opacity",
      }}
      className={`font-display font-extralight tracking-[0.18em] uppercase whitespace-nowrap select-none pointer-events-none ${sizeClass}`}
    >
      <span className="bg-gradient-to-r from-white/80 via-purple-300/60 to-white/80 bg-clip-text text-transparent">
        {word}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BLUEPRINT ELEMENT — text label or SVG graphic
// ═══════════════════════════════════════════════════════════════════════════════

function BlueprintElement({
  content,
  position,
  seed,
}: {
  content: { type: "label"; text: string } | { type: "graphic"; Graphic: React.FC };
  position: SlotPosition;
  seed: number;
}) {
  const rand = seededRandom(seed);

  const depth = seed % 3; // 0=near, 1=mid, 2=far
  const opacity = depth === 0 ? 0.05 : depth === 1 ? 0.032 : 0.02;
  const duration = 7 + rand() * 8;
  const delay = rand() * 10;
  const driftY = -(4 + rand() * 10);
  const driftX = rand() * 8 - 4;
  const rotation = rand() * 2 - 1;
  const scale = 0.99 + rand() * 0.02;

  return (
    <div
      style={{
        position: "absolute",
        ...position,
        opacity: 0,
        animation: `bgFloat ${duration}s ${delay}s ease-in-out infinite alternate`,
        ["--bg-drift-y" as string]: `${driftY}px`,
        ["--bg-drift-x" as string]: `${driftX}px`,
        ["--bg-rotate" as string]: `${rotation}deg`,
        ["--bg-scale" as string]: scale,
        ["--bg-opacity" as string]: opacity,
        willChange: "transform, opacity",
      }}
      className="select-none pointer-events-none"
    >
      {content.type === "label" ? (
        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-purple-300/40 whitespace-nowrap">
          {content.text}
        </span>
      ) : (
        <content.Graphic />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN BACKGROUND COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function EditorialBackground() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pause when tab is inactive
  useEffect(() => {
    const handler = () => setIsVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // Track active section via IntersectionObserver on homepage
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/about")) setActiveSection("about");
      else if (pathname.startsWith("/projects")) setActiveSection("projects");
      else if (pathname.startsWith("/contact")) setActiveSection("contact");
      else setActiveSection("home");
      return;
    }

    const ids = ["home", "projects", "timeline", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(id); }); },
        { rootMargin: "-25% 0px -45% 0px" }
      );
      obs.observe(el);
      return { obs, el };
    });

    return () => { observers.forEach((o) => { if (o) o.obs.unobserve(o.el); }); };
  }, [pathname]);

  // Build element lists from active section pools
  const { words, blueprints } = useMemo(() => {
    const pool = activeSection;
    const wordPool = sectionWords[pool] || sectionWords.home;
    const labelPool = sectionLabels[pool] || sectionLabels.home;
    const graphicPool = sectionGraphics[pool] || sectionGraphics.home;

    // Pick 8 words for 8 slots
    const pickedWords = WORD_SLOTS.map((slot, i) => ({
      word: wordPool[i % wordPool.length],
      position: slot,
      depth: slot.depth,
      seed: i * 137 + activeSection.length * 31,
    }));

    // Pick 24 blueprint items for 24 slots (60% labels, 40% graphics)
    const pickedBlueprints = BLUEPRINT_SLOTS.map((slot, i) => {
      const isGraphic = i % 5 < 2; // 40% graphics
      return {
        content: isGraphic
          ? { type: "graphic" as const, Graphic: graphicPool[i % graphicPool.length] }
          : { type: "label" as const, text: labelPool[i % labelPool.length] },
        position: slot,
        seed: i * 97 + activeSection.length * 17 + 500,
      };
    });

    return { words: pickedWords, blueprints: pickedBlueprints };
  }, [activeSection]);

  // Don't render if reduced motion or tab hidden
  if (reducedMotion || !isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── Blueprint Grid Pulses & Intersections ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Horizontal grid pulsing sweep lines */}
        <div className="absolute top-[25%] left-0 w-full h-[0.8px] bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent opacity-60 animate-[gridLinePulseH_14s_infinite_linear]" />
        <div className="absolute top-[75%] left-0 w-full h-[0.8px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent opacity-60 animate-[gridLinePulseH_20s_infinite_linear_reverse]" />

        {/* Vertical grid pulsing sweep lines */}
        <div className="absolute left-[30%] top-0 h-full w-[0.8px] bg-gradient-to-b from-transparent via-[#7C3AED]/20 to-transparent opacity-60 animate-[gridLinePulseV_16s_infinite_linear]" />
        <div className="absolute left-[70%] top-0 h-full w-[0.8px] bg-gradient-to-b from-transparent via-[#7C3AED]/25 to-transparent opacity-60 animate-[gridLinePulseV_22s_infinite_linear_reverse]" />

        {/* Glowing crosshair grid intersections */}
        {[
          { left: "30%", top: "25%" },
          { left: "70%", top: "25%" },
          { left: "30%", top: "75%" },
          { left: "70%", top: "75%" },
        ].map((pos, idx) => (
          <div
            key={`cross-${idx}`}
            style={pos}
            className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-[#A855F7] tracking-tighter select-none opacity-20 animate-[intersectionPulse_6s_infinite_ease-in-out]"
          >
            +
          </div>
        ))}
      </div>

      {words.map((w, i) => (
        <WordElement key={`w-${activeSection}-${i}`} {...w} />
      ))}
      {blueprints.map((b, i) => (
        <BlueprintElement key={`b-${activeSection}-${i}`} {...b} />
      ))}
    </div>
  );
}
