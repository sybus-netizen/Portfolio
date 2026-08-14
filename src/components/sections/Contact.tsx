"use client";

import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameSystem } from "@/context/GameContext";

import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const [toast, setToast] = useState({ visible: false, message: "" });
  const { unlockQuest, unlockAchievement } = useGameSystem();
  const { theme } = useTheme();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToast({ visible: true, message: `${label} copied to clipboard!` });
  };

  useEffect(() => {
    if (toast.visible) {
      const t = setTimeout(() => setToast({ visible: false, message: "" }), 2500);
      return () => clearTimeout(t);
    }
  }, [toast.visible]);

  const handleEmailClick = () => {
    unlockAchievement("submit-score", "High Score Submitted", "🏆");
    window.location.href = "mailto:shubhamshukla327@gmail.com";
  };

  const handlePhoneClick = () => {
    unlockAchievement("submit-score", "High Score Submitted", "🏆");
    window.location.href = "tel:+917477727544";
  };

  return (
    <section 
      id="contact" 
      className="py-12 sm:py-16 md:py-20 border-t border-slate-300 dark:border-white/10 bg-transparent relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-[1.5px] bg-gradient-to-r from-transparent via-slate-400/60 dark:via-white/20 to-transparent" />
      <motion.div
        onViewportEnter={() => {
          unlockQuest("contact", "Contact Reached");
          unlockAchievement("explored-portfolio", "Explored Portfolio!", "🗺");
        }}
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center flex flex-col items-center"
      >
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8 md:mb-10 max-w-xl mx-auto select-none">
          <div 
            style={{
              backgroundColor: theme === "light" ? "#DBEAFE" : "rgba(192, 132, 252, 0.2)",
              color: theme === "light" ? "#1E40AF" : "#C084FC",
              borderColor: theme === "light" ? "#93C5FD" : "rgba(192, 132, 252, 0.3)"
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border font-sans text-xs font-bold uppercase tracking-wider select-none"
          >
            GET IN TOUCH
          </div>
          <h2 
            style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
            className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-none"
          >
            Ready to Collaborate
          </h2>
          <p 
            style={{ color: theme === "light" ? "#334155" : "#CBD5E1" }}
            className="text-xs sm:text-sm font-sans leading-relaxed font-medium"
          >
            Whether you're hiring, collaborating, or just want to discuss a creative project, I'd love to hear from you.
          </p>
        </div>

        {/* MODERN GLASS CONTACT PANEL */}
        <div 
          className="retro-card p-5 sm:p-6 w-full max-w-md rounded-2xl space-y-4 relative text-left"
        >
          
          {/* DIRECT CONTACT LIST */}
          <div className="space-y-4">
            <div className="flex items-center justify-between font-sans text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-black/10 dark:border-white/10 pb-2.5">
              <span style={{ color: theme === "light" ? "#475569" : "#94A3B8" }}>DIRECT CONTACT</span>
              <span 
                style={{ color: theme === "light" ? "#047857" : "#10B981" }}
                className="flex items-center gap-1.5 font-extrabold"
              >
                <span 
                  style={{ backgroundColor: theme === "light" ? "#059669" : "#10B981" }}
                  className="w-2 h-2 rounded-full animate-pulse" 
                />
                OPEN FOR WORK
              </span>
            </div>

            {/* EMAIL ACTION LINE */}
            <div className="flex items-center justify-between gap-3 flex-wrap w-full pt-0.5">
              <div className="text-left space-y-0.5">
                <span 
                  style={{ color: theme === "light" ? "#64748B" : "#94A3B8" }}
                  className="font-sans text-[9px] font-bold uppercase tracking-wider block"
                >
                  EMAIL ADDRESS
                </span>
                <span 
                  style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
                  className="font-sans text-xs font-bold"
                >
                  shubhamshukla327@gmail.com
                </span>
              </div>
              <div className="flex gap-1.5 items-center shrink-0">
                <button
                  onClick={() => copyToClipboard("shubhamshukla327@gmail.com", "Email copied!")}
                  style={{
                    backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.05)",
                    borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.1)",
                    color: theme === "light" ? "#0F172A" : "#FFFFFF"
                  }}
                  className="p-1.5 rounded-lg border transition-all hover:scale-105"
                  title="Copy Email"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <a
                  href="mailto:shubhamshukla327@gmail.com"
                  onClick={handleEmailClick}
                  style={{
                    backgroundColor: theme === "light" ? "#2563EB" : "rgba(192, 132, 252, 0.25)",
                    color: "#FFFFFF",
                    borderColor: theme === "light" ? "#1D4ED8" : "rgba(192, 132, 252, 0.4)"
                  }}
                  className="px-3 py-1.5 rounded-lg border font-sans text-xs font-bold uppercase transition-all shadow-md hover:scale-105 inline-flex items-center gap-1 cursor-pointer"
                >
                  SEND EMAIL ✉
                </a>
              </div>
            </div>

            {/* PHONE ACTION LINE */}
            <div className="flex items-center justify-between gap-3 flex-wrap w-full pt-3 border-t border-black/10 dark:border-white/10">
              <div className="text-left space-y-0.5">
                <span 
                  style={{ color: theme === "light" ? "#64748B" : "#94A3B8" }}
                  className="font-sans text-[9px] font-bold uppercase tracking-wider block"
                >
                  PHONE NUMBER
                </span>
                <span 
                  style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
                  className="font-sans text-xs font-bold"
                >
                  +91 74777 27544
                </span>
              </div>
              <div className="flex gap-1.5 items-center shrink-0">
                <button
                  onClick={() => copyToClipboard("+91 74777 27544", "Phone number copied!")}
                  style={{
                    backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.05)",
                    borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.1)",
                    color: theme === "light" ? "#0F172A" : "#FFFFFF"
                  }}
                  className="p-1.5 rounded-lg border transition-all hover:scale-105"
                  title="Copy Phone"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handlePhoneClick}
                  style={{
                    backgroundColor: theme === "light" ? "#2563EB" : "rgba(192, 132, 252, 0.25)",
                    color: "#FFFFFF",
                    borderColor: theme === "light" ? "#1D4ED8" : "rgba(192, 132, 252, 0.4)"
                  }}
                  className="px-3 py-1.5 rounded-lg border font-sans text-xs font-bold uppercase transition-all shadow-md hover:scale-105 inline-flex items-center gap-1 cursor-pointer"
                >
                  CALL NOW 📞
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Signature */}
        <div className="text-center select-none pt-6">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            THANK YOU FOR VISITING!
          </p>
        </div>

      </motion.div>

      {/* Copy notification popup */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            style={{
              position: "fixed",
              bottom: "32px",
              left: "50%",
              zIndex: 9999
            }}
            className="px-5 py-3 border-3 border-black bg-[#FFE082] text-[#131130] font-bold font-retro text-[8px] uppercase tracking-wider shadow-[3px_3px_0px_#000] flex items-center gap-2 select-none"
          >
            <span>★</span> {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
