"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, ACCENTS } from "./theme-provider";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.012 17.5 2 12 2z" />
    </svg>
  );
}

export function ThemeControls() {
  const { mode, accent, toggleMode, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Accent picker */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Choose accent color"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition hover:text-fg hover:border-accent"
        >
          <PaletteIcon />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-surface p-3 shadow-xl">
            <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wider text-muted">
              Accent
            </p>
            <div className="grid grid-cols-3 gap-2">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAccent(a)}
                  aria-label={a.name}
                  title={a.name}
                  className={`grid h-9 w-full place-items-center rounded-lg transition ${
                    accent.id === a.id
                      ? "ring-2 ring-offset-2 ring-offset-surface"
                      : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: `rgb(${a.rgb})`,
                    // @ts-expect-error custom property
                    "--tw-ring-color": `rgb(${a.rgb})`,
                  }}
                >
                  {accent.id === a.id && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dark / light toggle */}
      <button
        onClick={toggleMode}
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition hover:text-accent hover:border-accent"
      >
        {mode === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
