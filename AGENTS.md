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
pnpm build      # 静态导出到 out/
pnpm lint
pnpm ship       # 构建并发布到服务器
pnpm rollback   # 回滚到上一个版本
```

Use `rtk` when running shell commands from Codex.

Never run `pnpm build` while `pnpm dev` is running — they share `.next` and the build clobbers the dev manifest, which shows up as `__webpack_modules__[moduleId] is not a function`. Stop dev first, or delete `.next` afterwards.

## Deployment

This repo is public. Never commit the origin server's IP address, credential file paths, zone or project identifiers, or anything else that would help someone reach the origin directly — Cloudflare sits in front precisely to keep it unreachable. Refer to the host by its SSH alias only.

The site is a static export served by nginx on the `claw` host, with Cloudflare in front. It is **not** on Vercel any more.

- Releases: `/srv/panionk/releases/<timestamp>/`, with `/srv/panionk/current` symlinked to the live one. `pnpm ship` uploads a new release and flips the symlink atomically, keeping the last 5.
- nginx site config lives at `/etc/nginx/sites-available/laifuyou.com`.
- TLS: Let's Encrypt for `laifuyou.com` + `www.laifuyou.com`, issued over DNS-01 with the certbot Cloudflare plugin, auto-renewing. DNS-01 is what lets a certificate be issued before the domain points at the host, so a migration needs no downtime.
- DNS: both records are A records to the host, proxied through Cloudflare. `www` 301-redirects to the apex.
- Security headers live in `/etc/nginx/snippets/panionk-security.conf` and are `include`d in every `location` block — nginx drops inherited `add_header` directives in any location that declares its own, so they cannot sit at server level.
- The host only accepts traffic on 80/443 from Cloudflare's published ranges (ufw rules tagged `Cloudflare`); everything else times out, so the origin cannot be reached directly even if its address becomes known. `/etc/nginx/conf.d/cloudflare-realip.conf` maps `CF-Connecting-IP` back onto the client address so logs and fail2ban still see real visitors. Both lists come from `cloudflare.com/ips-v4` and `ips-v6` — if you ever refresh one, refresh the other too, and re-run `certbot renew --dry-run` afterwards, since the other certificates on this host validate over HTTP-01 through the proxy.
- Infrastructure credentials (Cloudflare DNS token) live in `.env.local`, which is gitignored. The app itself reads no environment variables at build or runtime.

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
