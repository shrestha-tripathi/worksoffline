# Global-Traffic AdSense Plays — Aug 2026 (Round 3)

**Why this list is different.** Rounds 1–2 were India-tilted. Global changes the math:

```
US/UK/CA/AU CPM is 5–15× India CPM
…but global competition is 10× harder, and Western users run ad blockers (25–40%)
```

The **worst** global play is a generic utility (compressor, converter, formatter) — those are
saturated by 15-year-old domains. The **best** global play is a **shareable result**: something that
produces a score, a chart, or an image the user wants to post. Sharing bypasses SEO entirely.

**New scoring lens for global:**
```
Revenue ≈ (SEO traffic + SHARE loop) × dwell × CPM × (1 − adblock rate)
```

### Verification status
| Signal | Method | Confidence |
|---|---|---|
| Demand | 105 live Google autocomplete queries (gl=us) | ✅ Verified demand exists (caps at 30 — does NOT rank) |
| Incumbent alive/dead | Live HTTP status on 33 competitor sites | ✅ Verified |
| .com availability | Live RDAP Verisign | ✅ Verified (price-check before buying) |
| SERP rank positions | — | ❌ NOT verified — check incognito before building |

**Live incumbent check results (relevant):** humanbenchmark ✅200, mynoise ✅200, rainymood ✅200,
pomofocus ✅200, wheelofnames ✅200, 16personalities ✅200, monkeytype ✅200, ezgif ✅200,
ray.so/shots.so/pika.style all ✅200, skribbl ✅200. **These lanes are occupied — I cut them below.**
Dead/moved: `sleepyti.me` 404, `metapicz.com` unreachable.

---

## 🟢 S-TIER

### 1. HearingAgeTest — `hearingagetest.com` ✓
**"How old are your ears?"** — plays 8kHz→18kHz tones, finds your cutoff, returns an **age estimate**.

- **This is the most shareable idea across all three rounds.** The result is a number about *your body*
  that begs comparison. It went viral repeatedly on TikTok as a sound-filter trend — but there is **no
  canonical .com** owning the search traffic that trend generates.
- **Global by nature.** Ears have no nationality. Zero localization work.
- Dwell: users retest, try each ear, hand the headphones to family. Genuinely multi-minute.
- Tech: Web Audio API oscillator. **Trivially easy — a few hours.** Fully client-side.
- Content moat: `/can-you-hear-17khz`, `/mosquito-tone-test`, `/hearing-test-by-age` + real
  presbycusis education (age→frequency loss curves) = legitimate E-E-A-T depth.
- ⚠️ Health-adjacent: must say "not a medical diagnostic" clearly. Keep it entertainment-framed.
- Effort: 🟢 **1 day.** Best effort-to-virality ratio on any list I've given you.

### 2. SeasonalColorPix — `seasonalcolorpix.com` ✓ / `drapepix.com` ✓ / `facetonepix.com` ✓
**Seasonal color analysis** ("Am I a Soft Autumn or a Cool Winter?") from a selfie — client-side face
detection, skin/hair/eye undertone extraction, → season + a **shareable palette card**.

- **Massive, still-rising global trend.** Korean color analysis exploded on TikTok/YouTube; people pay
  **$100–500 for in-person consultations**. The commercial intent behind that is enormous.
- **Fashion/beauty is a top-tier CPM vertical** — and the audience skews mobile, where ad-block rates
  are far lower than desktop.
- Wedge: existing tools are paid apps or drag you to a booking funnel. A free instant one wins.
- Output is a palette image → **built-in share loop.** This is the "shareable result" thesis in its
  purest form.
- Tech: MediaPipe FaceMesh (WASM) + color clustering, all client-side = "your selfie never uploads,"
  which matters a lot for face photos.
- Effort: 🟡 2 weekends (the season-classification logic needs real tuning to feel credible).

### 3. SoundMixPix — `soundmixpix.com` ✓ / `brownnoisepix.com` ✓
**Layered ambient sound mixer** — rain + cafe + fireplace + brown noise, each with its own volume,
**shareable mix via URL**, works offline (PWA).

- **Session length is the entire point: 2–8 HOURS.** Nothing else on any of my lists comes close.
  People leave it open all workday. For AdSense that's an unmatched impressions-per-visit profile.
- Brown noise specifically had a huge ADHD/focus surge and demand is still climbing.
- ⚠️ **Honest incumbent warning:** mynoise.net, rainymood.com, ambientmixer.com are all **live (verified
  200)** and beloved. But: mynoise is donation-driven with a dated UI, rainymood is single-sound,
  ambient-mixer is Flash-era legacy. A modern PWA with URL-shareable mixes + offline is a real gap.
- Effort: 🟢 1 weekend. Ongoing cost: sourcing CC0 audio loops.

---

## 🟡 A-TIER

### 4. PhotoMapPix — `photomappix.com` ✓ / `exifmappix.com` ✓
Drop photos → **plot them on a world map** from EXIF GPS, with a privacy-education angle
("here's exactly what you're leaking when you post this").

- Two audiences at once: travel/nostalgia (fun, shareable) + privacy-aware (educational, high intent).
- `metapicz.com` is **unreachable (verified)** — a known incumbent has effectively vacated.
- Client-side is a hard requirement here and a genuine wedge: nobody sane uploads their whole camera roll.
- Effort: 🟢 1 weekend (exifr + Leaflet).

### 5. AudioSpeedPix — `audiospeedpix.com` ✓ / `songspeedpix.com` ✓ / `tempopix.com` ✓
Change song speed **without pitch distortion** + separate pitch shift + A/B loop.

- Two big global audiences: **musicians** (slow down a solo to learn it) and the
  **sped-up/slowed+reverb edit culture** that dominates TikTok audio.
- Incumbents either upload to a server or are ad-farms. WebAudio + SoundTouch WASM does it locally, instantly.
- Effort: 🟢 1 weekend.

### 6. ReadSpeedPix — `readspeedpix.com` ✓ / `wpmread.com` ✓
Reading speed (WPM) test **with comprehension questions** → shareable score + percentile.

- Same "benchmark yourself" share loop as #1. Education CPM, global English audience.
- ⚠️ humanbenchmark.com is **live and dominant (verified 200)** for reaction-type tests — but it does
  *not* do reading speed with comprehension. That's the gap; stay out of its lane.
- Effort: 🟢 1 weekend (needs a corpus of passages + questions).

### 7. TierPix — `tierpix.com` ✓ / `makeatier.com` ✓
Tier-list maker with drag-drop, image search, and export.

- Tier lists are a **native social format** — every list made is a post made. Enormous organic loop.
- ⚠️ Real risk: `tiermaker.com` returned **403 (bot-blocked, i.e. very much alive)** and owns the
  category hard. Only worth attacking on speed + no-signup + mobile drag-drop, which tiermaker does poorly.
- Effort: 🟡 2 weekends. Ranked A not S *because of* the incumbent.

### 8. ColorVisionPix — `colorvisionpix.com` ✓ / `huetestpix.com` ✓
Ishihara color-blindness test + a **hue-arrangement game** with a shareable accuracy score.

- The X-Rite hue test went viral years ago and there's still no fast free mobile-friendly canonical.
- Share loop + benchmark psychology, same as #1 and #6.
- ⚠️ Same medical-disclaimer requirement as #1. Screen-calibration caveat must be stated honestly.
- Effort: 🟢 1 weekend.

---

## Cut this round — with *verified* reasons

| Idea | Why cut |
|---|---|
| Reaction time / aim trainer | **humanbenchmark.com verified live (200)** — it IS the canonical. Don't. |
| Pomodoro / focus timer | **pomofocus.io verified live (200)** + 500 clones. Zero differentiation left. |
| Decision wheel | **wheelofnames.com verified live (200)** — total category ownership. |
| Personality test | **16personalities.com verified live (200)**, huge brand + paid funnel. |
| Screenshot beautifier | **ray.so, shots.so, pika.style ALL verified live (200)** — crowded, and it's a dev audience (max ad-block). |
| Typing test (global English) | **monkeytype + keybr + 10fastfingers all verified live.** This is exactly why TypingPix targets *Hindi exam* typing instead — that's the defensible slice. |
| Meme/GIF caption | **ezgif verified live (200)**, owns it. Already C-tier in June. |
| Draw-and-guess multiplayer | **skribbl.io verified live**, needs realtime backend — breaks the client-side model + costs money. |
| Split bill / tip calculator | Splitwise owns it; 10-second sessions, near-zero CPM. |
| Timezone converter | timeanddate.com (403 = alive) has 20 years of authority. |
| Days-between-dates / countdown | Commodity; Google answers it in the SERP itself. Zero clicks. |
| IQ test | AdSense policy risk + scam-adjacent neighborhood. Avoid. |
| Love calculator / compatibility | Huge volume, but junk-tier CPM and spam neighborhood. |
| Wordle clone | Weak demand (15) and NYT owns the format. |
| Spotify stats/wrapped-style | Needs Spotify OAuth → not client-side, and API ToS restricts it. |
| Subtitle translator | Needs a paid translation API → breaks the free/no-backend model. |
| Habit tracker | **Demand signal 4/30 — effectively dead as a search query.** Apps own it. |

---

## Recommended global sequencing

1. **HearingAgeTest** — 🏆 **build this first.** One day of work, inherently viral, zero localization,
   no incumbent. Highest expected-value-per-hour of anything across Rounds 1–3.
2. **SoundMixPix** — the 2–8 hour session play. Unmatched impressions per visitor.
3. **SeasonalColorPix** — highest CPM (beauty/fashion) + strongest share loop; biggest build of the three.

**Strategic note vs Rounds 1–2:** these are *complementary*, not replacements. The India plays
(IDVCalcPix, SalaryPix) win on **high CPM per visit with low traffic**; the global plays win on
**high volume + share loops with lower CPM per visit**. Ideal portfolio runs both engines —
and the global ones need no tariff/cutoff/regulation data maintenance, which is the hidden ongoing
cost baked into most of Round 2.
