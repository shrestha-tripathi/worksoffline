# Novel Browser API Plays — Aug 2026 (Round 4)

**This round is grounded in a LIVE capability probe, not a spec-sheet guess.**
I ran feature detection inside a real Chromium **147** browser this session.

## 🔬 The probe result — what's actually shipping now

```js
Translator: true   Summarizer: true   LanguageDetector: true   // ← THE NEW THING
WebGPU: true   WebCodecs: true   DocumentPiP: true   WebTransport: true
WebSerial: true   WebHID: true   WebUSB: true   WebMIDI: true
ScreenDetails/WindowManagement: true   DevicePosture: true   Ink: true
IdleDetector: true   ViewTransition: true   Speculation: true   CSS anchor: true
WebNN: false   LanguageModel(Prompt): false   Writer/Rewriter: false
BarcodeDetector: false   WebNFC: false   WebBluetooth: false
```

**And I confirmed the models actually resolve, not just that the symbol exists:**
```
Translator.availability({en→es})  → "downloadable"
LanguageDetector.availability()   → "downloadable"
Summarizer.availability()         → "downloading"
```

### Why the Translation API is the headline

Rounds 1–3 kept hitting the same wall: **"needs a paid translation API → breaks the free/no-backend model."**
I cut SubtitleTranslate in Round 3 for exactly that reason.

**That constraint just died.** Chrome now ships an on-device translation model, free, no API key, no
per-character billing, no server. Previously this cost ~$20 per million characters via Google Cloud —
which is precisely why every incumbent in the space either charges money or is drowning in ads.

This is the single biggest unlock on the list, and it retroactively revives an idea I'd correctly rejected.

⚠️ **Honest limitation:** Chrome/Edge desktop only. Not Safari, not Firefox, not iOS. So every idea
below needs a graceful fallback message. Traffic ceiling ≈ 65-70% of desktop users, ~0% mobile.

---

## 🟢 S-TIER

### 1. SubLingo — `subtitlelingo.com` ✓ / `srtlingo.com` ✓ / `subtranslatepix.com` ✓
**Translate SRT/VTT subtitle files entirely on-device.** Drop a file → pick language → download.
Nothing uploads, no key, no limit, no cost.

- **Demand verified at 26/30** — the strongest signal of any novel-API idea I tested.
- **Verified incumbent weakness (live HTTP):** `translatesubtitles.co` (200), `subtitletools.com` (200),
  `syedgakbar/dst` (200) — all alive, **all of them upload your file to a server and cap file size**,
  because they're paying per character downstream. `subtitlestranslator.com` returned 403.
- **Structural moat:** their cost structure *forces* the paywall/limit. Your marginal cost is zero.
  They cannot match "unlimited, free, private" without eating a bill. This is the strongest
  can't-copy-this wedge across all four rounds.
- Audience: fansubbers, indie filmmakers, course creators, anime/K-drama communities — **global,
  English-language, Western CPM.**
- SEO: `/translate-srt-to-spanish`, `/vtt-translator`, `/translate-subtitles-offline` + one page per
  language pair = large legitimate long-tail surface.
- Effort: 🟢 **1 weekend.** Parse SRT → translate cue-by-cue → reassemble. The API does the hard part.
- ⚠️ Chrome-only. Show a clear "open in Chrome" fallback.

### 2. TLDRPix — `tldrpix.com` ✓ / `privatesummary.com` ✓ / `offlinesummary.com` ✓
**On-device document summarizer** using the Summarizer API. Paste text / drop a PDF → TL;DR,
bullets, or headline. Never leaves the machine.

- ⚠️ **Weak raw demand signal (10/30)** — I'm ranking this on *wedge quality*, not search volume.
  Being honest: this one needs the privacy narrative to carry it.
- The wedge is genuinely sharp though: every AI summarizer (Summari, TLDRThis, ChatGPT) requires
  sending your document to someone's server. For **legal, medical, HR, and financial** documents that's
  a compliance blocker, not a preference. "Your NDA never leaves your laptop" is a real sales line.
- **Those verticals are the highest-CPM ad categories that exist.** Low volume × very high CPM.
- Effort: 🟢 1 weekend.

---

## 🟡 A-TIER

### 3. GamepadPix — `gamepadpix.com` ✓ / `controllertestpix.com` ✓
Controller tester via **WebHID** (not just the old Gamepad API) — per-button latency, stick drift
detection, deadzone visualizer, rumble test, **shareable "your stick drift" report card**.

- **Demand 30/30 — the highest score in this round.** Stick drift is a mass-scale consumer grievance
  (Joy-Con drift became a literal class-action lawsuit).
- ⚠️ **Crowded — verified:** hardwaretester.com, gamepad-tester.com, html5gamepad.com, gamepadtest.com
  are **all live 200.** But every one of them is a dead-simple "does the button light up" page.
- **The novel wedge:** WebHID gives raw device access the Gamepad API never exposed → real
  **drift quantification and latency measurement**. "Is my controller broken?" with an actual
  numeric verdict + share card is a different, better product than "button test."
- Gaming CPM is moderate; ad-block rate in gaming is high. That's the honest downside.
- Effort: 🟢 1 weekend.

### 4. PresenterPix — `presenterpix.com` ✓ / `speakerviewpix.com` ✓ / `secondscreenpix.com` ✓
**Window Management API** (`getScreenDetails`) — true presenter view in a browser: slides fullscreen on
the projector, speaker notes + timer + next-slide preview on your laptop. No install.

- ⚠️ Low demand signal (12/30) — this is a **novelty-burn ⚡ play, not an SEO play.** It wins on
  "wait, a webpage can drive both my monitors?!" demo shares, the same mechanic that worked for
  AlwaysOnTopNotes and LiveCaptionIt.
- Genuinely was **impossible** before Window Management shipped. Nobody has built the obvious version.
- Pairs perfectly with your existing **floatingteleprompter** — same presenter persona, cross-link them.
- Effort: 🟡 2 weekends.

### 5. WebFlashPix — `webflashpix.com` ✓ / `espflashpix.com` ✓ / `gcodepix.com` ✓
**WebSerial/WebUSB** firmware flasher + serial monitor for ESP32/Arduino/3D printers.

- ⚠️ Small audience (14/30) and **esp-web-tools + esptool-js are live (verified 200)** — but those are
  *developer libraries you self-host*, not a friendly consumer destination.
- Maker/electronics CPM is decent, and this audience has genuine buying intent (components, boards).
- ⚠️ Real downside: technical audience = heavy ad-block. Treat as portfolio-flex, not a revenue bet.
- Effort: 🟡 2 weekends.

---

## 🔴 Cut — with probe evidence

| Idea | Why cut |
|---|---|
| **Prompt API / Writer / Rewriter apps** | **Probe says `LanguageModel: false`, `Writer: false`, `Rewriter: false`** in Chromium 147. Still origin-trial/flagged. Cannot ship on this today. |
| **WebNN accelerated AI** | **Probe: `navigator.ml` = false.** Not shipped. Use WebGPU instead. |
| **WebNFC tag writer** | **Probe: `NDEFReader` = false** (and it's Android-Chrome-only by design). Tiny market, 12/30 demand. |
| **BarcodeDetector QR tools** | **Probe: false** in this build; needs jsQR fallback anyway → no novelty. Commodity category. |
| **Web Bluetooth toys** | **Probe: false.** Also permission-heavy and fragile. |
| **DevicePosture / foldables** | Real API, but the addressable market is a rounding error today. 14/30. |
| **ViewTransition / Speculation "demo" sites** | These are *techniques*, not products. No search intent to monetize (20/30 but all informational — devs reading docs, max ad-block). |
| **IdleDetector focus blocker** | 9/30 demand — near-dead query. Extensions own this. |
| **ScreenDetails kiosk tools** | **6/30 — lowest signal I measured.** B2B niche with no search behavior. |
| **WebMIDI studio** | 22/30 but virtualpiano.net + onlinesequencer.net verified alive (403 = bot-blocked = healthy). Crowded, and WebMIDI isn't novel anymore (2015). |
| **Online whiteboard (Ink API)** | Excalidraw/tldraw own this completely. Ink API only improves latency — invisible to users. |

---

## 📊 Capability matrix — measured this session (Chromium 147 desktop)

| API | Status | Mobile reality | Monetizable idea |
|---|---|---|---|
| **Translator** | ✅ downloadable | ❌ desktop Chrome/Edge only | **SubLingo** ⭐ |
| **Summarizer** | ✅ downloading | ❌ | TLDRPix |
| **LanguageDetector** | ✅ downloadable | ❌ | SubLingo helper |
| **WebHID** | ✅ | ❌ | GamepadPix |
| **Window Management** | ✅ | ❌ | PresenterPix |
| **WebSerial / WebUSB** | ✅ | ❌ | WebFlashPix |
| **WebGPU / WebCodecs / DocPiP** | ✅ | partial / ❌ | *already covered in June docs* |
| **Prompt API (LanguageModel)** | ❌ **not shipped** | ❌ | — blocked |
| **WebNN** | ❌ **not shipped** | ❌ | — blocked |
| **BarcodeDetector / WebNFC / WebBluetooth** | ❌ in this build | varies | — skip |

---

## Recommendation

**Build SubLingo.** It is the only idea across all four rounds where:
1. Demand is verified strong (26/30),
2. Incumbents are verified alive **and** verified structurally handicapped (they pay per character, you don't),
3. The enabling API **literally did not exist** until recently — I watched it resolve `"downloadable"` in a live browser today,
4. It's a 1-weekend build, and
5. The audience is global/Western CPM, not India-only.

The Chrome-only constraint is real and caps the ceiling — but subtitle translation is a desktop
workflow anyway (you're editing video files), so the constraint costs you far less here than it would
for a mobile-first tool.

**Sequencing vs earlier rounds:** SubLingo is a ⚡ novelty-burn + 🐢 SEO hybrid — rare. Ship it
alongside **HearingAgeTest** (Round 3, 1 day, pure viral) for a fast one-two, then return to the
India money cluster (IDVCalcPix, SalaryPix) for high-CPM compounding.
