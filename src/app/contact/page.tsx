"use client";

import React from "react";
import Contact from "@/components/sections/Contact";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 bg-[#FAF6EE] relative flex flex-col justify-center select-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full pt-12 text-left">
        <div className="space-y-4 max-w-2xl mb-4">
          <FadeIn direction="up">
            <span className="inline-block px-3 py-1 bg-[#FF5964] border-2 border-black text-white font-retro text-[8px] uppercase shadow-[2px_2px_0px_#000] select-none rounded-sm">CONNECT</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h1 className="font-retro text-2xl sm:text-3.5xl font-bold tracking-tight text-black uppercase leading-none">
              Get In Touch
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-xs sm:text-sm text-[#555555] font-sans">
              Have an idea you want to bring to life, or need advice on visual design or video pacing? Reach out via the channels below.
            </p>
          </FadeIn>
        </div>
      </div>
      
      <Contact />
    </div>
  );
}
