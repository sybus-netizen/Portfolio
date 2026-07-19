import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import TimelineSection from "@/components/sections/TimelineSection";
import Contact from "@/components/sections/Contact";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#FAF6EE]">
      {/* Hero: already fills viewport */}
      <SectionReveal distance={0} exitScale>
        <Hero />
      </SectionReveal>

      {/* About: Spec Quest Log */}
      <SectionReveal distance={16} exitScale>
        <About />
      </SectionReveal>

      {/* Skills: Power Status Heart containers */}
      <SectionReveal distance={16} exitScale>
        <Skills />
      </SectionReveal>

      {/* Featured Projects: retro game cartridges */}
      <SectionReveal distance={16} exitScale>
        <FeaturedProjects />
      </SectionReveal>

      {/* Timeline: level progress path */}
      <SectionReveal distance={16} exitScale>
        <TimelineSection />
      </SectionReveal>

      {/* Contact: high-score Arcade terminal */}
      <SectionReveal distance={20} exitScale={false}>
        <Contact />
      </SectionReveal>
    </div>
  );
}
