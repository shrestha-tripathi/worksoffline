# AdSense-Revenue Ideation — Aug 2026

**Different lens than previous rounds.** Earlier lists optimized for *cool client-side capability*.
AdSense income optimizes for a different function:

```
Revenue ≈ Pageviews × Session-minutes × Niche CPM × Return-visit rate
```

This is why HEICPix-shaped tools underperform on ads: user converts a file in 8 seconds and leaves.
One ad impression, low-CPM "utility" category. **Dwell time and repeat visits are the real levers.**

CPM reality (India traffic, rough): utility/converter $0.30–0.80 · education $1–2 · finance/insurance $3–8.

Cut math: 35 candidates → autocomplete-validated → 3 S-tier survivors.

---

## 🟢 S1 — TypingPix (typingpix.com) ⭐ TOP PICK

**Typing speed test built for Indian govt exams** (SSC CGL/CHSL, CPCT, RRB NTPC, DOEACC),
including **Hindi Krutidev/Mangal (Inscript & Remington)** layouts.

| Metric | Why it wins |
|---|---|
| Dwell time | **5–20 min/session.** Users do test after test. 10–30× the page-time of a converter. |
| Return rate | Daily. Exam aspirants practice for *months*. |
| CPM | Education niche + coaching/exam-prep advertisers = solid India CPM. |
| Ad slots | Legitimately supports 3–4 units (between tests, results page, leaderboard, lesson pages). |
| Content moat | Each exam gets its own SEO page: `/cpct-typing-test`, `/ssc-chsl-hindi-typing`, `/krutidev-typing-test`. 30+ landing pages of real long-tail. |

**Incumbents & their weakness:** 10fastfingers / monkeytype are global-English, no Hindi Remington/Inscript,
no exam-specific timing rules. Indian sites (typingtestindia etc.) are ad-vomit PHP relics with broken
Krutidev mapping and no mobile support. **Nobody has shipped a modern, fast, correct Hindi exam typing test.**
That mapping table IS the moat — it's tedious, exam-specific domain knowledge, not a weekend clone.

Stack: Astro 6 + a keystroke engine (pure TS), IndexedDB for history/streaks, no backend.
Effort: 🟡 2–3 weekends (Krutidev mapping is the long pole).
Domain: ✓ `typingpix.com` FREE.

---

## 🟢 S2 — SalaryPix (salarypix.com / ctctohand.com)

**CTC → in-hand salary calculator** with real FY26-27 new/old regime, HRA, 80C, PF, gratuity,
professional tax by state, plus a **"compare two job offers"** mode.

- **Finance CPM is 3–8×** anything else on this list. Credit-card / insurance / loan advertisers bid hard.
- Dwell time is genuinely high: people tweak inputs for 5–10 min, then share screenshots.
- Seasonal spike engine: appraisal season (Mar–Jun) + Budget day traffic tsunami.
- Content moat: `/ctc-vs-in-hand`, `/new-vs-old-regime-2027`, `/hra-exemption-calculator`, `/gratuity-calculator` —
  each a separate high-CPM landing page.
- **You already have `schedulefa`** — the tax-logic muscle exists. Big head start.

Incumbents: ClearTax/Groww have calculators but they're signup-funnels bolted onto a product, slow,
and deliberately incomplete to push you into their paid flow. AmbitionBox is stale.
Wedge: complete, instant, no signup, no lead-gen.

Effort: 🟢 1 weekend (pure math). Domain: ✓ `salarypix.com`, `ctctohand.com`, `takehomepix.com` all FREE.

---

## 🟢 S3 — ExamPhotoResize (examphotoresize.com)

**Photo + signature resizer to exact KB/dimension specs for Indian exam forms** — UPSC, SSC, IBPS,
NEET, JEE, state PSCs. ("Photo 20–50KB, 200×230px; signature 10–20KB, 140×60px.")

- Volume is *enormous* and recurring — every form season, tens of millions of applicants.
- **Preset-per-exam = 40+ SEO pages** with zero content-thinness risk: `/ssc-cgl-photo-size`,
  `/neet-signature-size`, `/ibps-po-photo-resize`.
- Incumbents all upload your photo+signature to a server (a real privacy problem for ID documents)
  and are drowning in popup ads. "Never leaves your device" is a genuine, non-copyable wedge here.

Effort: 🟢 1 weekend (canvas + binary-search JPEG quality to hit target KB).
Domain: ✓ `examphotoresize.com` FREE.

---

## Recommended play

1. **Ship S3 first** (1 weekend, immediate traffic, seeds the "Indian exam aspirant" audience).
2. **Ship S1 next** — same audience, but this is the *dwell-time monster* that actually prints AdSense money.
3. **Ship S2** — the high-CPM finance play, separate audience, seasonal spikes.

S1+S3 share a persona → cross-link them → compounding portfolio moat, same trick that worked for the
India-SMB triple play in the June v2 shortlist.

---

## Rejection log (what I cut and why)

- **Word counter / case converter / age calc / unit converter / UUID / random picker** — 3-second sessions,
  commodity, zero CPM. Traffic ≠ revenue.
- **PDF↔Word / PPT→PDF** — iLovePDF + Smallpdf own the SEO. Already C-tier in June list.
- **Image upscaler / enhancer** — Upscayl + Remini + funded incumbents.
- **AI content detector / humanizer** — AdSense policy risk, plus GPTZero/Originality own it.
- **Screen recorder online** — weak demand signal (14), and Loom/OBS own the intent.
- **SIP / compound-interest calculators** — good CPM but Groww/Zerodha/ET Money own every query with
  10-year domain authority. S2 wins only because CTC→in-hand is *underserved*, unlike SIP.
- **Resume builder** — great CPM, but Zety/Novoresume/Canva outspend everyone; needs paid acquisition.
- **Due-date / ovulation calculators** — high CPM but WebMD/Mayo/Flo dominate; YMYL health = brutal E-E-A-T bar.
- **Favicon / gradient / CSS generators** — dev audience runs ad blockers. Structurally unmonetizable via AdSense.
