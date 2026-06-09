# Deploying your portfolio

Your project is fully prepped: git is initialized, the Vercel CLI is installed,
and the build is verified. Going live is **two commands**.

## 🚀 Deploy to Vercel (recommended)

From inside the project folder (`c:\Users\terde\Documents\jfterdes-portfolio`):

```bash
vercel login      # opens your browser — sign in (GitHub/Google/email)
vercel            # deploys a preview URL
```

The first `vercel` run asks a few questions — accept the defaults:

- *Set up and deploy?* → **Y**
- *Which scope?* → your account
- *Link to existing project?* → **N**
- *Project name?* → `jfterdes-portfolio` (or anything)
- *Directory?* → `./`
- *Override settings?* → **N** (it auto-detects Next.js)

When you're happy with the preview, ship it to production:

```bash
vercel --prod
```

You'll get a public URL like `https://jfterdes-portfolio.vercel.app`. You can
add a custom domain later in the Vercel dashboard.

## 🔑 Contact form (Formspree)

For the contact form to actually deliver messages once deployed:

1. Sign up at https://formspree.io and create a form → you get an ID like `abcdwxyz`.
2. Locally, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz`.
3. In Vercel: **Project → Settings → Environment Variables**, add
   `NEXT_PUBLIC_FORMSPREE_ID` = your ID, then redeploy (`vercel --prod`).

Without this, the form still works — it just opens the visitor's email client instead.

## 🔁 Optional: GitHub for auto-deploys

If you'd rather have every `git push` auto-deploy:

```bash
# create a repo on github.com first, then:
git remote add origin https://github.com/<you>/jfterdes-portfolio.git
git push -u origin main
```

Then in the Vercel dashboard: **Add New → Project → Import** your repo. From then
on, pushes to `main` deploy automatically.

## 🧰 Useful commands

```bash
npm run dev      # local dev server (http://localhost:3000)
npm run build    # production build
vercel           # deploy a preview
vercel --prod    # deploy to production
```
