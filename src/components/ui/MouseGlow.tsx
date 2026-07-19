"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState } from "react";

export function MouseGlow() {
  const { x, y } = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(360px at ${x}px ${y}px, rgba(139, 92, 246, 0.03), transparent 80%)`,
      }}
    />
  );
}
