import { skills } from "@/data/portfolio";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24">
      {/* Subtle background separation */}
      <div className="absolute inset-0 bg-surface/40" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="03 — Toolkit"
          title="Skills & technologies"
          description="The stack I reach for to design, build, and ship reliable AI-powered systems."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition hover:border-accent">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-surface-2 text-xl">
                    {group.icon}
                  </span>
                  <h3 className="font-semibold tracking-tight">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
