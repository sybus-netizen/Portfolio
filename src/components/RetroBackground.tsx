"use client";

import React, { useEffect, useState } from "react";

export default function RetroBackground() {
  const [mounted, setMounted] = useState(false);
  const [targetPos, setTargetPos] = useState({ x: -1000, y: -1000 });
  const [currentPos, setCurrentPos] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setMounted(true);

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const updateGlowPosition = () => {
      setCurrentPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.08,
        y: prev.y + (targetPos.y - prev.y) * 0.08,
      }));
      animationFrameId = requestAnimationFrame(updateGlowPosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(updateGlowPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[20] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Ultra-Subtle Background Vector Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="30%" x2="100%" y2="45%" stroke="url(#beamGrad1)" strokeWidth="1" strokeDasharray="8 20" className="animate-line-flow-1" />
          <line x1="0" y1="70%" x2="100%" y2="55%" stroke="url(#beamGrad2)" strokeWidth="1" strokeDasharray="10 24" className="animate-line-flow-2" />
          
          <defs>
            <linearGradient id="beamGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0" />
              <stop offset="50%" stopColor="#C084FC" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beamGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ultra-Soft Fading Mouse Glow */}
      <div
        className="absolute w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-1000 ease-out z-[25]"
        style={{
          left: `${currentPos.x}px`,
          top: `${currentPos.y}px`,
          opacity: opacity,
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(126, 34, 206, 0.02) 50%, transparent 75%)",
        }}
      />
    </div>
  );
}
