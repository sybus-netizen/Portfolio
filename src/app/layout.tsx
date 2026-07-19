import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetroBackground from "@/components/RetroBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GameProvider } from "@/context/GameContext";
import PixelCursor from "@/components/ui/PixelCursor";
import RetroTitleScreen from "@/components/ui/RetroTitleScreen";
import GameCompanion from "@/components/ui/GameCompanion";

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-retro",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubham Shukla | Creative Designer & Video Editor Portfolio",
  description: "Explore the playful retro pixel-art portfolio of Shubham Shukla, specializing in visual storytelling, branding, motion graphics, and high-end video editing.",
  keywords: [
    "Graphic Designer",
    "Video Editor",
    "Creative Director",
    "Motion Graphics",
    "Branding",
    "Adobe Photoshop",
    "Adobe Premiere",
    "After Effects",
    "Shubham Shukla",
    "Portfolio"
  ],
  authors: [{ name: "Shubham Shukla" }],
  openGraph: {
    title: "Shubham Shukla | Playful Pixel-Art Portfolio",
    description: "Creative pixel-art themed design & video editing portfolio.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Shukla | Retro Portfolio",
    description: "Graphic Design & Video Editing creative playground.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${pressStart2P.variable} h-full antialiased`}
    >
      <body className="bg-[#FAF6EE] text-[#1A1A1A] min-h-full flex flex-col font-sans selection:bg-[#FFDE47] selection:text-[#000000] relative">
        <GameProvider>
          {/* Custom Pixelated Cursor */}
          <PixelCursor />

          {/* Retro start screen overlay */}
          <RetroTitleScreen />

          {/* Global Mascot Companion */}
          <GameCompanion />

          {/* Global Retro Background layer */}
          <RetroBackground />
          
          {/* Scroll progress vertical left indicator */}
          <ScrollProgress />
          
          {/* Navigation bar */}
          <Navbar />
          
          {/* Content Area */}
          <main className="flex-grow flex flex-col relative z-10 w-full">{children}</main>
          
          {/* Footer */}
          <Footer />
        </GameProvider>
      </body>
    </html>
  );
}
