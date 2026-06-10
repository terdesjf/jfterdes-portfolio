"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

type Status = "idle" | "submitting" | "success" | "error";

// Set profile.formspreeId in data/portfolio.ts to enable real form delivery.
// If it's empty, the form gracefully falls back to a mailto: link so it always
// works.
const FORMSPREE_ID = profile.formspreeId;

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Fallback: no Formspree configured → open the visitor's mail client.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(
        `Portfolio inquiry from ${name || "someone"}`
      );
      const body = encodeURIComponent(
        `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        eyebrow="05 — Contact"
        title="Let's build something"
        description="Have a workflow worth automating or an idea you want to bring to life? Send a message and I'll get back to you."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* Direct links */}
        <Reveal>
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:border-accent"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
              </span>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted">Email</div>
                <div className="truncate text-sm font-medium">{profile.email}</div>
              </div>
            </a>

            <div className="flex flex-wrap gap-3">
              {profile.socials.github && (
                <SocialLink href={profile.socials.github} label="GitHub" />
              )}
              {profile.socials.linkedin && (
                <SocialLink href={profile.socials.linkedin} label="LinkedIn" />
              )}
              {profile.socials.website && (
                <SocialLink href={profile.socials.website} label="Website" />
              )}
              {profile.socials.twitter && (
                <SocialLink href={profile.socials.twitter} label="Twitter / X" />
              )}
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-border bg-surface p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  placeholder="Jane Doe"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="jane@company.com"
                />
              </Field>
            </div>
            <Field label="Message">
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="input resize-none"
                placeholder="Tell me about your project or idea..."
              />
            </Field>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send message"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>

              {status === "success" && (
                <span className="text-sm font-medium text-accent">
                  ✓ Thanks! I&apos;ll get back to you soon.
                </span>
              )}
              {status === "error" && (
                <span className="text-sm font-medium text-rose-500">
                  Something went wrong — email me directly instead.
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(var(--border));
          background-color: rgb(var(--surface-2));
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          color: rgb(var(--fg));
          outline: none;
          transition: border-color 0.2s ease;
        }
        :global(.input::placeholder) {
          color: rgb(var(--muted));
        }
        :global(.input:focus) {
          border-color: rgb(var(--accent));
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
    >
      {label}
    </a>
  );
}
