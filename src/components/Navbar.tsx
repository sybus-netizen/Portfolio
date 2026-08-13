"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGameSystem } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { id: "home",     label: "Home",           href: "/#home" },
  { id: "about",    label: "What I Create",  href: "/#about" },
  { id: "projects", label: "Work",           href: "/#projects" },
  { id: "contact",  label: "Contact",        href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { playClick } = useGameSystem();
  const { theme } = useTheme();


  // Intersection Observer for homepage scroll spy
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "about", "projects", "contact"];
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
      style={{
        backgroundColor: theme === "light" ? "rgba(241, 245, 249, 0.92)" : "rgba(14, 12, 34, 0.85)",
        borderColor: theme === "light" ? "rgba(203, 213, 225, 0.8)" : "rgba(255, 255, 255, 0.1)"
      }}
      className="fixed top-0 left-0 right-0 z-50 w-full select-none py-3.5 px-6 md:px-12 backdrop-blur-xl border-b shadow-md"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between relative z-50">
        
        {/* LOGO */}
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
          className="font-sans text-sm sm:text-base font-extrabold tracking-wider flex items-center gap-1 transition-colors"
        >
          SHUBHAM<span className="text-[#C084FC]">_</span>
        </Link>

        {/* DESKTOP HUD MENU CARD */}
        <div className="hidden md:block">
          <div 
            style={{
              backgroundColor: theme === "light" ? "#FFFFFF" : "rgba(255, 255, 255, 0.06)",
              borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.15)"
            }}
            className="flex items-center gap-1.5 border p-1.5 backdrop-blur-2xl rounded-full shadow-lg"
          >
            {navLinks.map((link) => {
              const isTarget = targetSection === link.id;
              const isActive = activeSection === link.id;

              const getStyle = () => {
                if (isActive) {
                  if (theme === "light") {
                    return { backgroundColor: "#2563EB", color: "#FFFFFF" };
                  } else {
                    return { background: "linear-gradient(to right, #C084FC, #FFA5A5)", color: "#131130" };
                  }
                }
                if (isTarget) {
                  if (theme === "light") {
                    return { backgroundColor: "#E2E8F0", color: "#0F172A" };
                  } else {
                    return { backgroundColor: "rgba(255, 255, 255, 0.15)", color: "#FFFFFF" };
                  }
                }
                return {
                  color: theme === "light" ? "#334155" : "#CBD5E1"
                };
              };

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setHoveredSection(link.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={getStyle()}
                  className={cn(
                    "px-4 py-1.5 font-sans text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer select-none rounded-full",
                    isActive ? "font-extrabold shadow-md" : isTarget ? "font-bold" : "font-semibold hover:opacity-90"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

          </div>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              backgroundColor: theme === "light" ? "#E2E8F0" : "rgba(255, 255, 255, 0.12)",
              borderColor: theme === "light" ? "#94A3B8" : "rgba(255, 255, 255, 0.2)",
            }}
            className="w-10 h-10 flex items-center justify-center border backdrop-blur-md rounded-xl shadow-md active:scale-95 transition-all focus:outline-none cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X 
                style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF", stroke: theme === "light" ? "#0F172A" : "#FFFFFF" }} 
                className="w-5 h-5 stroke-[2.5]" 
              />
            ) : (
              <Menu 
                style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF", stroke: theme === "light" ? "#0F172A" : "#FFFFFF" }} 
                className="w-5 h-5 stroke-[2.5]" 
              />
            )}
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
            className="fixed inset-x-4 top-20 z-50 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-2xl flex flex-col items-center gap-2.5 md:hidden bg-white/95 dark:bg-[#0E0C22]/95 border border-slate-200 dark:border-white/15 backdrop-blur-2xl text-slate-900 dark:text-white"
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
                  style={{
                    backgroundColor: isActive
                      ? theme === "light" ? "#2563EB" : undefined
                      : theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.05)",
                    backgroundImage: isActive && theme !== "light" ? "linear-gradient(to right, #C084FC, #FFA5A5)" : undefined,
                    color: isActive
                      ? theme === "light" ? "#FFFFFF" : "#131130"
                      : theme === "light" ? "#0F172A" : "#FFFFFF",
                    borderColor: isActive
                      ? theme === "light" ? "#1D4ED8" : "#C084FC"
                      : theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.1)"
                  }}
                  className={cn(
                    "w-full py-3 text-center font-sans text-xs uppercase rounded-xl border transition-all",
                    isActive ? "font-extrabold shadow-md" : "font-bold hover:opacity-90"
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
