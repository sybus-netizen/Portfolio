"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const speechMessages = [
  "Need a tour?",
  "Check out my projects!",
  "Still here? 👀",
  "Let's create something awesome.",
  "Hover over something!"
];

// SVG Pixel Companion character sprite
const CompanionSVG = ({ frame, isWalking }: { frame: number; isWalking: boolean }) => {
  const isLeftLegUp = isWalking && frame % 2 === 0;

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
      {isWalking ? (
        /* Walking arms */
        <>
          <rect x="2" y="12" width="2" height="3" fill="#FF5964" />
          <rect x="12" y="12" width="2" height="3" fill="#FF5964" />
        </>
      ) : (
        /* Stand arms */
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

export default function GameCompanion() {
  const [mounted, setMounted] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [walkFrame, setWalkFrame] = useState(0);
  const [message, setMessage] = useState("");
  
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const walkLoop = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    resetTimer();

    const handleUserActivity = () => {
      resetTimer();
    };

    // User activity listeners
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (walkLoop.current) clearInterval(walkLoop.current);
    };
  }, [isIdle]);

  // Start walking legs animation frame cycle
  const startWalkLoop = () => {
    if (walkLoop.current) clearInterval(walkLoop.current);
    setIsWalking(true);
    walkLoop.current = setInterval(() => {
      setWalkFrame((f) => f + 1);
    }, 120);
  };

  // Stop walking legs animation frame cycle
  const stopWalkLoop = () => {
    if (walkLoop.current) {
      clearInterval(walkLoop.current);
      walkLoop.current = null;
    }
    setIsWalking(false);
  };

  const resetTimer = () => {
    if (isIdle) {
      // Walk out left off-screen
      setIsIdle(false);
      startWalkLoop();
      // Set timer to turn off legs after walk off transition completes (1s)
      setTimeout(() => {
        stopWalkLoop();
      }, 1000);
    }

    if (idleTimer.current) clearTimeout(idleTimer.current);

    // Trigger walk-in after exactly 5 seconds of inactivity
    idleTimer.current = setTimeout(() => {
      triggerCompanion();
    }, 5000);
  };

  const triggerCompanion = () => {
    // Choose random speech text
    const randomMsg = speechMessages[Math.floor(Math.random() * speechMessages.length)];
    setMessage(randomMsg);
    
    // Walk in
    setIsIdle(true);
    startWalkLoop();
    // Turn off leg movement once slide-in transition completes (1s)
    setTimeout(() => {
      stopWalkLoop();
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: isIdle ? "32px" : "-120px",
        zIndex: 9999,
        transition: "left 1s cubic-bezier(0.25, 1, 0.5, 1)",
        pointerEvents: "auto"
      }}
      className="flex items-end select-none"
    >
      <div className="relative cursor-pointer">
        <CompanionSVG frame={walkFrame} isWalking={isWalking} />

        {/* Speech dialog bubble */}
        <AnimatePresence>
          {isIdle && !isWalking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              className="absolute bottom-16 left-4 p-3.5 retro-card border-3 border-black bg-white shadow-[3px_3px_0px_#000] min-w-[170px] text-left z-50 pointer-events-none"
            >
              {/* Bubble Arrow */}
              <div className="absolute bottom-[-10px] left-4 border-t-8 border-t-black border-x-8 border-x-transparent" />
              <div className="absolute bottom-[-6px] left-[17px] border-t-6 border-t-white border-x-6 border-x-transparent" />
              
              <span className="font-retro text-[8px] leading-relaxed text-black">
                💬 "{message}"
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
