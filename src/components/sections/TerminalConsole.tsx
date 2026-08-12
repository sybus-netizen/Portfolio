"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";
import { useGameSystem } from "@/context/GameContext";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success";
}

export default function TerminalConsole() {
  const { playClick, unlockAchievement } = useGameSystem();
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "PORTFOLIO OS [Version 1.4.2]", type: "output" },
    { text: "(c) Shubham Shukla. All rights reserved.", type: "output" },
    { text: "Type 'help' to view available commands.", type: "success" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    playClick();
    
    // Add typed command to history
    const newHistory = [...history, { text: `C:\\SHUBHAM_OS> ${inputVal}`, type: "input" as const }];

    // Parse commands
    switch (command) {
      case "help":
        newHistory.push({
          text: "Available commands:\n  help      - Show this list\n  about     - Brief background info\n  projects  - List active portfolio cartridges\n  secret    - Unlock a hidden achievement\n  clear     - Clear screen console history",
          type: "output",
        });
        break;
      case "about":
        newHistory.push({
          text: "Shubham Shukla - Creative Visual Content Creator\nSpecializing in Graphic Design, social media promos, vector illustrations, and cinematic video editing.",
          type: "output",
        });
        break;
      case "projects":
        newHistory.push({
          text: "Active cartridges found:\n  - siva-academy-posters (Social & Marketing Posters)\n  - vanguard-film (Siva Academy Video Edits)\n  - illustrations (Vector Art illustrations)",
          type: "output",
        });
        break;
      case "secret":
        unlockAchievement("hacker-mode", "Hacked the System!", "⌨️");
        newHistory.push({
          text: "🔓 CONGRATULATIONS! HIDDEN ACHIEVEMENT UNLOCKED: 'SECRET HACKER' ⌨️",
          type: "success",
        });
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        newHistory.push({
          text: `Error: Unknown command '${command}'. Type 'help' for options.`,
          type: "error",
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <section className="py-12 bg-[#FAF6EE] relative px-6 select-none">
      <div className="max-w-4xl mx-auto">
        <div className="retro-card border-4 border-black bg-[#111111] shadow-[6px_6px_0px_#000] rounded-sm overflow-hidden text-left">
          
          {/* Terminal Window Header Bar */}
          <div className="bg-black text-white p-3 flex justify-between items-center border-b-3 border-black text-[9px] font-retro uppercase select-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#3BCEAC]" />
              <span>Portfolio Command Console</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#FF5964] border border-black rounded-full" />
              <span className="w-2.5 h-2.5 bg-[#FFDE47] border border-black rounded-full" />
              <span className="w-2.5 h-2.5 bg-[#3BCEAC] border border-black rounded-full" />
            </div>
          </div>

          {/* Terminal Screen area */}
          <div className="p-5 font-mono text-[10px] sm:text-xs text-[#3BCEAC] h-56 overflow-y-auto space-y-2 relative leading-relaxed scrollbar-thin">
            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/15 to-transparent bg-[length:100%_4px] opacity-25" />
            
            {history.map((line, idx) => (
              <div 
                key={idx} 
                className={
                  line.type === "input"
                    ? "text-white font-bold"
                    : line.type === "error"
                    ? "text-[#FF5964]"
                    : line.type === "success"
                    ? "text-[#FFDE47]"
                    : "text-[#3BCEAC]/95"
                }
                style={{ whiteSpace: "pre-line" }}
              >
                {line.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Command Prompt Input Bar */}
          <form onSubmit={handleCommand} className="border-t-3 border-black bg-black p-3.5 flex items-center gap-2">
            <span className="font-mono text-[10px] sm:text-xs text-[#FFDE47] font-bold select-none">
              C:\SHUBHAM_OS&gt;
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help'..."
              className="flex-grow bg-transparent border-0 outline-none focus:outline-none text-[10px] sm:text-xs text-white font-mono placeholder-[#3BCEAC]/30"
              autoComplete="off"
              spellCheck="false"
            />
          </form>

        </div>
      </div>
    </section>
  );
}
