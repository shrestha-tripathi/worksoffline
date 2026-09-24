# What to build next — mining the SubtitleTranslatorFree win (Aug 2026)

## Why STF worked (the reusable formula)

1. **Incumbent unit-economics moat** — every competitor pays ~$20/M chars downstream, so they
   MUST cap file size / gate signup. On-device Translator API = zero marginal cost. They can't
   match "unlimited + free + private" without eating a bill that grows with success.
2. **Hybrid engine** — ⚡ novelty ("a webpage translates my file offline?!") + 🐢 SEO
   (one page per language pair = 50+ legit landing pages).
3. **Zero-localization global audience** = Western CPM.

So: **look for other file types where a paid-per-character/per-minute cloud incumbent gates the free tier.**

---

## Ranked next plays

| # | Idea | Demand (autocomplete, caps 30) | Incumbent (live-verified) | .com | Engine | Effort | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | **TranslateDocFree** — translate .docx/.pptx/.txt on-device, formatting preserved | 30/30 | onlinedoctranslator.com 200, doctranslator.com 200 — both upload + page-limit + watermark | ✓ `translatedocfree.com` | ⚡+🐢 | weekend | **Top pick** — literally same code path as STF, different parser |
| 2 | **PDFTranslatorFree** — text-layer PDF translate, layout kept | 30/30 | DeepL (paid tier), Google Translate (25MB cap, upload) | ✓ `pdftranslatorfree.com` | 🐢 SEO monster | 1–2 wknds | Highest volume of the set; PDF layout reflow is the hard part |
| 3 | **EbookTranslateFree** — EPUB → translated EPUB on-device | 28/30 | **epubtranslator.com is DEAD (URLError)** — open lane. Calibre plugin is nerdy/paid-API | ✓ `epubtranslatefree.com` | 🐢 | weekend | Long books = the exact case cloud tools refuse. Best moat/effort ratio |
| 4 | **DualSubtitlesFree** — merge 2 SRTs into learner dual-sub track | 30/30 | Language Reactor 200 / Lingopie 200 — both subscription + Netflix-locked | ✓ `dualsubtitlesfree.com`, `bilingualsubtitles.com` | ⚡ | 1 day | Cross-sell from STF; same file format, same users |
| 5 | **ImageTranslatorFree** — OCR + translate screenshots/photos | 30/30 | imagetranslate.com 200 (paid credits), cotrans.touhou.ai 200 (manga-only) | ✓ `imagetranslatorfree.com` | 🐢 | 1–2 wknds | Needs Tesseract/ONNX OCR — heavier, but huge query volume |
| 6 | **SubtitleSyncFree** — fix out-of-sync SRT, shift/stretch timings | 27/30 | subtitlesync.com 403 (alive), Subtitle Edit = desktop install | ✓ `subtitlesyncfree.com` | 🐢 | **half a day** | Pure JS, no AI. Free traffic bolt-on to STF. Do it as a page on STF, not a new domain |
| 7 | **AudioTranslateFree** — audio/video → translated transcript (Whisper WASM + Translator API) | 26/30 | HappyScribe 403 (paid/min), Veed 200 (paid) | ✓ `audiotranslatefree.com` | ⚡+🐢 | 2–3 wknds | Strongest moat (per-minute pricing incumbents) but heaviest build |
| 8 | **LocalizeJSONFree** — i18n locale-file translator for devs | 19/30 | Lokalise/i18nexus 200, both SaaS | ✓ `localizejsonfree.com` | — | weekend | ⚠️ dev audience = 25–40% adblock. Build only as paid, not ads |

## Cut (rejection log)
- **Subtitle generator from video** (14/30) — demand is thin *and* Whisper-in-browser is a multi-week build; YouTube/CapCut auto-caption for free.
- **AI dubbing / TTS voice-over** (17/30) — needs cloud TTS quality to be usable; ElevenLabs owns it.
- **SRT↔VTT converter** (17/30) — commodity, 10 free clones, no monetization. Make it a free page on STF.
- **AI humanizer** (30/30) — huge demand but AdSense policy grey + arms race vs detectors. Skip.
- **Email rewriter / meeting live translate** — low demand, crowded by Gmail/Teams native.

## The play I'd actually run

**Build #1, #3, #4 as one cluster** — they share the STF codebase (file parse → chunk → Translator API →
reassemble), the same audience, and cross-link into each other. That's a portfolio moat, not three bets.
Then #6 as a free traffic-magnet page *inside* subtitletranslatorfree.com.

⚠️ All demand numbers are Google-autocomplete signal (caps at 30) — proves demand exists, does NOT rank.
Verify with Ahrefs before committing. SERP positions NOT verified — run one incognito check.
Domains RDAP-verified free at time of writing; confirm price on Porkbun (some may be premium).
