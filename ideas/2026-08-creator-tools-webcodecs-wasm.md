# Creator tools on 2026 browser APIs + WASM ports (Aug 2026)

## Capability probe — VERIFIED LIVE

Probed on HTTPS origin, `isSecureContext: true`, **Chromium 147** (stable is 148 — some `false`s below
are version lag, not absence).

| API | Result | Note |
|---|---|---|
| WebCodecs (`VideoEncoder`/`VideoDecoder`/`AudioEncoder`) | ✅ true | **The unlock.** Hardware-accelerated encode/decode in JS. Pre-2023 this was ffmpeg.wasm-only (10–20× slower) |
| `MediaStreamTrackProcessor` | ✅ true | Raw per-frame access to a live camera/screen stream |
| `RestrictionTarget` / `CropTarget` | ✅ true | **Region Capture + Element Capture** — crop a screen capture to one DOM element, or exclude elements from your own capture |
| `captureHandle` | ✅ true | Captured tab can identify itself to the capturer |
| WebGPU | ✅ true | ONNX/transformers.js accel |
| Document PiP | ✅ true | (already exploited: AlwaysOnTopNotes, LiveCaptionIt) |
| OPFS + File System Access | ✅ true | Multi-GB scratch space for video |
| `ImageDecoder`, `OffscreenCanvas`, `AudioWorklet` | ✅ true | |
| WASM SIMD | ✅ true | rnnoise / demucs / ffmpeg all viable |
| Translator / Summarizer | ✅ true | Summarizer confirmed present |
| `LanguageModel` (Prompt API) | ❌ false | **Version lag** — ships Enabled-by-default M148. Not a real negative |
| `Writer` | ❌ false | Genuinely still dev-trial |
| WebNN | ❌ false | Genuinely Proposed — do not build on |
| `SharedArrayBuffer` | ❌ false | ⚠️ **Needs COOP/COEP headers.** Required for ffmpeg.wasm multithread — set them on Cloudflare Pages `_headers` |

❌ **Not verified:** Safari/Firefox. WebCodecs has Safari 16.4+ support but Region/Element Capture is
Chrome-only. Assume desktop-Chrome-first for everything below.

---

## The thesis

Creator tools are the **best-monetizing** category you can enter, because the incumbents charge
$15–50/mo and their cost is *GPU-minutes in the cloud*. WebCodecs moved video encode to the user's
GPU. Same unit-economics moat that's making SubtitleTranslatorFree work — but with 10× the willingness
to pay, and creators *broadcast* the tools they use (built-in distribution).

All incumbents below were HTTP-verified live at time of writing.

---

## Ranked picks

### 🥇 #1 — VerticalReframe — `verticalreframefree.com` ✓ / `reframeforshorts.com` ✓
**Drop a 16:9 video → auto-tracks the speaker's face → exports 9:16 for Shorts/Reels.** Fully on-device.

- **Demand** 25/30 ("convert landscape video to vertical", "auto reframe video free", "crop video for tiktok")
- **Incumbents** Kapwing 200, Veed 200, Descript 200, Opus 200 — **all upload-based, all watermark or paywall export.** Adobe's auto-reframe is Premiere-only.
- **Stack** WebCodecs decode → MediaPipe FaceDetector (WASM, ~2MB) per keyframe → smoothed crop path → WebCodecs encode. No ffmpeg needed.
- **Moat** 🔒 Strong. Their cost is cloud GPU per minute of video; yours is zero. They *cannot* offer unlimited free 4K export.
- **Engine** ⚡ novelty + 🐢 SEO · **Effort** 🟡 2 weekends
- **Why #1** every single creator repurposing long-form to Shorts hits this daily, the incumbent paywall is universal, and "my video never uploaded" is a real concern for unreleased content.

### 🥈 #2 — Animated Captions — `animatedcaptionsfree.com` ✓ / `karaokecaptionsfree.com` ✓
**Word-by-word karaoke captions burned into the video** — the Submagic/Opus look that dominates Shorts.

- **Demand** 20/30 · **Incumbents** Submagic 200 ($16–40/mo), Veed, Kapwing — all subscription, all upload
- **Stack** Whisper-tiny WASM (or reuse your existing STF pipeline for the SRT) → canvas render per frame → WebCodecs encode. Word-level timestamps are the hard part.
- **Moat** 🔒 Same unit-economics inversion. Submagic is a **$16/mo product whose whole function is this**.
- **Engine** ⚡ strong — the output *is* the marketing (every video carries your style) · **Effort** 🟡 2 weekends
- **Cross-sell** shares the subtitle codebase with SubtitleTranslatorFree.

### 🥉 #3 — AutoZoom Screen Recorder — `autozoomrecorder.com` ✓ / `screenzoomrecorder.com` ✓
**Screen Studio in a browser tab.** Records screen, auto-zooms to cursor activity, smooths cursor motion, rounded-corner wallpaper background.

- **Demand** ⚠️ only 13/30 — **low search demand, this is a novelty/word-of-mouth play, not SEO**
- **Incumbent** screen.studio 200 — **$89–229 one-time, macOS-only.** Windows/Linux creators have *no good option*.
- **Stack** `getDisplayMedia` + `MediaStreamTrackProcessor` for raw frames + cursor position → canvas transform → WebCodecs encode. **`RestrictionTarget`/Element Capture (verified ✅) lets you exclude your own UI from the recording** — this is the piece that was literally impossible before.
- **Moat** 🟡 Medium — Screen Studio's moat is polish, not tech. But "free, no install, works on Windows" is a real wedge against a $89 Mac-only app.
- **Engine** ⚡ pure novelty-burn — this is the one that gets a "wait, a webpage did THAT?" tweet · **Effort** 🔴 3+ weekends, hardest build here
- Honest: build this third. Highest wow, lowest search demand, most work.

---

## Also strong

| Idea | Demand | Incumbent (verified) | .com | Verdict |
|---|---|---|---|---|
| **ThumbnailTest** — mock YouTube feed, A/B two thumbs at real sizes, dark/light, mobile/desktop | 26/30 | thumbsup.tv 200, thumbnailtest.com 200 (both paid/subscription) | ✓ `thumbnailtestfree.com`, `thumbabtest.com` | 🟢 **1 day.** Pure canvas, no WASM. Cheapest win on this list — do it as a warm-up |
| **LoudnessMaster** — LUFS-normalize to -14 (YouTube) / -16 (podcast), true-peak limit | 23/30 | Auphonic 200 (credit-based), Podcastle 200 | ✓ `loudnessmasterfree.com`, `lufsnormalize.com` | 🟢 weekend. Web Audio + AudioWorklet, **no WASM needed**. Every podcaster needs it, nobody offers it free |
| **ClipFinder** — long podcast → AI picks the 5 best 60s clips | 21/30 | Opus 200, Klap 200 (both $19–29/mo) | ✓ `clipfinderfree.com`, `longtoshortsfree.com` | 🟡 Needs Prompt API (M148) over the transcript. Strong moat but gated to Chrome 148+ desktop |
| **Audiogram maker** — waveform video for podcast clips | 14/30 | Headliner 200 (freemium, watermark) | ✓ `audiogrammakerfree.com` | 🟢 weekend, low demand — bundle it into LoudnessMaster rather than standalone |

## Cut, with reasons

- **StemSplitter / vocal remover** (24/30 demand) — ⚠️ **vocalremover.org is alive (403 = bot-blocked, i.e. real site) and already FREE.** Your "free" wedge is gone before you start. Moises + LALAL both 200 and well-funded. Demucs WASM is also a ~80MB model download. **Cut.**
- **SilenceCut / filler-word removal** (10/40 — dead) — Descript owns the category *and* nobody searches for it as a standalone tool. It's a feature, not a product.
- **HQ GIF maker** (30/30) — ezgif.com 200 owns this since forever, commodity, zero monetization. Demand is real but the lane is closed.
- **Video compressor** (30/30) — you already shipped compressvideofile.
- **Teleprompter PiP** (30/30) — you already shipped floatingteleprompter.
- **Multi-cam auto-edit** (7/30) — no demand.
- **Subtitle styler → ASS** (2/30) — effectively zero demand as a standalone.
- **B-roll matcher / safe-zone preview** — features, not products.

---

## Recommended sequence

1. **ThumbnailTest** (1 day) — momentum + an audience you can cross-link from. No WASM, no risk.
2. **VerticalReframe** (2 wknds) — the real business. Best demand × moat × willingness-to-pay.
3. **AnimatedCaptions** (2 wknds) — reuses #2's WebCodecs pipeline *and* STF's subtitle code. Cheap third build, viral output.
4. **AutoZoomRecorder** — the flex. Build when you want a novelty-burn spike.

2→3 share an encode pipeline; 3 shares parsing with SubtitleTranslatorFree. That's a genuine
"creator suite" cluster, not four unrelated bets — cross-link them all.

## Engineering notes / traps
- **Set COOP/COEP headers** in `public/_headers` on Cloudflare Pages or `SharedArrayBuffer` stays false and ffmpeg.wasm multithread won't work. (Verified false on a plain HTTPS origin above.)
- Prefer **WebCodecs over ffmpeg.wasm** wherever possible — hardware encode, no 25MB WASM payload. Use ffmpeg.wasm only for container muxing edge cases (or use `mp4-muxer` / `webm-muxer`, both tiny).
- Long videos: write intermediate frames to **OPFS**, never hold them in memory.
- Ship a pre-flight browser gate. WebCodecs is absent on Firefox for encode paths.

⚠️ Demand numbers = Google autocomplete (caps at 30) — proves demand exists, does **not** rank. Verify
with Ahrefs. SERP positions NOT verified — run one incognito check before committing.
Domains RDAP-verified free at time of writing; confirm price on Porkbun.
