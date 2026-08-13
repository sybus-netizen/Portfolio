import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Contact from "@/components/sections/Contact";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero: fills viewport */}
      <SectionReveal distance={0} exitScale>
        <Hero />
      </SectionReveal>

      {/* What I Create: Unified Services + Tools */}
      <SectionReveal distance={16} exitScale>
        <About />
      </SectionReveal>

      {/* Featured Projects: retro game cartridges */}
      <SectionReveal distance={16} exitScale>
        <FeaturedProjects />
      </SectionReveal>

      {/* Contact: high-score Arcade terminal */}
      <SectionReveal distance={20} exitScale={false}>
        <Contact />
      </SectionReveal>
    </div>
  );
}
