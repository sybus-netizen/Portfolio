"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function PixelCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "pointer">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 6);
      mouseY.set(e.clientY - 6);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target is a button, link, cartridge card, character, or icon slot
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".retro-card") ||
        target.closest(".cursor-pointer") ||
        target.closest(".cursor-help");

      setHoverType(isInteractive ? "pointer" : "default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Disable on mobile/touch screens
  if (!mounted) return null;
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Playful Pixel Pointer Custom Cursor */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          width: hoverType === "pointer" ? "16px" : "10px",
          height: hoverType === "pointer" ? "16px" : "10px",
          backgroundColor: hoverType === "pointer" ? "#FFDE47" : "#000000",
          border: "2px solid #000000",
          zIndex: 99999,
          pointerEvents: "none",
          transformOrigin: "center center"
        }}
        animate={{
          rotate: hoverType === "pointer" ? 45 : 0,
        }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Fainted trail dot */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          width: "6px",
          height: "6px",
          backgroundColor: "#FF5964",
          border: "1px solid #000000",
          zIndex: 99998,
          pointerEvents: "none",
          x: 4,
          y: 4
        }}
        animate={{
          scale: hoverType === "pointer" ? 1.25 : 1,
        }}
      />
    </>
  );
}
