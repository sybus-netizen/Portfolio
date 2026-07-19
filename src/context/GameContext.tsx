"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "@/lib/utils";

export interface GameNotification {
  id: string;
  type: "quest" | "achievement";
  title: string;
  description: string;
  icon: string;
}

interface GameContextType {
  unlockedQuests: string[];
  unlockedAchievements: string[];
  notifications: GameNotification[];
  isTitleActive: boolean;
  soundOn: boolean;
  deactivateTitle: () => void;
  toggleSound: () => void;
  playClick: () => void;
  playStart: () => void;
  playAchievement: () => void;
  unlockQuest: (id: string, label: string) => void;
  unlockAchievement: (id: string, title: string, icon: string) => void;
  removeNotification: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [unlockedQuests, setUnlockedQuests] = useState<string[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<GameNotification[]>([]);
  const [isTitleActive, setIsTitleActive] = useState(true);
  const [soundOn, setSoundOn] = useState(true);

  // Audio References
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const startAudioRef = useRef<HTMLAudioElement | null>(null);
  const achievementAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and preload sounds after first interaction
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sound-pref");
      if (saved !== null) {
        setSoundOn(saved === "true");
      }
    }

    const initAudio = () => {
      if (!clickAudioRef.current) {
        clickAudioRef.current = new Audio(getAssetPath("/sounds/click.mp3"));
        clickAudioRef.current.volume = 0.2;
        clickAudioRef.current.preload = "auto";
      }
      if (!startAudioRef.current) {
        startAudioRef.current = new Audio(getAssetPath("/sounds/start.mp3"));
        startAudioRef.current.volume = 0.2;
        startAudioRef.current.preload = "auto";
      }
      if (!achievementAudioRef.current) {
        achievementAudioRef.current = new Audio(getAssetPath("/sounds/achievement.mp3"));
        achievementAudioRef.current.volume = 0.2;
        achievementAudioRef.current.preload = "auto";
      }
      
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };

    window.addEventListener("click", initAudio);
    window.addEventListener("keydown", initAudio);

    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
  }, []);

  const playClick = () => {
    if (!soundOn || !clickAudioRef.current) return;
    clickAudioRef.current.currentTime = 0;
    clickAudioRef.current.play().catch(() => {});
  };

  const playStart = () => {
    if (!soundOn || !startAudioRef.current) return;
    startAudioRef.current.currentTime = 0;
    startAudioRef.current.play().catch(() => {});
  };

  const playAchievement = () => {
    if (!soundOn || !achievementAudioRef.current) return;
    achievementAudioRef.current.currentTime = 0;
    achievementAudioRef.current.play().catch(() => {});
  };

  const toggleSound = () => {
    setSoundOn((prev) => {
      const next = !prev;
      localStorage.setItem("sound-pref", String(next));
      return next;
    });
  };

  const deactivateTitle = () => {
    setIsTitleActive(false);
  };

  // Soundless visual wave alert trigger
  const triggerNotification = (type: "quest" | "achievement", title: string, description: string, icon: string) => {
    // Play achievement audio
    playAchievement();

    const id = Math.random().toString(36).substr(2, 9);
    const newNotif: GameNotification = { id, type, title, description, icon };
    
    setNotifications((prev) => [...prev, newNotif]);

    // Automatically remove after 3.2 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 3200);
  };

  const unlockQuest = (id: string, label: string) => {
    if (unlockedQuests.includes(id)) return;
    
    setUnlockedQuests((prev) => [...prev, id]);
    triggerNotification(
      "quest",
      "Quest Unlocked!",
      `✓ ${label} Section Explored`,
      "⚔"
    );
  };

  const unlockAchievement = (id: string, title: string, icon: string) => {
    if (unlockedAchievements.includes(id)) return;

    setUnlockedAchievements((prev) => [...prev, id]);
    triggerNotification(
      "achievement",
      "Achievement Get!",
      `🏆 ${title}`,
      icon
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Listen for first click anywhere to unlock the First Click achievement
  useEffect(() => {
    const handleFirstClick = () => {
      unlockAchievement("first-click", "First Click!", "🖱");
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, [unlockedAchievements]);

  return (
    <GameContext.Provider
      value={{
        unlockedQuests,
        unlockedAchievements,
        notifications,
        isTitleActive,
        soundOn,
        deactivateTitle,
        toggleSound,
        playClick,
        playStart,
        playAchievement,
        unlockQuest,
        unlockAchievement,
        removeNotification,
      }}
    >
      {children}

      {/* Floating HUD Toast Alert Overlay */}
      <div 
        className="fixed top-20 sm:top-24 right-6 z-[9999] flex flex-col gap-3 pointer-events-none select-none max-w-xs w-full items-end"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="pointer-events-auto w-full max-w-[260px] bg-[#FFFFFF] border-3 border-black p-3.5 shadow-[4px_4px_0px_#000] rounded-sm flex items-start gap-3 text-left"
            >
              <div className="w-8 h-8 shrink-0 rounded-sm border-2 border-black bg-[#FFDE47] flex items-center justify-center text-sm shadow-[1.5px_1.5px_0px_#000] select-none font-retro">
                {notif.icon}
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="font-retro text-[8px] uppercase font-bold text-[#FF5964]">
                  {notif.title}
                </div>
                <div className="font-sans text-[10px] text-black font-medium leading-tight truncate">
                  {notif.description}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GameContext.Provider>
  );
}

export function useGameSystem() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameSystem must be used within a GameProvider");
  }
  return context;
}
