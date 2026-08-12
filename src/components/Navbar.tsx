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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full select-none py-3 px-6 md:px-12",
        scrolled && !isOpen ? "bg-[#0E0C22]/80 backdrop-blur-xl border-b border-white/10 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between relative z-50">
        
        {/* LOGO */}
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          className="font-sans text-sm sm:text-base font-extrabold tracking-wider text-white flex items-center gap-1 hover:text-[#C084FC] transition-colors"
        >
          SHUBHAM<span className="text-[#C084FC]">_</span>
        </Link>

        {/* DESKTOP HUD MENU CARD */}
        <div className="hidden md:block">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1.5 backdrop-blur-md rounded-full shadow-lg">
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
                    "px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none rounded-full",
                    isActive 
                      ? "bg-gradient-to-r from-[#C084FC] to-[#FFA5A5] text-[#131130] font-extrabold shadow-[0_0_15px_rgba(192,132,252,0.4)]" 
                      : isTarget
                      ? "bg-white/15 text-white"
                      : "text-slate-300 hover:text-white"
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
              className="px-3 py-1.5 font-sans text-xs transition-all duration-200 cursor-pointer select-none rounded-full text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center min-w-[32px] h-[32px]"
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
            className="w-10 h-10 flex items-center justify-center border border-white/15 bg-white/10 backdrop-blur-md rounded-xl text-white shadow-md active:scale-95 transition-all focus:outline-none"
            aria-label="Toggle Sound"
          >
            {soundOn ? "🔊" : "🔇"}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center border border-white/15 bg-white/10 backdrop-blur-md rounded-xl text-white shadow-md active:scale-95 transition-all focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-4 h-3 flex flex-col justify-between items-center relative">
              <span className={cn("w-full h-[2px] bg-white transition-all", isOpen && "rotate-45 translate-y-[5px]")} />
              <span className={cn("w-full h-[2px] bg-white transition-all", isOpen && "opacity-0 scale-0")} />
              <span className={cn("w-full h-[2px] bg-white transition-all", isOpen && "-rotate-45 -translate-y-[5px]")} />
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
            className="fixed inset-x-6 top-20 z-40 bg-[#131130]/95 backdrop-blur-2xl border border-white/15 p-6 shadow-2xl rounded-2xl flex flex-col items-center gap-3 md:hidden"
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
                    "w-full py-3 text-center font-sans text-xs font-bold uppercase rounded-xl border transition-all",
                    isActive ? "bg-[#C084FC] text-[#131130] border-[#C084FC] shadow-[0_0_15px_rgba(192,132,252,0.4)]" : "bg-white/5 border-white/10 text-white hover:bg-white/10"
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
