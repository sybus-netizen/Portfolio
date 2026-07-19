"use client";

import React, { useEffect, useState, useMemo } from "react";

// Pixel art cloud shapes
const PixelCloudLarge = () => (
  <svg width="120" height="64" viewBox="0 0 120 64" fill="currentColor">
    <rect x="32" y="8" width="56" height="48" />
    <rect x="16" y="24" width="88" height="32" />
    <rect x="8" y="32" width="104" height="24" />
    <rect x="48" y="0" width="24" height="56" />
  </svg>
);

const PixelCloudSmall = () => (
  <svg width="80" height="48" viewBox="0 0 80 48" fill="currentColor">
    <rect x="24" y="8" width="32" height="32" />
    <rect x="12" y="16" width="56" height="24" />
    <rect x="4" y="24" width="72" height="16" />
    <rect x="32" y="0" width="16" height="40" />
  </svg>
);

// Twinkling sparkles
const PixelSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="7" y="2" width="2" height="12" />
    <rect x="2" y="7" width="12" height="2" />
    <rect x="6" y="6" width="4" height="4" />
  </svg>
);

// Drifting Pixel Bird
const PixelBird = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="currentColor">
    <rect x="0" y="3" width="3" height="2" />
    <rect x="3" y="1" width="3" height="2" />
    <rect x="6" y="0" width="6" height="2" />
    <rect x="12" y="1" width="3" height="2" />
    <rect x="15" y="3" width="3" height="2" />
    <rect x="8" y="2" width="2" height="4" />
  </svg>
);

// Floating Pixel Butterfly
const PixelButterfly = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <rect x="1" y="1" width="3" height="3" />
    <rect x="8" y="1" width="3" height="3" />
    <rect x="3" y="4" width="6" height="3" />
    <rect x="5" y="1" width="2" height="10" />
    <rect x="1" y="7" width="3" height="3" />
    <rect x="8" y="7" width="3" height="3" />
  </svg>
);

// ── CREATIVE DESIGNS BACKGROUND FLOATING SYMBOLS ──

const BezierHandle = () => (
  <svg width="24" height="8" viewBox="0 0 24 8" fill="currentColor">
    <circle cx="3" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    <line x1="5.5" y1="4" x2="18.5" y2="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="21" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

const CropMarks = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="2" y1="2" x2="8" y2="2" />
    <line x1="2" y1="2" x2="2" y2="8" />
  </svg>
);

const PaintBucket = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <polygon points="2,8 8,2 14,8 8,14" stroke="currentColor" strokeWidth="1" fill="none" />
    <rect x="10" y="10" width="4" height="4" />
  </svg>
);

const VectorAnchor = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const AdobePs = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="1.5" y="1.5" width="13" height="13" />
    <rect x="4" y="5" width="3" height="6" fill="currentColor" stroke="none" />
  </svg>
);

const PenTool = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <polygon points="8,1 12,5 7,10 6,10 6,9" />
    <line x1="5" y1="11" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

interface Cloud {
  id: number;
  Component: React.ComponentType;
  top: string;
  delay: string;
  speedClass: string;
  opacity: number;
}

interface Sparkle {
  id: number;
  top: string;
  left: string;
  delay: string;
  size: number;
}

interface Wildlife {
  id: number;
  Component: React.ComponentType;
  top: string;
  delay: string;
  className: string;
  opacity: number;
  color: string;
}

interface CreativeScatter {
  id: number;
  Component: React.ComponentType;
  top: string;
  left?: string;
  right?: string;
  delay: string;
  opacity: number;
  color: string;
}

export default function RetroBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clouds: Cloud[] = useMemo(() => [
    { id: 1, Component: PixelCloudLarge, top: "8%", delay: "0s", speedClass: "animate-cloud-slow", opacity: 0.5 },
    { id: 2, Component: PixelCloudSmall, top: "25%", delay: "-15s", speedClass: "animate-cloud-fast", opacity: 0.4 },
    { id: 3, Component: PixelCloudLarge, top: "45%", delay: "-30s", speedClass: "animate-cloud-slow", opacity: 0.35 },
    { id: 4, Component: PixelCloudSmall, top: "62%", delay: "-5s", speedClass: "animate-cloud-fast", opacity: 0.45 },
    { id: 5, Component: PixelCloudLarge, top: "80%", delay: "-22s", speedClass: "animate-cloud-slow", opacity: 0.3 },
  ], []);

  const sparkles: Sparkle[] = useMemo(() => [
    { id: 1, top: "12%", left: "8%", delay: "0.2s", size: 10 },
    { id: 2, top: "18%", left: "82%", delay: "1.4s", size: 14 },
    { id: 3, top: "35%", left: "14%", delay: "0.8s", size: 8 },
    { id: 4, top: "52%", left: "88%", delay: "2.1s", size: 12 },
    { id: 5, top: "68%", left: "6%", delay: "1.1s", size: 10 },
    { id: 6, top: "78%", left: "85%", delay: "0.5s", size: 14 },
    { id: 7, top: "90%", left: "18%", delay: "1.8s", size: 8 },
  ], []);

  const wildlife: Wildlife[] = useMemo(() => [
    { id: 1, Component: PixelBird, top: "15%", delay: "0s", className: "animate-wildlife-slow", opacity: 0.45, color: "text-[#3A86C8]" },
    { id: 2, Component: PixelButterfly, top: "38%", delay: "12s", className: "animate-butterfly-slow", opacity: 0.35, color: "text-[#FF5964]" },
    { id: 3, Component: PixelBird, top: "55%", delay: "24s", className: "animate-wildlife-slow", opacity: 0.4, color: "text-[#FFDE47]" },
    { id: 4, Component: PixelButterfly, top: "72%", delay: "6s", className: "animate-butterfly-slow", opacity: 0.3, color: "text-[#3BCEAC]" },
  ], []);

  // Scattered fainted creative visual elements (opacity 0.08 to 0.12)
  const creativeScatters: CreativeScatter[] = useMemo(() => [
    { id: 1, Component: BezierHandle, top: "16%", left: "12%", delay: "0.5s", opacity: 0.1, color: "text-[#3A86C8]" },
    { id: 2, Component: CropMarks, top: "28%", right: "8%", delay: "1.8s", opacity: 0.08, color: "text-gray-500" },
    { id: 3, Component: PaintBucket, top: "35%", left: "6%", delay: "2.2s", opacity: 0.1, color: "text-[#FFDE47]" },
    { id: 4, Component: VectorAnchor, top: "48%", right: "14%", delay: "0.9s", opacity: 0.12, color: "text-gray-600" },
    { id: 5, Component: AdobePs, top: "58%", left: "15%", delay: "1.4s", opacity: 0.08, color: "text-[#3A86C8]" },
    { id: 6, Component: PenTool, top: "66%", right: "6%", delay: "3.1s", opacity: 0.1, color: "text-gray-500" },
    { id: 7, Component: BezierHandle, top: "78%", left: "8%", delay: "2.6s", opacity: 0.09, color: "text-[#FF5964]" },
    { id: 8, Component: CropMarks, top: "85%", right: "12%", delay: "0.2s", opacity: 0.11, color: "text-gray-600" },
    { id: 9, Component: VectorAnchor, top: "22%", right: "20%", delay: "1.1s", opacity: 0.08, color: "text-[#3BCEAC]" },
    { id: 10, Component: PenTool, top: "42%", left: "22%", delay: "2.8s", opacity: 0.1, color: "text-gray-500" },
  ], []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Repeating Warm Pixel Grid Backdrop */}
      <div className="absolute inset-0 pixel-grid opacity-100" />

      {/* Floating Pixel Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            style={{
              position: "absolute",
              top: cloud.top,
              opacity: cloud.opacity,
              left: "-150px",
              animationDelay: cloud.delay,
            }}
            className={`text-[#FFFFFF] drop-shadow-[3px_3px_0px_rgba(0,0,0,0.05)] ${cloud.speedClass}`}
          >
            <cloud.Component />
          </div>
        ))}
      </div>

      {/* Twinkling Pixel Sparkles */}
      <div className="absolute inset-0">
        {sparkles.map((sp) => (
          <div
            key={sp.id}
            style={{
              position: "absolute",
              top: sp.top,
              left: sp.left,
              animationDelay: sp.delay,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
            }}
            className="text-[#FFDE47]/25 animate-sparkle"
          >
            <PixelSparkle />
          </div>
        ))}
      </div>

      {/* Slowly Drifting Wildlife */}
      <div className="absolute inset-0">
        {wildlife.map((wl) => (
          <div
            key={wl.id}
            style={{
              position: "absolute",
              top: wl.top,
              opacity: wl.opacity,
              animationDelay: wl.delay,
            }}
            className={`${wl.color} ${wl.className}`}
          >
            <wl.Component />
          </div>
        ))}
      </div>

      {/* Scattered Creative Tools details */}
      <div className="absolute inset-0">
        {creativeScatters.map((cs) => (
          <div
            key={cs.id}
            style={{
              position: "absolute",
              top: cs.top,
              left: cs.left || "auto",
              right: cs.right || "auto",
              opacity: cs.opacity,
              animationDelay: cs.delay,
            }}
            className={`${cs.color} animate-creative-float`}
          >
            <cs.Component />
          </div>
        ))}
      </div>

    </div>
  );
}
