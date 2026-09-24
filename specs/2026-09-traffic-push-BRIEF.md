# Executor brief — traffic push (approved 2026-09-24)

Scope for each repo: Phase A (GEO) → Phase B (WebMCP) → Phase C (programmatic SEO). User approved all 3 phases.
Full spec: ~/projects/worksoffline/specs/2026-09-traffic-push-geo-pseo-webmcp.md

## Rules
- HARD TIME LIMIT ~9 minutes per run. Work fast: no exploratory reading beyond what's needed. PUSH IMMEDIATELY after each phase merge so nothing gets lost. If you're running out of time, commit WIP on the feature branch and push the branch.
- One branch + one commit per phase per repo: `feat/geo`, `feat/webmcp`, `feat/pseo`. Merge `--no-ff` to main, push main + branch.
- WSL git pitfall: use `timeout 40 git branch -f feat/x main` then `timeout 40 git switch feat/x`; never `git checkout`. One git op per terminal call. Re-verify with `git log --oneline -1 main` after merges.
- Push: `TOKEN=$(timeout 60 "/mnt/c/Program Files/GitHub CLI/gh.exe" auth token 2>/dev/null | tr -d '\r\n')` (the .env token is stale, don't use it); `git remote set-url origin "https://shrestha-tripathi:${TOKEN}@github.com/shrestha-tripathi/<repo>.git"`; push; then IMMEDIATELY reset the URL to the tokenless form. Never print the token.
- Before every commit: `npm run build` must be green (plus `npm test` / `npx astro check` if present). Don't commit a broken build.
- Brand/domain strings come from `src/site.config.ts` (or the repo equivalent). Don't hardcode them.
- Keep both themes working. Muted text min `text-sm`, no opacity on muted text.
- Don't touch dependency versions. Astro 6 + TW v4 pins: `@tailwindcss/vite@4.3.0`, `astro@6.4.4`, overrides vite 7.3.5.
- No fabricated stats/claims. Keep "data never leaves device" accurate to what the code actually does.
- Any existing `/app` must keep working.

## Phase A — GEO
1. `public/llms.txt` (llmstxt.org format: `# Name`, `> one-line summary`, short "what/privacy/limits" paragraphs, `## Pages` list of absolute URLs + 1-line descriptions). Also `public/llms-full.txt` with FAQ answers inlined.
2. `robots.txt`: keep existing rules; add explicit `Allow: /` blocks for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot. Keep the Sitemap line.
3. Answer-first "TL;DR" block (40–60 words; states what it does, that it's free, runs in the browser, and the key limit) near the top of the homepage and main tool page. Match existing styling.
4. JSON-LD: add `SoftwareApplication`/`WebApplication` (applicationCategory, operatingSystem "Any (web browser)", offers price 0 INR/USD, isAccessibleForFree) if missing. Add `Organization`/`publisher` pointing to https://worksoffline.in. Fill FAQPage/HowTo gaps. Don't duplicate existing blocks.
5. Freshness: visible "Last updated <Month YYYY>" on landing pages + `dateModified` in JSON-LD, from one constant in site config.

## Phase B — WebMCP (progressive enhancement)
- Add `src/lib/webmcp.ts`: feature-detect `navigator.modelContext` (check both `registerTool` and `provideContext`). If absent → no-op. Wrap everything in try/catch. Zero bundle impact beyond a few KB, and never throws.
- Tool shape: `{ name, description, inputSchema (JSON Schema), execute: async (args) => ({ content: [{ type: "text", text }] }) }`. Register with `registerTool` if present, else `provideContext({ tools })`.
- Tools call the app's EXISTING functions or drive the existing UI (set options, open the file picker, trigger the button). No duplicate processing logic. If the tool needs a file, it opens the existing picker / uses the current loaded file and says so in the result text.
- Register only on the page that has the tool UI (usually /app or index).
- Add a short "AI agent ready (WebMCP)" line to the FAQ or how-it-works page.

## Phase C — Programmatic SEO
- `src/data/pseo.ts`: array of entries `{ slug, title, h1, metaDescription, intro, steps[], tips[], faqs[{q,a}], related[] }`. Every entry gets GENUINELY unique intro/steps/tips/faqs with real specifics (platform limits, formats, sizes). No thin spun copy. These must pass AdSense.
- One dynamic template `src/pages/[slug].astro` (or a subfolder if the root collides) with `getStaticPaths`. Reuse the Layout. CTA to the tool (with a preset query param if the app supports it). Per-page FAQPage + HowTo + BreadcrumbList JSON-LD. Related-pages links. Hub/index page linking all entries. Link to the hub from the footer or nav.
- Only state platform limits you're confident are current (e.g. Discord free upload 10 MB, Gmail attachment 25 MB, WhatsApp media ~16 MB for regular sends / 2 GB as document). If unsure, phrase it softly ("typically", "at the time of writing").
- Check the sitemap includes the new pages. Add the new URLs to llms.txt.
- Must not collide with existing slugs.

## Report back (concise)
Per repo: 3 merge hashes, pages added, WebMCP tools registered, anything skipped and why, and any deploy/manual steps for Shrestha.
