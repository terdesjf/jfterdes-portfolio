# JF Terdes — Portfolio

A modern, animated personal portfolio built with **Next.js 15**, **TypeScript**,
**Tailwind CSS**, and **Framer Motion**. Features a dark/light toggle and a
live accent-color picker (preferences persist via `localStorage`).

## Quick start

```bash
npm install      # install dependencies (already done)
npm run dev      # start the dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## ✏️ How to put YOUR content in

**Almost everything lives in one file:** [`data/portfolio.ts`](data/portfolio.ts).

Open it and edit:

| What | Where in `data/portfolio.ts` |
| --- | --- |
| Name, roles, tagline, email, socials | `profile` |
| Bio paragraphs + stats strip | `about` |
| Projects (title, description, tags, links) | `projects` |
| Skills, grouped by category | `skills` |
| Work history / timeline | `experience` |
| Nav links | `nav` |

That's it — the whole site re-renders from those values.

### Add your résumé as a download
1. Drop your PDF into the `public/` folder, e.g. `public/resume.pdf`.
2. Set `profile.resumeUrl = "/resume.pdf"` in `data/portfolio.ts`.
   A "Download résumé" button appears automatically in the hero.

### Add a profile photo
Replace the avatar placeholder in
[`components/sections/about.tsx`](components/sections/about.tsx) (the block with
the big initials) with a Next.js `<Image>` pointing at a file in `public/`.

## 🎨 Theming
- Toggle **dark / light** and pick an **accent color** from the navbar controls.
- Accent options live in [`components/theme-provider.tsx`](components/theme-provider.tsx)
  (`ACCENTS` array) — add or change colors there.
- Theme tokens (background, surface, text, borders) are CSS variables in
  [`app/globals.css`](app/globals.css).

## 📦 Deploy
The easiest path is [Vercel](https://vercel.com): push this folder to a Git repo,
import it, and it deploys automatically. `npm run build` also produces a standard
Next.js output you can host anywhere that runs Node.

## Project structure
```
app/                 # Next.js App Router (layout, page, global styles)
components/           # Navbar, footer, theme controls, reusable bits
  sections/          # Hero, About, Projects, Skills, Experience, Contact
data/portfolio.ts    # ← YOUR CONTENT lives here
```
