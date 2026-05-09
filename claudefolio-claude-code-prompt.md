# Claudefolio — Claude Code Build Prompt (v2, 12 projects)

You are building **Claudefolio**, the personal portfolio for Markus Schuette — a builder who ships AI-powered web apps fast. This is not a template portfolio. This is a **$100k showcase site**: the kind of work that gets reposted on Awwwards, Godly, and Sites We Like. Every detail must feel intentional, expensive, and alive.

Treat this brief as a hard spec. Don't ask clarifying questions for things that are answered below. Build sprint by sprint. Show me a working preview at the end of each sprint.

---

## 0. The brief in one paragraph

A single-page parallax portfolio that scrolls the visitor through 12 projects. Each project gets its own pinned, full-viewport scene where the page **transforms** — background color, accent, ambient lighting, typography mood, and device mockups all crossfade from the previous project to the next. The visitor never feels like they hit a "next slide" button; the site flows like a film. By the time they reach the footer, they should want to either hire Markus or build something themselves.

---

## 1. Visual direction

**Mood:** confident, editorial, slightly cinematic. Think *Linear's marketing site × Studio Freight × Locomotive × Igloo Inc.* Not playful, not corporate. Premium, with one or two moments of personality.

**Theme:** dark by default. Deep neutral base (`#0A0A0B` or `#0B0C0E`), broken by per-project accent washes that bleed in from the edges as you scroll into each project's scene. The base never goes pure black — always tinted by whichever project is currently in view.

Two projects are deliberate **light-flash inversions** (white/cream backgrounds, dark text) that interrupt the dark rhythm: **PaddleRank** (early) and **Seed** (late). These are not bugs — they're punctuation. Read them off the project data: the `theme.bg` field is the source of truth. Everything else in the data describes the project's own brand identity, and your job is to translate that into the per-scene wash *while* letting the portfolio's overall dark architecture carry through.

**Type system:**
- Display: a variable serif or stylized sans with real character. Use **Fraunces** (variable, opsz + soft + wonk axes) for hero/section headings, OR **Instrument Serif** (free on Google Fonts). Pick one and commit.
- UI sans: **Inter Tight** or **Geist**. Tight tracking on display, normal on body.
- Mono accent (tags, code-like labels, project metadata): **JetBrains Mono** or **Geist Mono**.
- Sizes are bold: hero headline ≥ `clamp(56px, 11vw, 200px)`. Project names ≥ `clamp(40px, 8vw, 140px)`.

**Texture:** subtle film grain overlay on the entire viewport (SVG noise, ~3% opacity, `mix-blend-mode: overlay`). Non-negotiable — it's what separates "nice CSS site" from "this feels real."

**Color discipline:** at any given scroll position, the palette is exactly: base + one accent + one neutral text + one muted text. Four colors max on screen. The accent rotates per project.

---

## 2. Tech stack (use exactly this — don't substitute)

- **Next.js 15** (App Router, TypeScript, React 19)
- **Tailwind CSS v4** with CSS variables for theming
- **Framer Motion** (component-level animations, layout transitions)
- **GSAP + ScrollTrigger** (scroll-driven scene choreography — the workhorse)
- **Lenis** (`lenis` npm package) for smooth inertial scroll, integrated with GSAP ScrollTrigger
- **next/image** for all screenshots (AVIF/WebP, lazy by default, eager only for the first project)
- **next/font** for self-hosted Google Fonts (zero layout shift)
- **React Three Fiber + drei** ONLY for the hero — a slow-rotating distorted sphere or noise plane behind the headline. One WebGL element on the whole site, used surgically.
- **clsx** + **tailwind-merge** for class composition
- Deploy: **Vercel**, edge runtime where possible, Image Optimization on.

No CMS. Project data lives in a typed `projects.ts` file — easier to edit, faster to ship.

---

## 3. The project data

Create `src/data/projects.ts` with this exact type and these exact 12 projects, in the order shown. Order matters — it's the scroll order, deliberately sequenced for mood rhythm (electric → warm → clinical → playful → light-flash → punchy closer). Don't reorder unless instructed.

**Type:**

```ts
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  url?: string | null;
  repo?: string | null;
  status: 'live' | 'in-development' | 'archived';
  theme: {
    accent: string;
    accentSoft: string;
    bg: string;          // the project's own brand bg — used for the 2 light-flash scenes; for the other 10, treat as a hint and render against the portfolio's dark base
    text: string;
    mood: 'electric' | 'warm' | 'clinical' | 'playful' | 'editorial';
  };
  screenshots: {
    desktop: string;
    mobile: string;
    desktopAlt?: string;
  };
};
```

**Data (paste verbatim into `projects.ts`):**

```ts
export const projects: Project[] = [
  // 1. NBA Vault — electric blue. Opener. Only live + real screenshots so far.
  {
    "slug": "nbavault",
    "name": "NBA Vault",
    "tagline": "Profitable NBA betting edges in 60 seconds.",
    "description": "Free daily NBA player prop picks with AI-powered edge calculations and confidence scoring. Covers all 30 teams with full rosters, mock draft simulator, lineup builder, and self-improving prediction engine that tracks results in real time.",
    "features": [
      "Daily picks with edge % and confidence scores",
      "Injury-impact alerts and matchup analysis",
      "Full rosters, scouting reports, all 30 teams",
      "Mock draft simulator with lottery odds",
      "Team-customized colors and player data",
      "No account required, free top picks"
    ],
    "stack": ["HTML", "Browser-native", "AI projections", "Sports data"],
    "url": "https://nbavault.com",
    "repo": null,
    "status": "live",
    "theme": {
      "accent": "#1f77d9",
      "accentSoft": "#4a9eff",
      "bg": "#0a0e27",
      "text": "#f5f7fa",
      "mood": "electric"
    },
    "screenshots": {
      "desktop": "/screenshots/nbavault/desktop.png",
      "mobile": "/screenshots/nbavault/mobile.png"
    }
  },

  // 2. PaddleRank — electric green. LIGHT FLASH. Cinematic inversion early.
  {
    "slug": "paddlerank-com",
    "name": "PaddleRank",
    "tagline": "Community-powered pickleball gear intelligence.",
    "description": "Combines addictive swipe-based gear showdowns, AI-powered recommendations, live ELO rankings, and smart deal alerts. Players build taste profiles through head-to-head battles, get personalized paddle recommendations from Claude, and get notified when wishlist items drop in price.",
    "features": [
      "Swipe Showdown battles with live ELO ranking",
      "Claude RankBot recommends from live database",
      "Trends engine tracks price drops and rising stars",
      "Smart notifications: email, SMS, in-app alerts",
      "Shareable results cards for social media",
      "Multi-category: shoes, balls, bags, grips"
    ],
    "stack": ["React", "Vite", "TailwindCSS", "Node.js", "Express", "Supabase", "PostgreSQL", "Anthropic Claude API", "Resend", "Twilio", "Recharts", "html2canvas", "Vercel", "Railway"],
    "url": null,
    "repo": null,
    "status": "in-development",
    "theme": {
      "accent": "#00D084",
      "accentSoft": "#E6FAF4",
      "bg": "#FFFFFF",
      "text": "#0D0F14",
      "mood": "electric"
    },
    "screenshots": {
      "desktop": "/screenshots/paddlerank-com/desktop.png",
      "mobile": "/screenshots/paddlerank-com/mobile.png"
    }
  },

  // 3. Beacon — electric indigo. Bold, after the light flash.
  {
    "slug": "beacon",
    "name": "Beacon",
    "tagline": "AI-powered cybersecurity lead generation cockpit.",
    "description": "B2B sales intelligence for cybersecurity teams to discover, research, and outreach high-fit prospects in under 60 seconds per lead. Combines a smart lead inbox with threat-relevance signals, AI-drafted emails, and a real-company research studio powered by a co-pilot chat.",
    "features": [
      "Smart lead inbox with threat-relevance scoring",
      "AI research studio with co-pilot chat",
      "Threat-surface analysis: CVE & regulatory mapping",
      "Multi-variant AI email drafting with predictive metrics",
      "Pipeline analytics dashboard and cadence builder",
      "Universal command bar and daily briefing"
    ],
    "stack": ["Next.js 14", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Recharts", "Zustand", "TanStack Query", "Prisma", "SQLite", "Anthropic API"],
    "url": null,
    "repo": "https://github.com/schuettemarkus/beacon",
    "status": "in-development",
    "theme": {
      "accent": "#4F46E5",
      "accentSoft": "#818CF8",
      "bg": "#0a0a0f",
      "text": "#F5F5F7",
      "mood": "electric"
    },
    "screenshots": {
      "desktop": "/screenshots/beacon/desktop.png",
      "mobile": "/screenshots/beacon/mobile.png"
    }
  },

  // 4. TN Tracker — warm terracotta. Live + real screenshots. Emotional pacing breath.
  {
    "slug": "tn-tracker",
    "name": "TN Tracker",
    "tagline": "Holistic pain journal for trigeminal neuralgia.",
    "description": "A warm, personal pain-tracking companion for people living with trigeminal neuralgia. Logs pain, stress, sleep, triggers, medications, menstrual cycle, and lunar phase across three daily check-ins, then surfaces patterns and AI-guided insights.",
    "features": [
      "Three daily pulse check-ins, pain & stress scales",
      "SVG nerve map + 14-day pattern detection charts",
      "AI chat companion & doctor report generator",
      "Holistic toolkit: breathwork, herbal, anti-inflammatory",
      "Local-only storage; JSON backup & restore",
      "Changelog, progress wins, nourish & movement guides"
    ],
    "stack": ["HTML/CSS/JavaScript", "Chart.js", "Anthropic API", "Railway"],
    "url": "https://tn-tracker.up.railway.app",
    "repo": null,
    "status": "in-development",
    "theme": {
      "accent": "#d4a574",
      "accentSoft": "#e8cdb3",
      "bg": "#1a1410",
      "text": "#f5f1ed",
      "mood": "warm"
    },
    "screenshots": {
      "desktop": "/screenshots/tn-tracker/desktop.png",
      "mobile": "/screenshots/tn-tracker/mobile.png"
    }
  },

  // 5. Forge — electric orange. Re-energize. Most ambitious stack on the site.
  {
    "slug": "forge",
    "name": "Forge",
    "tagline": "Autonomous 3D-print product R&D and fulfillment.",
    "description": "Forge discovers rising product trends, generates or sources printable designs, lists them on marketplaces, routes orders to a printer farm, and ships completed units — with humans only in the approval loop. Built for a Bambu Lab micro-business optimizing weekly net margin across design, manufacturing, and fulfillment.",
    "features": [
      "Trend intelligence from Etsy, Reddit, Pinterest, Google Trends",
      "LLM-powered opportunity scoring and design generation",
      "Parametric, remixed, and AI-generated 3D pipelines",
      "Printability QA with cost & time estimation",
      "Marketplace publisher with inventory sync",
      "Bambu printer farm controller with vision QA"
    ],
    "stack": ["Python 3.12", "FastAPI", "Celery", "Playwright", "CadQuery", "Blender", "Next.js 15", "tRPC", "Postgres", "pgvector", "Redis", "Cloudflare R2", "Claude API", "Etsy API v3", "Shopify API", "bambulabs-api", "Fly.io"],
    "url": null,
    "repo": null,
    "status": "in-development",
    "theme": {
      "accent": "#FF6B35",
      "accentSoft": "#FFB380",
      "bg": "#0F1419",
      "text": "#F5F5F5",
      "mood": "electric"
    },
    "screenshots": {
      "desktop": "/screenshots/forge/desktop.png",
      "mobile": "/screenshots/forge/mobile.png"
    }
  },

  // 6. CookieIQ — clinical blue. Sober precision after the heat.
  {
    "slug": "cookieiq",
    "name": "CookieIQ",
    "tagline": "Cookie research and categorization intelligence.",
    "description": "Full-stack tool for privacy engineers, DPOs, and legal teams to research cookies, categorize them against TrustArc compliance frameworks, scan websites for live cookies, and monitor cookie drift over time. Powered by Claude's web search to surface vendor policies and categorization patterns.",
    "features": [
      "Research any cookie against live policy data",
      "Scan websites for all cookies and trackers",
      "Auto-categorize against TrustArc frameworks",
      "Detect compliance gaps and miscategorizations",
      "Monitor cookie changes over time",
      "Export reports for legal review"
    ],
    "stack": ["React", "Vite", "Express.js", "Tailwind CSS", "Puppeteer", "better-sqlite3", "node-cron", "PapaParse", "Anthropic Claude API"],
    "url": null,
    "repo": null,
    "status": "in-development",
    "theme": {
      "accent": "#185FA5",
      "accentSoft": "#4A8FCF",
      "bg": "#0F172A",
      "text": "#F8FAFC",
      "mood": "clinical"
    },
    "screenshots": {
      "desktop": "/screenshots/cookieiq/desktop.png",
      "mobile": "/screenshots/cookieiq/mobile.png"
    }
  },

  // 7. CardLedger — clinical red. Sharp focus. Pairs with CookieIQ as a clinical duo.
  {
    "slug": "holofolio",
    "name": "CardLedger",
    "tagline": "Pokémon card portfolio tracker, brokerage-grade.",
    "description": "Local-first web app for tracking personal Pokémon card collections with photo-based ingestion, AI-powered condition grading, real-time market pricing from multiple sources, and a financial-dashboard UI. Upload card photos, auto-identify and grade them, monitor portfolio value, generate insurance-ready exports.",
    "features": [
      "Photo upload with AI identification and grading",
      "Real-time pricing: TCGPlayer, eBay, PriceCharting",
      "Portfolio dashboard with P&L tracking",
      "Set completion progress and wishlist alerts",
      "Time-series charts with range selection",
      "PDF and CSV export for insurance"
    ],
    "stack": ["Next.js 14", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts", "TanStack Table", "TanStack Query", "PostgreSQL 16", "TimescaleDB", "Drizzle ORM", "Anthropic Claude", "pg-boss", "Vitest", "Playwright"],
    "url": null,
    "repo": null,
    "status": "in-development",
    "theme": {
      "accent": "#DC2626",
      "accentSoft": "#FCA5A5",
      "bg": "#0F172A",
      "text": "#F1F5F9",
      "mood": "clinical"
    },
    "screenshots": {
      "desktop": "/screenshots/holofolio/desktop.png",
      "mobile": "/screenshots/holofolio/mobile.png"
    }
  },

  // 8. Grand Theft Otto — playful orange. Personality moment.
  {
    "slug": "grandtheftotto",
    "name": "Grand Theft Otto",
    "tagline": "Procedural sandbox driving, pure joy.",
    "description": "Browser-based 3D driving sandbox where you pilot a car through a procedurally generated world, collecting powerups, avoiding creatures, and chaining stunts. Built with Three.js and physics simulation, it emphasizes immediate fun over narrative — no loading, no cutscenes, just you and the open world.",
    "features": [
      "Procedural terrain with day/night cycle",
      "Procedural sound engine via Web Audio API",
      "Real-time physics with CANNON.js",
      "Minimap with spatial awareness",
      "Drift-based stunt scoring system",
      "Tire tracks and dynamic lighting"
    ],
    "stack": ["Three.js", "CANNON.js", "Web Audio API", "Vanilla JavaScript", "WebGL"],
    "url": null,
    "repo": null,
    "status": "in-development",
    "theme": {
      "accent": "#FF8C42",
      "accentSoft": "#FFB84D",
      "bg": "#0A1428",
      "text": "#F5F5F5",
      "mood": "playful"
    },
    "screenshots": {
      "desktop": "/screenshots/grandtheftotto/desktop.png",
      "mobile": "/screenshots/grandtheftotto/mobile.png"
    }
  },

  // 9. Sidebet — playful emerald. Lighter beat continuing the playful pair.
  {
    "slug": "sidebet",
    "name": "Sidebet",
    "tagline": "Betting pool management for casual wagering.",
    "description": "A Next.js app for managing friendly bets and side wagers. Built with modern web tooling and optimized for quick deployment among groups of friends.",
    "features": [
      "Create and manage betting pools",
      "Real-time wager tracking",
      "Simple, intuitive interface",
      "Mobile-responsive design",
      "Quick settlement tools"
    ],
    "stack": ["Next.js", "React", "TypeScript", "Geist Font", "Vercel"],
    "url": null,
    "repo": null,
    "status": "in-development",
    "theme": {
      "accent": "#10b981",
      "accentSoft": "#6ee7b7",
      "bg": "#0f172a",
      "text": "#f1f5f9",
      "mood": "playful"
    },
    "screenshots": {
      "desktop": "/screenshots/sidebet/desktop.png",
      "mobile": "/screenshots/sidebet/mobile.png"
    }
  },

  // 10. Travelfire — electric orange. Cinematic, build toward the close.
  {
    "slug": "travelfire",
    "name": "Travelfire",
    "tagline": "Dream, decide, and remember every journey.",
    "description": "Cinematic travel research and planning web app combining real-time weather, drive vs. fly comparisons, and a taste-aware recommendation engine. Plan trips with live route calculations, explore destinations with rich location profiles, and maintain a personal atlas of all your journeys — entirely client-side, no backend.",
    "features": [
      "Live cinematic hero with real-time weather",
      "Drive vs. fly cost and carbon comparison",
      "Taste-aware travel recommendations",
      "Quick-add past trips via CSV or text",
      "Personal travel atlas with year scrubber",
      "Nomadlist-style location deep-dives"
    ],
    "stack": ["Next.js 14", "TypeScript", "Tailwind CSS", "Zustand", "Open-Meteo API", "OSRM", "Unsplash"],
    "url": null,
    "repo": null,
    "status": "in-development",
    "theme": {
      "accent": "#F97316",
      "accentSoft": "#FDBA74",
      "bg": "#1A0F0A",
      "text": "#FAF7F2",
      "mood": "electric"
    },
    "screenshots": {
      "desktop": "/screenshots/travelfire/desktop.png",
      "mobile": "/screenshots/travelfire/mobile.png"
    }
  },

  // 11. Seed — warm sage. LIGHT FLASH 2. Calm before the closer.
  {
    "slug": "seed",
    "name": "Seed",
    "tagline": "A calm, curious place to grow.",
    "description": "Personalized homeschool learning platform for ages 5–13 that synthesizes global best-practice pedagogies (Singapore Math, Finnish science, Classical writing, Montessori) into customized daily lesson paths. Parents set up in 90 seconds; Seed handles curriculum scaffolding, mastery progression, AI-guided learning, and state compliance reporting.",
    "features": [
      "Global best-of curriculum across pedagogies",
      "Age-calibrated lessons with built-in brain breaks",
      "Socratic AI companion, COPPA-safe, multilingual",
      "Tablet-first calm interface, zero gamification",
      "Parent progress hub with mastery visualization",
      "State compliance auto-reports (10+ US states)"
    ],
    "stack": ["React 18", "Vite", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "Anthropic API", "Vercel", "Stripe", "Resend", "PostHog"],
    "url": null,
    "repo": null,
    "status": "in-development",
    "theme": {
      "accent": "#87A878",
      "accentSoft": "#B8D4A8",
      "bg": "#FAFAF7",
      "text": "#1A1A1A",
      "mood": "warm"
    },
    "screenshots": {
      "desktop": "/screenshots/seed/desktop.png",
      "mobile": "/screenshots/seed/mobile.png"
    }
  },

  // 12. Vibestack — electric lime. Punchy, memorable closer.
  {
    "slug": "vibestack",
    "name": "Vibestack",
    "tagline": "Product Hunt for AI-shipped projects.",
    "description": "Community platform for discovering and celebrating projects built fast with AI assistance. Creators submit their work, the community upvotes and comments, and a daily champion is crowned. Built with Next.js, Supabase, and Anthropic Claude.",
    "features": [
      "Daily Stack Feed with upvote-ranked projects",
      "AI-generated taglines on submit",
      "Creator profiles with stats and timeline",
      "Comments, reactions, and project updates",
      "Weekly digest and fork tracking",
      "Vibe Score rewarding velocity and engagement"
    ],
    "stack": ["Next.js 15", "React Server Components", "TypeScript", "Supabase", "Tailwind CSS", "shadcn/ui", "Anthropic Claude API", "ScreenshotOne API", "Resend", "Vercel"],
    "url": null,
    "repo": "https://github.com/schuettemarkus/vibestack",
    "status": "in-development",
    "theme": {
      "accent": "#C7F284",
      "accentSoft": "#E8F9C8",
      "bg": "#0A0A0B",
      "text": "#FAFAF7",
      "mood": "electric"
    },
    "screenshots": {
      "desktop": "/screenshots/vibestack/desktop.png",
      "mobile": "/screenshots/vibestack/mobile.png"
    }
  }
];
```

**State of the data, read this carefully:**
- Only **NBA Vault** and **TN Tracker** have live URLs and real captured screenshots in `/public/screenshots/{slug}/`. The other 10 don't yet — Markus has the screenshot pipeline set up to backfill them. For the 10 without real screenshots, render a styled placeholder (see Section 8). Don't break the build on missing files.
- Two projects have GitHub repos but no live URL: **Beacon** and **Vibestack**. Their primary CTA is "View on GitHub →" instead of "Visit site →".
- Eight projects have neither URL nor repo (in-development, private). They get NO primary CTA — instead, the status pill ("In development") is enlarged and stays prominent in the CTA position. The scene still works; it just leans on description + features.

---

## 4. Page architecture (top to bottom)

```
┌─────────────────────────────────────────────┐
│ NAV (fixed, minimal — logo + 3 links)        │  hides on scroll down, returns on scroll up
├─────────────────────────────────────────────┤
│ HERO                                         │  100vh, WebGL plane behind oversized headline
│   "Markus Schuette / builds with Claude."    │  scramble text reveal on load
│   Subline: "Independent. Twelve apps deep."  │
├─────────────────────────────────────────────┤
│ MARQUEE — "selected work · 2024–2026 ·"     │  infinite, scroll-velocity-coupled
├─────────────────────────────────────────────┤
│ INTRO PARAGRAPH                              │  one screen of editorial copy, mask-reveal per word
│   "I ship AI-powered tools fast. Here's     │
│    twelve of them."                          │
├─────────────────────────────────────────────┤
│ PROJECTS 1–12 (pinned scenes, in order)      │
│   1. NBA Vault                               │
│   2. PaddleRank   ←  light flash             │
│   3. Beacon                                  │
│   4. TN Tracker                              │
│   5. Forge                                   │
│   6. CookieIQ                                │
│   7. CardLedger                              │
│   8. Grand Theft Otto                        │
│   9. Sidebet                                 │
│  10. Travelfire                              │
│  11. Seed         ←  light flash             │
│  12. Vibestack                               │
├─────────────────────────────────────────────┤
│ STATS / META BAND                            │  4 numbers, count-up on enter
│   "12 apps shipped · 9 AI integrations ·    │
│    2 live · ∞ Claude Code prompts written"  │
├─────────────────────────────────────────────┤
│ ABOUT / CONTACT                              │  oversized email, magnetic button
├─────────────────────────────────────────────┤
│ FOOTER                                       │  giant wordmark "CLAUDEFOLIO" cut off at viewport bottom
└─────────────────────────────────────────────┘
```

---

## 5. The scroll choreography (this is the heart of the site)

Every project section uses a **pinned, multi-phase scene** built with GSAP ScrollTrigger. Each scene is ~200vh tall (timeline length 200% of viewport) and pins for the duration. Inside that pinned window, animate:

**Phase 0 — Approach (0–15%):** Previous scene's accent fades out. Incoming project's accent washes in from the leading edge. Body text crossfades. Next project name starts in a "set" position offscreen-bottom.

**Phase 1 — Title takeover (15–30%):** Project name slides up into hero position with a per-letter mask reveal (write your own char splitter — don't require paid GSAP SplitText). Tagline fades in below in italic serif. Status pill (live / in-dev / archived) fades in.

**Phase 2 — Device reveal (30–55%):** Desktop mockup enters from the right with subtle parallax (translate + slight rotateY 4–6°), wrapped in a realistic browser chrome frame (rounded corners, traffic-light dots, faux URL bar showing the project's URL or "github.com/..." if repo-only or just `/{slug}` if neither). Mobile mockup enters from the bottom-right, layered in front, wrapped in an iPhone-15-style frame (rounded chassis, dynamic island). Independent parallax depth — desktop slower, mobile faster. Soft glow behind each device tinted with the project accent.

**Phase 3 — Feature list + CTA (55–80%):** On the left, numbered feature list reveals — one item at a time, each with a thin animated underline that draws from 0 to 100% as it enters. Below it: stack tags as small mono-font pills. Then the **CTA**, which depends on the data:
- `url` present → `<MagneticButton href={url} target="_blank">Visit site →</MagneticButton>`
- no `url` but `repo` present → `<MagneticButton href={repo} target="_blank">View on GitHub →</MagneticButton>` (with a small GitHub mark icon)
- neither → enlarged status pill `In development` in the CTA slot, slightly muted, no link

**Phase 4 — Exit (80–100%):** Devices drift up and fade. Project name compresses and slides toward the next section's title position. Accent wash bleeds out. Hand off to next scene.

**Connective tissue:** thin horizontal accent bar runs across the viewport between scenes, drawing in from left to right as you scroll across the boundary, then bleeding into the next scene's wash. Film-strip feel.

**Light-flash treatment (PaddleRank #2 and Seed #11):** the entire viewport bg crossfades to the project's `theme.bg` (white/cream) over Phase 0–1. Text flips to dark. Grain overlay opacity drops to 1.5%. The cursor's `mix-blend-mode: difference` automatically inverts. On exit (Phase 4), bg crossfades back to dark. Treat it as the site briefly stepping into daylight, then back into the cinema.

**Scroll behavior:**
- Lenis with `lerp: 0.08`, `smoothWheel: true`, `wheelMultiplier: 1`. Sync to GSAP via `lenis.on('scroll', ScrollTrigger.update)` and a `gsap.ticker.add` raf loop. `ScrollTrigger.normalizeScroll(true)` for Safari behavior.
- Scroll progress indicator: 1px hairline at top of viewport, fills with current project's accent, resets per project.
- No section-snap. Free scroll only.
- On `prefers-reduced-motion`, kill all scroll-pinned animations, render projects as a clean static stack with reveal-on-scroll only.

---

## 6. The "wow" details (build all of these — they're what make it $100k)

1. **Custom cursor.** 12px circle that morphs into a 64px label-pill with text ("Visit site →" / "View repo →" / "Scroll" / "Click") when over interactive elements. `mix-blend-mode: difference` so it inverts against any background. Hidden on touch.
2. **Magnetic CTAs.** Every primary button has magnetic pull on the cursor within ~50px. Button translates max ~12px toward cursor, eased.
3. **Scramble text on hero load.** Headline characters rapidly cycle through random glyphs before settling on real letters. 30ms stagger per char. Curated character pool.
4. **Marquee scroll-velocity coupling.** Speed scales with scroll velocity, reverses on scroll-up. Use Lenis's velocity output.
5. **Image reveal masks.** Every screenshot enters with `clip-path: inset(100% 0 0 0)` → `inset(0)` over 1.2s, cubic-bezier `(0.65, 0, 0.35, 1)`.
6. **Word-by-word text reveal.** Intro paragraph words rise 18px and fade in, staggered 25ms, triggered when 60% visible.
7. **WebGL hero.** Single full-viewport plane, fragment shader rendering slow organic noise tinted with the *currently-active* project's accent (updates as you scroll, even before reaching a project). Ambient mood ring of the whole site. Subtle — `opacity: 0.35`, slow. R3F + custom shader. Pause render loop when offscreen.
8. **Grain overlay.** SVG `feTurbulence` noise, fixed full-viewport, `opacity: 0.04`, `mix-blend-mode: overlay`, `pointer-events: none`, `z-index: 9999`. Drops to 0.015 during light-flash scenes.
9. **Browser chrome + iPhone frame components.** Don't ship raw screenshots. Build `<BrowserFrame>` and `<PhoneFrame>` — rounded corners, realistic shadows, subtle inner highlight, proper aspect ratios, faint reflection at top edge.
10. **Easter egg.** Type `claude` anywhere → cursor briefly trails sparkle particles for 3s, current accent flashes once. Subtle.

---

## 7. Component structure

```
src/
  app/
    layout.tsx              # font loading, Lenis provider, grain overlay, cursor
    page.tsx                # composition of all sections in order
  components/
    Nav.tsx
    Hero.tsx
    HeroCanvas.tsx          # R3F canvas
    Marquee.tsx
    Intro.tsx
    ProjectScene.tsx        # the pinned scene — takes a Project, builds the timeline
    BrowserFrame.tsx
    PhoneFrame.tsx
    DevicePlaceholder.tsx   # styled fallback when screenshot missing
    FeatureList.tsx
    StatusPill.tsx
    StackTags.tsx
    MagneticButton.tsx
    Stats.tsx
    Contact.tsx
    Footer.tsx
    Cursor.tsx
    GrainOverlay.tsx
    ScrollProgress.tsx
  hooks/
    useLenis.ts
    useMagnetic.ts
    useScrambleText.ts
    useReducedMotion.ts
    useScrollVelocity.ts
    useImageExists.ts       # checks if a screenshot file is present
  data/
    projects.ts
    types.ts
  lib/
    theme.ts                # CSS variable updates per active project
    gsap.ts                 # gsap + ScrollTrigger registration, Lenis sync
  styles/
    globals.css
```

---

## 8. Asset & content conventions

- **Real screenshots** at `/public/screenshots/{slug}/desktop.png` and `mobile.png`. Currently present for `nbavault` and `tn-tracker`. The other 10 slugs don't have files yet.
- **`<DevicePlaceholder>` component**: render when a screenshot file is missing. It shows the project's `accent → accentSoft` gradient, the project name in display serif, and a small mono `In development` label. Both desktop and mobile placeholder variants. The placeholder respects the same parallax + reveal mask treatment as real screenshots, so the scene composition reads correctly even before screenshots land.
- **Detect missing screenshots at build time** via a small Node script in `scripts/check-screenshots.mjs` that logs which projects need shoots — useful for Markus's running list. Don't fail the build; just warn.
- **Open Graph image**: generate with `next/og` at `/og` showing "Markus Schuette / Claudefolio" over the hero noise. 1200×630.
- **Favicon**: simple wordmark "ms." in a default accent. Provide `icon.svg`, `apple-icon.png`.
- **Metadata**: title `Markus Schuette — Claudefolio`, description `Independent builder shipping AI-powered web apps with Claude. Twelve projects, deep.`, proper Twitter card.

---

## 9. Performance & accessibility (non-negotiable)

- Lighthouse: **Performance ≥ 92, Accessibility ≥ 95, Best Practices = 100, SEO = 100** on production build.
- LCP < 2.0s on Fast 3G. Hero is the LCP.
- Total JS shipped to client: **< 220 KB gzipped** (excluding images). Code-split aggressively. R3F hero canvas dynamic-imported with `ssr: false`.
- All images: `next/image`, AVIF + WebP, explicit `width`/`height`.
- All animations honor `prefers-reduced-motion`. WebGL hero swaps to a static gradient.
- Keyboard navigable. Focus rings visible (custom — match accent). Escape closes any expanded state.
- Color contrast WCAG AA on every text/bg combo. The two light-flash scenes need extra attention — text must clear 4.5:1 against `theme.bg`.
- Semantic HTML: one `<h1>`, project names are `<h2>`, taglines are `<p>` (italic via class). Sections wrapped in `<section aria-labelledby>`.

---

## 10. Sprint plan

Ship one sprint at a time. End each sprint with a runnable preview at `localhost:3000` and a brief "what's in / what's next" note.

**Sprint 1 — Foundation**
- Next.js 15 + TS + Tailwind v4 scaffolded, fonts loaded, base CSS tokens defined.
- Lenis + GSAP wired and syncing. Test pinned section works on a placeholder.
- `projects.ts` + `types.ts` populated with all 12 projects from Section 3.
- Grain overlay, custom cursor, scroll progress hairline.

**Sprint 2 — Hero + Intro + Marquee**
- Hero with WebGL canvas (R3F), scramble headline, scroll cue.
- Marquee with scroll-velocity coupling.
- Word-reveal intro paragraph.

**Sprint 3 — Project scene template + light-flash**
- Build `<ProjectScene>` with full Phase 0–4 timeline using **NBA Vault** as the test case (it has real screenshots).
- Then add **PaddleRank** to validate the light-flash inversion logic.
- Theme system updates CSS variables as scroll enters/exits each scene.
- `<BrowserFrame>`, `<PhoneFrame>`, `<DevicePlaceholder>` all built.

**Sprint 4 — Roll out remaining 10 projects**
- Apply `<ProjectScene>` to projects 3–12 in order. Tune per-project accents and bg tints. Verify the second light-flash (Seed) lands right.
- Verify CTA logic correctly switches between Visit / GitHub / status-pill across the 12.

**Sprint 5 — Stats, Contact, Footer**
- Animated count-up stats. Oversized contact section with magnetic email button. Footer wordmark cut off at viewport bottom (`clamp(120px, 28vw, 480px)` "CLAUDEFOLIO" with `overflow: hidden` parent).

**Sprint 6 — Polish + perf + a11y**
- Easter egg. Reduced-motion path. Lighthouse pass. Image optimization. OG image. Metadata. Social links wired. `scripts/check-screenshots.mjs` reporting which slugs still need shoots.
- `vercel.json` if needed. Deploy preview.

---

## 11. Deployment

- Push to GitHub repo `claudefolio` (Markus's account).
- Connect to Vercel, deploy to production on `main`.
- Custom domain: TBD — likely `markusschuette.com` or `markus.build`. Ask Markus before final deploy.
- Add `robots.txt` allowing all, `sitemap.xml` auto-generated.

---

## 12. Acceptance criteria (don't call it done until all of these are true)

- [ ] Scroll feels buttery on a MacBook trackpad and a Magic Mouse — no jank, no jitter, no stuck pin.
- [ ] Each of the 12 project scenes is unmistakably its own moment — accent, mood, and vibe all shift.
- [ ] Both light-flash scenes (PaddleRank, Seed) land cleanly: bg inverts, text contrast clears AA, grain reduces, cursor inverts via blend-mode automatically. The transition in and out feels intentional, not buggy.
- [ ] CTA logic works correctly across all three states: Visit, GitHub, status-only.
- [ ] `<DevicePlaceholder>` renders cleanly for the 10 projects without screenshots; layout is identical to real-screenshot scenes.
- [ ] Devices have realistic frames, not raw screenshots.
- [ ] Hover states on every interactive element. Cursor changes shape over them.
- [ ] No `<form>` tags, no localStorage, no analytics SDKs (Markus adds Plausible later).
- [ ] Site loads cleanly with `prefers-reduced-motion: reduce`.
- [ ] Mobile (≤640px): scroll choreography simplifies to vertical stacked sections with reveal-on-scroll, devices stack vertically. Pinning disabled below 1024px.
- [ ] Lighthouse hits the targets in Section 9.
- [ ] No TypeScript errors. No console errors. No hydration warnings.
- [ ] The site is recognizably Markus's — confident, not generic, with one detail per scene that makes you smile.

---

## What I expect from you, Claude Code

Build sprint by sprint. After each sprint, commit with a clean message and tell me what's running and what's next. Make judgment calls on small ambiguities (specific easings, exact pixel values, copy nudges) — don't stop to ask. If you hit something genuinely ambiguous (a domain decision, a missing asset that blocks layout), flag it and continue with a sensible placeholder.

Ship it like you mean it.
