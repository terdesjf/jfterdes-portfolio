import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {profile.name} · Built with Next.js &amp; Tailwind CSS
        </p>
        <p className="font-mono text-xs">
          Designed &amp; coded with ☕ and AI
        </p>
      </div>
    </footer>
  );
}
