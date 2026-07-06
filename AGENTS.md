# PANIONK Agent Notes

## Project Purpose

PANIONK is a single-page personal portal for a product-minded developer focused on AI, agents, app building, and public learning.

The site should act as:

- a memorable personal entrance,
- a compact showcase for shipped apps/tools,
- a clear path to writing, GitHub, Juejin, X, and other public traces.

Do not turn this into a multi-route app unless explicitly requested. The intended experience is one clear scroll from top to bottom.

## Current Direction

Design direction: a playable personal archive / AI builder workbench.

Use game-like elements as living interface details, not as static decoration:

- scroll progress HUD,
- collectible coins/tokens,
- small sprite motion,
- hover sparks,
- route/path drawing,
- portal/footer particles,
- subtle parallax and card lift.

Keep the visual language original. Do not copy Mario, Nintendo, or other recognizable game IP.

Identity language should stay broad and current:

- AI Builder,
- Agent Maker,
- Product-minded Developer,
- Creative Execution,
- Learning in public,
- Shipping in small loops.

Avoid narrow stack labels like JS/TS/React in the main identity UI unless the user asks for them.

## Site Structure

The current target page has five sections:

1. Hero
2. Identity / AI Maker Profile
3. Projects
4. Writing / Learning Trail
5. Elsewhere / Footer

Do not add a "coming soon", "new quest", or unfinished-products section. Show only public projects or public traces.

## Design References And Assets

Reference images live in `docs/design/references/`. They are for visual guidance only; do not slice them into the website.

Runtime assets live in `public/assets/generated/` and are documented in `docs/design/ASSET-MAP.md`.

Important asset rules:

- Render text, nav, HUD, CTAs, cards, route lines, and progress indicators as DOM/SVG/canvas, not as baked image text.
- Use `hero-workbench-bg.png` and `identity-silhouette-panel.png` as atmospheric backgrounds with DOM overlays.
- Use `paper-texture.png` as a reusable card/paper texture.
- Use `portal-glow.png` only as the footer portal interior/glow; build the frame and links in code.
- Use `pixel-sprites.png` for small decorative/interactable sprites.
- Use real product screenshots for ANYCHAT and AMBERKEEPER. Do not use AI-generated fake product UI in project cards.

## Implementation Constraints

Prefer reusable, scalable components over section-specific one-offs:

- project cards should support at least 2 cards per row on desktop,
- link cards should share one component shape,
- tags/chips should be generic enough for future content,
- decorative motion should be opt-in and respect reduced motion.

Keep project cards compact. A single product should not receive a hero-sized layout by default.

Build visual structure with native web tools first:

- CSS for frames, grids, texture overlays, focus rings, hover states,
- SVG for route lines, node diagrams, and progress rails,
- canvas only where many small particles/sprites make DOM awkward,
- Framer Motion for simple reveal/hover/scroll motion already fits the stack.

Do not add a dependency for effects that CSS/SVG/canvas can reasonably cover.

## Stack And Commands

Stack:

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react

Commands:

```bash
npm install
npm run dev
npm run build
npm run lint
```

Use `rtk` when running shell commands from Codex.

## Verification

For visual work:

- run `npm run build` before handoff when feasible,
- inspect desktop and mobile layouts,
- check that text remains DOM-rendered and readable,
- verify reduced-motion behavior for decorative animations,
- confirm project cards still scale beyond the current two projects.

Preserve unrelated dirty worktree changes. Current historical `docs/design/web1` and `docs/design/web2` deletion states are not part of the active redesign unless the user asks.
