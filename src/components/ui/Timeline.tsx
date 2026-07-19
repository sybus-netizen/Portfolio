"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { GlassCard } from "./GlassCard";

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative ml-4 md:ml-6 space-y-8 sm:space-y-16 py-8">
      
      {/* Animated self-drawing vertical connecting line */}
      <div className="absolute left-[7px] md:left-[9px] top-0 bottom-0 w-[1.5px] bg-white/5">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full w-full bg-gradient-to-b from-[#7C3AED] via-[#A855F7] to-transparent origin-top"
        />
      </div>

      {items.map((item, index) => (
        <div key={item.id} className="relative pl-10 md:pl-12 group">
          
          {/* Larger Timeline Dot with pulsing ping ring */}
          <div className="absolute left-[2px] md:left-[4px] top-3.5 w-[12px] h-[12px] -translate-x-1/2 flex items-center justify-center z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 350, damping: 20, delay: index * 0.15 }}
              className="w-3.5 h-3.5 rounded-full bg-[#7C3AED] border-2 border-[#0A0A0A] shadow-[0_0_12px_rgba(124,58,237,0.9)] relative"
            >
              {/* Outer pulsing ring */}
              <span className="absolute -inset-2.5 rounded-full bg-[#7C3AED]/20 animate-ping pointer-events-none" />
            </motion.div>
          </div>

          {/* Staggered slide-in card container */}
          <GlassCard 
            delay={index * 0.15} 
            className="w-full border border-white/5 bg-[#111111] hover:border-[#7C3AED]/25 p-4 sm:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6 mb-6">
              
              {/* Logo + Role/Company Details */}
              <div className="flex items-center gap-4">
                
                {/* Logo Placeholder */}
                <div className="w-12 h-12 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-center font-display text-base font-bold text-[#A855F7] shrink-0 group-hover:scale-105 group-hover:bg-[#7C3AED]/10 transition-all duration-300">
                  {item.company.charAt(0)}
                </div>
                
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#7C3AED] transition-colors duration-300">
                    {item.role}
                  </h3>
                  <p className="text-white/80 font-medium mt-1 font-sans text-sm">{item.company}</p>
                </div>
              </div>
              
              {/* Badges Column */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-3 text-xs">
                
                {/* Employment Duration Badge */}
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-xs font-mono font-semibold text-[#A855F7] tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.duration}
                </span>

                {/* Location Badge */}
                <span className="flex items-center gap-1 text-[#A1A1AA] font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#A855F7]" />
                  {item.location}
                </span>
              </div>
            </div>

            {/* List Details with icons - maximum 3 bullet points */}
            <ul className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed font-sans font-light">
              {item.description.slice(0, 3).map((desc, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#7C3AED]/65 mt-0.5 shrink-0" />
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      ))}
    </div>
  );
}
