"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type Mode = "dark" | "light";

export type Accent = {
  id: string;
  name: string;
  // "r g b" triplets used to drive the CSS variables
  rgb: string;
};

export const ACCENTS: Accent[] = [
  { id: "emerald", name: "Emerald", rgb: "16 185 129" },
  { id: "violet", name: "Violet", rgb: "139 92 246" },
  { id: "blue", name: "Blue", rgb: "59 130 246" },
  { id: "amber", name: "Amber", rgb: "245 158 11" },
  { id: "rose", name: "Rose", rgb: "244 63 94" },
  { id: "cyan", name: "Cyan", rgb: "6 182 212" },
];

type ThemeContextValue = {
  mode: Mode;
  accent: Accent;
  toggleMode: () => void;
  setAccent: (a: Accent) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "jft-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("dark");
  const [accent, setAccentState] = useState<Accent>(ACCENTS[0]);

  // Load saved preferences once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { mode?: Mode; accentId?: string };
        if (parsed.mode === "dark" || parsed.mode === "light") {
          setMode(parsed.mode);
        }
        const found = ACCENTS.find((a) => a.id === parsed.accentId);
        if (found) setAccentState(found);
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        setMode("light");
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Reflect mode + accent onto <html> and persist.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.style.setProperty("--accent", accent.rgb);
    root.style.setProperty("--accent-soft", accent.rgb);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ mode, accentId: accent.id })
      );
    } catch {
      /* ignore */
    }
  }, [mode, accent]);

  const toggleMode = useCallback(
    () => setMode((m) => (m === "dark" ? "light" : "dark")),
    []
  );

  const setAccent = useCallback((a: Accent) => setAccentState(a), []);

  return (
    <ThemeContext.Provider value={{ mode, accent, toggleMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
