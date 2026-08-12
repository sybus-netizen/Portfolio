"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/CustomIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <footer className="pt-10 pb-8 border-t border-white/10 bg-[#0E0C22]/80 backdrop-blur-md relative z-10 overflow-hidden mt-auto select-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full border-b-2 border-slate-800 pb-6 mb-6">
          
          {/* Brand Signature */}
          <div className="text-center md:text-left space-y-1">
            <Link 
              href="/" 
              className="font-retro text-xs sm:text-sm font-bold tracking-tight text-foreground inline-flex items-center gap-0.5"
            >
              SHUBHAM_
            </Link>
            <p className="text-[10px] text-gray-500 font-sans tracking-wide">
              Visual Content Creator • Graphic Designer • Video Editor
            </p>
          </div>

          {/* Social Row & Back to Top */}
          <div className="flex items-center gap-2">
            
            {/* Email Icon */}
            <a
              href="mailto:shubhamshukla327@gmail.com"
              className="w-9 h-9 border-2 border-black bg-white flex items-center justify-center text-black active:translate-x-0.5 active:translate-y-0.5 shadow-[1.5px_1.5px_0px_#000] active:shadow-none transition-all rounded-sm cursor-pointer"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 shrink-0" />
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/shubham-shukla-bb9760429/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border-2 border-black bg-white flex items-center justify-center text-black active:translate-x-0.5 active:translate-y-0.5 shadow-[1.5px_1.5px_0px_#000] active:shadow-none transition-all rounded-sm cursor-pointer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4 shrink-0" />
            </a>

            {/* GitHub Icon */}
            <a
              href="https://github.com/shubham-shukla"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border-2 border-black bg-white flex items-center justify-center text-black active:translate-x-0.5 active:translate-y-0.5 shadow-[1.5px_1.5px_0px_#000] active:shadow-none transition-all rounded-sm cursor-pointer"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4 shrink-0" />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all rounded-xl cursor-pointer shadow-lg"
              title="Back to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 shrink-0" />
            </button>
            
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left w-full">
          <p className="text-xs text-slate-400 font-sans font-normal">
            © {currentYear} Shubham Shukla. All rights reserved.
          </p>
          <p className="font-sans text-xs text-[#FFA5A5] font-semibold tracking-wider uppercase">
            VISUAL CONTENT CREATOR & GRAPHIC DESIGNER
          </p>
        </div>

      </div>
    </footer>
  );
}
