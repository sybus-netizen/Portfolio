import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetroBackground from "@/components/RetroBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GameProvider } from "@/context/GameContext";
import RetroTitleScreen from "@/components/ui/RetroTitleScreen";

const montserrat = Montserrat({
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubham Shukla | Visual Content Creator, Graphic Designer & Video Editor",
  description: "Official portfolio of Shubham Shukla, specializing in brand identity design, motion graphics, promotional creatives, and video production.",
  keywords: [
    "Graphic Designer",
    "Video Editor",
    "Content Creator",
    "Motion Artist",
    "Branding",
    "Adobe Photoshop",
    "Adobe Premiere Pro",
    "After Effects",
    "Shubham Shukla",
    "Portfolio"
  ],
  authors: [{ name: "Shubham Shukla" }],
  openGraph: {
    title: "Shubham Shukla | Visual Content Creator Portfolio",
    description: "Graphic design, motion graphics, and video production showcase.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Shukla | Creative Portfolio",
    description: "Graphic Design & Video Production showcase.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${montserrat.variable} ${poppins.variable} font-sans bg-background text-foreground antialiased selection:bg-[#C084FC] selection:text-[#131130] overflow-x-hidden`}
      >
        <GameProvider>
          {/* Scroll Progress Indicator */}
          <ScrollProgress />
          
          {/* Title Screen Overlay */}
          <RetroTitleScreen />

          {/* Animated Background Mesh */}
          <RetroBackground />
          
          <div className="relative min-h-screen flex flex-col z-10">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
