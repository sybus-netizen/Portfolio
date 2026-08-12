"use client";

import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameSystem } from "@/context/GameContext";

export default function Contact() {
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [credits, setCredits] = useState(99);

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

  const { unlockQuest, unlockAchievement } = useGameSystem();

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
      className="py-20 border-t border-white/10 bg-transparent relative overflow-hidden"
    >
      <motion.div
        onViewportEnter={() => {
          unlockQuest("contact", "Contact Reached");
          unlockAchievement("explored-portfolio", "Explored Portfolio!", "🗺");
        }}
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center flex flex-col items-center"
      >
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 max-w-xl mx-auto select-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C084FC]/20 text-[#C084FC] border border-[#C084FC]/30 font-sans text-xs font-bold uppercase tracking-wider select-none">
            GET IN TOUCH
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
            Ready to Collaborate
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Whether you're hiring, collaborating, or just want to discuss a creative project, I'd love to hear from you.
          </p>
        </div>

        {/* MODERN GLASS CONTACT PANEL */}
        <div className="retro-card p-6 sm:p-8 bg-[#131130]/90 backdrop-blur-xl border border-white/10 w-full max-w-lg shadow-2xl rounded-2xl space-y-6 relative mb-8 text-left">
          
          {/* Header Badge */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4 select-none">
            <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">DIRECT CONTACT</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3BCEAC] animate-pulse" />
              <span className="font-sans text-xs font-bold text-[#A7F3D0]">OPEN FOR WORK</span>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* EMAIL ACTION LINE */}
            <div className="flex items-center justify-between gap-4 flex-wrap w-full">
              <div className="text-left space-y-0.5">
                <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider block">EMAIL ADDRESS</span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-white break-all">
                  shubhamshukla327@gmail.com
                </span>
              </div>
              <div className="flex gap-2.5 items-center justify-start sm:justify-end w-full sm:w-auto">
                <button
                  onClick={() => copyToClipboard("shubhamshukla327@gmail.com", "Email")}
                  aria-label="Copy email"
                  className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-slate-300" />
                </button>
                <button
                  onClick={handleEmailClick}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C084FC] to-[#FFA5A5] text-[#131130] font-sans text-xs font-bold uppercase shadow-lg hover:brightness-110 transition-all shrink-0"
                >
                  SEND EMAIL ✉
                </button>
              </div>
            </div>

            {/* PHONE ACTION LINE */}
            <div className="flex items-center justify-between gap-4 flex-wrap w-full pt-4 border-t border-white/10">
              <div className="text-left space-y-0.5">
                <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider block">PHONE NUMBER</span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-white">
                  +91 74777 27544
                </span>
              </div>
              <div className="flex gap-2.5 items-center justify-start sm:justify-end w-full sm:w-auto">
                <button
                  onClick={() => copyToClipboard("+91 74777 27544", "Phone")}
                  aria-label="Copy phone number"
                  className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-slate-300" />
                </button>
                <button
                  onClick={handlePhoneClick}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans text-xs font-bold uppercase transition-all shrink-0"
                >
                  CALL NOW 📞
                </button>
              </div>
            </div>

            {/* LINKEDIN ACTION LINE */}
            <div className="flex items-center justify-between gap-4 flex-wrap w-full pt-4 border-t border-white/10">
              <div className="text-left space-y-0.5">
                <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider block">LINKEDIN PROFILE</span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-white">
                  Shubham Shukla
                </span>
              </div>
              <div className="flex gap-2.5 items-center justify-start sm:justify-end w-full sm:w-auto">
                <a
                  href="https://www.linkedin.com/in/shubham-shukla-bb9760429/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-sans text-xs font-bold uppercase transition-all shrink-0 inline-flex items-center gap-1.5"
                >
                  CONNECT 🔗
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Signature */}
        <div className="text-center select-none border-t border-white/10 pt-6 w-full">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
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
