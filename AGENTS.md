# PANIONK Agent Notes

## Project Purpose

PANIONK is a single-page personal portal for a product-minded developer focused on AI, agents, app building, and public learning.

The site should act as:

- a memorable personal entrance,
- a compact showcase for shipped apps/tools,
- a clear path to writing, GitHub, Juejin, X, and other public traces.

Do not turn this into a multi-route app unless explicitly requested. The intended experience is one clear scroll from top to bottom.

## Current Direction

Design direction: light, quiet, typographic. White background, hairline borders, horizontal card grids, no shadows.

The one memorable element is the type treatment itself. The rule is **prose in the system sans, proper nouns in mono**: Chinese body copy uses the system sans; the Panionk wordmark, project names, handles, dock tooltips, and the colophon use a self-hosted IBM Plex Mono latin subset. Latin words inside Chinese prose must stay in the sans — monospaced advances chop Chinese sentences apart. Nothing else on the page is allowed to compete with this.

Everything game-like from the previous direction is retired: no HUD, no coins, no sprites, no score, no particles, no parallax, no route drawing. Motion is limited to hover/focus states, link underlines, and a light scroll fade-in.

Identity language stays broad and current (AI Builder, Agent Maker, Product-minded Developer, learning in public). Avoid narrow stack labels like JS/TS/React in identity copy — but stack facts are welcome as entry metadata, where they are facts rather than self-description.

### Anti-generic rules

The page must not read as a template. These are hard constraints, not preferences:

- No `01 / 02 / 03` section numbering, and no all-caps English eyebrows above Chinese headings. Numbering is only allowed if the content is genuinely a sequence.
- No default accent colors. Specifically avoid Tailwind blue `#2563eb`, terracotta on cream, and neon-on-black.
- No mirrored zh/en copy. Write one language per slot and pick the one that carries information.
- Prefer concrete things over abstract labels. A project's own app icon and a plain sentence beat `AI Tool · Desktop App`.
- Every decorative element must be cut unless it encodes something true about the content.

## Site Structure

One screen, no top nav:

1. Hero — the wordmark **Panionk** (his name in English contexts), with 孙小帅 and `@JS-banana` on the line below, then the motto and one supporting line
2. 项目 — a row of round app icons, each with a name and one short sentence
3. Footer — the social dock, then the English signoff, then a copyright line, centred as one closing group

There is no top navigation: the page is too short to need jump links. Do not list individual blog posts; the blog has its own index. Do not add a "coming soon" or unfinished-products section.

Do not put numbers on the page — no star counts, repo totals, languages, or last-updated dates. They do not help a reader decide anything and they make the layout heavy. The page is fully static; there is no data fetching.

## Site Content

All copy and links live in `data/` as TypeScript modules.

- `data/urls.ts` — canonical outbound URLs (GitHub, blog, Juejin, X, WeChat)
- `data/site.ts` — site meta
- `data/hero.ts` — the motto, the supporting line, and the footer signoff
- `data/projects.ts` — project entries, their curated order, and icon paths
- `data/social.ts` — the dock entries
- `data/icons.ts` — brand icon paths inlined from simple-icons
- `data/sections.ts` — the 项目 heading and the "全部仓库" link

Project icons are the real application icons pulled from each project's own repo, stored under `public/assets/projects/`. Never substitute an AI-generated icon.

The share image is generated at build time by `app/opengraph-image.tsx` from the same `data/` modules, so it follows any copy change automatically. It uses two subsetted fonts in `app/og/`: `og-plex.ttf` (ASCII only) and `og-noto.ttf` (only the handful of Chinese glyphs currently on the card). **If you add new Chinese characters to the share image, re-subset `og-noto.ttf` or those glyphs will render blank.** Satori also requires `display: flex` on any element with more than one child, so keep interpolated text inside a single template string.

`components/panionk/PanionkSite.tsx` renders everything on the server. Only two client islands exist: `Reveal.tsx` (scroll fade) and `SocialDock.tsx` (dock plus the WeChat overlay).


## Assets

The generated game-theme PNGs under `public/assets/generated/` are retired and removed. Do not reintroduce them.

Reference images under `docs/design/references/` are for visual guidance only; never slice them into the site.

Use real product screenshots if a project entry ever needs a visual. Never use AI-generated fake product UI.

## Implementation Constraints

- Projects are round icons on a light circular plate, with no bounding box. Three columns on desktop; under 620px they become icon-left / text-right rows.
- The dock holds every external platform. Icons only, with the name surfacing on hover or focus; each item needs an `aria-label`.
- The footer is sticky, not fixed: `.wrap` is a flex column with `min-height: 100dvh` and `main { flex: 1 }`. Nothing on the page uses `position: fixed` except the WeChat overlay. Honour `env(safe-area-inset-bottom)` in the footer padding.
- Never give a single project a hero-sized layout.
- Build structure with plain CSS: hairlines, grid, focus rings, hover states. No SVG diagrams, no canvas.
- Do not add a dependency for anything CSS can cover. Framer Motion and lucide-react were removed for exactly this reason — the scroll fade is an IntersectionObserver and the two icons are inline SVG / a text arrow.
- Respect `prefers-reduced-motion` for every transition.
- Latin/numeral font is self-hosted (latin subset). Do not load fonts from Google CDN — a large share of readers are in mainland China.

## Stack And Commands

Stack:

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4 (imported for its preflight reset only; the site's styles are hand-written CSS in `app/globals.css`)
- IBM Plex Mono, self-hosted latin subset in `public/fonts/`, wired up with `next/font/local`

Commands:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

Use `rtk` when running shell commands from Codex.

## Verification

For visual work:

- run `pnpm build` before handoff when feasible,
- inspect desktop and mobile layouts,
- check that text remains DOM-rendered and readable,
- verify reduced-motion behavior,
- confirm the footer sits at the bottom of the viewport on a tall screen and does not overlap content on a short one,
- confirm the WeChat overlay opens, closes on Escape and backdrop click, and returns focus to its trigger.

Preserve unrelated dirty worktree changes unless the user asks to include them.

## Agent skills

### Issue tracker

Issues live as markdown under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.
