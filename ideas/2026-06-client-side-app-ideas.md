# Client-Side App Ideas — June 2026

> Brainstorm of fully-client-side web app ideas that solve real pain for both **mobile + desktop** users. All ideas avoid WebGPU dependency (so they work on every browser including mobile Safari). Curated for the WorksOffline portfolio (`worksoffline.in`).
>
> **Filter criteria:**
> - Weekend-buildable (≤2 days of focused work with existing Astro/Vite scaffolds)
> - Works on mobile **and** desktop (no WebGPU dependency unless tier-2 optional)
> - Viral demo OR strong SEO long-tail
> - No backend (preserves "data never leaves device" brand moat)
> - Recently possible (uses 2024-2026 browser APIs)
> - Real, narrow pain — not "I want an AI tool"
> - Doesn't cannibalize existing WorksOffline tools (BlitzTable, PDFUnlocker, DocRedactor, PresetPhoto, VyapaarPost, DevToy, PDFHub)

---

## TL;DR — top picks

| Rank | Idea | Why this one |
|---|---|---|
| 🥇 | **VoiceNote.click** | Universal pain, India is killer market, Web Share Target gives killer mobile UX, viral coefficient ~10x anything else |
| 🥈 | **HEIC.do / HEIC.click** | SEO goldmine (1.2M+ searches/mo), passive long-term traffic, low maintenance, perfect WorksOffline fit |
| 🥉 | **PhoneMic.io** | Reuses your FileTransferNow infra (10x less work), wow-factor viral demo, premium-tier monetizable via noise cancel |

---

## Master ideas table

Columns explained:
- **Search demand** — rough monthly Google searches for the primary keyword cluster (based on industry tools — VERIFY with Ahrefs/Ubersuggest before betting)
- **Existing solutions** — what people use today + their weakness we exploit
- **Tech feasibility** — 🟢 weekend, 🟡 few weekends, 🔴 multi-month
- **WebGPU needed** — most browsers don't support it on mobile; "No" = works on every browser
- **Viral potential** — 1 (slow burn SEO) → 5 (TikTok-viral)
- **Mobile UX** — how it feels on phone (the harder browser to win)

| # | Idea | Search demand/mo | Existing solutions | Why we win | Tech feasibility | WebGPU? | Viral 1-5 | Mobile UX |
|---|---|---|---|---|---|---|---|---|
| 1 | **VoiceNote.click** — WhatsApp voice notes → text + summary | ~600k ("voice to text", "transcribe voice note", "voice message to text") | TurboScribe, Google Recorder (Android only), system Speech-to-text apps. All hit paywalls / require account / upload audio. | Drop voice note from WhatsApp share sheet → instant transcript via Web Speech API or whisper.cpp WASM. Year-end "VoiceNote Wrapped" share card = viral mechanic. | 🟢 Weekend | No (Web Speech free; Whisper.cpp WASM fallback) | 5/5 | ★★★★★ (Web Share Target = OS-level share-sheet integration on Android) |
| 2 | **HEIC.do / HEIC.click** — iPhone HEIC → JPG converter | **~1.2M** ("heic to jpg", "convert heic", "heic converter") | iloveimg.com (ads, 5-file limit), cloudconvert (25/day cap), online-convert.com (slow, ads). All upload. | Drag 200 HEICs → batch convert in 10sec → drag out. Web Share Target on iOS for in-place share. Zero ads, unlimited, no signup. | 🟢 Weekend | No (libheif-js WASM) | 3/5 (SEO play, not viral) | ★★★★ (iOS Share Sheet integration via Web Share Target) |
| 3 | **PhoneMic.io** — phone-as-wireless-mic for laptop | ~80k ("wireless mic for laptop", "phone as microphone", "use phone as mic") | EpocCam ($), Camo ($), DroidCam (install required), Wo-mic (Windows only) | Open URL on both → scan QR → instant browser-native mic input via WebRTC. ZERO install. Reuses FileTransferNow's TURN. Premium tier: RNNoise WASM noise cancel ($10 LTD). | 🟢 Weekend (reuses FTN infra) | No (Web Audio + WebRTC only) | 5/5 (jaw-drop demo) | ★★★★ (phone broadcasts; desktop receives) |
| 4 | **MemeGIF.click** — Video → GIF with captions | ~400k ("video to gif", "make gif from video", "gif with text") | ezgif (ads + 35MB limit), giphy maker (Giphy account, watermark), Adobe Express (login) | Pure browser, no limits, no watermark, drag video → trim → caption → drag-out GIF. | 🟢 Weekend | No (gif.js library) | 4/5 (meme-creators are evangelists) | ★★★★ (camera roll → preview → share to WhatsApp/Discord) |
| 5 | **PDFSign.click** — Sign PDFs free forever | ~500k ("sign pdf", "pdf signature", "fill and sign pdf") | Adobe ($14.99/mo), DocuSign (per-doc), smallpdf.com (free tier limited) | Touch signature pad on mobile, drop sig on PDF pages, export — all client-side via pdf-lib. Save sig to IndexedDB. | 🟢 Weekend | No (pdf-lib + Canvas) | 3/5 (steady SEO) | ★★★★★ (finger signature pad feels native) |
| 6 | **AudioText.cc** — same as #1 but desktop-first (Zoom recordings) | Subset of #1 demand | Otter ($20/mo), Fireflies ($10/mo), Cockatoo ($14/mo) | Same model as #1 — drop file → on-device whisper.cpp WASM transcribe. Skip Otter's $20/mo. | 🟡 Weekend + (longer files = chunking UX) | Optional (WebGPU = 5x faster; WASM works without) | 3/5 (more B2B/prosumer) | ★★★ (mobile less critical) |
| 7 | **VerticalCrop.cc** — Horizontal video → 9:16 Reels/TikTok | ~250k ("crop video vertical", "video to reels", "16:9 to 9:16") | Adobe Express (login), VEED.io ($), Canva (login), CapCut (app install) | Drag video → AI smart-crop (face track) OR manual → re-encode in browser via WebCodecs. No upload. | 🟡 Few weekends (smart-crop needs MediaPipe Face Detector CPU mode) | No (WebCodecs hardware-accel) | 4/5 (creator audience) | ★★★★ (creators on phones) |
| 8 | **DecibelMeter.click** — Sound level meter | ~150k ("decibel meter online", "sound meter", "noise meter") | App store apps with ads/IAP, online-tone-generator (ads). | Pure Web Audio + MediaStream, calibrated reference levels. PWA install for "feels native." TikTok-style "how loud is your X" share card = viral. | 🟢 Weekend | No (Web Audio) | 5/5 (TikTok bait — "test how loud your Diwali firework is") | ★★★★★ (phone IS the meter) |
| 9 | **SwissPhone.app** — Multi-sensor toolkit | ~200k cumulative (compass, level, ruler, dB, BPM individually) | Toolkit apps require install + IAPs. | One PWA combining: compass (DeviceOrientation), bubble level (DeviceMotion), ruler (camera + calibration), sound meter (Web Audio), heart rate (camera flash + photoplethysmography). All zero-install. | 🟡 Few weekends (5 mini-tools polish) | No | 3/5 (slow burn but high WOM) | ★★★★★ (THIS IS a phone product) |
| 10 | **ColorGrab.cc** — Camera color picker (designers/painters) | ~80k ("color picker camera", "extract color from photo", "pantone match") | Adobe Capture (app, account), Color Grab (Android only) | Open camera → tap → exact RGB/HEX/CMYK + nearest Pantone/Tailwind/Material match. Save palettes to IndexedDB. | 🟢 Weekend | No (getUserMedia + Canvas) | 3/5 (designer Twitter) | ★★★★ (camera UX) |
| 11 | **PhotoScan.io** — CamScanner alternative (CamScanner banned in India) | **~900k** ("camscanner alternative", "document scanner", "scan to pdf") | CamScanner (banned in India for spyware), Adobe Scan (account), Microsoft Lens (account). | Phone camera → edge detection (OpenCV.js WASM) → perspective correction → B&W/color → multi-page PDF → Web Share to WhatsApp. PWA install. | 🟡 Few weekends (edge detection polish) | No (OpenCV.js WASM) | 4/5 (India-specific narrative + global appeal) | ★★★★★ (THE mobile use case) |
| 12 | **DateStamp.cc** — Add date/timestamp/location to photos (insurance, govt) | ~60k ("add date to photo", "timestamp camera", "geotag photo") | Timestamp Camera (Android), specific insurance/realtor apps. | Open camera → live overlay date/time/GPS coords → save with watermark. Insurance + real estate + govt audit use cases. India-specific value. | 🟢 Weekend | No (getUserMedia + Canvas) | 2/5 (utility) | ★★★★★ (camera UX, India SMB hook) |
| 13 | **BlurFaces.click** — Auto-blur faces in photos | ~50k ("blur faces in photo", "anonymize photo", "hide faces") | Photoshop, Fotor (free tier nags), iOS Markup (manual). | Drag photo → MediaPipe Face Detector CPU mode → auto-blur all faces → export. One-click privacy share. | 🟢 Weekend | No (MediaPipe Face Detector has CPU mode) | 3/5 (privacy crowd + parents posting kid pics) | ★★★★ (drop from camera roll) |
| 14 | **ScreenScribe.app** — Tab-audio caption for desktop meetings (Otter killer) | ~200k ("zoom transcribe", "meeting transcription", "live captions desktop") | Otter ($20/mo cloud), Fireflies ($10), Tactiq, Read.ai | `getDisplayMedia({audio:true})` → Whisper-large-v3-turbo via WebGPU → speaker labels + AI summary. Desktop-only (mobile can't capture tab audio). | 🟡 Few weekends | YES (Whisper-large-v3-turbo needs WebGPU for live) | 4/5 (B2B prosumer) | ❌ Desktop ONLY |
| 15 | **HeicFlip.com** — alias for #2 | (same as #2) | (same as #2) | Alternative branding option if HEIC.click is rejected at registration. | (same) | (same) | (same) | (same) |

---

## Recommended top 3 — deep dive

### 🥇 1. VoiceNote.click — WhatsApp voice-note transcriber

**Pain:** Every WhatsApp group chat has that one person who sends 4-minute rambling voice notes. Universal. India is voice-note central — 500M+ users.

**Mobile flow:** Long-press voice note → Share → your PWA (registered via Web Share Target) → instant transcript on screen.

**Desktop flow:** Drag .ogg/.opus from WhatsApp Web download folder → transcript appears.

**Tech stack:**
- Web Speech API for fast path (Safari = on-device, Chrome = Google API, free)
- Whisper.cpp WASM fallback for offline + multilingual (slower but private)
- IndexedDB to remember last 100 transcripts
- html-to-image for "VoiceNote Wrapped" share cards

**Viral hook:** "Skip voice notes. Read in 5 seconds." End-of-year "You skipped 6.3 hours of voice notes" wrapped card auto-generated → people share on Twitter/IG.

**Domains (verified free via DNS check 2026-06-06):**
- 🟢 `voicenote.click` (recommended — domain matches utility)
- 🟢 `voicenote.io`
- 🟢 `skipvoice.app` / `skipvoice.com` / `skipvoice.cc`
- 🟢 `readtheaudio.com` / `readtheaudio.app`
- 🟢 `voicenoteskip.com`
- 🟢 `audiotext.click` / `audiotext.cc`
- 🔴 `voicenote.app` (taken)
- 🔴 `voicenote.cc` (taken)

**Existing competitors:** TurboScribe (paywall + upload), Google Recorder (Android-only + Google account), system speech-to-text (no batch, no share card). **None solve the WhatsApp voice-note long-press → instant transcript flow.**

**Monetization:** Free unlimited. ₹299 LTD for: speaker separation, AI summary ("TL;DR"), unlimited history, ad-free.

**Implementation:** ~12 hours. Astro 6 + Web Speech API + Whisper.cpp WASM (35MB tiny model) + Web Share Target manifest entry + html-to-image for shareable cards.

---

### 🥈 2. HEIC.do / HEIC.click — iPhone HEIC → JPG converter

**Pain:** iPhone takes HEIC. Friend on Android/Windows/Web can't open. Daily friction for 1.5B+ iPhone users.

**Mobile flow:** iOS Share Sheet → your PWA → batch convert → share back as JPGs.

**Desktop flow:** Drag folder of 200 HEICs → batch convert in <10 seconds → drag out as JPGs (File System Access API for in-place writing on Chromium).

**Tech stack:**
- `libheif-js` WASM (1.5 MB compressed) for HEIC decode
- Canvas for JPG encode
- File System Access for desktop bulk writeback
- Web Share Target for iOS Share Sheet integration

**SEO play:** "heic to jpg" gets ~1.2M monthly searches. This is the **single most search-demanded** idea in the list. Long-tail keyword cluster:
- "convert heic to jpg" (~800k/mo)
- "heic converter" (~300k/mo)
- "iphone photo to jpg" (~100k/mo)
- Plus 50+ related long-tail variants

**Differentiator vs existing competitors:**
- `iloveimg.com` — caps at 5 files, ads, requires upload
- `cloudconvert.com` — 25 conversions/day free tier
- `online-convert.com` — slow, heavy ads
- **You:** unlimited, no ads, zero upload, batch unlimited, lifetime free

**Domains (verified free):**
- 🟢 `heic.click` (recommended — short + matches utility)
- 🟢 `heicflip.com`
- 🟢 `heicfree.app`
- 🟢 `convertheic.io` / `convertheic.cc`
- 🔴 `heic.do` (taken)
- 🔴 `heic.cc` (taken)
- 🔴 `heictojpg.click` / `heictojpg.app` (taken)
- 🔴 `heicfree.com` (taken)

**Monetization:** Free forever (loss-leader for WorksOffline SEO). Optional: ₹199 LTD for: batch >1000 files at once, HEIC→PNG, HEIC→WebP, EXIF preservation toggles, automated workflow scripts.

**Implementation:** ~8 hours. Astro 6 + libheif-js + drag-drop + progress bar + Web Share Target.

**Estimated traffic in 6 months:** 50k-200k unique monthly visitors (based on competitor SEO rankings + the keyword volume). Conversion to ₹199 LTD at 1% = ₹100k-400k/month passive.

---

### 🥉 3. PhoneMic.io — Phone as wireless mic for laptop

**Pain:** Laptop mics suck. Important Zoom call. Don't own a real mic. Podcasters, students, remote workers, streamers.

**Mobile flow:** Open URL → "Start broadcasting" → phone screen lights up like a stage mic, audio streams via WebRTC.

**Desktop flow:** Scan QR or paste code → audio plays in browser tab. For Zoom/OBS integration: free 1-click "virtual cable" helper (one-time download — VB-Audio Cable is free for Win, BlackHole for Mac).

**Tech stack:**
- WebRTC audio-only data channel **reuses your FileTransferNow TURN infrastructure** (10x less work than building from scratch)
- Web Audio API for monitoring + meter + basic EQ
- Wake Lock to keep phone screen on
- Web Share for sharing the URL fast

**Premium tier ($10 LTD):**
- RNNoise WASM noise cancellation (real-time AI noise removal)
- Pitch correction (light auto-tune for podcasters)
- Multi-phone support (stereo input from 2 phones, mid-side mic technique)

**Viral hook:** Single tweet: "free wireless mic for your laptop, no install, just scan QR. Mind blown." Podcasters and content creators are evangelists for these tools.

**Domains (verified free):**
- 🟢 `phonemic.io` (recommended — short + matches utility)
- 🟢 `phonemic.cc` / `phonemic.app`
- 🟢 `wirelessmic.app` / `wirelessmic.io` / `wirelessmic.cc`
- 🟢 `phonecast.cc` / `phonecast.app`
- 🟢 `miccast.app`
- 🟢 `micbeam.cc`
- 🔴 `phonemic.com` (taken)

**Existing competitors:**
- EpocCam, Camo — paid, native app install required
- DroidCam — install required + intrusive ads on phone app
- Wo-mic — Windows only, install required

**You:** zero install, works on iOS + Android + any browser, browser-native virtual mic input. Single tweet should be enough for first 10k users.

**Implementation:** ~16 hours (mostly UI polish; WebRTC infra reused from FileTransferNow).

---

## Wildcards — also strong if top 3 don't excite

### DecibelMeter.click — sound level meter
- **Search:** ~150k/mo ("decibel meter online")
- **Viral hook:** TikTok "how loud is your X" — Diwali fireworks (India), gym (gym-tok), nursery (parents)
- **Tech:** Web Audio + MediaStream, calibrated reference levels
- **Mobile UX:** ★★★★★ — phone IS the meter
- **Domains:** 🟢 `decibelmeter.click` / `decibelmeter.cc` available

### MemeGIF.click — video → GIF with captions
- **Search:** ~400k/mo
- **Viral:** Meme creators are evangelists
- **Tech:** gif.js + MediaRecorder + Canvas
- **Domains:** 🟢 `memegif.click` / `memegif.app` / `memegif.cc` available

### PDFSign.click — sign PDFs free forever
- **Search:** ~500k/mo
- **Tech:** pdf-lib + Canvas signature pad + IndexedDB
- **India hook:** Rentals, NOCs, contracts, school forms — Indian SMBs sign 5+ daily
- **Domains:** 🟢 `pdfsign.click` / `pdfsign.cc` / `signpdf.io` / `signpdf.click` available

### PhotoScan.io — CamScanner alternative (India context)
- **Search:** ~900k/mo ("camscanner alternative")
- **India narrative:** CamScanner was BANNED in India 2020 for spyware → genuine void since then
- **Tech:** OpenCV.js WASM for edge detection + perspective correction + pdf-lib
- **Domains:** 🟢 `photoscan.io` / `photoscan.app` available (🔴 `photoscan.cc` taken)

### SwissPhone.app — multi-sensor toolkit
- **Search:** 200k+ cumulative across sub-tools
- **Tools combined:** compass + bubble level + ruler + sound meter + heart rate camera
- **Viral hook:** Single PWA replaces 5 paid app-store apps
- **Domains:** 🟢 `swissphone.cc` (🔴 `swissphone.app` / `swissphone.io` taken)

### ColorGrab.cc — camera color picker
- **Search:** ~80k/mo ("color picker camera")
- **Audience:** designers, painters, interior decorators
- **Domains:** 🟢 `colorgrab.cc` / `colorgrab.app` / `colorgrab.io` available

### BlurFaces.click — auto-blur faces in photos
- **Search:** ~50k/mo
- **Tech:** MediaPipe Face Detector (CPU mode, no WebGPU needed)
- **Audience:** privacy-conscious users, parents posting kid photos, journalists
- **Domains:** 🟢 `blurfaces.click` / `blurfaces.app` / `blurfaces.cc` available

### VerticalCrop.cc — horizontal → 9:16 video for Reels/TikTok
- **Search:** ~250k/mo
- **Audience:** content creators
- **Tech:** WebCodecs (hardware-accelerated, finally cross-browser stable 2024-2025)
- **Domains:** 🟢 `verticalcrop.cc` / `verticalcrop.app` (🔴 `.com` taken)

---

## Browser API capability table (for future feasibility checks)

| Capability | Mobile Safari | Mobile Chrome | Desktop browsers | Best use cases |
|---|---|---|---|---|
| Web Speech API (speech-to-text) | ✅ on-device | ✅ Google API | ✅ all | VoiceNote, AudioText |
| WebRTC + DataChannel | ✅ | ✅ | ✅ | PhoneMic, FileTransferNow |
| Web Audio API | ✅ | ✅ | ✅ | DecibelMeter, audio meters |
| Web Share API (outbound) | ✅ | ✅ | ⚠️ partial (Chrome only) | Mobile-first sharing |
| Web Share Target (inbound) | ❌ | ✅ Android | ⚠️ Chrome desktop | Receive from OS share sheet (Android killer feature) |
| File System Access | ❌ | ❌ | ✅ Chromium only | Desktop batch-save flows |
| OPFS | ⚠️ 17.3+ | ✅ | ✅ | Long-term browser storage |
| getUserMedia (camera/mic) | ✅ | ✅ | ✅ | All camera-based tools |
| getDisplayMedia (tab audio) | ❌ | ❌ | ✅ Chromium | Desktop-only tools (ScreenScribe) |
| WebCodecs | ✅ 16.4+ | ✅ | ✅ | Video conversion, smart-crop |
| WebGPU | ⚠️ 18+ only, flag-gated still rough | ⚠️ Chrome 121+ Android only | ✅ all major | Heavy AI inference (avoid for mobile-first) |
| DeviceOrientation / DeviceMotion | ✅ requires user permission iOS 13+ | ✅ | ⚠️ no-op | Compass, level, AR |
| Wake Lock | ✅ 16.4+ | ✅ | ✅ | Keep screen on (PhoneMic, recording) |
| PWA install | ⚠️ A2HS only (no install prompt) | ✅ | ✅ | All apps |
| BarcodeDetector | ❌ | ✅ | ⚠️ Chrome | QR scan (with jsQR fallback) |
| Vibration API | ❌ | ✅ Android | ❌ | Haptic feedback |

---

## Implementation feasibility ranking

🟢 **Weekend (8-16 hours):**
- VoiceNote.click
- HEIC.click
- PhoneMic.io (reuses FTN)
- MemeGIF.click
- PDFSign.click
- DecibelMeter.click
- ColorGrab.cc
- BlurFaces.click
- DateStamp.cc

🟡 **Few weekends (24-40 hours):**
- AudioText.cc (chunking UX for long files)
- VerticalCrop.cc (smart-crop polish)
- PhotoScan.io (edge detection polish)
- SwissPhone.app (5 mini-tools polished)

🔴 **Multi-month (passes the "weekend test"):**
- ScreenScribe.app (Whisper-large-v3-turbo + diarization + AI summary)

---

## Available domains shortlist (verified 2026-06-06 via DNS check)

For each top pick, the **first option** is my recommendation:

| Idea | Recommended domain | Backup options |
|---|---|---|
| VoiceNote | `voicenote.click` | `voicenote.io`, `skipvoice.com`, `readtheaudio.com` |
| HEIC converter | `heic.click` | `heicflip.com`, `convertheic.io`, `heicfree.app` |
| PhoneMic | `phonemic.io` | `phonemic.cc`, `wirelessmic.app`, `miccast.app` |
| MemeGIF | `memegif.click` | `memegif.app`, `memegif.cc`, `gifme.cc` |
| PDFSign | `pdfsign.click` | `signpdf.io`, `signpdf.click`, `pdfsign.cc` |
| DecibelMeter | `decibelmeter.click` | `decibelmeter.cc` |
| PhotoScan | `photoscan.io` | `photoscan.app` |
| BlurFaces | `blurfaces.click` | `blurfaces.app`, `blurfaces.cc` |
| ColorGrab | `colorgrab.cc` | `colorgrab.app`, `colorgrab.io` |
| SwissPhone | `swissphone.cc` | (app/io taken; consider rebrand) |
| VerticalCrop | `verticalcrop.cc` | `verticalcrop.app` |

> ⚠️ **DNS resolution ≠ definitive availability.** Always verify on Namecheap/Porkbun before purchase. Some "free" domains may have premium pricing.

---

## Next steps

When ready to ship one, I can:

1. Write the SPEC.md (UI flows + tech stack picks + LOC budget + non-goals)
2. Scaffold via `astro-microtool-scaffold` skill
3. Wire up domain → Cloudflare Pages → main GitHub repo with auto-deploy
4. Generate icon pack + favicon set
5. Pre-write JSON-LD for SEO from day 1

Estimated time from "let's ship X" → "X is live on real domain": ~12 hours for weekend ideas, including SPEC.

---

*File saved by Hermes agent. Re-run domain check + SEO data before betting money.*
