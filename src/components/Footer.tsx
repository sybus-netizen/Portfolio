"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/CustomIcons";

import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <footer
      style={{
        backgroundColor: theme === "light" ? "#FFFFFF" : "#0E0C22",
        color: theme === "light" ? "#0F172A" : "#FFFFFF",
        borderColor: theme === "light" ? "rgba(15, 23, 42, 0.12)" : "rgba(255, 255, 255, 0.1)"
      }}
      className="py-6 sm:py-8 border-t backdrop-blur-md relative z-10 overflow-hidden mt-auto select-none"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-5">
        
        {/* Brand Signature & Subtitle */}
        <div className="text-center space-y-1">
          <Link 
            href="/" 
            style={{ color: theme === "light" ? "#0F172A" : "#FFFFFF" }}
            className="font-retro text-sm sm:text-base font-extrabold tracking-tight inline-flex items-center gap-0.5"
          >
            SHUBHAM _
          </Link>
          <p 
            style={{ color: theme === "light" ? "#475569" : "#94A3B8" }}
            className="text-xs font-sans font-medium tracking-wide px-4 max-w-sm sm:max-w-md mx-auto leading-relaxed"
          >
            Visual Content Creator • Graphic Designer • Video Editor
          </p>
        </div>

        {/* Social Buttons & Scroll to Top */}
        <div className="flex items-center justify-center gap-2.5">
          
          {/* Email Icon */}
          <a
            href="mailto:shubhamshukla327@gmail.com"
            style={{
              backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.1)",
              color: theme === "light" ? "#0F172A" : "#FFFFFF",
              borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.2)"
            }}
            className="w-9 h-9 border flex items-center justify-center transition-all rounded-xl cursor-pointer shadow-sm hover:scale-105"
            aria-label="Email"
          >
            <Mail className="w-4 h-4 shrink-0" />
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/shubham-shukla-bb9760429/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.1)",
              color: theme === "light" ? "#0F172A" : "#FFFFFF",
              borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.2)"
            }}
            className="w-9 h-9 border flex items-center justify-center transition-all rounded-xl cursor-pointer shadow-sm hover:scale-105"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4 shrink-0" />
          </a>

          {/* GitHub Icon */}
          <a
            href="https://github.com/shubham-shukla"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.1)",
              color: theme === "light" ? "#0F172A" : "#FFFFFF",
              borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.2)"
            }}
            className="w-9 h-9 border flex items-center justify-center transition-all rounded-xl cursor-pointer shadow-sm hover:scale-105"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4 shrink-0" />
          </a>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            style={{
              backgroundColor: theme === "light" ? "#F1F5F9" : "rgba(255, 255, 255, 0.1)",
              color: theme === "light" ? "#0F172A" : "#FFFFFF",
              borderColor: theme === "light" ? "#CBD5E1" : "rgba(255, 255, 255, 0.2)"
            }}
            className="w-9 h-9 border flex items-center justify-center transition-all rounded-xl cursor-pointer shadow-sm hover:scale-105"
            title="Back to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 shrink-0" />
          </button>
          
        </div>

        {/* Divider Line */}
        <div 
          style={{ borderColor: theme === "light" ? "#E2E8F0" : "rgba(255, 255, 255, 0.1)" }}
          className="w-full max-w-sm border-t pt-4"
        >
          <p 
            style={{ color: theme === "light" ? "#64748B" : "#94A3B8" }}
            className="text-xs font-sans font-medium"
          >
            © {currentYear} Shubham Shukla. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
