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
      className="py-20 border-t-3 border-black bg-[#FAF6EE] relative overflow-hidden"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5964] border-2 border-black text-white font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] rounded-sm animate-[heartPulse_1.5s_infinite]">
            FINAL STAGE
          </div>
          <h2 className="font-retro text-xl sm:text-2xl md:text-3.5xl font-bold tracking-tight text-black uppercase leading-none">
            Ready to Collaborate
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-sans">
            Whether you're hiring, collaborating, or just want to discuss a creative idea, I'd love to hear from you.
          </p>
        </div>

        {/* ARCADE HIGH SCORE PANEL */}
        <div className="retro-card p-6 sm:p-8 bg-[#FFFFFF] border-4 border-black w-full max-w-lg shadow-[6px_6px_0px_#000] space-y-6 relative mb-8">
          
          {/* Credit Slots */}
          <div className="flex justify-between items-center border-b-2 border-black pb-4 select-none">
            <span className="font-retro text-[8px] text-black/50">INSERT COIN TO START</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3BCEAC] animate-[heartPulse_1s_infinite]" />
              <span className="font-retro text-[8px] font-bold text-black">CREDITS: {credits}</span>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* EMAIL ACTION LINE */}
            <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <div className="text-left space-y-0.5">
                <span className="font-retro text-[8px] text-black/40 uppercase block">EMAIL ADDR</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-black break-all">
                  shubhamshukla327@gmail.com
                </span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => copyToClipboard("shubhamshukla327@gmail.com", "Email")}
                  aria-label="Copy email"
                  className="p-2 border-2 border-black bg-white rounded-sm active:translate-x-0.5 active:translate-y-0.5 shadow-[1.5px_1.5px_0px_#000] active:shadow-none cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-black" />
                </button>
                <button
                  onClick={handleEmailClick}
                  className="retro-btn retro-btn-green py-2 px-3 shadow-[2px_2px_0px_#000] text-[8px] shrink-0"
                >
                  SEND ✉
                </button>
              </div>
            </div>

            {/* PHONE ACTION LINE */}
            <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap pt-3 border-t-2 border-dashed border-black/10">
              <div className="text-left space-y-0.5">
                <span className="font-retro text-[8px] text-black/40 uppercase block">PHONE NUM</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-black">
                  +91 74777 27544
                </span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => copyToClipboard("+91 74777 27544", "Phone")}
                  aria-label="Copy phone number"
                  className="p-2 border-2 border-black bg-white rounded-sm active:translate-x-0.5 active:translate-y-0.5 shadow-[1.5px_1.5px_0px_#000] active:shadow-none cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-black" />
                </button>
                <button
                  onClick={handlePhoneClick}
                  className="retro-btn retro-btn-outline py-2 px-3 shadow-[2px_2px_0px_#000] text-[8px] shrink-0"
                >
                  CALL 📞
                </button>
              </div>
            </div>

          </div>

          {/* Subtext info */}
          <div className="border-t-2 border-black pt-4 flex justify-between items-center select-none text-[8px]">
            <span className="font-retro text-black/40">HOST_IP: LOCALHOST</span>
            <span className="font-retro text-[#FF5964] font-bold">1P READY ▶</span>
          </div>

        </div>

        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFFFFF] border-2 border-black text-black shadow-[2.5px_2.5px_0px_#000] select-none rounded-sm mb-12">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3BCEAC] animate-[heartPulse_1s_infinite]" />
          <span className="font-retro text-[8px] uppercase font-bold text-black">
            Active Status: Open for work
          </span>
        </div>

        {/* Signature */}
        <div className="text-center select-none border-t border-black/10 pt-4 w-full">
          <p className="font-retro text-[8px] uppercase tracking-[0.2em] text-black/40">
            THANK YOU FOR PLAYING!
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
            className="px-5 py-3 border-3 border-black bg-[#FFDE47] text-black font-retro text-[8px] uppercase tracking-wider shadow-[3px_3px_0px_#000] flex items-center gap-2 select-none"
          >
            <span>★</span> {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
