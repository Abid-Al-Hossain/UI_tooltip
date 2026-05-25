"use client";

import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ThemeId } from "./themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  customTheme: ThemeVars;
  setCustomTheme: (t: ThemeVars) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "ui-foundry-theme";
const CUSTOM_STORAGE_KEY = "ui-foundry-custom-theme";
const DEFAULT_THEME: ThemeId = "navy";

export type ThemeVars = {
  bg: string;
  surface: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  primaryHover: string;
  ring: string;
};

const DEFAULT_CUSTOM_THEME: ThemeVars = {
  bg: "#070b16",
  surface: "#0c142b",
  card: "#0f1a36",
  text: "#eaf0ff",
  muted: "#a9b7e6",
  border: "rgba(255, 255, 255, 0.12)",
  primary: "#4f7cff",
  primaryHover: "#3f6fff",
  ring: "rgba(79, 124, 255, 0.35)",
};

type ThemeSnapshot = {
  theme: ThemeId;
  customTheme: ThemeVars;
};

const themeListeners = new Set<() => void>();

let cachedSnapshot: ThemeSnapshot = {
  theme: DEFAULT_THEME,
  customTheme: DEFAULT_CUSTOM_THEME,
};
let cachedTheme: ThemeId = DEFAULT_THEME;
let cachedCustom: ThemeVars = DEFAULT_CUSTOM_THEME;

const sameCustomTheme = (a: ThemeVars, b: ThemeVars) =>
  a.bg === b.bg &&
  a.surface === b.surface &&
  a.card === b.card &&
  a.text === b.text &&
  a.muted === b.muted &&
  a.border === b.border &&
  a.primary === b.primary &&
  a.primaryHover === b.primaryHover &&
  a.ring === b.ring;

const getStoredSnapshot = (): ThemeSnapshot => {
  if (typeof window === "undefined") {
    return cachedSnapshot;
  }
  let theme: ThemeId = DEFAULT_THEME;
  let customTheme: ThemeVars = DEFAULT_CUSTOM_THEME;
  try {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeId | null) ?? DEFAULT_THEME;
    theme = saved;
    const savedCustom = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (savedCustom) {
      customTheme = JSON.parse(savedCustom) as ThemeVars;
    }
  } catch {
    // ignore
  }
  if (theme === cachedTheme && sameCustomTheme(customTheme, cachedCustom)) {
    return cachedSnapshot;
  }
  cachedTheme = theme;
  cachedCustom = customTheme;
  cachedSnapshot = { theme, customTheme };
  return cachedSnapshot;
};

const getServerSnapshot = (): ThemeSnapshot => cachedSnapshot;

const subscribe = (callback: () => void) => {
  themeListeners.add(callback);
  if (typeof window !== "undefined") {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === CUSTOM_STORAGE_KEY) {
        callback();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      themeListeners.delete(callback);
      window.removeEventListener("storage", onStorage);
    };
  }
  return () => {
    themeListeners.delete(callback);
  };
};

const emitThemeChange = () => {
  themeListeners.forEach((listener) => listener());
};

function applyThemeVars(vars?: ThemeVars) {
  const root = document.documentElement;
  const keys: (keyof ThemeVars)[] = [
    "bg",
    "surface",
    "card",
    "text",
    "muted",
    "border",
    "primary",
    "primaryHover",
    "ring",
  ];
  keys.forEach((key) => {
    const cssKey = `--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;
    if (vars) root.style.setProperty(cssKey, vars[key]);
    else root.style.removeProperty(cssKey);
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, customTheme } = useSyncExternalStore(subscribe, getStoredSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "custom") {
      applyThemeVars(customTheme);
    } else {
      applyThemeVars();
    }
  }, [theme, customTheme]);

  const setTheme = (t: ThemeId) => {
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
    emitThemeChange();
  };

  const setCustomTheme = (t: ThemeVars) => {
    try {
      localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(t));
    } catch {
      // ignore
    }
    emitThemeChange();
  };

  const value = useMemo(
    () => ({ theme, setTheme, customTheme, setCustomTheme }),
    [theme, customTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
