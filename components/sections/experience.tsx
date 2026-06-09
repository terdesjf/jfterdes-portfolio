import { experience } from "@/data/portfolio";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        eyebrow="04 — Journey"
        title="Experience & education"
        description="Where I've worked, what I've shipped, and where I studied."
      />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-[9px]" />

        <div className="space-y-10">
          {experience.map((item, i) => (
            <Reveal key={`${item.company}-${i}`} delay={i * 0.05}>
              <div className="relative pl-8 md:pl-12">
                {/* Dot */}
                <span className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-accent bg-bg md:h-5 md:w-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.role}{" "}
                    <span className="text-accent">@ {item.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {item.period}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted">{item.description}</p>

                <ul className="mt-3 space-y-1.5">
                  {item.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
