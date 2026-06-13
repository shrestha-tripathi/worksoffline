# SPEC — MagicPhotoEraser (WipePic)

> **Brand decision pending.** This SPEC uses **MagicPhotoEraser** as the working name based on SEO stem analysis (captures top 3 stems: magic + photo + eraser). Backup: `photoeraserai.com` or `erasephoto.com`. Final brand locked once domain registered.

**Goal:** Ship a free-forever, fully client-side AI photo object remover that beats `cleanup.pictures` ($5/mo paywall) by running LaMa inpainting in-browser via WebGPU. Zero uploads — photos never leave the user's device.

**Architecture:** Astro 6 + Tailwind v4 SSG → static deploy on Cloudflare Pages. All AI inference runs client-side via `@huggingface/transformers` v3 with WebGPU backend. 200MB LaMa ONNX model cached permanently in OPFS. NO Cloudflare Worker needed (zero backend by design).

**Tech Stack (mirrors FTN / heicpix):** 
- Astro 6, Tailwind v4 (`@theme` tokens in `global.css`, NO `tailwind.config.js`)
- TypeScript strict
- `@huggingface/transformers` v3 (WebGPU runtime)
- Inline SVG + Lucide path data (no icon library)
- OPFS for model + recent-photo cache
- Web Share API for output to WhatsApp/Insta
- PWA install + service worker (basic offline shell — model lives in OPFS not SW cache)
- Deploy: Cloudflare Pages auto from `main` push, Cloudflare Registrar `.com`

---

## 🎯 Problem Statement

### The pain
1. **Photo has unwanted thing in it** — photobombers, electric wires across sky, tourist crowds, old ex-partner in wedding photo, smudge on product photo, random crow
2. **Current options all suck:**
   - `cleanup.pictures` — free for 3 photos/day THEN paywall ($5/mo). Reddit + Twitter full of users frustrated at paywall after the trial
   - `magiceraser.io` — same paywall trap
   - `snapedit.app` — signup wall + ads
   - Photoshop — ₹2000/mo + steep learning curve
   - Samsung Galaxy AI Object Eraser — locked to Galaxy S23+ owners
   - Google Pixel Magic Eraser — locked to Pixel phones
3. **All cloud-based incumbents UPLOAD your photo.** Wedding photos, sensitive personal moments — users aren't comfortable.

### The wedge
A consumer using a phone OR desktop browser searches "free magic eraser" or "cleanup.pictures alternative". We rank for those terms with:
- ✅ Free forever (literally $0 marginal cost — model runs on user's GPU)
- ✅ Photo never uploads (privacy moat that paywall-incumbents structurally cannot match — their business model REQUIRES cloud)
- ✅ Unlimited use, no signup, no install
- ✅ Works on iPhone Safari 18+, Android Chrome 121+, all Chromium desktops
- ✅ Result auto-downloads or shares via Web Share API

### Browser API capability (the NEW thing)

**LaMa inpainting** (~200MB ONNX model) running in browser via **WebGPU** is genuinely a 2024-2026 capability. Not possible before:
- WebGPU shipped Chrome 113 (May 2023), Safari 18 (Sep 2024), Android Chrome 121 (Jan 2024)
- `@huggingface/transformers` v3 added WebGPU backend (Oct 2024)
- ONNX Runtime Web added WebGPU EP (2024)
- OPFS (~200MB cache) — Safari 17 (Sep 2023), Chrome 102 (May 2022), Firefox 111 (Mar 2023)

**Practical speed on real devices (benchmarks from huggingface/transformers.js demos):**
- M2 MacBook Air: ~2-4 sec for 1024×1024 inpaint
- iPhone 15 Pro: ~6-12 sec for 1024×1024
- Pixel 8: ~8-15 sec for 1024×1024
- Mid-range Android (Snapdragon 7 Gen 2): ~15-30 sec (acceptable)
- iPhone 12 / Snapdragon 778 and older: WebGPU not supported → fallback to WASM (~60-90 sec, usable but slow)

---

## 🏗️ Architecture

### Pages
```
src/pages/
├── index.astro              # Landing — hero, demo video, FAQ, "Try it" CTA
├── erase.astro              # The actual eraser app (single-page tool)
├── how-it-works.astro       # Privacy explainer, technical FAQ
├── compare.astro            # Comparison vs cleanup.pictures / magiceraser
├── about.astro
├── contact.astro
├── privacy.astro
└── terms.astro
```

### Core library
```
src/lib/
├── eraser/
│   ├── modelLoader.ts       # OPFS-cached LaMa ONNX loader with progress
│   ├── inpaint.ts           # Main inference pipeline (image + mask → result)
│   ├── canvas.ts            # Canvas helpers (drawing brush, mask buffer, output)
│   └── webgpu.ts            # Capability detection + WASM fallback gate
├── brush/
│   ├── pointerBrush.ts      # Touch/mouse brush stroke handler
│   ├── brushSize.ts         # Brush size pinch-zoom + slider
│   └── maskBuffer.ts        # Offscreen canvas keyed to source resolution
├── share/
│   ├── webShare.ts          # Web Share API wrapper + clipboard fallback
│   └── downloadBlob.ts      # Anchor-based download
└── pwa/
    ├── installPrompt.ts     # Custom A2HS prompt (web-share-target ready)
    └── serviceWorker.ts     # Just app shell; model lives in OPFS
```

### Data flow (single inpaint cycle)

```
User picks photo (file input or share-target)
  ↓
Decode to ImageBitmap → render to <canvas data-source>
  ↓
User brushes over area to remove (touch/mouse, white on transparent overlay)
  ↓
On "Erase" tap:
  ├── Sanity-check WebGPU available (fallback: WASM with warning)
  ├── Load LaMa model from OPFS (or download once, cache 200MB)
  ├── Build mask tensor from brush canvas (resize to model input)
  ├── Resize source image to model input size (e.g. 1024×1024)
  ├── Run inpaint pipeline (image + mask → result, ~5-15s on phone)
  ├── Composite result back into original image at original resolution
  └── Render to <canvas data-result>
  ↓
User can: Erase more (return to brush) | Download | Share via Web Share | Start over
```

### Brand assets
Same patterns as FTN — generate via Node scripts:
```
scripts/
├── gen-icons.mjs            # Favicon + 192 + 512 PNG variants via sharp
├── gen-og-image.mjs         # 1200×630 social card via sharp + inline SVG
└── gen-screenshots.mjs      # Mobile + desktop demo screenshots for PWA manifest
```

---

## 📋 Multi-commit feature plan

Following the same one-feature-one-commit cadence as FTN.

### Phase 1: Scaffold + landing (~1 weekend, 6 commits)

#### Commit 1: `chore: scaffold Astro 6 + Tailwind v4 + TS strict + Cloudflare Pages config`
- `npm create astro@latest` with `--template minimal --typescript strict`  
- Add Tailwind v4 via `@tailwindcss/vite`
- `src/styles/global.css` with `@theme` tokens copied from FTN, adapted color palette (warm orange/coral for "magic eraser" vibe?)
- `wrangler.toml` for Pages preview deploys
- `astro.config.mjs` — output static, site URL `env-driven` via `src/site.config.ts`
- `.env.example`, `.gitignore`, `README.md`
- Initial CF Pages connection via dashboard → first deploy

#### Commit 2: `feat(landing): hero section with demo video placeholder + privacy pitch`
- `src/pages/index.astro` with hero
- Mock "before/after" SVG showing photo → wiped photo
- Hero CTA "Try it free →" linking to `/erase`
- Subhero pitch lines: "No upload. No paywall. No install. Runs on YOUR device."
- Tailwind responsive layout (mobile-first)

#### Commit 3: `feat(landing): feature grid with inline SVG icon chips`
- 6-card grid: Privacy / Free / WebGPU / Mobile / India-friendly / Open Source
- Use the **inline SVG icon chip pattern** from FTN (no icon library)
- `themed-svg-diagrams` for tinted accent backgrounds

#### Commit 4: `feat(landing): comparison table vs cleanup.pictures + magiceraser`
- Side-by-side table: WipePic vs cleanup.pictures vs magiceraser.io vs Galaxy AI
- Rows: Free / Privacy (uploads?) / Install / Signup / Daily limit / Resolution / Mobile / Desktop
- Use the **paired before/after diagram** pattern: shared canvas, only the differences encode meaning

#### Commit 5: `feat(landing): FAQ + trust signals + footer`
- 8-10 FAQs (privacy, speed, browser support, model size, business model)
- Footer with About / Contact / Privacy / Terms links
- Schema.org `FAQPage` JSON-LD for SEO rich snippet

#### Commit 6: `chore: PWA manifest + icons + OG image generation scripts`
- `scripts/gen-icons.mjs` (sharp-based, 192/512/maskable variants)
- `scripts/gen-og-image.mjs` (1200×630 social card)
- `public/manifest.json` with `share_target` for Web Share Target (Android only)
- Add to `<head>` in Layout: full OG + Twitter card meta

### Phase 2: Core eraser feature (~1 weekend, 6 commits)

#### Commit 7: `feat(erase): file picker + canvas mount + brush UI scaffold`
- `src/pages/erase.astro` with file input + drag-drop + Web Share Target receive
- Mount source `<canvas>` with image rendered at natural resolution
- Mount overlay brush `<canvas>` keyed to source dimensions
- Mount result `<canvas>` (hidden initially)
- Brush size slider + clear-mask button

#### Commit 8: `feat(brush): pointer brush stroke handler (touch + mouse)`
- `src/lib/brush/pointerBrush.ts` — unified pointerdown/move/up handler
- Smooth brush strokes via `quadraticCurveTo` between points
- Pressure sensitivity if `event.pressure` available (Apple Pencil, Surface)
- Brush cursor = circle outline at brush size
- Pinch-zoom for image (separate from brush input)

#### Commit 9: `feat(eraser): WebGPU detection + WASM fallback gate`
- `src/lib/eraser/webgpu.ts` — feature-detect WebGPU + GPU adapter
- If WebGPU absent → show banner "Slow mode: this browser doesn't support WebGPU yet. Erase will take ~60-90s instead of 5-15s. Result quality is identical."
- Browser support matrix shown in expanded "Why?" toggle

#### Commit 10: `feat(eraser): OPFS model cache + download progress`
- `src/lib/eraser/modelLoader.ts` — check OPFS, download if missing
- Show progress: "Downloading AI model... 47MB / 200MB (12 MB/s)"
- Cache permanently in OPFS (200MB takes ~30s on broadband)
- Skip download on subsequent visits

#### Commit 11: `feat(eraser): LaMa inference pipeline + result compositing`
- `src/lib/eraser/inpaint.ts` — image + mask → inpaint result
- Use `@huggingface/transformers` v3 inpainting pipeline
- Resize source to 1024×1024 (model native) + scale result back to original
- Composite result with original (only masked area replaced) to preserve quality
- Spinner during inference with cancel button (calls `transformers.dispose()`)

#### Commit 12: `feat(eraser): output flow — download + Web Share API`
- "Download" button → `<a download>` blob URL
- "Share" button (mobile) → `navigator.share({files:[blob]})`
- "Erase more" button → returns to brush mode with result as new source
- "Start over" button → reset everything, file picker again

### Phase 3: Polish + PWA + edge cases (~3 days, 4 commits)

#### Commit 13: `feat(erase): undo / redo brush strokes + clear-mask button`
- Stack-based undo (max 50 strokes)
- Keyboard shortcuts: Ctrl+Z, Ctrl+Shift+Z, Esc (clear mask)
- Mobile: undo/redo buttons in toolbar
- Per-stroke memory: store stroke points, redraw mask on undo (don't store entire canvas snapshots)

#### Commit 14: `feat(pwa): A2HS install prompt + Web Share Target receiver`
- Custom A2HS prompt (pattern from `pwa-install-custom-prompt` skill)
- `share_target` in manifest → SW catches POST → page receives file
- iOS A2HS limitation hint (no Share Target on iOS — direct share to PWA doesn't work)

#### Commit 15: `feat(erase): batch mode (queue multiple photos)`
- File picker accepts `multiple`
- Queue UI: thumbnail strip below canvas
- Process current → auto-advance to next on "Save & Next"
- "Save all" button bulk-downloads all queued results as ZIP (use `client-zip`)

#### Commit 16: `chore: GA4 wire-up + sitemap + robots.txt + JSON-LD`
- GA4 with `G-Q1Y0YHLJ8K` (per worksoffline rule — same as all sister apps)
- `sitemap.xml` (Astro built-in)
- `robots.txt` allowing all
- JSON-LD: `SoftwareApplication` schema + `FAQPage` on index
- Lighthouse pass: 100 SEO / 100 Accessibility / 95+ Performance

### Phase 4: Differentiation features (when traffic validates)

These ship later if traffic is real. Each is a separate commit:
- **Higher resolution upscaler** (chain LaMa + Real-ESRGAN, Pro tier $5 lifetime)
- **Background removal mode** (toggle to MODNet model for portrait BG removal)
- **History panel** (last 10 erased photos in OPFS, "open recent")
- **Smart brush** (segment-anything-model auto-detects person/object on tap)
- **API access** ($19/mo for studios — Cloudflare Worker proxy to inference endpoint)

---

## 🎨 UX flow (mobile-first)

### Landing → first use (mobile)
```
1. Land on magicphotoeraser.com
2. Read 1-sentence pitch: "Remove anything from any photo. Free. Photo never uploads."
3. Tap "Try it free →"
4. Browser file picker → select photo from camera roll
5. See photo + brush controls
6. "Brush over what to remove" (tutorial overlay first time)
7. Drag finger over photobomber
8. Tap "Erase"
9. Modal: "First time: downloading 200MB AI model (one-time, ~30s)"
10. [Subsequent visits: instant, model already cached]
11. Spinner: "Erasing... ~10s"
12. Result appears
13. Tap "Share" → native share sheet → WhatsApp/Insta
```

### Power user (desktop)
```
1. Land on magicphotoeraser.com
2. Drag photo onto page from Finder/Explorer
3. Mouse-brush over area
4. Click "Erase" (keyboard: E)
5. Result appears in ~3-5s on modern Mac/PC
6. Click "Erase more" to iterate
7. Click "Download" or "Copy to clipboard" (desktop additional)
```

### Edge cases the spec covers

| Edge case | Handling |
|-----------|----------|
| No WebGPU (Firefox, older browsers) | Banner: "Slow mode" + WASM fallback (still works, slower) |
| File too large (>20MB) | Resize automatically to 4096px longest edge, warn user |
| Model download fails mid-way | Retry button + cache-clear option |
| User closes tab during inference | Model cache survives (OPFS) |
| Browser private/incognito | OPFS denied → model re-downloads each session (warn) |
| Photo has EXIF rotation | Honor EXIF before drawing to canvas (use `createImageBitmap({imageOrientation:'from-image'})`) |
| Mask covers >40% of image | Warn: "Large masks may produce artifacts" (LaMa limitation) |
| Mobile keyboard pops up over canvas | Lock viewport scaling, disable autocorrect on any inputs |

---

## 💰 Monetization (Phase 4+, after MVP traction)

| Tier | Price | What you get |
|------|-------|--------------|
| **Free forever** | $0 | Unlimited use, 1024×1024 max output, single-photo workflow |
| **Pro** | $5 lifetime (one-time, NOT subscription) | 2048×2048 output, batch processing (up to 20 photos), Real-ESRGAN upscaler chained, no ads |
| **Studio API** | $19/mo | Cloudflare Worker proxy to GPU inference endpoint for studios that want server-side speed |

**Key principle:** Free tier is **GENUINELY UNLIMITED** — not "free for 3/day". This is the structural moat vs cleanup.pictures.

---

## 📊 Scaling math (pre-emptively addressed for user confidence)

| DAU | Backend cost | Bandwidth | Notes |
|-----|--------------|-----------|-------|
| 100 | $0 | ~0.5GB/day (HTML + JS bundle, NOT model) | CF Pages free tier |
| 10k | $0 | ~50GB/day | Still CF Pages free |
| 100k | $0 | ~500GB/day | CF Pages free (100GB egress is the only paid bit, but it's $0.04/GB) |
| 1M | ~$200/mo bandwidth | ~5TB/day | CF Pages Bandwidth Alliance + ~$200/mo total |
| 10M | ~$2000/mo bandwidth | Negotiate enterprise CF | Still cheap because inference cost = $0 |

**Critical insight:** Because inference runs on USER's GPU, our cost-per-user is **bandwidth only**. cleanup.pictures' GPU cost scales linearly with users (probably ~$0.001-0.01 per inpaint). We have **zero marginal compute cost.**

---

## ⚠️ Known risks + mitigations

| Risk | Probability | Mitigation |
|------|-------------|------------|
| 200MB model download too painful on mobile | Medium | Show progress + "use Pro for smaller 80MB model" upsell. Cache forever in OPFS — only first visit pays cost |
| LaMa quality worse than cleanup.pictures' proprietary model | Medium-low | LaMa is SOTA open-source; quality is on par with paid services. Test side-by-side before launch |
| WebGPU disabled by enterprise IT (corporate users) | Low-Medium | WASM fallback works (slower) |
| Galaxy AI / Pixel users have native eraser already | Already known | Target the 80% of phones that DON'T have native (older iPhones, mid-range Androids) + desktop |
| LaMa license restrictions | Low | Apache 2.0 — fully permissive |

---

## ✅ Definition of Done (MVP)

- [ ] Landing page deployed at magicphotoeraser.com
- [ ] `/erase` page works end-to-end on: iPhone 15 (Safari), Pixel 8 (Chrome), MacBook M2 (Chrome+Safari), Windows desktop (Chrome+Edge)
- [ ] Model downloads cached in OPFS (verify with 2nd visit instant load)
- [ ] WebGPU detection + WASM fallback shown to Firefox users
- [ ] Web Share API works on Android Chrome + iOS Safari
- [ ] PWA installable on Android + iOS
- [ ] GA4 wired, Lighthouse 95+ across all metrics
- [ ] FAQ + Privacy page + Terms page live
- [ ] Comparison page ranks for "cleanup.pictures alternative" within 30 days (verify with Ahrefs)

---

## ❓ Decisions for Shrestha to make

1. **Brand name:** `magicphotoeraser.com` (max SEO) vs `photoeraserai.com` (shorter) vs `erasephoto.com` (shortest) vs keep `wipepic.com` (no SEO wedge but brandable). **My recommendation: magicphotoeraser.com** — it targets the exact "magic eraser" query intent that Galaxy/Pixel users + frustrated cleanup.pictures users are searching.

2. **Color palette:** Warm orange/coral (like a magic eraser sponge brand)? Cool blue (matches LiveCaptionIt)? Custom?

3. **Stack confirmation:** Astro 6 + Tailwind v4 + TS strict — confirm matches FTN's stack so I can copy patterns directly?

4. **Pro tier launch:** Ship MVP free-only first, add Pro tier in v0.5 once we see traffic? Or wire Pro tier (Stripe Lifetime Access) into MVP? **Recommend free-first** — paywalls during validation phase = bad signal.

5. **Backup model strategy:** Should we bundle a smaller 80MB Spleeter-style model for Pro tier (so users with slow connections can opt for "lite mode")? Or always ship full 200MB LaMa? **Recommend single model for v1** — simplicity wins.

---

## 🚀 Multi-commit shipping cadence

Each commit ships independently to production via CF Pages auto-deploy. Estimated total:
- **Phase 1 (scaffold + landing):** ~12-16 hours
- **Phase 2 (core eraser):** ~10-14 hours
- **Phase 3 (polish + PWA):** ~6-8 hours
- **Total MVP:** ~28-38 hours (~3 weekends)

Phase 4 features ship organically once we see traffic patterns.

---

*Approval needed on: (1) brand name, (2) palette direction. Then I scaffold + start shipping commits.*
