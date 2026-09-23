// ============================================================================
//  PORTFOLIO CONTENT — single source of truth
//  ----------------------------------------------------------------------------
//  Everything the site renders comes from this file. Edit values here and the
//  whole portfolio updates. Populated from Jose Felipe Terdes' résumé + the
//  three flagship Claude Code projects.
// ============================================================================

export const profile = {
  name: "Jose Felipe Terdes",
  // Roles rotate via the typing effect in the hero
  roles: [
    "AI Automation Engineer",
    "AI Specialist",
    "Full-Stack Developer",
    "Systems Builder",
  ],
  tagline:
    "I design and ship production AI systems — agents, automations, and full-stack apps that turn messy, manual work into reliable, self-running pipelines. From multi-source scrapers to multi-tenant SaaS, I take projects from discovery to launch.",
  location: "Cebu City, Philippines",
  company: "Optinet Solutions",
  email: "terdesjosefelipe@gmail.com",
  phone: "0977 369 3095",
  // Drop your résumé PDF into /public (e.g. public/jose-terdes-resume.pdf) and
  // set this to "/jose-terdes-resume.pdf" to show a download button in the hero.
  resumeUrl: "/jose-terdes-resume.pdf",
  // Makes the contact form actually deliver messages to your inbox.
  // 1. Create a free form at https://formspree.io
  // 2. It gives an endpoint like https://formspree.io/f/abcdwxyz
  // 3. Paste ONLY the id part (e.g. "abcdwxyz") between the quotes below.
  // Leave blank to fall back to opening the visitor's email client (mailto).
  formspreeId: "",
  socials: {
    github: "https://github.com/joseterdes",
    linkedin: "https://www.linkedin.com/in/jose-felipe-terdes/",
    twitter: "",
    website: "",
  },
};

export const about = {
  paragraphs: [
    "I'm an AI Automation Engineer at Optinet Solutions, where I lead client-facing AI projects end-to-end — owning architecture, implementation, and delivery for clients in Europe and beyond. I specialize in turning fuzzy business problems into production-grade systems built on OpenAI and Anthropic Claude.",
    "My background is full-stack: a BS in Computer Science from Cebu Institute of Technology, plus production experience across blockchain certification systems, payment platforms, and SaaS. I've shipped with Next.js, Spring Boot, .NET, and Python, and I care as much about reliability and clean architecture as I do about shipping fast.",
    "Lately I've been building extensively with AI — multi-source scraping fleets on AWS, automated QA pipelines over thousands of conversations, a multi-tenant healthcare SaaS, a voice-first relationship CRM, and a suite of multi-brand SEO dashboards with built-in AI assistants. I like systems that quietly do their job every day, not demos that break in production.",
  ],
  stats: [
    { value: "8+", label: "Platforms scraped" },
    { value: "26k+", label: "Conversations AI-analyzed" },
    { value: "9", label: "Production systems shipped" },
    { value: "2024", label: "BS Computer Science" },
  ],
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  // Your role on the project — rendered as a highlighted line on the card.
  role?: string;
  liveUrl?: string;
  repoUrl?: string;
  icon?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "AI Lead-Generation Platform",
    description:
      "A production lead-gen system that discovers and enriches affiliate marketers across 8+ sources (Google, Bing, YouTube, Kick, X, TikTok, Snapchat, Telegram, Facebook). Built 3-phase scraping engines on a multi-VM AWS fleet with Selenium/GoLogin, proxy rotation, automated captcha solving, and nightly Monday.com CRM sync — processing ~8.8k enrichment jobs per week.",
    tags: ["Python", "Selenium", "GoLogin", "Next.js", "Supabase", "AWS EC2", "Monday.com"],
    role: "Project Lead — drove client discovery, proposals, and end-to-end delivery",
    icon: "🛰️",
    liveUrl: "https://google-lead-gen.vercel.app/",
    repoUrl: "https://github.com/Optinet-Solutions-AI/Google-Lead-Gen",
    featured: true,
  },
  {
    title: "AI Chat QA Tool",
    description:
      "A Next.js platform that pulls Intercom conversations and runs automated quality analysis via OpenAI's Batch API — analyzing 26k+ conversations. Features role-gated dashboards, a 7-pattern escalation matrix routing issues to Asana, bidirectional status sync, hourly cron jobs, daily email digests, and a Telegram bot posting escalation snapshots.",
    tags: ["Next.js", "TypeScript", "OpenAI Batch API", "Supabase", "Intercom", "Asana", "Telegram"],
    role: "Project Lead — ran discovery & demos with the client, proposed scope, and owned delivery",
    icon: "💬",
    liveUrl: "https://ai-chat-qa-tool.vercel.app",
    repoUrl: "https://github.com/Optinet-Solutions-AI/ai-chat-qa-tool",
    featured: true,
  },
  {
    title: "NoShowGuard",
    description:
      "A multi-tenant SaaS that cuts clinic no-shows with automated Twilio reminders, Anthropic Claude-powered risk scoring, auto no-show sweeps, and smart waitlist auto-fill. Built on Next.js + Prisma with tenant isolation at every layer, HMAC-signed one-tap action links, TCPA-compliant consent tracking, an OTP patient portal, and a distributed cron worker.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Twilio", "Anthropic Claude", "NextAuth", "Multi-tenant"],
    role: "Project Lead — client-facing throughout: discovery, proposals, and full delivery",
    icon: "🏥",
    liveUrl: "https://noshowguard-ai.vercel.app/",
    repoUrl: "https://github.com/jose-innovationhub/noshowguard",
    featured: true,
  },
  {
    title: "Networky.ai — Relationship Intelligence CRM",
    description:
      "A voice-first personal CRM: speak one sentence and AI fills in the contact, then generates relationship profiles, meeting briefings, follow-up drafts, suggested introductions, and gift ideas. Syncs contacts and calendars from Google, Outlook, Salesforce, and HubSpot over OAuth with encrypted tokens and a daily cron, plus LinkedIn/vCard import, multi-user workspaces with invite links, and Supabase-backed file storage.",
    tags: ["Next.js", "TypeScript", "Prisma", "Supabase", "OpenAI", "OAuth", "Vercel Cron"],
    role: "Lead Developer — top contributor on a 3-person team, from spec to production",
    icon: "🤝",
    repoUrl: "https://github.com/optinet-solutions-sandbx/Personal-Network-Information-System",
    featured: true,
  },
  {
    title: "Multi-Brand SEO & QA Dashboard Platform",
    description:
      "A family of client dashboards that replaced spreadsheet-driven SEO reporting for three iGaming affiliate clients (7 brands, 25+ domains). Each tracks SEO, site health, PageSpeed, backlinks, QA, and Google rankings, with weekly ranking sync from a vendor API via Vercel Cron, an OpenAI-powered \"Ask AI\" assistant with streamed answers, role-based access enforced by Postgres RLS, portal SSO, audit logs, and Excel importers that migrated 18+ months of history.",
    tags: ["Next.js 16", "React 19", "Supabase", "Postgres RLS", "OpenAI", "Recharts", "Vercel Cron"],
    role: "Core Developer — built and maintained all three client deployments on a shared UI package",
    icon: "📊",
    featured: true,
  },
  {
    title: "Keyword Ranking Trackers",
    description:
      "Lightweight ranking dashboards for SEO teams: one monitors 31 casino and betting brands across 4 languages, another tracks an affiliate review site's keywords as dated snapshots in a spreadsheet-style matrix with movement indicators. Both use a serverless proxy to a Ranks API, daily Supabase snapshots, admin-approved sign-ups, CSV/Excel export, and an OpenAI \"Ask AI\" assistant grounded in the current data, with voice input.",
    tags: ["React 19", "Vite", "TypeScript", "Supabase", "Vercel Functions", "OpenAI", "Vitest"],
    icon: "📈",
  },
  {
    title: "LLM API Challenge",
    description:
      "A FastAPI service in front of Google Gemini that exposes four prompt-engineering tasks as typed endpoints: zero-shot classification with fuzzy shortlist-and-rerank, schema-driven extraction, relative-date resolution, and natural-language random ranges. A router with a regex fast path skips the LLM for simple queries, and the service guards against prompt injection. Covered by ~137 tests (offline fakes plus a live suite) in CI.",
    tags: ["Python", "FastAPI", "Google Gemini", "Pydantic", "pytest", "GitHub Actions"],
    icon: "🧩",
  },
  {
    title: "MARINA BEST™",
    description:
      "A blockchain-enabled automated certification system for maritime credentials, built at Monstarlab. Worked across frontend and backend to deliver secure, transparent, tamper-proof digital certificate workflows aligned with MARINA regulatory requirements.",
    tags: ["Java", "Spring Boot", "Node.js", "Hyperledger Fabric", "MySQL", "Elasticsearch"],
    icon: "⛓️",
    liveUrl: "",
    repoUrl: "",
  },
  {
    title: "Unit Test Efficiency Identifier (UTEI)",
    description:
      "My CS thesis: a VS Code tool that uses the OpenAI API to analyze and identify unit-test efficiency, surfacing weak coverage and suggesting improvements directly in the editor.",
    tags: ["VS Code Extension", "OpenAI API", "TypeScript", "Static Analysis"],
    icon: "🧪",
    liveUrl: "",
    repoUrl: "",
  },
  {
    title: "XPAY & WebPOS",
    description:
      "Designed, developed, tested, and deployed features for the XPAY and WebPOS payment/point-of-sale platforms at Alliance Software, working across the stack and maintaining technical documentation.",
    tags: ["PHP", "SQL", "Flash Builder", "HTML", "CSS"],
    icon: "💳",
    liveUrl: "",
    repoUrl: "",
  },
];

export type SkillGroup = {
  category: string;
  icon: string;
  skills: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "AI & Automation",
    icon: "🧠",
    skills: [
      "OpenAI API",
      "Anthropic Claude API",
      "Prompt Engineering",
      "OpenAI Batch API",
      "Conversational Systems",
      "n8n",
      "Claude Code",
      "Google Gemini",
      "Voice / Speech-to-Text",
    ],
  },
  {
    category: "Languages",
    icon: "📝",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C#", "C++", "PHP", "SQL"],
  },
  {
    category: "Frameworks & Web",
    icon: "🌐",
    skills: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Vite",
      "Spring Boot",
      "ASP.NET Core",
      ".NET 6 Web API",
      "Tailwind CSS",
    ],
  },
  {
    category: "Data & Backend",
    icon: "🗄️",
    skills: ["PostgreSQL", "Supabase", "Prisma", "MySQL", "Elasticsearch", "Dapper ORM", "REST APIs", "Row-Level Security"],
  },
  {
    category: "Cloud, DevOps & Scraping",
    icon: "☁️",
    skills: [
      "AWS EC2",
      "Vercel",
      "Linux (Ubuntu)",
      "systemd",
      "NGINX",
      "PM2",
      "CI/CD",
      "Selenium",
      "GoLogin",
    ],
  },
  {
    category: "Integrations & Blockchain",
    icon: "🔗",
    skills: [
      "Twilio",
      "Intercom",
      "Asana",
      "Monday.com",
      "Salesforce",
      "HubSpot",
      "Google & Outlook OAuth",
      "Microsoft 365 Graph",
      "Hyperledger Fabric",
      "Smart Contracts",
    ],
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "AI Specialist | AI Automation Engineer",
    company: "Optinet Solutions (Innovation Hub)",
    period: "Apr 2026 — Present",
    description:
      "Lead client-facing AI automation projects end-to-end in a fast-paced, founder-led environment.",
    highlights: [
      "Led the AI Chat QA Tool project as Project Lead for a Europe-based client — owning architecture, implementation, and delivery.",
      "Designed conversational logic and evaluation flows with OpenAI and Anthropic Claude APIs using structured prompt engineering for production-grade outputs.",
      "Built and deployed the full stack on Vercel and Supabase, with version control and CI managed through GitHub.",
      "Built Networky.ai, a voice-first relationship-intelligence CRM with Google, Outlook, Salesforce, and HubSpot sync, as its lead developer.",
      "Shipped five SEO & ranking dashboards for iGaming affiliate clients (7+ brands, 25+ domains), replacing spreadsheet-driven reporting with live, self-updating web apps.",
      "Built SEO, site health, PageSpeed, backlinks, QA, and Google ranking modules on a shared Next.js + Supabase template, keeping three client deployments in feature parity.",
      "Automated weekly keyword-ranking sync from a vendor Ranks API via Vercel Cron and serverless proxies, with daily snapshots and movement tracking over time.",
      "Added an OpenAI-powered \"Ask AI\" assistant grounded in each dashboard's live data, plus role-based access (Postgres RLS), portal SSO, audit logs, and Excel importers that migrated 18+ months of history.",
      "Ran discovery sessions, demoed iterations, and translated business needs into technical specs.",
    ],
  },
  {
    role: "Junior Full-Stack Software Developer",
    company: "Monstarlab Philippines (Remote)",
    period: "Oct 2025 — Mar 2026",
    description:
      "Built MARINA BEST™, a blockchain-enabled automated certification system for maritime credentials.",
    highlights: [
      "Worked across frontend and backend to deliver secure, tamper-proof digital certificate workflows.",
      "Ensured compliance with MARINA regulatory requirements on a Hyperledger Fabric platform.",
      "Stack: Java, Spring Boot, Node.js, MySQL, Elasticsearch, Hyperledger Fabric, NGINX, PM2, Linux.",
    ],
  },
  {
    role: "Software Developer",
    company: "Alliance Software Inc.",
    period: "May 2024 — Oct 2024",
    description:
      "Designed, developed, tested, and deployed solutions for the XPAY and WebPOS platforms.",
    highlights: [
      "Implemented technical tasks for payment and point-of-sale products using PHP, SQL, and Flash Builder.",
      "Conducted unit and product testing and maintained technical documentation.",
      "Collaborated cross-functionally to troubleshoot and optimize application performance.",
    ],
  },
  {
    role: "Backend Developer — Intern (Remote)",
    company: "Pixel8 Web Solutions & Consultancy",
    period: "Jun 2023 — Jul 2023",
    description:
      "Contributed to the design and development of the company's software projects.",
    highlights: [
      "Created APIs, wrote PHPUnit tests, and ensured software reliability and efficiency.",
      "Documented projects, results, and evaluations; solved routine technical issues.",
    ],
  },
  {
    role: "BS Computer Science",
    company: "Cebu Institute of Technology — University",
    period: "Aug 2020 — Jun 2024",
    description:
      "Thesis: Unit Test Efficiency Identifier (UTEI) using VS Code and the OpenAI API.",
    highlights: [
      "Built an AI-assisted developer tool as a capstone, foreshadowing a career in applied AI.",
    ],
  },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
