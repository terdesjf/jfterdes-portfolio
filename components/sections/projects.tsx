"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/data/portfolio";
import { SectionHeading } from "../section-heading";

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        eyebrow="02 — Work"
        title="Things I've built"
        description="Production AI systems and full-stack applications I've designed and shipped — from multi-source scraping fleets to multi-tenant SaaS."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent ${
        project.featured ? "sm:col-span-1" : ""
      }`}
    >
      {/* Hover glow */}
      <div className="glow pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface-2 text-2xl">
          {project.icon ?? "✦"}
        </span>
        {project.featured && (
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
            Featured
          </span>
        )}
      </div>

      <h3 className="relative mt-5 text-lg font-semibold tracking-tight transition group-hover:text-accent">
        {project.title}
      </h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.repoUrl) && (
        <div className="relative mt-5 flex items-center gap-4 border-t border-border pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition hover:text-accent"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6M10 14L21 3" />
              </svg>
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition hover:text-accent"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
              </svg>
              Code
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}
