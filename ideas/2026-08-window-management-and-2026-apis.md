# Window Management API + Every Chrome API Shipped in 2026

**Sources & confidence.** Everything here is pulled from live data this session, not memory:
- **chromestatus.com API** — the "Enabled by default" feature list per milestone
- **chromiumdash.appspot.com** — official stable-release dates
- **Live feature probe** in Chromium 147 on an HTTPS origin

⚠️ **Scope caveat:** this is the **Chrome/Chromium** shipping record. Safari (WebKit) and Firefox
(Gecko) ship on separate schedules and did NOT ship most of the below. Anything marked Chrome-only
has ~0% mobile-Safari reach.

---

# Part 1 — The Window Management API

## What it is

Before this API, a web page's knowledge of your displays was essentially a lie: `screen.width` reported
only the *current* screen, and there was no way to know a second monitor existed, let alone target it.

Window Management (`window.getScreenDetails()`) gives a page the **full multi-monitor topology** and lets
it **place windows and fullscreen content on a specific display**.

## Verified behaviour (probed live this session)

```js
'getScreenDetails' in window   → true    // Chromium 147, HTTPS
screen.isExtended              → false   // single-display test machine
navigator.permissions.query({name:'window-management'}) → "prompt"
await window.getScreenDetails() → NotAllowedError: "Transient activation is required"
```

### 🩸 Two gotchas I hit and confirmed

1. **Secure context is mandatory.** My first probe ran on `about:blank` and reported
   `getScreenDetails: false`, `Translator: false`, `isExtended: false`. On `https://` the *same browser*
   reported all `true`. If you feature-detect on an insecure origin you'll wrongly conclude it's unsupported.
2. **Requires transient user activation + a permission prompt.** You cannot call it on page load —
   it throws `NotAllowedError`. It must be inside a click handler.

## The API surface

```js
const details = await window.getScreenDetails();   // inside a click handler!

details.screens       // array of every connected display
details.currentScreen // the one this window is on
details.addEventListener('screenschange', ...)     // monitor plugged/unplugged

// each screen exposes:
{ left, top, width, height,      // virtual-desktop coordinates
  availLeft, availTop, availWidth, availHeight,  // minus taskbar/dock
  isPrimary, isInternal,         // primary display? built-in laptop panel?
  devicePixelRatio, label,       // "DELL U2720Q"
  colorDepth, orientation }

// quick check, no permission needed:
screen.isExtended   // true if >1 display — use this to decide whether to even ask
```

**Targeting a specific screen:**
```js
// fullscreen a slide deck on the projector
await deckEl.requestFullscreen({ screen: details.screens[1] });

// or open a popup positioned on it
const s = details.screens[1];
window.open(url, '_blank', `left=${s.availLeft},top=${s.availTop},width=600,height=400`);
```

## What you can actually build

| Use case | Why it was impossible before |
|---|---|
| **Presenter view** — slides on projector, notes+timer+next-slide on laptop | Couldn't detect the projector, couldn't choose which screen goes fullscreen. This is PowerPoint's killer feature, now doable in a tab. |
| **Trading / ops dashboards** — fling 6 chart windows onto 3 monitors in one click | No way to know monitors existed or their coordinates |
| **Video editing / DAW layouts** — timeline on main, preview fullscreen on reference monitor | Same |
| **Digital signage & kiosks** — drive several displays from one page | Required native apps |
| **Streaming setups** — controls on one screen, clean output on the other | Manual window dragging |
| **Multi-screen games** — map/inventory on the second display | — |

## Honest limits

- **Chrome/Edge desktop only.** Not Safari, not Firefox, not mobile (a phone has one screen — the API is meaningless there).
- **Permission-gated**, so expect drop-off at the prompt.
- Users must actually own a second monitor → shrinks the audience a lot.
- **Verdict:** great ⚡ *novelty-burn demo* material, weak 🐢 SEO market. That's exactly why I ranked
  PresenterPix **A-tier not S-tier** in Round 4 — demand signal was only 12/30.

---

# Part 2 — Everything Chrome shipped in 2026 (M144 → M152)

**2026 milestone dates (verified via chromiumdash):**

| Milestone | Stable date | Milestone | Stable date |
|---|---|---|---|
| M144 | 2026-01-13 | M149 | 2026-06-02 |
| M145 | 2026-02-10 | M150 | 2026-06-30 |
| M146 | 2026-03-10 | M151 | 2026-07-28 |
| M147 | 2026-04-07 | M152 | 2026-08-25 *(imminent)* |
| M148 | 2026-05-05 | | |

## 🔴 CORRECTION to my Round 4 report

**The Prompt API (`LanguageModel`) shipped "Enabled by default" in M148 — May 2026.**

In Round 4 I probed and reported `LanguageModel: false` and told you Prompt-API ideas were
"unbuildable today." **That was wrong** — the test browser is Chromium **147**, exactly one milestone
*behind* the release that shipped it. The probe was accurate about the browser; my conclusion about
the *platform* was not.

This matters a lot: **on-device LLM inference with no API key and no server cost is now stable in Chrome.**
That's a bigger unlock than the Translator API I got excited about in Round 4, and it reopens every idea
I killed with "needs a paid LLM API."

## The genuinely notable 2026 APIs

### 🤖 Built-in AI (the big story of 2026)
| Feature | Milestone | Why it matters |
|---|---|---|
| **Prompt API** (`LanguageModel`) | **M148** | Full on-device LLM. Zero marginal cost, fully private. |
| **Web Speech: on-device recognition quality** | M150 | Better local speech-to-text, no cloud |
| **Web Speech: unspoken punctuation** | M151 | Auto-punctuation in dictation |
| **Web Speech: contextual biasing** | M142 | Feed domain vocabulary to boost accuracy |
| **LanguageDetector: Traditional vs Simplified Chinese** | M151 | Finer-grained detection |
| *(Translator / Summarizer / LanguageDetector — probed `true`, shipped pre-2026)* | | Covered in Round 4 |

### 🔌 Hardware & system access
| Feature | Milestone | Why it matters |
|---|---|---|
| **Web Serial API on Android** | M148 | Serial from a *phone* — big for makers/diagnostics |
| **Web Smart Card API** | M143 | Smart-card auth from the browser |
| **Digital Credentials API** | M141 | Government/mobile digital ID presentation |
| **Device Bound Session Credentials** | M145 | Anti-token-theft session hardening |
| **CPU Performance API** | M152 | Read CPU perf characteristics |
| **DeviceOrientation permission request API** | M151 | Standardized motion-sensor permission |
| **Direct Sockets multicast** | M144 | Raw TCP/UDP (IWA-restricted) |

### 🎨 CSS (a very heavy year)
| Feature | Milestone |
|---|---|
| `contrast-color()` — auto-pick readable text color | M147 |
| `border-shape` — non-rectangular borders | M147 |
| `caret-shape` / `caret-animation` | M147 / M140 |
| **Customizable `<select>`** (`appearance: base-select`) | M145 |
| **Scroll-triggered animations** | M146 |
| **CSS Gap Decorations** (gutter lines, no pseudo-element hacks) | M149 |
| `text-fit` — fit text to a box | M150 |
| **Focusgroup** — declarative arrow-key navigation | M150 |
| `flex-wrap: balance` | M150 |
| Anchor positioning + transforms; anchored fallback container queries | M144 / M143 |
| Element-scoped view transitions | M147 |
| Comma-separated & name-only container queries | M150 / M148 |
| `light-dark()` with images, `image(<color>)`, relative alpha `alpha()` | M150 / M152 |
| CSS typed arithmetic | M140 |

### 🧩 Platform / DOM
| Feature | Milestone | Why it matters |
|---|---|---|
| **Sanitizer API** | M146 | Native XSS-safe HTML sanitization — no DOMPurify |
| **Scoped Custom Element Registry** | M146 | Real component isolation |
| **`clipboardchange` event** | M144 / M145 | React to clipboard changes |
| **Selective Clipboard Format Read** | M149 | Read one format without pulling everything |
| **Interest Invokers (`interestfor`)** | M142 | Declarative hover/focus popovers |
| **ARIA Notify API** | M141 | Direct screen-reader announcements |
| **`aria-actions`, Reference Target for cross-root ARIA** | M151 / M152 | Accessibility in shadow DOM |
| **IndexedDB `getAllRecords()`** | M141 | Faster bulk IDB reads |
| **IndexedDB SQLite backend** | M145 | Under-the-hood perf |
| `Math.sumPrecise` | M147 |  Exact float summation |
| **Lazy loading for `<video>`/`<audio>`** | M148 | `loading="lazy"` for media |
| **Extended-lifetime shared workers** | M148 | |
| `textStream()` on response/request/blob | M151 | Simpler streaming text |
| **Navigation API precommit handlers** | M141/M145 | Finer SPA routing control |
| **Local Network Access restrictions** | M142/M147/M145 | Security clampdown on localhost probing |
| **Reduced User-Agent strings by default** | M145 | UA sniffing is now dead |
| **`window-drag`** | M152 | Programmatic window dragging |
| **`audioPreferred` / `windowAudio` in getDisplayMedia** | M152 / M141 | **Better tab/window audio capture — relevant to LiveCaptionIt** |
| `restrictOwnAudio`, `echoCancellationMode` | M141 | Cleaner audio capture |
| **WebGPU**: subgroup size control, immediates, swizzle, linear indexing | M152/M150/M143/M148 | Faster local AI |

---

## What this changes for your build list

1. **Prompt API is live (M148).** My Round 4 "unbuildable" verdict was wrong. On-device LLM with zero
   marginal cost is now the strongest available wedge — every incumbent AI tool pays per token and must
   paywall; you wouldn't. Worth a Round 5 focused purely on this.
2. **`audioPreferred` in getDisplayMedia (M152)** is a direct, free upgrade for **LiveCaptionIt** and
   **captionpip** — better tab-audio capture. Cheap win on an existing project.
3. **Web Serial on Android (M148)** partially rescues WebFlashPix from desktop-only.
4. **Sanitizer API (M146)** lets you drop DOMPurify from any project that takes pasted HTML.
5. **Window Management** remains a demo-flex, not a traffic play — my A-tier ranking stands.

**Standing caveat:** all Chrome-only. Ideas built on these need a graceful "open in Chrome" fallback,
and none of them reach iOS.
