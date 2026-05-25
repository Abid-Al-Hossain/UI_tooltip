"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { AnimationType, Direction, Speed } from "./types";
import { Theme3DId, THEMES_3D } from "./themes3d";
type TransitionContextValue = {
  animation: AnimationType;
  setAnimation: (t: AnimationType) => void;
  speed: Speed;
  setSpeed: (s: Speed) => void;
  direction: Direction;
  mode3d: Theme3DId;
  setMode3d: (m: Theme3DId) => void;
  settings3d: {
    perspective: number;
    tiltMax: number;
    shadowDepth: number;
  };
  updateSettings3d: (
    k: keyof TransitionContextValue["settings3d"],
    v: number,
  ) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

const STORAGE_KEY = "ui-foundry-motion";

// Helper to flatten list for index comparison (matches Sidebar order)
const ORDERED_COMPONENTS: string[] = [];

const getDepth = (path: string) => {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return 0; // Home
  if (parts.length === 1 && parts[0] === "components") return 1; // Registry Index
  if (parts.length === 2 && parts[0] === "components") return 2; // Specific Component
  if (parts.length >= 3) return 3; // Playground / Edit
  return 1;
};

const getComponentSlug = (path: string) => {
  const parts = path.split("/").filter(Boolean);
  if (parts.length >= 2 && parts[0] === "components") return parts[1];
  return null;
};

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [animation, setAnimation] = useState<AnimationType>("fade");
  const [speed, setSpeed] = useState<Speed>("normal");
  const [mode3d, setMode3d] = useState<Theme3DId>("standard");

  // 3D Customization State
  const [settings3d, setSettings3d] = useState({
    perspective: 1200,
    tiltMax: 5,
    shadowDepth: 20,
  });

  // --- Smart Direction Logic (Sync) ---
  // We use a ref to track the previous path so we can compare synchronously during render
  const prevPathRef = React.useRef(pathname);

  // Calculate direction immediately
  const direction = useMemo(() => {
    const prevPath = prevPathRef.current;
    if (pathname === prevPath) return "left" as Direction; // Default or no change

    const prevDepth = getDepth(prevPath);
    const currDepth = getDepth(pathname);

    // 1. Depth Check (Inner / Outer)
    if (currDepth > prevDepth) return "left"; // Drill down
    if (currDepth < prevDepth) return "right"; // Drill up

    // 2. Sibling Check (Same Depth)
    const prevSlug = getComponentSlug(prevPath);
    const currSlug = getComponentSlug(pathname);

    if (prevSlug && currSlug) {
      const prevIndex = ORDERED_COMPONENTS.indexOf(prevSlug);
      const currIndex = ORDERED_COMPONENTS.indexOf(currSlug);

      if (prevIndex !== -1 && currIndex !== -1) {
        if (currIndex > prevIndex) return "down"; // Next Item
        return "up"; // Prev Item
      }
    }
    return "left"; // Fallback
  }, [pathname]);

  // Update history after render
  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  // Load Preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.animation) setAnimation(parsed.animation);
        if (parsed.speed) setSpeed(parsed.speed);
        if (parsed.mode3d) setMode3d(parsed.mode3d);
        if (parsed.settings3d) setSettings3d(parsed.settings3d);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist Preferences
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ animation, speed, mode3d, settings3d }),
    );
  }, [animation, speed, mode3d, settings3d]);

  // Apply 3D CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    const themeDef = THEMES_3D[mode3d];

    if (mode3d === "standard") {
      root.style.removeProperty("--ui-perspective");
      root.style.removeProperty("--ui-tilt-max");
      root.style.removeProperty("--ui-shadow-depth");
      root.style.removeProperty("--ui-card-border");
      // Don't modify body transform-style globally to avoid breaking other stacking
    } else {
      root.style.setProperty("--ui-perspective", `${settings3d.perspective}px`);
      root.style.setProperty("--ui-tilt-max", `${settings3d.tiltMax}deg`);
      root.style.setProperty(
        "--ui-shadow-depth",
        `${settings3d.shadowDepth}px`,
      );
      root.style.setProperty("--ui-card-border", themeDef.vars.cardBorder);
    }
  }, [mode3d, settings3d]);

  const updateSettings3d = useCallback(
    (k: keyof typeof settings3d, v: number) => {
      setSettings3d((prev) => ({ ...prev, [k]: v }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      animation,
      setAnimation,
      speed,
      setSpeed,
      direction,
      mode3d,
      setMode3d,
      settings3d,
      updateSettings3d,
    }),
    [animation, speed, direction, mode3d, settings3d, updateSettings3d],
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used inside TransitionProvider");
  return ctx;
}
