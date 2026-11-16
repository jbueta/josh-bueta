---
name: nextjs-ui-refactor-workflow
description: >-
  Streamlines Next.js and React UI refactoring, section redesigns, asset
  placeholder generation, hydration-safe image rendering, portal modals, and
  CSS token/build auditing. Use when refactoring UI components, debugging
  hydration/image-loading bugs, scaffolding project/portfolio sections with
  API caching, or auditing design tokens before a production build.
---

# Next.js UI Refactor & Audit Workflow

## Overview

Provides a systematic workflow and CLI audit tool (`scripts/ui_audit.py`) for refactoring Next.js and React applications. It catches silent UI regressions—such as undefined CSS custom properties (`var(--*)`), SSR/hydration image-buffering bugs, clipped modals, missing `/public` assets, and unauthenticated API rate-limit failures—before running a build.

## Dependencies

- **`uv`** (`C:\Users\PLPASIG\.gemini\config\plugins\science\skills\uv\SKILL.md`): Preferred runner (`uv run`) for `scripts/ui_audit.py`. Because `ui_audit.py` uses pure Python 3 standard library (`argparse`, `json`, `urllib`, `pathlib`, `re`), it can also be executed directly with `python` if `uv` is not yet installed.

## Quick Start

Run all three static UI audits into a temporary JSON report file and inspect the summary:

```bash
uv run .agents/skills/nextjs-ui-refactor-workflow/scripts/ui_audit.py audit-tokens \
  --src src \
  --css src/app/globals.css \
  --single-theme \
  --limit 100 \
  --output audit_tokens.json
```

## Utility Scripts

All subcommands in [scripts/ui_audit.py](./scripts/ui_audit.py) write structured JSON output to `--output` and require an explicit `--limit`.

### 1. `audit-tokens` — Verify CSS Variables & Theme Consistency
Scans all `.ts`, `.tsx`, and `.css` files for `var(--*)` usages and verifies that every variable is defined in `globals.css` or `layout.tsx`. Pass `--single-theme` when locking an application to a single theme mode to flag leftover `dark:*` classes and `useTheme()` hooks.

```bash
uv run .agents/skills/nextjs-ui-refactor-workflow/scripts/ui_audit.py audit-tokens \
  --src src \
  --css src/app/globals.css \
  --single-theme \
  --limit 100 \
  --output token_report.json
```

### 2. `audit-hydration` — Detect SSR Image & Modal Anti-Patterns
Detects `<img` tags gated on `opacity: loaded ? 1 : 0` (which stay blank when cached before React hydration) and full-screen overlays (`fixed inset-0`) missing `createPortal`.

```bash
uv run .agents/skills/nextjs-ui-refactor-workflow/scripts/ui_audit.py audit-hydration \
  --src src \
  --limit 100 \
  --output hydration_report.json
```

### 3. `audit-assets` — Verify `/public` Static References
Checks every `/path/to/file.(svg|png|jpg|pdf|webp|ico)` string literal in `src/` against `public/` on disk.

```bash
uv run .agents/skills/nextjs-ui-refactor-workflow/scripts/ui_audit.py audit-assets \
  --src src \
  --public public \
  --limit 100 \
  --output asset_report.json
```

### 4. `fetch-github-repos` — Rate-Limited GitHub Repository Sync
Fetches public repository metadata from `https://api.github.com` with cross-process file-lock rate limiting (`1 req/s`) and exponential backoff on `403`/`429`/`5xx` to populate or update deterministic fallback datasets.

```bash
uv run .agents/skills/nextjs-ui-refactor-workflow/scripts/ui_audit.py fetch-github-repos \
  --username jbueta \
  --limit 10 \
  --output github_repos.json
```

## Workflow

1. **Inspect Existing Design Tokens & Layout**:
   - Read `src/app/globals.css` and `src/app/layout.tsx` to inventory all active CSS variables, fonts, and theme providers before editing components.
2. **Apply Hydration-Safe & Stacking-Context-Safe Component Patterns**:
   - Consult [references/component_patterns.md](./references/component_patterns.md) when building Hero images, lightboxes (`createPortal`), or cached API sections.
   - Generate deterministic SVG/image placeholders in `public/` whenever a showcase section requires visual previews.
3. **Run `ui_audit.py` Verification Suite**:
   - Execute `audit-tokens`, `audit-hydration`, and `audit-assets` via `uv run` and fix any reported issues.
4. **Type-Check with TypeScript**:
   - Run `npx tsc --noEmit` to confirm zero type errors across refactored files.

## Rate Limiting

- **GitHub REST API (`fetch-github-repos`)**: Enforces 1 request per second using `time.monotonic()` plus a cross-process lock file (`nextjs_ui_skill_github.lock` in the system temp directory). Retries `403`/`429` and `5xx` responses with exponential backoff (`2^attempt` seconds) and raises `RateLimitError` if limits remain exceeded.

## Common Mistakes

1. **Gating Hero/Above-the-Fold Images on `onLoad` State**: Cached images load before React attaches hydration listeners, causing `onLoad` to never fire and leaving the element permanently at `opacity: 0`. Always render above-the-fold images immediately with `fetchPriority="high" loading="eager"`.
2. **Rendering Lightboxes Inside Animated Sections Without `createPortal`**: Parent `transform` or `filter` properties from GSAP/Framer Motion trap `position: fixed` children inside the section's bounding box. Always portal modals to `document.body`.
3. **Leaving Undefined CSS Variables After a Palette Swap**: Renaming variables in `globals.css` without running `audit-tokens` leaves silent broken styles (`hsl(var(--old-token))`) in secondary components.
