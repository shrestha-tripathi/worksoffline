# Novel-Browser-API Microtool Ideas — June 2026

> Generated off Shrestha's real traction data: **AlwaysOnTopNotes + LiveCaptionIt gained instant
> traction; FileTransferNow was a slow SEO burn.** The winners share ONE thing — they use
> **Document Picture-in-Picture** (Chrome 116+, 2023), a capability that was *literally impossible*
> in a browser before. FTN was slower because P2P transfer is a *known* category (Snapdrop existed).

## The core insight

| Traction shape | Cause | Examples |
|---|---|---|
| **Instant novelty-burn** ⚡ | App does something people didn't know a browser COULD do → "wait, a webpage can float over my apps?!" → instant share | AlwaysOnTopNotes, LiveCaptionIt |
| **Slow SEO-burn** 🐢 | Known category, you rank over time on "free / no upload" wedge | FileTransferNow, HEICPix |

**Strategy:** to repeat the instant wins, build on **previously-impossible APIs** — Document PiP,
WebCodecs, WebGPU local-AI. The novelty IS the marketing. SEO plays are fine as a second engine
but won't pop the same way.

Demand = Google autocomplete saturation (capped/queries). Domains = live RDAP `.com` check.

---

## 🏆 S-TIER — build these

### 1. ⚡ Floating Teleprompter (Document PiP) — **TOP PICK**
- **What:** Paste a script → it scrolls in a window that floats **on top of OBS/Zoom/Loom/CapCut** while you record. Speed/font/mirror controls. 100% client-side.
- **Why it pops:** Same instant-novelty API as your two winners. Every creator/YouTuber/course-maker records talking-head video and hits "I keep looking away from camera to read my notes." The floating-over-recording-software trick is the *exact* "a webpage can do THAT?" moment.
- **Demand:** 2/5 capped, 30 total — solid. "teleprompter for recording", "teleprompter over zoom" both saturate.
- **Incumbents & their gap:** teleprompter.com, cueprompter.com — all run **fullscreen or in-tab**. NONE float over your recording app, because they predate Document PiP. You'd be the first true floating teleprompter on the web. Desktop apps exist (paid, install). You = no install, floats, free.
- **API:** Document Picture-in-Picture + a scroll loop. ~Weekend build. You've shipped this exact API twice (AOTN, LCI) — fastest possible ship for you.
- **Mobile:** ⚠️ Document PiP is desktop-Chrome-only — but teleprompter-for-recording is a **desktop creator workflow anyway**, so the platform gap doesn't hurt. (Offer a fullscreen fallback on mobile.)
- **Domain (🟢 verified free):** `hoverprompt.com`, `peekprompt.com`, `prompterfloat.com`, `cueover.com`. → **recommend `hoverprompt.com`**
- **Monetize:** free forever; optional "Pro" = saved scripts + remote control from phone ($9 one-time).
- **Viral hook tweet:** *"I built a teleprompter that floats on top of OBS while you record. No install, runs in your browser, never uploads your script. Look at the camera, not your notes. [gif]"*

### 2. ⚡ Floating Webcam Bubble (Document PiP)
- **What:** Your webcam in a draggable circular bubble that floats over any app — for screen recordings, demos, tutorials. Mirror, shape, size, border controls.
- **Why it pops:** Same novelty API. "circle webcam overlay" is a HUGE creator need (every tutorial/Loom has a webcam bubble). People pay for mmhmm / Loom for this.
- **Demand:** 1/4 capped, 18 total — moderate but the buyers are high-intent creators.
- **Incumbents & gap:** mmhmm (install, paid), Loom (account, uploads to cloud), OBS (heavy setup). You = open a tab, bubble floats, nothing uploads, free.
- **API:** Document PiP + getUserMedia + CSS clip. ~Weekend.
- **Mobile:** desktop-only (same as above; it's a desktop workflow).
- **Domain:** all my obvious picks taken (floatcam, hovercam, bubblecam, peekcam, overcam all 🔴). Need a fresh round — try `cambubble.com`, `lensfloat.com`, `popcam.com` ideas. **NEEDS DOMAIN HUNT.**
- **Monetize:** free; Pro = backgrounds/filters.

### 3. ⚡ Video Compressor (WebCodecs, "never uploads") — **biggest SEO market**
- **What:** Drop a video → re-encode smaller (for WhatsApp/email/Discord 25MB limits) **entirely in-browser** via WebCodecs. Pick target size or quality.
- **Why it matters:** Massive, evergreen demand (3/4 capped, 32 total — highest in the whole scan). "compress video for whatsapp" is a daily pain for hundreds of millions, **especially India** (WhatsApp-everything culture + 25MB/16MB limits).
- **Incumbents & the WEDGE:** freeconvert, clideo, veed — **ALL upload your video to a server**, then watermark / paywall / queue you. For a private home video that's both a privacy ick AND slow (upload a 200MB file first). **WebCodecs makes true client-side re-encode possible since ~2023** — you compress locally, instantly, nothing leaves the device. That's a real structural moat: their business model REQUIRES the server.
- **Demand:** highest measured. This is the SEO monster of the list.
- **API:** WebCodecs (`VideoEncoder`/`VideoDecoder`) + mp4box.js muxing. 🟡 Few weekends — harder than your usual (codec config, audio passthrough, Safari gaps) but high payoff. Falls back to ffmpeg.wasm where WebCodecs missing.
- **Mobile:** ⚠️ partial — WebCodecs is on Android Chrome + Safari 16.4+ but iOS encode is patchy. Ship desktop-first, progressive-enhance mobile.
- **Domain (🟢 verified free):** `vidsqueeze.com`, `shrinkclip.com`, `squishvideo.com`. → **recommend `vidsqueeze.com`**
- **India hook:** "Compress video for WhatsApp without uploading" — directly targets the #1 phrase, privacy + speed for the India SMB/family user.
- **Viral hook:** *"Compress any video right in your browser. It never uploads — your video never leaves your phone. Free, no watermark, no 200MB upload wait. [gif of 180MB→24MB]"*

---

## 🥈 A-TIER — strong, secondary engines

### 4. Audio Noise Remover (WebGPU/WASM local AI)
- Clean background noise from voice recordings, fully on-device. Incumbents (Adobe Podcast Enhance, veed) all **upload**. Local-AI denoise (RNNoise WASM or a small WebGPU model) = privacy wedge + free.
- Demand 3/3 capped (30). Domains: cleanaudio/denoisr/hushaudio/unnoise all 🔴 — needs hunt.
- 🟡 Few weekends (model integration). Pairs beautifully with a VoiceRecorder.

### 5. Screen Recorder (MediaRecorder, no-watermark wedge)
- Record screen+mic+cam in-browser, export, **nothing uploads, no watermark, no signup**. veed/screenapp all gate behind account + cloud.
- Demand 2/3 capped (28). Domains all taken (rolltape, capclip, screenpop, clipdeck 🔴) — needs hunt.
- 🟢 Weekend (getDisplayMedia + MediaRecorder — well-trodden). Good combo with #2 Floating Webcam.

### 6. Video → GIF (WebCodecs/client-side)
- "mp4 to gif" — ezgif dominates but is ad-heavy + uploads. Client-side = instant, private.
- Demand 3/3 capped (30). `sniptape.com` 🟢 free.
- 🟡 GIF encode in-browser (gif.js) + WebCodecs decode. Crowded but evergreen.

---

## 🟡 B-TIER — could work, weaker wedge

- **Vocal Remover (karaoke)** — demand 3/3 (30) but lalal.ai + spleeter own it; needs a real WebGPU stem-split model (🔴 multi-week) to compete. High effort.
- **Image→Text / OCR** — demand 3/3 but Tesseract.js wrappers are a dime a dozen; weak differentiation.
- **Webcam/Mic Tester** — demand 3/3, trivial build, but webcammictest.com owns it and there's ~zero monetization.
- **QR Scanner** — BarcodeDetector makes it a weekend build, but commodity + no monetization.
- **Video Trimmer** — demand fine, but online-video-cutter is entrenched; only interesting bundled into the Video Compressor as a feature.

---

## 🔴 C-TIER — cut (rejection log)

- **Floating Timer / Pomodoro / Counter / Metronome** — Document PiP novelty, BUT near-zero demand (0–1 capped) and no monetization. Cute, won't move.
- **Image Upscaler** — Upscayl (client-side, free, open-source) + Remini own it. Don't fight.
- **Video Converter (generic mov→mp4)** — cloudconvert/freeconvert own SEO 10+ yrs; commodity.
- **Online Whiteboard** — Excalidraw owns this utterly, free + open-source.
- **Photo Colorizer** — needs heavy model; DeOldify-grade quality hard client-side; niche demand.
- **Speed Reader / Screen Ruler / Color-blind Sim** — tiny markets, no monetization.
- **PassportPhoto** — already covered in your prior shortlist (PresetPhoto exists).
- **Document Scanner** — CamScanner void is real BUT it's a crowded "scan to pdf" SEO field; only worth it with a sharp India-doc angle, which PresetPhoto-adjacent tools partly cover.

---

## Browser API capability matrix (feasibility reality-check)

| API | Mobile Safari | Mobile Chrome | Desktop Chrome | Powers |
|---|---|---|---|---|
| **Document Picture-in-Picture** | ❌ | ❌ | ✅ 116+ | Floating teleprompter/webcam/notes/captions — *your instant-traction engine, desktop-only* |
| **WebCodecs** | ⚠️ 16.4+ decode ok, encode patchy | ✅ | ✅ | Video compress/convert/trim/gif — *true client-side video* |
| **WebGPU** | ⚠️ 17+ partial | ⚠️ flag | ✅ | Local AI (denoise, upscale, stems) — *mobile-risky, see MPE iOS saga* |
| **MediaRecorder + getDisplayMedia** | ⚠️ no tab-audio | ✅ | ✅ | Screen recorder |
| **getUserMedia** | ✅ | ✅ | ✅ | Webcam bubble, testers |
| **BarcodeDetector** | ❌ (jsQR fallback) | ✅ | ✅ | QR scanner |
| **Web Audio API** | ✅ | ✅ | ✅ | Audio trim, metronome |

**Rule reaffirmed:** Document PiP = desktop-only. That's FINE here because floating
teleprompter/webcam are **desktop creator workflows** — the platform gap doesn't cost you the user.
Don't pick a Document-PiP idea whose user is primarily on mobile.

---

## Recommendation

**Two-engine play:**

1. **Ship `hoverprompt.com` (Floating Teleprompter) FIRST** — it's the fastest possible win for you
   (you've shipped Document PiP twice, so it's a near-copy of AOTN's shell), and it rides the exact
   instant-novelty mechanic that made AOTN pop. Lowest effort, highest novelty-traction probability.

2. **Then `vidsqueeze.com` (Video Compressor)** as your SEO monster — biggest measured demand,
   real "never uploads" structural moat (their model REQUIRES the server), strong India angle.
   More effort (WebCodecs) but it's the long-term traffic compounder.

Floating Webcam (#2) is a great THIRD once you find a domain — it shares code with both the
teleprompter (Document PiP shell) and screen recorder (getUserMedia).

### Verified-free `.com` domains
- 🟢 `hoverprompt.com`, `peekprompt.com`, `prompterfloat.com`, `cueover.com` (teleprompter)
- 🟢 `vidsqueeze.com`, `shrinkclip.com`, `squishvideo.com` (video compressor)
- 🟢 `sniptape.com` (video→gif)
- ⚠️ verify price on Porkbun/Namecheap before buying (RDAP-free ≠ guaranteed standard-price)
