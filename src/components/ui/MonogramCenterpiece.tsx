"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MonogramCenterpieceProps {
  mousePos?: { x: number; y: number };
}

export function MonogramCenterpiece({ mousePos = { x: 0, y: 0 } }: MonogramCenterpieceProps) {
  const [step, setStep] = useState(0); // 0: Start, 1: Anchors/Handles, 2: Draw Left S, 3: Draw Right S, 4: Interlock Glass Complete

  useEffect(() => {
    // Elegant staggered sequence
    const timers = [
      setTimeout(() => setStep(1), 600),    // Control points pop in
      setTimeout(() => setStep(2), 1600),   // Left S (Bezier) draws
      setTimeout(() => setStep(3), 3200),   // Right S (Film strip) draws
      setTimeout(() => setStep(4), 5000),   // Complete interlocking glass texture
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Left S (stylized Bézier path)
  const leftSPath = "M 230 160 C 230 90, 120 90, 120 195 C 120 265, 230 245, 230 315 C 230 385, 120 385, 120 330";

  // Right S (stylized Film/Motion path)
  const rightSPath = "M 380 170 C 380 100, 270 100, 270 205 C 270 275, 380 255, 380 325 C 380 395, 270 395, 270 340";

  // Coordinates of Key Anchor points for Left S (Bezier representation)
  const anchors = [
    { x: 230, y: 160, cx: 230, cy: 90 },
    { x: 120, y: 195, cx: 120, cy: 265 },
    { x: 230, y: 315, cx: 230, cy: 385 },
    { x: 120, y: 330, cx: 120, cy: 330 }
  ];

  // Dynamic 3D tilt based on mouse position
  const tiltX = mousePos.y * -1.2; // vertical mouse tilt
  const tiltY = mousePos.x * 1.2;  // horizontal mouse tilt

  return (
    <div 
      className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center select-none z-10"
      style={{
        perspective: 1200,
      }}
    >
      {/* Glow Backplate behind monogram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={step >= 4 ? { opacity: 0.32, scale: 1.02 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-[300px] h-[300px] rounded-full bg-[#7C3AED]/18 blur-[90px] pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          rotateX: tiltX,
          rotateY: tiltY,
          y: [0, -6, 0] // Slow breathing (1-2%)
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotateX: { type: "spring", stiffness: 60, damping: 15 },
          rotateY: { type: "spring", stiffness: 60, damping: 15 }
        }}
        className="w-full h-full relative"
      >
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glass Material Gradient */}
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
              <stop offset="45%" stopColor="rgba(139, 92, 246, 0.04)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0.85)" />
            </linearGradient>

            {/* Edge Glow Stroke */}
            <linearGradient id="monogramStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            {/* Moving Reflection Highlights on Glass */}
            <linearGradient id="reflectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.12)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>

          {/* BACKGROUND AMBIENT LIGHT SHIFTS */}
          {step >= 4 && (
            <motion.circle 
              cx="250" 
              cy="250" 
              r="160" 
              fill="rgba(124, 58, 237, 0.02)"
              animate={{
                r: [160, 168, 160],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* MONOGRAM LEFT S - Bézier S (Frosted Glass) */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.path
                d={leftSPath}
                initial={{ fillOpacity: 0, strokeDashoffset: 900 }}
                animate={{ fillOpacity: 1, strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                fill="url(#glassGrad)"
                stroke="url(#monogramStroke)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: "drop-shadow(0 10px 24px rgba(124,58,237,0.12))",
                }}
              />
            )}
          </AnimatePresence>

          {/* MONOGRAM RIGHT S - Film/Motion S (Frosted Glass) */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.path
                d={rightSPath}
                initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                fill="url(#glassGrad)"
                stroke="url(#monogramStroke)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: "drop-shadow(0 10px 24px rgba(124,58,237,0.12))",
                }}
              />
            )}
          </AnimatePresence>

          {/* ABSTRACT FILM STRIP DETAIL (Spocket tracks on Right S) */}
          {step >= 4 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* Inner Film Strip holes track */}
              <path
                d={rightSPath}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeDasharray="2.5, 6"
                strokeOpacity="0.4"
              />
              <path
                d={rightSPath}
                fill="none"
                stroke="#000000"
                strokeWidth="1.5"
                strokeDasharray="2, 6"
                strokeOpacity="0.6"
              />
            </motion.g>
          )}

          {/* DYNAMIC SHIFTING REFLECTIONS (Glass surface sweeps) */}
          {step >= 4 && (
            <motion.path
              d={leftSPath}
              fill="none"
              stroke="url(#reflectGrad)"
              strokeWidth="14"
              strokeDasharray="200 400"
              initial={{ strokeDashoffset: 400 }}
              animate={{
                strokeDashoffset: [400, -400]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`
              }}
            />
          )}

          {/* DYNAMIC DRAWING STEPS */}

          {/* DRAW STEP 2: Left S draws */}
          {step === 2 && (
            <motion.path
              d={leftSPath}
              fill="none"
              stroke="url(#monogramStroke)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="900"
              initial={{ strokeDashoffset: 900 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          )}

          {/* DRAW STEP 3: Right S draws */}
          {step === 3 && (
            <g>
              {/* Left S static silhouette */}
              <path d={leftSPath} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              {/* Right S animated path */}
              <motion.path
                d={rightSPath}
                fill="none"
                stroke="url(#monogramStroke)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="900"
                initial={{ strokeDashoffset: 900 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
            </g>
          )}

          {/* BEZIER VECTOR ANCHORS/HANDLES (Left S Design guides) */}
          {step >= 1 && step < 4 && (
            <g>
              {anchors.map((anc, i) => (
                <g key={i}>
                  {/* Bezier control line handle */}
                  <motion.line
                    x1={anc.x}
                    y1={anc.y}
                    x2={anc.x}
                    y2={anc.y}
                    animate={{ x2: anc.cx, y2: anc.cy }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    stroke="#7C3AED"
                    strokeWidth="1.2"
                    strokeDasharray="2, 2"
                  />
                  {/* Control point handle node */}
                  <motion.circle
                    cx={anc.x}
                    cy={anc.y}
                    r="3.5"
                    animate={{ cx: anc.cx, cy: anc.cy }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    fill="#A855F7"
                    stroke="#FFFFFF"
                    strokeWidth="0.8"
                  />
                  {/* Base Anchor circle */}
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.08 }}
                    cx={anc.x}
                    cy={anc.y}
                    r="5.5"
                    fill="#FFFFFF"
                    stroke="#7C3AED"
                    strokeWidth="2.2"
                  />
                </g>
              ))}
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
}
