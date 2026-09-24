# Traffic Push — GEO + Programmatic SEO + WebMCP (10 properties)

Status: DRAFT, awaiting approval · 2026-09-24

## Current state (audited from local repos)
| Property | Repo | Stack | Pages | FAQ/HowTo schema | llms.txt | WebMCP |
|---|---|---|---|---|---|---|
| Alwaysontopnotes | alwaysontopnotes | Astro 6 | 12 | ✅/✅ | ❌ | ❌ |
| CompressVideoFile | compressvideofile | Astro 6 | 10 | ✅/✅ | ❌ | ❌ |
| FloatingTeleprompter | floatingteleprompter | Astro 6 | 9 | ✅/✅ | ❌ | ❌ |
| HEICPix | heicpix | Astro 6 | 31 (pSEO exists) | ✅/✅ | ❌ | ❌ |
| LiveCaptionIt | captionpip | Astro 6 | 16 (pSEO exists) | ✅/✅ | ❌ | ❌ |
| MagicPhotoEraser | magicphotoeraser | Astro 6 | 10 | ✅/✅ | ❌ | ❌ |
| ScreenColorPicker | screencolorpicker | Astro 6 | 22 (pSEO exists) | ✅/✅ | ❌ | ❌ |
| Webtools | devtoy | **Vite SPA** | 0 static | ❌ | ❌ | ❌ |
| Worksoffline | worksoffline | **Next 14** | – | ❌ | ❌ | ❌ |
| subtitletranslatorfree | translatesubtitlefile | Astro 6 | 8 | ✅/❌ | ❌ | ❌ |

## Workstream 1 — GEO (all 10)
1. `public/llms.txt` + `llms-full.txt` (tool summary, privacy claim, page index).
2. Answer-first block (40–60 word TL;DR) at top of every landing page.
3. JSON-LD: `SoftwareApplication` (+ `offers` free), FAQPage, HowTo where missing; `Organization` sameAs → worksoffline.in.
4. `robots.txt`: explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot.
5. Visible "Last updated" date + `dateModified` (freshness signal).

## Workstream 2 — Programmatic SEO
Shared: one data file (`src/data/pseo.ts`) → one `[slug].astro` template → sitemap. Each page needs **unique** intro/steps/FAQ (no thin clones, AdSense-safe). Start at 15–30 pages per site, grow if GSC shows impressions.

| Site | Page families (examples) | Wave-1 count |
|---|---|---|
| CompressVideoFile | "compress video for {WhatsApp/Discord 10MB/Gmail 25MB/Instagram/…}", "compress {MP4/MOV/MKV/WebM}", "reduce video to {N}MB" | 25 |
| subtitletranslatorfree | "translate SRT {lang A} to {lang B}" (Indian languages + top 10 global), "translate {VTT/SRT}", "{Netflix/YouTube} subtitles" | 30 |
| MagicPhotoEraser | "remove {people/text/watermark/objects/shadow} from photo", "for {Meesho/Amazon/Flipkart} product photos" | 15 |
| FloatingTeleprompter | "teleprompter for {Zoom/Teams/Meet/YouTube/OBS/Loom}", "{Mac/Windows/iPad}" | 15 |
| Alwaysontopnotes | "always on top notes {Windows/Mac/Chromebook}", "sticky notes over {Zoom/Teams/Netflix}" | 12 |
| HEICPix | already 31 → add HEIC→PDF, bulk, iPhone-specific, EXIF variants | +10 |
| LiveCaptionIt | already 16 → add per-language + "captions for {Teams/Webex/Twitch}" | +10 |
| ScreenColorPicker | already 22 → "{brand} color codes" pages? (flag: thin-content risk) | +8 |
| Webtools (devtoy) | one page per tool (JSON formatter, base64, regex, cron…) | **blocked: needs SSG, see pushback** |
| Worksoffline | tool directory + "offline alternative to {iLovePDF/Remove.bg/…}" | 10 |

## Workstream 4 — WebMCP tool exposure
Shared tiny module `webmcp.ts` (feature-detect `navigator.modelContext`, register tools, no-op otherwise). Zero cost for normal users.

| Site | Tools exposed |
|---|---|
| CompressVideoFile | `compress_video({targetMB, preset})` |
| HEICPix | `convert_heic({format, quality, stripExif})` |
| subtitletranslatorfree | `translate_subtitles({from, to})` |
| MagicPhotoEraser | `open_eraser()`, `remove_background()` if exists |
| ScreenColorPicker | `pick_color()`, `contrast_check({fg,bg})` |
| FloatingTeleprompter | `load_script({text, speed})`, `start/stop` |
| Alwaysontopnotes | `create_note({text})`, `list_notes()` |
| LiveCaptionIt | `start_captions({lang})`, `get_transcript()` |
| Webtools | one tool per utility (best fit — pure functions) |
| Worksoffline | `find_tool({task})` → routes to right site |
File inputs: tools accept a file handle where spec allows; otherwise open picker + return result.

## Pushback / decisions needed
1. **Webtools (devtoy) is a Vite SPA** → pSEO pages won't index well. Option A: migrate to Astro 6 (≈1 day, big win). Option B: vite-ssg prerender. Rec: **A**.
2. **Worksoffline is Next 14** — fine, use static export + `generateStaticParams`. No migration.
3. WebMCP is still early (origin trial/flag). Ship it as progressive enhancement; the payoff is being early, not traffic today.
4. ScreenColorPicker "brand colors" pages = thin-content risk → skip unless you want it.
5. worksoffline has 21 untracked `ideas/` files — commit them first or keep ignoring?

## Execution order (one commit per feature per repo)
Phase A: GEO across all 10 (fast, ~10 commits) →
Phase B: WebMCP module + tools (10 commits) →
Phase C: pSEO, highest-intent first: CompressVideoFile → subtitletranslatorfree → MagicPhotoEraser → FloatingTeleprompter → Alwaysontopnotes → Worksoffline → HEICPix/LiveCaptionIt/ScreenColorPicker top-ups → Webtools (after migration).
Each commit: `npm run build` green + preview check before push (CF Pages auto-deploys from main).
