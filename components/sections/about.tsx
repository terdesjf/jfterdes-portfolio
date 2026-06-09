import { about, profile } from "@/data/portfolio";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        eyebrow="01 — About"
        title="A bit about me"
      />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* Bio */}
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {about.stats.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface p-4 text-center"
              >
                <div className="text-2xl font-bold text-accent sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Avatar / info card */}
        <Reveal delay={0.15}>
          <div className="relative">
            <div className="glow absolute inset-0 scale-90 rounded-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
              {/* Avatar placeholder — swap for an <Image> when you add a photo */}
              <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-accent/20 to-surface-2">
                <span className="font-mono text-7xl font-bold text-accent/40">
                  {profile.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
              <div className="space-y-3 p-6">
                <InfoRow label="Name" value={profile.name} />
                <InfoRow label="Role" value={profile.roles[0]} />
                <InfoRow label="Company" value={profile.company} />
                <InfoRow label="Location" value={profile.location} />
                <InfoRow label="Email" value={profile.email} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
      <span className="truncate text-sm font-medium text-fg">{value}</span>
    </div>
  );
}
