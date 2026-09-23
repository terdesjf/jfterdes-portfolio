# Generates Jose Felipe Terdes' cover letter + portfolio PDFs.
# Content mirrors data/portfolio.ts; accent matches the site (--accent: 16 185 129).
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    KeepTogether, HRFlowable,
)

OUT = r"C:\Users\terde\Documents\jfterdes-portfolio\docs"
os.makedirs(OUT, exist_ok=True)

ACCENT = colors.HexColor("#10B981")
INK = colors.HexColor("#0F172A")
BODY = colors.HexColor("#1E293B")
MUTED = colors.HexColor("#64748B")
RULE = colors.HexColor("#E2E8F0")
CHIP_BG = colors.HexColor("#ECFDF5")
CHIP_INK = colors.HexColor("#047857")

NAME = "Jose Felipe Terdes"
CONTACT = "Cebu City, Philippines  |  0977 369 3095  |  terdesjosefelipe@gmail.com"
LINKS = "linkedin.com/in/jose-felipe-terdes  |  github.com/joseterdes"


def S(name, **kw):
    kw.setdefault("fontName", "Helvetica")
    kw.setdefault("textColor", BODY)
    return ParagraphStyle(name, **kw)


st = {
    "name": S("name", fontName="Helvetica-Bold", fontSize=22, leading=25,
              textColor=INK, spaceAfter=3),
    "role": S("role", fontName="Helvetica", fontSize=10.5, leading=13,
              textColor=ACCENT, spaceAfter=7),
    "meta": S("meta", fontSize=8.6, leading=12, textColor=MUTED),
    "h2": S("h2", fontName="Helvetica-Bold", fontSize=11, leading=13,
            textColor=INK, spaceBefore=2, spaceAfter=4),
    "body": S("body", fontSize=9.7, leading=14.2, alignment=TA_JUSTIFY,
              spaceAfter=8),
    "letter": S("letter", fontSize=9.9, leading=14.2, alignment=TA_JUSTIFY,
                spaceAfter=8),
    "lead": S("lead", fontSize=10, leading=14.6, alignment=TA_JUSTIFY,
              textColor=BODY, spaceAfter=10),
    "ptitle": S("ptitle", fontName="Helvetica-Bold", fontSize=11.5, leading=14,
                textColor=INK, spaceAfter=1),
    "prole": S("prole", fontName="Helvetica-Oblique", fontSize=8.6, leading=11,
               textColor=ACCENT, spaceAfter=3),
    "pdesc": S("pdesc", fontSize=9.2, leading=13.2, alignment=TA_JUSTIFY,
               spaceAfter=3),
    "plink": S("plink", fontSize=8.3, leading=11, textColor=MUTED, spaceAfter=2),
    "tags": S("tags", fontSize=8.2, leading=11.5, textColor=CHIP_INK,
              spaceAfter=1),
    "xrole": S("xrole", fontName="Helvetica-Bold", fontSize=10, leading=12.5,
               textColor=INK),
    "xco": S("xco", fontSize=9.2, leading=12, textColor=ACCENT, spaceAfter=2),
    "xper": S("xper", fontSize=8.4, leading=11, textColor=MUTED),
    "bullet": S("bullet", fontSize=9, leading=12.6, leftIndent=10,
                bulletIndent=1, spaceAfter=2.5),
    "skillcat": S("skillcat", fontName="Helvetica-Bold", fontSize=9,
                  leading=12, textColor=INK),
    "skilllist": S("skilllist", fontSize=8.8, leading=12.4, textColor=BODY),
    "statv": S("statv", fontName="Helvetica-Bold", fontSize=15, leading=17,
               textColor=ACCENT),
    "statl": S("statl", fontSize=7.8, leading=10, textColor=MUTED),
    "sign": S("sign", fontName="Helvetica-Bold", fontSize=11, leading=14,
              textColor=INK),
}


def rule(color=RULE, w=0.6, before=2, after=7):
    return HRFlowable(width="100%", thickness=w, color=color,
                      spaceBefore=before, spaceAfter=after)


def section(title):
    """Section heading with an accent underline."""
    return KeepTogether([
        Paragraph(title.upper(), ParagraphStyle(
            "sec", fontName="Helvetica-Bold", fontSize=9.5, leading=12,
            textColor=ACCENT, spaceBefore=0, spaceAfter=2.5)),
        HRFlowable(width="100%", thickness=0.9, color=ACCENT,
                   spaceBefore=0, spaceAfter=7),
    ])


def letterhead(story, subtitle):
    story.append(Paragraph(NAME, st["name"]))
    story.append(Paragraph(subtitle, st["role"]))
    story.append(Paragraph(CONTACT, st["meta"]))
    story.append(Paragraph(LINKS, st["meta"]))
    story.append(rule(ACCENT, 1.4, before=8, after=13))


def build(path, story, footer_text):
    doc = BaseDocTemplate(
        path, pagesize=LETTER,
        leftMargin=0.78 * inch, rightMargin=0.78 * inch,
        topMargin=0.68 * inch, bottomMargin=0.72 * inch,
        title=os.path.splitext(os.path.basename(path))[0].replace("-", " "),
        author=NAME, subject=footer_text, creator=NAME,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height,
                  id="f", leftPadding=0, rightPadding=0,
                  topPadding=0, bottomPadding=0)

    def deco(canv, d):
        if not footer_text:
            return
        canv.saveState()
        canv.setStrokeColor(RULE)
        canv.setLineWidth(0.5)
        y = d.bottomMargin - 16
        canv.line(d.leftMargin, y, d.leftMargin + d.width, y)
        canv.setFont("Helvetica", 7.6)
        canv.setFillColor(MUTED)
        canv.drawString(d.leftMargin, y - 11, footer_text)
        canv.drawRightString(d.leftMargin + d.width, y - 11,
                             "Page %d" % canv.getPageNumber())
        canv.restoreState()

    doc.addPageTemplates([PageTemplate(id="main", frames=[frame],
                                       onPage=deco)])
    doc.build(story)
    print("wrote", path)


# ---------------------------------------------------------------- cover letter
def cover_letter():
    s = []
    letterhead(s, "AI Automation Engineer &middot; AI Specialist &middot; Full-Stack Developer")

    s.append(Paragraph("18 September 2026", st["meta"]))
    s.append(Spacer(1, 9))
    s.append(Paragraph(
        "<b>Angela Valencia</b><br/>Recruitment<br/>WorkMatePro",
        st["meta"]))
    s.append(Spacer(1, 11))
    s.append(Paragraph(
        "<b>Re: Application for AI Implementation &amp; Systems Specialist</b>",
        S("re", fontName="Helvetica-Bold", fontSize=10, leading=13,
          textColor=INK, spaceAfter=10)))

    s.append(Paragraph("Dear Angela Valencia,", st["letter"]))

    s.append(Paragraph(
        "Thank you for inviting me to proceed with the <b>AI Implementation &amp; Systems "
        "Specialist</b> role at WorkMatePro. I am completing the application form and video "
        "assessment, and wanted to share this letter alongside them. I am an AI Automation Engineer "
        "at Optinet Solutions, based in <b>Cebu City</b> and available to work onsite at your Cebu "
        "location. Implementing AI tools and automation workflows inside real business operations is "
        "exactly what I do now.",
        st["letter"]))

    s.append(Paragraph(
        "The closest match to this role is the <b>AI Chat QA Tool</b> I led for a Europe-based "
        "client. It pulls conversations from Intercom, runs automated LLM quality analysis through "
        "OpenAI's Batch API (<b>26,000+ conversations analyzed</b>), and wires the results back into "
        "the tools the business already uses: a seven-pattern escalation matrix routing issues into "
        "Asana with bidirectional status sync, hourly cron jobs, daily email digests, and a Telegram "
        "bot posting escalation snapshots &mdash; AI plugged into day-to-day operations, not a "
        "standalone demo. Across my projects I have integrated <b>Intercom, Asana, Monday.com, "
        "Twilio, and the Microsoft 365 Graph API</b>, and I use <b>n8n</b> for workflow automation; "
        "Zapier and Make solve the same problem and I would pick up either quickly.",
        st["letter"]))

    s.append(Paragraph(
        "On the systems side, I run an <b>AI lead-generation platform</b> across a multi-VM AWS fleet "
        "&mdash; roughly <b>8,800 enrichment jobs per week</b> over 8+ sources &mdash; which is a "
        "steady diet of configuration, deployment, and troubleshooting workflows that break in "
        "unglamorous ways. I also built <b>NoShowGuard</b>, a multi-tenant clinic SaaS using Anthropic "
        "Claude for risk scoring and Twilio for automated reminders. Earlier roles at Monstarlab and "
        "Alliance Software were heavy on testing and technical documentation, which I have kept as a "
        "habit rather than an afterthought.",
        st["letter"]))

    s.append(Paragraph(
        "I was project lead on each of these &mdash; running discovery sessions, demoing iterations, "
        "and translating business needs into technical specs. That maps directly to working with your "
        "internal teams to spot where AI and automation genuinely help, and where they are not worth "
        "the complexity. I hold a BS in Computer Science from Cebu Institute of Technology and work "
        "across TypeScript, Python, Java, and C#.",
        st["letter"]))

    s.append(Paragraph(
        "I would welcome the chance to discuss how I can help WorkMatePro put AI and automation into "
        "practice across your operations. My portfolio and code are linked above, and I am glad to "
        "walk through any of these systems in detail. Thank you for your time and consideration.",
        st["letter"]))

    s.append(Spacer(1, 6))
    s.append(Paragraph("Sincerely,", st["letter"]))
    s.append(Spacer(1, 6))
    s.append(Paragraph(NAME, st["sign"]))
    s.append(Paragraph("AI Automation Engineer &middot; Optinet Solutions",
                       st["meta"]))

    build(os.path.join(OUT, "Jose-Terdes-Cover-Letter.pdf"), s,
          None)


# ------------------------------------------------------------------- portfolio
PROJECTS = [
    ("AI Lead-Generation Platform",
     "Project Lead &mdash; drove client discovery, proposals, and end-to-end delivery",
     "A production lead-gen system that discovers and enriches affiliate marketers across 8+ "
     "sources (Google, Bing, YouTube, Kick, X, TikTok, Snapchat, Telegram, Facebook). Built "
     "3-phase scraping engines on a multi-VM AWS fleet with Selenium/GoLogin, proxy rotation, "
     "automated captcha solving, and nightly Monday.com CRM sync &mdash; processing ~8.8k enrichment "
     "jobs per week.",
     ["Python", "Selenium", "GoLogin", "Next.js", "Supabase", "AWS EC2", "Monday.com"],
     "google-lead-gen.vercel.app", "github.com/Optinet-Solutions-AI/Google-Lead-Gen"),
    ("AI Chat QA Tool",
     "Project Lead &mdash; ran discovery & demos with the client, proposed scope, and owned delivery",
     "A Next.js platform that pulls Intercom conversations and runs automated quality analysis "
     "via OpenAI's Batch API &mdash; analyzing 26k+ conversations. Features role-gated dashboards, a "
     "7-pattern escalation matrix routing issues to Asana, bidirectional status sync, hourly "
     "cron jobs, daily email digests, and a Telegram bot posting escalation snapshots.",
     ["Next.js", "TypeScript", "OpenAI Batch API", "Supabase", "Intercom", "Asana", "Telegram"],
     "ai-chat-qa-tool.vercel.app", "github.com/Optinet-Solutions-AI/ai-chat-qa-tool"),
    ("NoShowGuard",
     "Project Lead &mdash; client-facing throughout: discovery, proposals, and full delivery",
     "A multi-tenant SaaS that cuts clinic no-shows with automated Twilio reminders, Anthropic "
     "Claude-powered risk scoring, auto no-show sweeps, and smart waitlist auto-fill. Built on "
     "Next.js + Prisma with tenant isolation at every layer, HMAC-signed one-tap action links, "
     "TCPA-compliant consent tracking, an OTP patient portal, and a distributed cron worker.",
     ["Next.js", "Prisma", "PostgreSQL", "Twilio", "Anthropic Claude", "NextAuth", "Multi-tenant"],
     "noshowguard-ai.vercel.app", "github.com/jose-innovationhub/noshowguard"),
]

EARLIER = [
    ("MARINA BEST&#8482;",
     "A blockchain-enabled automated certification system for maritime credentials, built at "
     "Monstarlab. Worked across frontend and backend to deliver secure, transparent, "
     "tamper-proof digital certificate workflows aligned with MARINA regulatory requirements.",
     ["Java", "Spring Boot", "Node.js", "Hyperledger Fabric", "MySQL", "Elasticsearch"]),
    ("Unit Test Efficiency Identifier (UTEI)",
     "CS thesis: a VS Code tool that uses the OpenAI API to analyze and identify unit-test "
     "efficiency, surfacing weak coverage and suggesting improvements directly in the editor.",
     ["VS Code Extension", "OpenAI API", "TypeScript", "Static Analysis"]),
    ("XPAY & WebPOS",
     "Designed, developed, tested, and deployed features for the XPAY and WebPOS payment and "
     "point-of-sale platforms at Alliance Software, working across the stack and maintaining "
     "technical documentation.",
     ["PHP", "SQL", "Flash Builder", "HTML", "CSS"]),
]

SKILLS = [
    ("AI & Automation",
     "OpenAI API, Anthropic Claude API, Prompt Engineering, OpenAI Batch API, "
     "Conversational Systems, n8n, Claude Code"),
    ("Languages", "TypeScript, JavaScript, Python, Java, C#, C++, PHP, SQL"),
    ("Frameworks & Web",
     "Next.js, React, Node.js, Express.js, Spring Boot, ASP.NET Core, .NET 6 Web API, "
     "Tailwind CSS"),
    ("Data & Backend",
     "PostgreSQL, Supabase, Prisma, MySQL, Elasticsearch, Dapper ORM, REST APIs"),
    ("Cloud, DevOps & Scraping",
     "AWS EC2, Vercel, Linux (Ubuntu), systemd, NGINX, PM2, CI/CD, Selenium, GoLogin"),
    ("Integrations & Blockchain",
     "Twilio, Intercom, Asana, Monday.com, Microsoft 365 Graph, Hyperledger Fabric, "
     "Smart Contracts"),
]

EXPERIENCE = [
    ("AI Specialist | AI Automation Engineer",
     "Optinet Solutions (Innovation Hub)", "Apr 2026 &ndash; Present",
     ["Led the AI Chat QA Tool project as Project Lead for a Europe-based client &mdash; owning "
      "architecture, implementation, and delivery.",
      "Designed conversational logic and evaluation flows with OpenAI and Anthropic Claude "
      "APIs using structured prompt engineering for production-grade outputs.",
      "Built and deployed the full stack on Vercel and Supabase, with version control and CI "
      "managed through GitHub.",
      "Ran discovery sessions, demoed iterations, and translated business needs into "
      "technical specs."]),
    ("Junior Full-Stack Software Developer",
     "Monstarlab Philippines (Remote)", "Oct 2025 &ndash; Mar 2026",
     ["Built MARINA BEST&#8482;, a blockchain-enabled certification system for maritime "
      "credentials, across frontend and backend.",
      "Delivered secure, tamper-proof digital certificate workflows compliant with MARINA "
      "regulatory requirements on Hyperledger Fabric.",
      "Stack: Java, Spring Boot, Node.js, MySQL, Elasticsearch, Hyperledger Fabric, NGINX, "
      "PM2, Linux."]),
    ("Software Developer", "Alliance Software Inc.", "May 2024 &ndash; Oct 2024",
     ["Implemented technical tasks for the XPAY and WebPOS payment and point-of-sale products "
      "using PHP, SQL, and Flash Builder.",
      "Conducted unit and product testing and maintained technical documentation.",
      "Collaborated cross-functionally to troubleshoot and optimize application performance."]),
    ("Backend Developer &mdash; Intern (Remote)",
     "Pixel8 Web Solutions & Consultancy", "Jun 2023 &ndash; Jul 2023",
     ["Created APIs, wrote PHPUnit tests, and ensured software reliability and efficiency.",
      "Documented projects, results, and evaluations; solved routine technical issues."]),
    ("BS Computer Science", "Cebu Institute of Technology &mdash; University",
     "Aug 2020 &ndash; Jun 2024",
     ["Thesis: Unit Test Efficiency Identifier (UTEI), a VS Code tool built on the OpenAI API.",
      "Built an AI-assisted developer tool as a capstone, foreshadowing a career in applied AI."]),
]

STATS = [("8+", "Platforms scraped"), ("26k+", "Conversations AI-analyzed"),
         ("3", "Production AI systems"), ("2024", "BS Computer Science")]


def tagrow(tags, width):
    """Tech-stack tags as a soft tinted band, wrapping naturally."""
    sep = ' <font color="#A7F3D0">|</font> '
    inner = Paragraph(sep.join(tags), st["tags"])
    tbl = Table([[inner]], colWidths=[width], hAlign="LEFT")
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CHIP_BG),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return tbl


def portfolio():
    s = []
    W = LETTER[0] - 1.56 * inch

    letterhead(s, "AI Automation Engineer &middot; AI Specialist &middot; Full-Stack Developer")

    s.append(Paragraph(
        "I design and ship production AI systems &mdash; agents, automations, and full-stack apps "
        "that turn messy, manual work into reliable, self-running pipelines. From multi-source "
        "scrapers to multi-tenant SaaS, I take projects from discovery to launch.",
        st["lead"]))

    # stat band
    band = Table(
        [[Paragraph(v, st["statv"]) for v, _ in STATS],
         [Paragraph(l, st["statl"]) for _, l in STATS]],
        colWidths=[W / 4.0] * 4, hAlign="LEFT")
    band.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ("LINEABOVE", (0, 0), (-1, 0), 1.2, ACCENT),
        ("TOPPADDING", (0, 0), (-1, 0), 9),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 0),
        ("TOPPADDING", (0, 1), (-1, 1), 1),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
    ]))
    s.append(band)
    s.append(Spacer(1, 16))

    # about
    s.append(section("About"))
    for p in [
        "I'm an AI Automation Engineer at Optinet Solutions, where I lead client-facing AI "
        "projects end-to-end &mdash; owning architecture, implementation, and delivery for clients "
        "in Europe and beyond. I specialize in turning fuzzy business problems into "
        "production-grade systems built on OpenAI and Anthropic Claude.",
        "My background is full-stack: a BS in Computer Science from Cebu Institute of "
        "Technology, plus production experience across blockchain certification systems, "
        "payment platforms, and SaaS. I've shipped with Next.js, Spring Boot, .NET, and "
        "Python, and I care as much about reliability and clean architecture as I do about "
        "shipping fast.",
        "Lately I've been building extensively with AI &mdash; multi-source scraping fleets on AWS, "
        "automated QA pipelines over thousands of conversations, and a multi-tenant healthcare "
        "SaaS. I like systems that quietly do their job every day, not demos that break in "
        "production.",
    ]:
        s.append(Paragraph(p, st["body"]))

    s.append(Spacer(1, 4))

    # flagship projects
    s.append(section("Flagship Projects"))
    for title, role, desc, tags, live, repo in PROJECTS:
        block = [Paragraph(title, st["ptitle"]),
                 Paragraph(role, st["prole"]),
                 Paragraph(desc, st["pdesc"])]
        links = []
        if live:
            links.append("Live: %s" % live)
        if repo:
            links.append("Code: %s" % repo)
        block.append(Paragraph("  &nbsp;&bull;&nbsp;  ".join(links), st["plink"]))
        block.append(Spacer(1, 3))
        block.append(tagrow(tags, W))
        block.append(Spacer(1, 12))
        s.append(KeepTogether(block))

    # earlier work
    s.append(section("Earlier Work"))
    for title, desc, tags in EARLIER:
        block = [Paragraph(title, st["ptitle"]),
                 Paragraph(desc, st["pdesc"]),
                 Spacer(1, 3),
                 tagrow(tags, W),
                 Spacer(1, 12)]
        s.append(KeepTogether(block))

    # skills
    s.append(section("Technical Skills"))
    rows = [[Paragraph(cat, st["skillcat"]), Paragraph(items, st["skilllist"])]
            for cat, items in SKILLS]
    tbl = Table(rows, colWidths=[1.55 * inch, W - 1.55 * inch], hAlign="LEFT")
    tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, RULE),
    ]))
    s.append(tbl)
    s.append(Spacer(1, 16))

    # experience — the heading rides with the first entry so it never orphans
    pending_heading = [section("Experience & Education")]
    for role, co, period, highlights in EXPERIENCE:
        head = Table(
            [[Paragraph(role, st["xrole"]), Paragraph(period, st["xper"])]],
            colWidths=[W - 1.5 * inch, 1.5 * inch], hAlign="LEFT")
        head.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ALIGN", (1, 0), (1, 0), "RIGHT"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        block = pending_heading + [head, Paragraph(co, st["xco"])]
        pending_heading = []
        for h in highlights:
            block.append(Paragraph(h, st["bullet"], bulletText="\u2022"))
        block.append(Spacer(1, 11))
        s.append(KeepTogether(block))

    # contact
    s.append(section("Contact"))
    s.append(Paragraph(
        "<b>Email</b>  terdesjosefelipe@gmail.com &nbsp;&nbsp;&bull;&nbsp;&nbsp; "
        "<b>Phone</b>  0977 369 3095 &nbsp;&nbsp;&bull;&nbsp;&nbsp; "
        "<b>Location</b>  Cebu City, Philippines",
        st["skilllist"]))
    s.append(Spacer(1, 4))
    s.append(Paragraph(
        "<b>LinkedIn</b>  linkedin.com/in/jose-felipe-terdes &nbsp;&nbsp;&bull;&nbsp;&nbsp; "
        "<b>GitHub</b>  github.com/joseterdes",
        st["skilllist"]))

    build(os.path.join(OUT, "Jose-Terdes-Portfolio.pdf"), s,
          "Portfolio - Jose Felipe Terdes")


cover_letter()
portfolio()
