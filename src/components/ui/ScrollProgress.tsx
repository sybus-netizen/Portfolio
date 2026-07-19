"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionNode {
  id: string;
  label: string;
  index: string;
}

const sectionsList: SectionNode[] = [
  { id: "home",     label: "Hero",     index: "01" },
  { id: "about",    label: "About",    index: "02" },
  { id: "skills",   label: "Skills",   index: "03" },
  { id: "projects", label: "Work",     index: "04" },
  { id: "timeline", label: "Quest",     index: "05" },
  { id: "contact",  label: "Contact",  index: "06" },
];

export function ScrollProgress() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  // Track active section via IntersectionObserver on homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const observers = sectionsList.map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sec.id);
            }
          });
        },
        {
          rootMargin: "-40% 0px -55% 0px"
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center select-none pointer-events-none">
      {/* Chunky Vertical Retro Connector Track */}
      <div className="relative w-[4px] h-[240px] bg-black flex items-center justify-center">
        {/* Dynamic fill line */}
        <motion.div
          style={{ scaleY }}
          className="absolute top-0 w-full bg-[#FF5964] h-full origin-top"
        />
        
        {/* Interactive Checkpoint Nodes */}
        <div className="absolute inset-y-0 flex flex-col justify-between items-center py-1">
          {sectionsList.map((sec, idx) => {
            const isActive = activeSection === sec.id;
            
            return (
              <div 
                key={sec.id}
                className="relative group flex items-center justify-center pointer-events-auto cursor-pointer"
                onClick={() => handleDotClick(sec.id)}
              >
                {/* Square Pixel Node */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isActive ? "#FFDE47" : "#FFFFFF",
                  }}
                  transition={{ duration: 0.15 }}
                  className="w-3.5 h-3.5 border-2 border-black rotate-45 hover:bg-[#FF5964] transition-colors"
                />

                {/* Floating Retro label speech bubble */}
                <span
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateX(0px) rotate(-45deg)" : "translateX(-5px) rotate(-45deg)",
                  }}
                  className="absolute left-7 text-[8px] font-retro tracking-wider text-black font-bold uppercase transition-all duration-200 whitespace-nowrap bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_#000] rotate-45"
                >
                  {sec.index} {sec.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
