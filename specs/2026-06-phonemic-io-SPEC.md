# PhoneMic.io — Implementation Spec

**Status:** Draft v1 · **Date:** 2026-06
**Goal:** Use any phone as a wireless mic for any laptop, zero install, browser-only. WebRTC audio-only, reuses FileTransferNow infra.
**Target ship:** 2 weekends (~16 hours)
**Domain:** `phonemic.io` (DNS-verified free 2026-06)
**Repo:** `github.com/shrestha-tripathi/phonemic` (private)

---

## 0. Why this product

| | |
|---|---|
| **Primary keywords** | "wireless mic for laptop" (40k), "phone as microphone" (25k), "use phone as mic for pc" (15k) |
| **Total cluster** | ~80-120k/mo cumulative |
| **Pain frequency** | Daily — every remote worker / podcaster / streamer / student in a Zoom call |
| **Audience size** | 100M+ Zoom/Meet daily users + creator economy |
| **Competition** | EpocCam ($), Camo ($), DroidCam (install + ads), Wo-mic (Windows only) |
| **Wedge** | ZERO install · works on iOS + Android + any browser · scan QR + go |
| **Infra leverage** | Reuses FileTransferNow's WebRTC + signaling + TURN — 10x less work |
| **Viral demo** | Single tweet "free wireless mic, no install, scan QR" → podcasters share → done |

---

## 1. User flows

### 1.1 Desktop receiver flow

```
1. Land on phonemic.io
2. See hero: "Use your phone as a wireless mic. Zero install."
3. Click "Use this laptop as receiver" (CTA)
4. Allow microphone playback (no permission needed — just <audio> playback)
5. Page shows:
   ┌─────────────────────────────┐
   │   Scan from your phone:     │
   │   [   QR CODE   ]           │
   │   or type code:  H7K2       │
   └─────────────────────────────┘
6. Phone connects → live waveform + dB meter appears
7. Audio routes to default speakers
8. (Optional) "Use in Zoom" guide → setup virtual cable (one-time)
9. Disconnect button at top
```

### 1.2 Mobile sender flow

```
1. Open phonemic.io on phone (typed manually OR via QR scan from desktop)
2. Enter 4-char code H7K2 (or auto-filled from QR scan URL fragment)
3. Tap "Broadcast as mic"
4. Allow microphone access
5. Phone enters "stage mic" mode:
   ┌─────────────────────────────┐
   │                             │
   │      🔴  BROADCASTING       │
   │                             │
   │     ▓▓▓▓▓▓▓░░░░ -18 dB      │
   │                             │
   │      [ Mute ]  [ Stop ]     │
   │                             │
   │   Connected to: MacBook Pro │
   │                             │
   └─────────────────────────────┘
6. Wake Lock keeps screen on
7. Mute toggle = stops sending audio tracks (visual feedback)
```

### 1.3 Zoom/OBS integration flow (one-time setup)

```
1. Receiver page → "Use in Zoom" link
2. Setup guide:
   • Windows: download VB-Audio Virtual Cable (free)
   • Mac: download BlackHole 2ch (free)
   • Linux: setup PulseAudio loopback (one command)
3. In Zoom/OBS: select "VB-Cable" / "BlackHole" as input
4. On PhoneMic receiver page: select "VB-Cable" as output (Chrome only)
5. Done — phone audio now appears as Zoom mic input
```

---

## 2. Tech stack

| Layer | Choice | Reused from FTN? |
|---|---|---|
| Framework | **Astro 6** static | New (`astro-microtool-scaffold`) |
| Styling | **Tailwind v4** | New |
| WebRTC | **`RTCPeerConnection` audio-only** | Adapted from FTN `teleportSession.ts` |
| Signaling | **Cloudflare Worker + Durable Object** | ✅ Fork `RoomDO` |
| 4-char codes | **`CodeDO`** | ✅ Reuse as-is from FTN worker |
| TURN | **Self-hosted coturn on Azure** | ✅ Reuse `turn.filetransfernow.com` infra |
| STUN | **Cloudflare anycast** | ✅ Same as FTN |
| QR scanner | **`web-qr-scanner-native-fallback` skill** | ✅ Copy lib + skill |
| Audio meter | **Web Audio API** + AnalyserNode | New |
| Mute toggle | **`track.enabled = false`** | New |
| Output routing | **`audio.setSinkId()`** (Chrome only) | New |
| Wake Lock | **Screen Wake Lock API** | ✅ Copy `wakeLock.ts` from FTN |
| Theme system | **`data-theme` + localStorage** | ✅ Copy from FTN Layout |
| Deploy | **Cloudflare Pages** auto from `main` | Same pattern |

**Why audio-only data channel:** Browser WebRTC supports `RTCRtpSender.replaceTrack()` for audio streams natively — no need for video MediaStream at all. Drops bandwidth from ~2Mbps (video+audio) to ~64Kbps (Opus audio only).

**Audio codec config:**
```js
const sender = pc.getSenders().find(s => s.track.kind === 'audio');
const params = sender.getParameters();
params.encodings[0].maxBitrate = 128_000;        // 128 kbps for stereo
params.encodings[0].priority = 'high';
await sender.setParameters(params);

// Opus tuning via SDP munging (best quality for voice):
// stereo=1; sprop-stereo=1; maxaveragebitrate=128000; cbr=1; useinbandfec=1
```

---

## 3. File structure

```
phonemic/
├── astro.config.mjs            # env-driven base
├── package.json                # tailwindcss, jsQR (lazy)
├── public/
│   ├── manifest.webmanifest    # PWA install for "feels native"
│   ├── favicon.svg             # mic-icon theme-adaptive
│   ├── og-image.png            # 1200×630 with QR mockup
│   ├── robots.txt
│   └── _headers
├── src/
│   ├── site.config.ts          # brand strings env-driven
│   ├── layouts/Layout.astro    # JSON-LD WebApp, theme bootstrap
│   ├── pages/
│   │   ├── index.astro         # hero + role picker
│   │   ├── receive.astro       # desktop: QR + audio playback
│   │   ├── broadcast.astro     # mobile: stage mic UI
│   │   ├── how-it-works.astro  # SEO explainer
│   │   ├── faq.astro           # JSON-LD FAQPage
│   │   ├── zoom-setup.astro    # virtual cable guide (long-tail SEO)
│   │   ├── obs-setup.astro     # OBS guide
│   │   ├── privacy.astro       # "audio never touches server" guarantee
│   │   ├── 404.astro
│   │   └── sitemap.xml.ts
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── QrCanvas.astro      # QR rendering for receiver page
│   │   ├── AudioMeter.astro    # canvas waveform + dB readout
│   │   ├── ConnectCard.astro   # status pill + disconnect button
│   │   └── CodeInput.astro     # 4-box code input (reuse FTN UX)
│   ├── lib/
│   │   ├── micSession.ts       # WebRTC audio-only session (forked from teleportSession.ts)
│   │   ├── audioMeter.ts       # AnalyserNode dB calculation
│   │   ├── outputRouting.ts    # setSinkId helper + device list
│   │   ├── pairCode.ts         # mint + claim 4-char codes (copy from FTN)
│   │   ├── qrScanner.ts        # native + jsQR fallback (copy from FTN)
│   │   ├── wakeLock.ts         # refcounted wake lock (copy from FTN)
│   │   ├── theme.ts            # dark/light toggle (copy from FTN)
│   │   └── capabilities.ts     # feature detection
│   └── styles/global.css
├── worker/                     # separate Cloudflare Worker
│   ├── src/index.ts            # RoomDO (2-peer cap) + CodeDO + /turn
│   ├── wrangler.toml
│   ├── .dev.vars.example
│   └── scripts/restore-prod-secrets.sh
├── DESIGN.md
├── AGENTS.md
├── .skills/
│   ├── web-design-guidelines/SKILL.md
│   └── tailwind-4-docs/SKILL.md
├── .env.example
└── README.md
```

**LOC budget:** ~600 LOC TS · ~250 LOC Astro · ~120 LOC CSS · ~300 LOC worker · **~1,270 total**

---

## 4. Key engineering decisions

### 4.1 Reuse FTN worker, OR clone it?

**Decision: Clone the worker.** Two reasons:
1. FTN's `RoomDO` is tuned for file transfer (peer queue, file metadata, bye protocol). PhoneMic needs different message types.
2. Separating production traffic isolates failures — PhoneMic outage shouldn't impact FTN file transfers.

**Strategy:**
- `git clone` FTN worker dir → strip file-transfer specifics → keep code-pairing + signaling + TURN
- Deploy as new Worker: `phonemic.shresth-2tripathi.workers.dev`
- Same TURN secret (one coturn server, multiple Workers query `/turn`)

### 4.2 Audio-only session (vs FTN's data channel)

FTN uses `RTCDataChannel` for file bytes. PhoneMic uses `RTCRtpSender` with audio MediaStreamTrack:

```ts
// Mobile broadcaster
const stream = await navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: false,        // raw signal — desktop side handles processing
    noiseSuppression: false,        // LTD tier adds RNNoise in JS
    autoGainControl: false,
    sampleRate: 48_000,             // pro-quality
    channelCount: 1,                // mono = half bandwidth, no stereo info anyway from phone
  }
});
const track = stream.getAudioTracks()[0];
pc.addTrack(track, stream);

// Desktop receiver
pc.ontrack = (ev) => {
  const audio = document.querySelector('audio#mic-out');
  audio.srcObject = ev.streams[0];
  // setSinkId for virtual cable output (Chrome only)
  if (selectedOutputId) await audio.setSinkId(selectedOutputId);
};
```

### 4.3 4-char code reuse

FTN's `CodeDO` is generic (mint code, claim code, single-use, 60s TTL). Copy verbatim.

Receiver mints on page load → displays code + QR with URL `https://phonemic.io/broadcast#code=H7K2`. Sender claims via the URL fragment OR manual entry.

### 4.4 Latency target

Browser WebRTC voice path = 50-150ms end-to-end. Acceptable for Zoom-as-mic but noticeable for live monitoring.

- Mute monitoring on the phone (don't let sender hear themselves through the desktop)
- Show ping/RTT in diag panel (~30-80ms WiFi, 100-200ms via TURN)
- Document expected latency on FAQ

### 4.5 Output device routing (Chrome only)

`HTMLMediaElement.setSinkId()` lets us route audio to a specific output device (e.g. VB-Cable virtual cable for Zoom integration). Chrome/Edge only; Firefox/Safari fall back to system default output.

```ts
// Desktop receiver
const devices = await navigator.mediaDevices.enumerateDevices();
const outputs = devices.filter(d => d.kind === 'audiooutput');
// Render dropdown
// On change: audioEl.setSinkId(selectedDeviceId);
```

Show dropdown ONLY if `'setSinkId' in HTMLAudioElement.prototype`.

### 4.6 Wake Lock on mobile (CRITICAL)

iOS/Android kill background tabs aggressively. Mic stops the moment screen turns off.

- Acquire wake lock on broadcast start
- Release on stop / disconnect
- Use refcounted `wakeLock.ts` from FTN (handles re-acquire on visibility change)

### 4.7 What happens when phone backgrounds?

- iOS Safari: tab suspends → mic stops → connection drops within ~10s
- Android Chrome: WebRTC audio CAN continue in background tab (but Wake Lock auto-releases)

Mitigations:
- Big warning on broadcast start: "Keep this tab open. Don't lock your phone."
- Heartbeat ping every 5s; show "DISCONNECTED" on desktop if 15s gap
- LTD tier idea: native app wrapper (Capacitor) for persistent background mic — out of scope v1

### 4.8 Echo cancellation

Don't enable browser AEC (`echoCancellation: false`). Reason: the broadcaster phone's mic captures only phone-side audio. Desktop plays it through speakers, but desktop doesn't loop back to phone. No echo path exists.

If user mistakenly enables phone speakers (e.g. has phone on speaker AND desktop output AND they're in the same room), they'll get feedback. Document in FAQ + provide warning toast if both devices are detected at <2m audibility.

---

## 5. UI / DESIGN

### Landing
```
┌────────────────────────────────────────────┐
│   PhoneMic.io                              │
│                                            │
│   Your phone is a wireless mic.            │
│   Any laptop. Any browser. Zero install.   │
│                                            │
│   ┌────────────────┐  ┌────────────────┐   │
│   │ 💻             │  │ 📱             │   │
│   │ Use this       │  │ Use this       │   │
│   │ laptop as      │  │ phone as       │   │
│   │ RECEIVER       │  │ BROADCASTER    │   │
│   └────────────────┘  └────────────────┘   │
│                                            │
│   How it works · Privacy · Zoom setup      │
└────────────────────────────────────────────┘
```

### Desktop receiver (idle)
```
┌────────────────────────────────────────────┐
│   PhoneMic — Receiver                      │
│                                            │
│   Open phonemic.io on your phone           │
│                                            │
│   ┌─────────────────────────────────────┐  │
│   │                                     │  │
│   │        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓              │  │
│   │        ▓▓ QR CODE  ▓▓               │  │
│   │        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓              │  │
│   │                                     │  │
│   │    Or type code:  H 7 K 2           │  │
│   │                                     │  │
│   └─────────────────────────────────────┘  │
│                                            │
│   Output device:  [ Default speakers  ▾ ]  │
│                                            │
│   ⏳ Waiting for phone to connect...       │
└────────────────────────────────────────────┘
```

### Desktop receiver (connected)
```
┌────────────────────────────────────────────┐
│   ● Connected to: iPhone 15            ×   │
│                                            │
│   ┌─────────────────────────────────────┐  │
│   │   ▓▓▓▓▓▓▓▓▓░░░░░░ -18 dB            │  │
│   │   ▓▓▓▓░░░░░░░░░░░ peak -12 dB       │  │
│   │                                     │  │
│   │   Latency: 47 ms · Codec: Opus       │  │
│   └─────────────────────────────────────┘  │
│                                            │
│   Output:  [ VB-Cable (Virtual)  ▾ ]       │
│                                            │
│   [ Set up Zoom integration → ]            │
└────────────────────────────────────────────┘
```

### Mobile broadcaster (active)
```
┌──────────────────────┐
│  PhoneMic            │
│  ────────────        │
│                      │
│                      │
│         🔴            │
│   BROADCASTING       │
│                      │
│                      │
│  ▓▓▓▓▓▓▓░░░░░░       │
│      -18 dB          │
│                      │
│                      │
│  Connected to:       │
│  MacBook Pro         │
│                      │
│                      │
│  ┌──────────────┐    │
│  │   🔇 Mute    │    │
│  └──────────────┘    │
│  ┌──────────────┐    │
│  │   ⏹ Stop    │    │
│  └──────────────┘    │
│                      │
│  ⚠ Keep screen on.   │
└──────────────────────┘
```

### Color tokens
- Light: `#fff` bg, `#0a0a0a` fg, `#dc2626` (red mic) accent
- Dark: `#0a0a0a` bg, `#fafafa` fg, `#f87171` (red mic) accent
- "Recording" red is critical signal — never use blue/green for active state

---

## 6. SEO day-1

### 6.1 JSON-LD schemas (Layout.astro)
- `WebApplication` with `applicationCategory: MultimediaApplication`
- `Organization` (WorksOffline)
- `FAQPage` on /faq with 10+ Q&As
- `HowTo` on /how-it-works
- Long-tail page schemas for Zoom + OBS setup

### 6.2 Target keywords
| Page | Primary keyword | Volume/mo |
|---|---|---|
| `/` | "wireless mic for laptop" | 40k |
| `/use-phone-as-microphone` | "use phone as microphone" | 25k |
| `/zoom-setup` | "use phone as mic for zoom" | 18k |
| `/obs-setup` | "use phone as mic for obs" | 8k |
| `/how-it-works` | "wireless mic without install" | 4k |
| `/faq` | long-tail snippets | ∞ |

### 6.3 Content moats
- Side-by-side comparison table with EpocCam/Camo/DroidCam (price, install, platform, latency)
- Embedded "Try it now" CTA on every page → no friction to demo
- "Why this beats DroidCam" explainer post

### 6.4 Launch sequence (week 1-2)
- ProductHunt launch
- HackerNews "Show HN: phone as a mic for your laptop, no install"
- /r/podcasting (specifically — they're hot for this)
- /r/Twitch, /r/letsplay (streamer adoption)
- Single tweet with screen-recording demo

---

## 7. Monetization

### Free tier (forever)
- Unlimited use
- Standard quality (128 kbps Opus)
- Mute / disconnect
- Manual output device selection (Chrome only)

### LTD tier — ₹999 (~$12) lifetime
- **RNNoise WASM noise cancellation** (real-time AI noise removal — the killer feature)
- High-quality codec (320 kbps + sample rate selectable)
- **Pitch correction** (light auto-tune for podcasters)
- **Multi-phone support** — connect 2 phones for stereo mid-side recording
- Custom EQ presets (vocal / music / podcast)
- Recording to local file on desktop (no upload)
- "Powered by PhoneMic" badge → off

Stripe one-time payment · license key in localStorage · zero auth.

### Estimated traffic & revenue (6 mo)
- Conservative: 20k MAU → 1% conv to ₹999 = ₹200k/mo
- Realistic: 50k MAU → 1.5% conv = ₹750k/mo
- Optimistic (viral tweet hit): 200k MAU → 2% conv = ₹4M/mo

(PhoneMic's audience is more willing to pay than HEIC.click's — podcasters/streamers have higher tool-budget.)

---

## 8. Ship plan (16 hours = 2 weekends)

### Weekend 1 (8h) — core working

| Hour | Task | Verification |
|---|---|---|
| 0:00 – 0:30 | Scaffold via `astro-microtool-scaffold` | `npm run build` green |
| 0:30 – 1:30 | Clone worker from FTN, strip file-transfer code | `wrangler deploy` → /turn returns creds |
| 1:30 – 3:00 | Fork `teleportSession.ts` → `micSession.ts` (audio-only) | Two browsers → audio flows |
| 3:00 – 4:30 | Desktop receiver page + QR + 4-char code mint | Code displays, ping mints fresh on TTL |
| 4:30 – 6:00 | Mobile broadcaster page + getUserMedia + connect | Phone to laptop → hear voice in <audio> |
| 6:00 – 7:00 | Mute / disconnect controls + Wake Lock | Mute = silence; lock screen = disconnect after 10s |
| 7:00 – 8:00 | dB meter (AnalyserNode) + status pill | Voice into phone = bar moves on desktop |

### Weekend 2 (8h) — polish + ship

| Hour | Task | Verification |
|---|---|---|
| 8:00 – 9:00 | Output device dropdown (`setSinkId`) | Audio routes to selected device on Chrome |
| 9:00 – 10:00 | Latency + codec info in diag panel | Numbers update live |
| 10:00 – 11:00 | Zoom + OBS setup guide pages | Pages load, screenshots clear |
| 11:00 – 12:00 | SEO pages (/, /faq, /how-it-works, /privacy) + JSON-LD | view-source has schemas |
| 12:00 – 13:00 | DESIGN.md + theme system + dark mode | Toggle works no FOUC |
| 13:00 – 14:00 | OG image + favicon pack + sitemap + robots | Lighthouse SEO ≥ 95 |
| 14:00 – 15:00 | Cloudflare Pages deploy + custom domain | https://phonemic.io loads |
| 15:00 – 16:00 | End-to-end test on 3 device pairs (iOS↔Mac, Android↔Win, iOS↔Linux) | All connect, all hear audio |

---

## 9. Non-goals (explicitly excluded)

| Won't ship | Why |
|---|---|
| Video stream (phone camera as webcam) | Different product → could spin up `PhoneCam.io` later |
| Cloud recording | Violates "audio never touches server" |
| User accounts | Friction kills the wedge |
| Group mic (3+ broadcasters → 1 receiver) | Out of scope v1 — possible v2 |
| Music streaming (Bluetooth replacement) | Different product, latency too high anyway |
| Native mobile apps | PWA covers it, no app-store tax |
| MIDI / DAW integration | Adjacent product, premium pro market |
| Built-in noise cancel (free tier) | LTD differentiator |
| Stream to remote receiver (different network) | Already works via TURN, but explicit "long-distance" pitch is different positioning |

---

## 10. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| iOS Safari kills WebRTC when tab backgrounds | High | Big "keep tab open" warning + heartbeat + graceful disconnect UI |
| 5G/4G to corporate WiFi NAT issues | Medium | Reuse FTN's self-hosted TURN — proven to work cross-NAT |
| `setSinkId` not in Firefox/Safari | Medium | Hide dropdown when unavailable + document in FAQ |
| Echo loop if user has both devices in same room | Medium | Detect via audio-level correlation, show warning |
| Latency too high for live monitoring (>100ms) | Medium | Document "this is for input, not monitoring" — recommend headphones to desktop |
| Premium audio quality requires WebGPU for AI noise | Low | RNNoise WASM works on all browsers (slower but functional) |
| Worker DDoS on /turn endpoint | Low | Cloudflare rate-limit rule (30 req/IP/hr) — same as FTN |
| Domain trademark conflict ("PhoneMic" exists?) | Low | Quick USPTO + Google search before purchase |

---

## 11. Post-launch backlog (NOT v1)

- v1.1: 2nd phone support (stereo mid-side recording — LTD feature)
- v1.2: Custom EQ presets (vocal/music/podcast)
- v1.3: Local recording on desktop (save MP3/WAV)
- v1.4: "Studio mode" — combine PhoneMic + virtual cable in one click
- v1.5: Browser extension for Chrome — system-tray quick access
- v2.0: Sister product `PhoneCam.io` (phone as webcam, same architecture + video tracks)

---

## 12. Verify before shipping

```bash
# Site builds clean
cd ~/projects/phonemic && npm run build && npx astro check

# Worker deploys clean
cd worker && npx wrangler deploy

# All pages 200
for p in / /receive /broadcast /faq /how-it-works /privacy /zoom-setup /obs-setup; do
  curl -fsSI https://phonemic.io$p | head -1
done

# Worker endpoints
curl -s -H "Origin: https://phonemic.io" https://phonemic.shresth-2tripathi.workers.dev/turn | jq .provider
# expect: "self-hosted"

# JSON-LD valid
curl -s https://phonemic.io | grep -oP 'application/ld\+json[^>]*>[^<]+' | jq .

# 3 real-device test pairs minimum:
# iOS Safari ↔ Mac Chrome
# Android Chrome ↔ Windows Edge
# iOS Safari ↔ Linux Firefox
```

---

## 13. Open questions for Shrestha

1. **Brand**: `PhoneMic.io` or alternative (e.g. `MicCast.app`, `WirelessMic.app`)?
2. **LTD pricing**: ₹999 (~$12) or higher (₹1999 ~ $24) given target audience pays more?
3. **Free tier limits**: should free have a daily-minutes cap (e.g. 60 min/day) to convert to LTD faster?
4. **Worker isolation**: separate Worker per product OR one mega-worker hosting multiple Durable Object namespaces?
5. **Subdomain on `worksoffline.in`** or standalone `phonemic.io`? (Standalone wins for SEO + brand recall)
6. **Recording feature**: include in free tier (browser-only saves) OR reserve for LTD?
7. **VB-Cable / BlackHole bundled installer**: build a one-click setup helper for Zoom integration, OR just link to vendor downloads?

---

## 14. Why this is the right second pick after HEIC.click

| Dimension | HEIC.click | PhoneMic.io |
|---|---|---|
| Audience | Passive SEO traffic | Viral tweet potential |
| Tech complexity | Low (file API) | Medium (WebRTC, reuses FTN) |
| Differentiator | SEO + zero limits | Zero install + wow demo |
| Revenue per user | ₹199 LTD | ₹999 LTD |
| Audience LTV willingness | Low (utility) | High (creator tool) |
| Maintenance | Near-zero | Some (WebRTC edge cases) |
| Synergy with FTN | None | High (shares infra) |

The two complement each other — HEIC is your SEO compounding asset, PhoneMic is your viral demo + premium-tier monetization play. Shipping both in 1-2 weekends nets you a complete WorksOffline tier: passive traffic + viral catalyst + paying users.
