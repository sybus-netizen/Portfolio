"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGameSystem } from "@/context/GameContext";

const navLinks = [
  { id: "home",     label: "Home",     href: "/#home" },
  { id: "about",    label: "About",    href: "/#about" },
  { id: "skills",   label: "Skills",   href: "/#skills" },
  { id: "projects", label: "Work",     href: "/#projects" },
  { id: "contact",  label: "Contact",  href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { soundOn, toggleSound, playClick } = useGameSystem();

  // Monitor scroll height to add borders
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for homepage scroll spy
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "about", "skills", "projects", "contact"];
    const activeObservers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-30% 0px -60% 0px"
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      activeObservers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [pathname]);

  // Lock scroll when mobile menu is active
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    playClick();
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleMobileLinkClick = (e: React.MouseEvent, id: string) => {
    playClick();
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const targetSection = hoveredSection || activeSection;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full select-none py-4 px-6 md:px-12",
        scrolled && !isOpen ? "bg-[#FAF6EE]/90 backdrop-blur-md border-b-3 border-black" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between relative z-50">
        
        {/* LOGO */}
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          className="font-retro text-xs sm:text-sm font-bold tracking-tight text-black flex items-center gap-1 hover:text-[#FF5964] transition-colors"
        >
          SHUBHAM<span className="text-[#FF5964]">_</span>
        </Link>

        {/* DESKTOP HUD MENU CARD */}
        <div className="hidden md:block">
          <div className="flex items-center gap-1 bg-[#FFFFFF] border-3 border-black p-1 shadow-[3px_3px_0px_#000] rounded-sm">
            {navLinks.map((link) => {
              const isTarget = targetSection === link.id;
              const isActive = activeSection === link.id;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setHoveredSection(link.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={cn(
                    "px-4 py-2 font-retro text-[9px] uppercase tracking-wide transition-all duration-100 cursor-pointer select-none rounded-sm border-2",
                    isActive 
                      ? "bg-[#FFDE47] text-black border-black shadow-[1px_1px_0px_#000] translate-y-[-1px]" 
                      : isTarget
                      ? "bg-[#FAF6EE] text-black border-black/30"
                      : "text-black/50 border-transparent hover:text-black"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mute toggle for desktop */}
            <button
              onClick={() => {
                playClick();
                toggleSound();
              }}
              className="px-3.5 py-2 font-retro text-[9px] uppercase tracking-wide transition-all duration-100 cursor-pointer select-none rounded-sm border-2 border-transparent text-black/50 hover:text-black focus:outline-none flex items-center justify-center min-w-[32px] h-[34px] hover:bg-[#FAF6EE] hover:border-black/30"
              title={soundOn ? "Mute Sounds" : "Unmute Sounds"}
            >
              {soundOn ? "🔊" : "🔇"}
            </button>
          </div>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mute toggle for mobile */}
          <button
            onClick={() => {
              playClick();
              toggleSound();
            }}
            className="w-10 h-10 flex items-center justify-center border-3 border-black bg-white shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer focus:outline-none font-retro text-xs"
            aria-label="Toggle Sound"
          >
            {soundOn ? "🔊" : "🔇"}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center border-3 border-black bg-[#FFDE47] shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-4 h-3 flex flex-col justify-between items-center relative">
              <span className={cn("w-full h-[2px] bg-black transition-all", isOpen && "rotate-45 translate-y-[5px]")} />
              <span className={cn("w-full h-[2px] bg-black transition-all", isOpen && "opacity-0 scale-0")} />
              <span className={cn("w-full h-[2px] bg-black transition-all", isOpen && "-rotate-45 -translate-y-[5px]")} />
            </div>
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN BOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-6 top-20 z-40 bg-[#FFFFFF] border-4 border-black p-6 shadow-[5px_5px_0px_#000] flex flex-col items-center gap-4 md:hidden"
            role="dialog"
            aria-modal="true"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleMobileLinkClick(e, link.id)}
                  className={cn(
                    "w-full py-3 text-center font-retro text-[10px] uppercase border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all",
                    isActive ? "bg-[#FFDE47] text-black" : "bg-[#FAF6EE] text-black"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}
