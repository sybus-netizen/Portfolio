"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

interface CreativeCoreProps {
  mousePos?: { x: number; y: number };
}

export function CreativeCore({ mousePos = { x: 0, y: 0 } }: CreativeCoreProps) {
  const [time, setTime] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  // Scroll evolution values for blueprint geometric elements
  const scrollRotatePrism = useTransform(scrollY, [0, 800], [0, 110]);
  const scrollRotateRadar = useTransform(scrollY, [0, 800], [0, -75]);
  const scrollScaleCore = useTransform(scrollY, [0, 800], [1, 1.12]);

  useEffect(() => {
    setIsMounted(true);
    let frameId: number;
    let lastTime = performance.now();

    const update = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setTime((prev) => prev + delta);
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (!isMounted) return null;

  // 3D Perspective Tilt on Mouse Cursor
  const tiltX = mousePos.y * -1.3;
  const tiltY = mousePos.x * 1.3;

  // Procedural non-repeating offsets (prime/irregular frequencies)
  const coreScale = 1 + Math.sin(time * 0.95) * 0.03;          // 0.95Hz scale breathing
  const diamondRotate = time * 8.5;                             // 8.5 deg/sec rotation
  const ringRotate = -time * 5.2;                               // -5.2 deg/sec outer frame rotation
  
  // Bezier handle extensions (assemble and disassemble)
  const handleLen1 = 50 + Math.sin(time * 1.4) * 20;           // stretches between 30px and 70px
  const handleLen2 = 45 + Math.cos(time * 0.75) * 25;          // out-of-phase secondary handle

  // Crop marks breathing offsets
  const cropOffset = Math.sin(time * 1.1) * 6;                 // crop lines offset

  // Motion path playhead coordinate (sliding dot coordinates on curve)
  const playheadProgress = (time * 0.15) % 1;                   // loops 0 -> 1

  return (
    <div 
      className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center select-none z-10"
      style={{
        perspective: 1200,
      }}
    >
      {/* Central Ambient Glow Backplate */}
      <motion.div
        animate={{
          opacity: [0.18, 0.28, 0.18],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[310px] h-[310px] rounded-full bg-[#7C3AED]/20 blur-[90px] pointer-events-none -z-10"
      />

      {/* 3D tilt core structure */}
      <motion.div
        animate={{
          rotateX: tiltX,
          rotateY: tiltY,
        }}
        transition={{
          type: "spring",
          stiffness: 65,
          damping: 16
        }}
        className="w-full h-full relative"
      >
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Frosted Glass Fills */}
            <linearGradient id="coreGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
              <stop offset="50%" stopColor="rgba(124, 58, 237, 0.03)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0.85)" />
            </linearGradient>

            <linearGradient id="prismGlass" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.03)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.06)" />
            </linearGradient>

            {/* Glowing Edge Outlines */}
            <linearGradient id="glowingOutline" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            {/* Shifting Reflection gradient */}
            <linearGradient id="surfaceReflect" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>

            {/* Film Strip ribbon fill */}
            <linearGradient id="filmRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="70%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* ==========================================
              1. GRID FRAGMENTS & INTERSECTIONS
              ========================================== */}
          <g opacity="0.15">
            <line x1="80" y1="250" x2="420" y2="250" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="3, 9" />
            <line x1="250" y1="80" x2="250" y2="420" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="3, 9" />
            {/* Coordinate Crosses */}
            <path d="M 80 245 L 80 255 M 75 250 L 85 250" stroke="#FFFFFF" strokeWidth="1" />
            <path d="M 420 245 L 420 255 M 415 250 L 425 250" stroke="#FFFFFF" strokeWidth="1" />
          </g>

          {/* ==========================================
              2. TRANSLUCENT RIBBON (Film strip path)
              ========================================== */}
          <g style={{ transform: `rotate(${ringRotate * 0.3}deg)`, transformOrigin: "250px 250px" }}>
            <path 
              d="M 120 380 Q 250 80 380 380" 
              fill="none" 
              stroke="url(#filmRibbon)" 
              strokeWidth="20" 
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            {/* Sprocket Holes */}
            <path 
              d="M 120 380 Q 250 80 380 380" 
              fill="none" 
              stroke="#000000" 
              strokeWidth="5" 
              strokeDasharray="2, 6"
              strokeLinecap="round"
              strokeOpacity="0.75"
            />
            <path 
              d="M 120 380 Q 250 80 380 380" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="5" 
              strokeDasharray="2, 6"
              strokeLinecap="round"
              strokeOpacity="0.15"
            />
          </g>

          {/* ==========================================
              3. ROTATING OUTER DIAMOND PRISM (Layered Glass)
              ========================================== */}
          <motion.g style={{ rotate: scrollRotatePrism, transformOrigin: "250px 250px" }}>
            <g style={{ transform: `rotate(${diamondRotate}deg)`, transformOrigin: "250px 250px" }}>
              <rect 
                x="160" 
                y="160" 
                width="180" 
                height="180" 
                rx="18" 
                fill="url(#prismGlass)" 
                stroke="url(#glowingOutline)" 
                strokeWidth="1.5" 
                strokeOpacity="0.35"
                className="backdrop-blur-sm"
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(124,58,237,0.06))"
                }}
              />
              {/* Corner Crop Marks inside prism */}
              <g stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.45" fill="none">
                <path d={`M 175 ${175 + cropOffset} L 175 175 L ${175 + cropOffset} 175`} />
                <path d={`M 325 ${175 + cropOffset} L 325 175 L ${325 - cropOffset} 175`} />
                <path d={`M 175 ${325 - cropOffset} L 175 325 L ${175 + cropOffset} 325`} />
                <path d={`M 325 ${325 - cropOffset} L 325 325 L ${325 - cropOffset} 325`} />
              </g>
            </g>
          </motion.g>

          {/* ==========================================
              4. CENTRAL GLASS CORE (Breathing Sphere)
              ========================================== */}
          <motion.g style={{ scale: scrollScaleCore, transformOrigin: "250px 250px" }}>
            <g style={{ transform: `scale(${coreScale})`, transformOrigin: "250px 250px" }}>
              <circle 
                cx="250" 
                cy="250" 
                r="85" 
                fill="url(#coreGlass)" 
                stroke="url(#glowingOutline)" 
                strokeWidth="4" 
                className="backdrop-blur-md"
                style={{
                  filter: "drop-shadow(0 12px 32px rgba(124, 58, 237, 0.15))"
                }}
              />
              {/* Shifting Reflection Line across the core */}
              <circle
                cx="250"
                cy="250"
                r="85"
                fill="none"
                stroke="url(#surfaceReflect)"
                strokeWidth="3.5"
                style={{
                  transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`
                }}
              />
              
              {/* Inside core detail: concentric radar ring */}
              <motion.g style={{ rotate: scrollRotateRadar, transformOrigin: "250px 250px" }}>
                <circle 
                  cx="250" 
                  cy="250" 
                  r="50" 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.04)" 
                  strokeWidth="1.2" 
                />
                <circle 
                  cx="250" 
                  cy="250" 
                  r="30" 
                  fill="none" 
                  stroke="rgba(124, 58, 237, 0.1)" 
                  strokeWidth="1.2" 
                />
              </motion.g>
            </g>
          </motion.g>

          {/* ==========================================
              5. ANIMATING BEZIER GUIDES (Stretching handles)
              ========================================== */}
          <g>
            {/* Center Anchor Box (Solid square) */}
            <rect x="245" y="245" width="10" height="10" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />

            {/* Bezier handle line 1 (Top-Left extending handle) */}
            <g>
              <line 
                x1="250" 
                y1="250" 
                x2={250 - handleLen1 * 0.707} 
                y2={250 - handleLen1 * 0.707} 
                stroke="#A855F7" 
                strokeWidth="1.5" 
                strokeDasharray="2, 3" 
              />
              {/* Top-Left Control Handle Node */}
              <circle 
                cx={250 - handleLen1 * 0.707} 
                cy={250 - handleLen1 * 0.707} 
                r="4.5" 
                fill="#FFFFFF" 
                stroke="#7C3AED" 
                strokeWidth="1.5" 
              />
            </g>

            {/* Bezier handle line 2 (Bottom-Right extending handle) */}
            <g>
              <line 
                x1="250" 
                y1="250" 
                x2={250 + handleLen1 * 0.707} 
                y2={250 + handleLen1 * 0.707} 
                stroke="#A855F7" 
                strokeWidth="1.5" 
                strokeDasharray="2, 3" 
              />
              {/* Bottom-Right Control Handle Node */}
              <circle 
                cx={250 + handleLen1 * 0.707} 
                cy={250 + handleLen1 * 0.707} 
                r="4.5" 
                fill="#FFFFFF" 
                stroke="#7C3AED" 
                strokeWidth="1.5" 
              />
            </g>

            {/* Secondary bezier line (Top-Right handle) */}
            <g>
              <line 
                x1="250" 
                y1="250" 
                x2={250 + handleLen2 * 0.707} 
                y2={250 - handleLen2 * 0.707} 
                stroke="#7C3AED" 
                strokeWidth="1" 
                strokeDasharray="2, 2"
              />
              {/* Top-Right Control Handle Node */}
              <circle 
                cx={250 + handleLen2 * 0.707} 
                cy={250 - handleLen2 * 0.707} 
                r="3.5" 
                fill="#7C3AED" 
                stroke="#FFFFFF" 
                strokeWidth="1" 
              />
            </g>

            {/* Secondary bezier line (Bottom-Left handle) */}
            <g>
              <line 
                x1="250" 
                y1="250" 
                x2={250 - handleLen2 * 0.707} 
                y2={250 + handleLen2 * 0.707} 
                stroke="#7C3AED" 
                strokeWidth="1" 
                strokeDasharray="2, 2"
              />
              {/* Bottom-Left Control Handle Node */}
              <circle 
                cx={250 - handleLen2 * 0.707} 
                cy={250 + handleLen2 * 0.707} 
                r="3.5" 
                fill="#7C3AED" 
                stroke="#FFFFFF" 
                strokeWidth="1" 
              />
            </g>
          </g>

          {/* ==========================================
              6. MOTION PATH CURVE & PLAYHEAD
              ========================================== */}
          <g>
            {/* The Motion Curve */}
            <path 
              id="coreMotionPath"
              d="M 120 250 C 120 160, 380 160, 380 250" 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.08)" 
              strokeWidth="1.5" 
              strokeDasharray="4, 4" 
            />

            {/* Procedural playhead triangle slide */}
            {/* Coordinates along curve interpolated: C(t) = (1-t)^3 P0 + 3(1-t)^2 t P1 + 3(1-t) t^2 P2 + t^3 P3 */}
            {/* For P0=(120,250), P1=(120,160), P2=(380,160), P3=(380,250) */}
            {(() => {
              const t = playheadProgress;
              const mt = 1 - t;
              // Bezier math
              const px = mt*mt*mt*120 + 3*mt*mt*t*120 + 3*mt*t*t*380 + t*t*t*380;
              const py = mt*mt*mt*250 + 3*mt*mt*t*160 + 3*mt*t*t*160 + t*t*t*250;
              return (
                <g transform={`translate(${px}, ${py})`}>
                  {/* Outer glowing ring */}
                  <circle cx="0" cy="0" r="8" fill="rgba(124, 58, 237, 0.15)" />
                  {/* Playhead dot */}
                  <circle cx="0" cy="0" r="4.5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1" />
                </g>
              );
            })()}
          </g>

          {/* ==========================================
              7. COLOR SWATCHES (Bottom Spec panel)
              ========================================== */}
          <g transform="translate(195, 362)">
            {/* Swatch 1: Adobe Blue */}
            <rect x="0" y="0" width="18" height="10" rx="2" fill="#31A8FF" fillOpacity="0.8" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            {/* Swatch 2: Orange */}
            <rect x="24" y="0" width="18" height="10" rx="2" fill="#FF9A00" fillOpacity="0.8" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            {/* Swatch 3: Purple */}
            <rect x="48" y="0" width="18" height="10" rx="2" fill="#EA77FF" fillOpacity="0.8" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            {/* Swatch 4: Green */}
            <rect x="72" y="0" width="18" height="10" rx="2" fill="#00C896" fillOpacity="0.8" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            {/* Connecting swatch line */}
            <line x1="-12" y1="5" x2="0" y2="5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            <line x1="90" y1="5" x2="102" y2="5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
          </g>

          {/* ==========================================
              8. EXTRA FLOATING GEOMETRIC OBJECTS
              ========================================== */}
          <g>
            {/* Diamond node */}
            <polygon 
              points="140,140 146,134 140,128 134,134" 
              fill="#FFFFFF" 
              fillOpacity="0.3" 
              stroke="#A855F7" 
              strokeWidth="0.5" 
              style={{ transform: `translate(${Math.sin(time*0.8)*8}px, ${Math.cos(time*0.8)*8}px)` }}
            />
            {/* Triangle node */}
            <polygon 
              points="350,330 356,340 344,340" 
              fill="none" 
              stroke="#00C4CC" 
              strokeWidth="1.2" 
              style={{ transform: `translate(${Math.cos(time*0.5)*10}px, ${Math.sin(time*0.5)*10}px)` }}
            />
          </g>

        </svg>
      </motion.div>
    </div>
  );
}
