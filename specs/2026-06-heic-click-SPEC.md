# HEIC.click — Implementation Spec

**Status:** Draft v1 · **Date:** 2026-06
**Goal:** Ship a zero-upload, unlimited, ads-free HEIC→JPG batch converter that wins the ~1.2M/mo "heic to jpg" SEO cluster.
**Target ship:** 1 weekend (~10 hours)
**Domain:** `heic.click` (DNS-verified free 2026-06)
**Repo:** `github.com/shrestha-tripathi/heic-click` (private)

---

## 0. Why this product

| | |
|---|---|
| **Primary keyword** | "heic to jpg" — ~1.2M/mo global |
| **Long-tail cluster** | "convert heic", "heic converter", "iphone photo to jpg", "open heic on windows", 50+ variants |
| **Pain frequency** | Daily — every iPhone user × every non-Apple recipient |
| **Audience size** | 1.5B+ iPhone users, ~70% have non-iPhone recipients in their network |
| **Competition** | iloveimg (5-file cap, ads, upload), cloudconvert (25/day cap), heictojpg.com (slow, upload). **All upload. None unlimited free.** |
| **Wedge** | Pure client-side · unlimited batch · no signup · no ads · drop folder of 200 in 10sec |
| **WorksOffline fit** | Perfect — extends "data never leaves device" brand |

---

## 1. User flows

### 1.1 Desktop flow (Chromium — has File System Access)

```
1. Land on heic.click
2. See hero: "Drop iPhone HEIC photos. Get JPGs. Nothing leaves your browser."
3. Big drop zone: "Drop .heic files or pick folder"
4. Drag 50 HEICs → automatic batch convert
5. Live progress per file + global progress bar
6. "Save 50 JPGs to folder" button → showDirectoryPicker → all written
7. "Or download as .zip" button (universal fallback)
```

### 1.2 Desktop flow (Firefox/Safari — no File System Access)

Same as 1.1 but step 6 is "Download as .zip" only (no folder picker option).

### 1.3 Mobile iOS flow

```
1. Land on heic.click
2. Tap "Pick photos" → iOS photo picker
3. Multi-select up to 50 HEICs from camera roll
4. Auto-convert one at a time (memory-safe on iOS)
5. "Share JPGs" button → Web Share API → AirDrop / WhatsApp / Mail / Save to Files
6. (After PWA install) appear in iOS Share Sheet for in-place "Share via HEIC.click"
```

### 1.4 Mobile Android flow

Same as 1.3 + Web Share Target support (PWA install adds "HEIC.click" to system share sheet).

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro 6** (static) | Use `astro-microtool-scaffold` skill |
| Styling | **Tailwind v4** | `@theme` directive, no config file |
| HEIC decode | **`libheif-js@1.18`** (WASM, ~1.5MB gz) | npm: `libheif-js` |
| JPG encode | **Canvas `toBlob('image/jpeg', 0.92)`** | Native, no lib |
| Worker pool | **`comlink`** + 4 Web Workers | Parallel conversion on desktop |
| Mobile worker | 1 Worker only (memory cap) | Detect via `navigator.deviceMemory < 4` |
| Folder save | **File System Access API** (Chromium) | `showDirectoryPicker` + `createWritable` |
| Zip download | **`client-zip@2.4`** (streaming) | ~3KB gz, no temp memory |
| Share | **Web Share API** + **Web Share Target** | `manifest.webmanifest` registers handler |
| PWA install | Standard manifest + service worker | For Share Target eligibility |
| State | Module-level + URL params for "open in HEIC" share | Zero framework |
| Analytics | **GA4** | Env-gated to production via `astro-microtool-scaffold` GA recipe |
| SEO | JSON-LD `WebApplication` + `FAQPage` + `HowTo` | Day-1 schema |
| Deploy | **Cloudflare Pages** auto-deploy from `main` | ~90s rebuild |

**Why libheif-js over heic2any:** libheif-js is the official emscripten port of libheif (industry-standard); heic2any wraps it but adds 200KB of helpers. We need batch + worker support — better to call libheif-js directly.

---

## 3. File structure

```
heic-click/
├── astro.config.mjs            # Astro 6, env-driven base
├── package.json                # libheif-js, comlink, client-zip, tailwindcss
├── tailwind.config             # (none — v4 uses @theme)
├── public/
│   ├── manifest.webmanifest    # PWA + Share Target for .heic
│   ├── favicon.svg             # theme-adaptive (currentColor)
│   ├── og-image.png            # 1200×630 wordmark
│   ├── robots.txt              # allow all + sitemap link
│   └── _headers                # noindex *.pages.dev guard
├── src/
│   ├── site.config.ts          # brand strings (env-driven)
│   ├── layouts/Layout.astro    # JSON-LD, OG, canonical
│   ├── pages/
│   │   ├── index.astro         # hero + dropzone + features
│   │   ├── how-it-works.astro  # SEO-juicy explainer
│   │   ├── faq.astro           # JSON-LD FAQPage
│   │   ├── privacy.astro       # "nothing leaves device" guarantee
│   │   ├── share.astro         # Web Share Target landing (?title=&files=)
│   │   ├── 404.astro
│   │   └── sitemap.xml.ts      # custom route, exclude /share
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── DropZone.astro      # the workhorse — drag+drop+picker UI
│   │   ├── FileRow.astro       # per-file progress row
│   │   └── SaveAllBar.astro    # "Save to folder" + "Download .zip"
│   ├── lib/
│   │   ├── convertHeic.ts      # main convert function (calls Worker)
│   │   ├── conversionWorker.ts # Web Worker: libheif decode + canvas encode
│   │   ├── workerPool.ts       # comlink-based pool (4 desktop, 1 mobile)
│   │   ├── savingPaths.ts      # FSA + zip + share helpers
│   │   ├── shareTarget.ts      # parse incoming POST from share sheet
│   │   └── capabilities.ts     # feature detection (FSA, ShareTarget, etc.)
│   └── styles/global.css       # @import tailwindcss + @theme tokens
├── DESIGN.md                   # visual contract (copy template from FTN)
├── AGENTS.md                   # project rules for AI agents
├── .skills/                    # project-local skills
│   ├── web-design-guidelines/SKILL.md
│   └── tailwind-4-docs/SKILL.md
├── .env.example                # PUBLIC_SITE_URL, PUBLIC_SITE_DOMAIN
└── README.md
```

**LOC budget:** ~400 LOC TS · ~150 LOC Astro · ~80 LOC CSS · **~630 total**

---

## 4. Key engineering decisions

### 4.1 Worker pool sizing
- Desktop with `navigator.deviceMemory >= 4`: **4 workers** (parallel decode)
- Mobile / low-memory: **1 worker** (serial — prevent OOM on iOS)
- Each worker holds its own libheif instance (5MB heap × N)

### 4.2 Memory pressure
- iOS Safari kills tabs at ~250MB
- Worst case: 24MP HEIC → 12MP canvas → 5MB JPG buffer
- Mitigation: serial on mobile + `URL.revokeObjectURL` immediately after share
- For 100+ file batches on mobile: stream to OPFS instead of holding all in memory, then read back for zip

### 4.3 File System Access API gotchas
- Chrome desktop only (Firefox/Safari never)
- Requires user gesture for `showDirectoryPicker`
- Use `permission.query({mode: 'readwrite'})` first to detect denial
- Fallback: download `.zip` via client-zip streaming

### 4.4 Web Share Target setup
**`manifest.webmanifest`:**
```json
{
  "name": "HEIC.click",
  "short_name": "HEIC",
  "start_url": "/?source=pwa",
  "display": "standalone",
  "theme_color": "#0a0a0a",
  "background_color": "#0a0a0a",
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "files": [
        { "name": "files", "accept": ["image/heic", "image/heif", ".heic", ".heif"] }
      ]
    }
  },
  "file_handlers": [
    {
      "action": "/",
      "accept": { "image/heic": [".heic"], "image/heif": [".heif"] }
    }
  ]
}
```

**`/share` page** parses incoming POST → reads files → routes to converter.

### 4.5 EXIF preservation
- v1: discard EXIF (simpler, smaller JPG)
- v2 ($199 LTD): preserve EXIF via `piexifjs` (~50KB) — bake into LTD tier

### 4.6 Output quality
- Default JPEG quality 0.92 (matches Apple's iOS export quality)
- LTD tier: slider 0.7 – 1.0 + format toggles (PNG, WebP)

---

## 5. UI / DESIGN

### Hero
```
┌─────────────────────────────────────────┐
│   HEIC.click                            │
│                                         │
│   Drop iPhone photos.                   │
│   Get JPGs. Instantly.                  │
│                                         │
│   Nothing uploads. Zero limits.         │
│   Free forever.                         │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │   ⬇ Drop .heic files here       │   │
│   │   or [ Pick photos ]            │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ✓ Unlimited files  ✓ No signup        │
│   ✓ No ads  ✓ Works offline             │
└─────────────────────────────────────────┘
```

### After drop
```
Converting 47 / 200 photos…

IMG_0001.heic → IMG_0001.jpg ✓  (2.1 MB → 0.8 MB)
IMG_0002.heic → IMG_0002.jpg ✓  (1.8 MB → 0.7 MB)
IMG_0003.heic ▓▓▓▓░░░░░░ 41%
IMG_0004.heic ─ queued
IMG_0005.heic ─ queued
...

[ Save 47 photos to folder ]   [ Download as .zip ]
```

### Color tokens (Tailwind v4 `@theme`)
- Light: `#fff` bg, `#0a0a0a` fg, `#2563eb` accent (matches Apple blue for affinity)
- Dark: `#0a0a0a` bg, `#fafafa` fg, `#60a5fa` accent
- Success: `#16a34a` (green checkmarks)

### Typography
- Body: `system-ui` (zero loading)
- Display headings: `system-ui` + `font-weight: 800` (skip custom font for ship speed)

---

## 6. SEO day-1

### 6.1 JSON-LD schemas (Layout.astro)
- `WebApplication` with `applicationCategory: MultimediaApplication`
- `Organization` (WorksOffline)
- `FAQPage` on /faq with 8-12 Q&As
- `HowTo` on /how-it-works with numbered steps
- `BreadcrumbList` on subpages

### 6.2 Target keywords (page → primary kw)
| Page | Primary keyword | Volume/mo |
|---|---|---|
| `/` | "heic to jpg" | 800k |
| `/convert-heic` (alias) | "convert heic" | 300k |
| `/heic-to-jpg-windows` | "heic to jpg windows" | 60k |
| `/heic-to-jpg-mac` | "heic to jpg mac" | 40k |
| `/heic-to-png` | "heic to png" | 90k |
| `/open-heic-file` | "open heic file" | 70k |
| `/iphone-photo-to-jpg` | "iphone photo to jpg" | 100k |
| `/faq` | long-tail FAQ snippets | ∞ |

### 6.3 Content moats
- Inline conversion right on landing — Google rewards interactive SERP results
- Anchor-link FAQ from hero ("Can it open my .heic?" → /faq#open)
- Indexable code samples for devs (`heic-to-jpg-javascript` long-tail)

### 6.4 Off-page (week 1-2)
- ProductHunt launch
- HackerNews "Show HN: heic.click — unlimited HEIC→JPG, no upload"
- /r/iphone, /r/apple, /r/SideProject
- iA Writer template "How I shipped HEIC.click in a weekend" blog post

---

## 7. Monetization

### Free tier (forever)
- Unlimited files
- Batch up to 500 at once (memory-soft cap)
- HEIC → JPG only
- Default quality
- No EXIF preservation
- Browser-local only

### LTD tier — ₹199 (~$2.40) lifetime
- HEIC → PNG, WebP, AVIF
- Quality slider
- Preserve EXIF (date, GPS, camera info — optional toggle)
- Bigger batches (5000 files)
- Rename pattern (e.g. `IMG_YYYY-MM-DD_001.jpg`)
- Workflow recipes (save format choices as presets)
- "Powered by HEIC.click" link in About → off

Stripe one-time payment · license key stored in localStorage · zero auth · zero backend.

### Estimated traffic & revenue (6 mo)
- Conservative: 50k MAU → 0.3% conv to ₹199 = ₹30k/mo
- Realistic: 120k MAU → 0.5% conv = ₹120k/mo
- Optimistic: 250k MAU → 1.0% conv = ₹500k/mo passive

---

## 8. Ship plan (10 hours)

| Hour | Task | Verification |
|---|---|---|
| 0:00 – 0:30 | Scaffold via `astro-microtool-scaffold` skill | `npm run build` green |
| 0:30 – 1:00 | DESIGN.md + AGENTS.md + tokens + Layout | Visit `/`, see hero |
| 1:00 – 2:30 | DropZone component + file picker + drag-drop | Drop file → console.log filenames |
| 2:30 – 4:30 | Worker pool + libheif convert | One HEIC converts → preview shows |
| 4:30 – 5:30 | Batch UI + per-file progress rows | Drop 10 files → all convert serially |
| 5:30 – 6:30 | Save to folder (FSA) + Download .zip | Both buttons write valid files |
| 6:30 – 7:30 | PWA manifest + Share Target + /share page | Install PWA, share .heic from Files app on Android |
| 7:30 – 8:30 | SEO pages (/, /faq, /how-it-works, /privacy) + JSON-LD | view-source shows schemas |
| 8:30 – 9:30 | OG image + favicon pack + sitemap.xml + robots.txt | `curl /sitemap.xml` returns valid XML |
| 9:30 – 10:00 | Cloudflare Pages deploy + custom domain + verify | https://heic.click loads with HTTPS |

---

## 9. Non-goals (explicitly excluded)

| Won't ship | Why |
|---|---|
| User accounts | Zero-friction is the wedge |
| Cloud storage | Violates "nothing leaves device" |
| Image editing (crop/rotate) | Out of scope — recommend Photos app |
| Bulk rename UI in free tier | Reserved for LTD |
| Watermark | Hurts brand trust |
| Mobile native apps | PWA covers it, no app-store tax |
| RAW format support | Wrong product (different audience) |
| API for developers | Phase 2 if demand exists |
| Bulk upload to cloud (Dropbox/Drive) | Web Share API + system flow handles it |

---

## 10. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| libheif-js WASM fails on old browsers | Low | Detect via try/catch on init; show "browser unsupported" page with alternatives list |
| iOS Safari OOM on 50+ photos | Medium | Hard cap mobile batches at 50 + show warning at 30 |
| Web Share Target rejected by user (no install) | Medium | UI never depends on it — just an enhancement |
| AdSense rejects "single-page tool" | Medium | Add /faq + /how-it-works + /privacy + /about + blog before applying |
| HEIC.click trademark conflict | Low | Search USPTO + EUIPO before buying domain |
| Cloudflare Pages bandwidth quota | Low | Free tier = unlimited bandwidth; only build minutes capped |
| Heic.click DNS resolution lies | Low | DNS-verified 2026-06-06 free; re-verify on Namecheap/Porkbun day-of |

---

## 11. Post-launch backlog (NOT v1)

- v1.1: Right-click context menu integration (Chrome only)
- v1.2: Drag JPGs back OUT of browser to native folder (Chrome FSA)
- v1.3: Bulk EXIF view/strip mode
- v1.4: Smart album detection ("These 20 are bursts — keep best?")
- v2.0: Sister tool `JPG.click` (compress JPGs offline) cross-link

---

## 12. Verify before shipping

```bash
# Site builds clean
cd ~/projects/heic-click && npm run build && npx astro check

# All target pages return 200
for p in / /faq /how-it-works /privacy /share; do
  curl -fsSI https://heic.click$p | head -1
done

# JSON-LD schemas valid
curl -s https://heic.click | grep -oP 'application/ld\+json[^>]*>[^<]+' | jq .

# Sitemap valid
curl -s https://heic.click/sitemap.xml | xmllint --noout -

# Share Target manifest valid
curl -s https://heic.click/manifest.webmanifest | jq .share_target

# Lighthouse all 4 scores ≥ 90
npx lighthouse https://heic.click --quiet --chrome-flags="--headless"
```

---

## 13. Open questions for Shrestha

1. **Brand**: `HEIC.click` or `HEIC.do` (taken — alternative options: `HEIC.fyi`, `HEICflip.com`)?
2. **Pricing**: ₹199 (~$2.40) or $5 USD-equivalent for LTD?
3. **Stripe vs Razorpay** for India-first checkout?
4. **AdSense from day 1** (after 30 daily users) or skip ads entirely and rely on LTD?
5. **Subdomain on `worksoffline.in`** (e.g. `heic.worksoffline.in`) or standalone `heic.click`? (Standalone wins for SEO; subdomain is faster to ship if domain purchase delayed)
