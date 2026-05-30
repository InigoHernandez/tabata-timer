This is a large multi-phase migration. Here's the plan, scoped so it ships safely without breaking the live timer.

## Phase 1 — Foundation
- Install `react-helmet-async`, wrap app in `<HelmetProvider>` in `src/main.tsx`.
- Create `src/components/Seo.tsx` — a reusable `<Seo title description path ogImage jsonLd />` component handling title, description, canonical, og:*, twitter:*, optional JSON-LD.
- Update `index.html`: change `<title>` to "Stint — Minimalist Timer…", swap site-wide description, remove existing `<link rel="canonical">` (per-route owns it now), add WebApplication JSON-LD, update OG defaults.
- Update `public/robots.txt` to add `Sitemap: https://stint.run/sitemap.xml`.
- Replace `public/sitemap.xml` (static) with the full URL list using `https://stint.run` as base.

## Phase 2 — Routing
- Add routes in `src/App.tsx` for all 30+ paths listed. Use a shared `TimerLandingPage` component that accepts `{ preset, h1, intro, relatedLinks, seo }` and renders: `<Seo/>` + `<header><h1/><p/></header>` + `<TabataTimer/>` (with preset applied) + content sections + related links footer.
- Static pages (`/about`, `/privacy`, `/terms`, `/guides`, `/guides/*`) are simple article components with `<Seo/>` + content.
- Custom 404 already exists at `NotFound`; enhance with suggested-timers list.

## Phase 3 — Timer presets via URL
- Extend `TabataTimer` to accept optional `initialMode` and `initialSettings` props so landing pages can preconfigure (e.g. /tabata → mode=training, 20/10×8; /pomodoro → mode=focus 25/5/15).

## Phase 4 — Rebrand
- `TimerHero` subtitle: "stint — minimalist timer" (both modes; can drop the mode-specific subtitle prop or keep it but unify copy).
- Any user-facing "tabata" copy outside the Tabata preset name → "Stint".

## Phase 5 — Content
- Write 300–500 word copy for `/tabata`, `/hiit`, `/pomodoro`, `/deep-work`, `/timer`.
- Write 1000–1500 word guides for `/guides/what-is-tabata` and `/guides/pomodoro-technique`.
- All other landing pages ship with a short intro (~80–120 words) + "How to use" + "Related timers" — enough to not be thin, can be expanded later.

## Phase 6 — Footer + internal linking
- Add a global `<Footer/>` with grouped links (Training timers, Focus timers, Guides, About). Hidden in fullscreen.
- Homepage gets a "Popular protocols" card grid (6 links) below the timer.
- Each landing page links to 3–5 related ones.

## Technical details

- **SEO component**: uses `react-helmet-async`. Canonical = `https://stint.run${path}`. og:image defaults to `/og-image.png` (note: I will NOT generate this image — you can add it later; meta will reference the path).
- **JSON-LD**: WebApplication is injected site-wide via `index.html`. FAQPage added on `/` via Helmet. Article schema added on guide pages via Helmet.
- **Sitemap**: static `public/sitemap.xml` (no generator script needed since routes are fully static).
- **Presets**: passed as props through route element, `TabataTimer` initializes settings from them on mount.
- **Brand**: header keeps lowercase "stint" wordmark.

## Scope notes / what I will NOT do in this pass

- I won't change timer engine logic, slider behavior, ProgressBars, theme, audio.
- I won't generate an OG image (you can drop a 1200×630 PNG at `public/og-image.png` later; tags reference it).
- I won't add a Google Search Console verification meta (placeholder comment in `index.html` — paste your code when ready).
- I won't add Plausible (none currently installed; if you want it, say so).
- I won't touch DNS / domain config (manual step on your side).
- Favicon set: existing favicon stays; I won't generate new PWA icons unless asked.

## Files touched (estimate)
- `index.html`, `src/main.tsx`, `src/App.tsx`, `src/components/TabataTimer.tsx`, `src/components/TimerHero.tsx`, `public/sitemap.xml`, `public/robots.txt`
- New: `src/components/Seo.tsx`, `src/components/Footer.tsx`, `src/components/TimerLandingPage.tsx`, `src/data/landingPages.ts`, `src/pages/Guide*.tsx`, `src/pages/About.tsx`, `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`, `src/pages/GuidesIndex.tsx`, plus light route components.
- `package.json` (adds `react-helmet-async`)

Reply "go" to execute, or tell me what to adjust (e.g. skip guides for now, change brand subtitle wording, drop some routes).