import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.roles[0]}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.roles[0]}`,
    description: profile.tagline,
    type: "website",
  },
};

// Runs before paint to set theme + accent from localStorage — avoids a flash
// of the wrong theme on first load.
const themeInit = `
(function () {
  try {
    var raw = localStorage.getItem('jft-theme');
    var mode = 'dark';
    var accent = '16 185 129';
    var accents = {
      emerald: '16 185 129', violet: '139 92 246', blue: '59 130 246',
      amber: '245 158 11', rose: '244 63 94', cyan: '6 182 212'
    };
    if (raw) {
      var p = JSON.parse(raw);
      if (p.mode === 'light' || p.mode === 'dark') mode = p.mode;
      if (p.accentId && accents[p.accentId]) accent = accents[p.accentId];
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      mode = 'light';
    }
    var el = document.documentElement;
    if (mode === 'dark') el.classList.add('dark');
    el.style.setProperty('--accent', accent);
    el.style.setProperty('--accent-soft', accent);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
