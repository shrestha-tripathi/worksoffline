# FINAL PICK — 3 Ideas to Build (Aug 2026)

Selected from ~150 candidates across 5 research rounds. All domains **re-verified free** and all
incumbents **re-verified live** at selection time.

## Selection logic

I optimized the *portfolio*, not three individual bets. Three criteria:

1. **Different traction engines** — if all three depend on SEO, one Google update kills everything.
2. **Different audiences** — global viral / global SEO / India+global money.
3. **Escalating effort** — a 1-day win first to build momentum, then bigger swings.

Each pick also needs a **structural moat** — a reason the incumbent *can't* just copy it.

---

## 🥇 #1 — HearingAgeTest — `hearingagetest.com` ✓
**"How old are your ears?"** Plays 8kHz→18kHz tones, finds your cutoff, returns an age estimate + share card.

| | |
|---|---|
| **Engine** | ⚡ Viral / novelty-burn |
| **Effort** | 🟢 **1 day** |
| **Reach** | Global, all browsers, mobile + desktop |
| **Moat** | None technically — **speed to market + brand.** Honest about this. |

**Why it's #1:** best effort-to-outcome ratio of anything across all 5 rounds. The result is a number
about *your own body*, which is inherently comparative and shareable — this format trends on TikTok
repeatedly, yet **no canonical .com owns the search traffic it generates.** Verified: `hearingtest.com`
is **unreachable**, `audiocheck.net` (200) is a general audio-tools site, not a viral ear-age product.
`hearingtest.online` (200) exists but is a clinical-style test, not the shareable format.

Zero localization work (ears have no nationality), pure Web Audio API, no models, no backend, works
on every browser including iOS — the **only** pick with full mobile reach.

⚠️ **Honest risks:** no technical moat, so a competitor could clone it in a day — you win on being
first and on brand. Ad revenue per visit is low (entertainment CPM). Traffic will be spiky, not
compounding. Must carry a clear "not a medical diagnostic" disclaimer.

**Why build it anyway:** it's one day. Even a modest outcome pays for the other two, and it gives you
a fast dopamine win + an audience to cross-link from.

---

## 🥈 #2 — SubLingo — `subtitlelingo.com` ✓ / `srtlingo.com` ✓
**Translate SRT/VTT subtitle files entirely on-device** via Chrome's built-in Translator API.

| | |
|---|---|
| **Engine** | 🐢 SEO + ⚡ novelty (rare hybrid) |
| **Effort** | 🟢 1 weekend |
| **Reach** | Chrome/Edge **desktop only** |
| **Moat** | 🔒 **Strongest on this list — incumbent unit economics** |

**Why it's here:** this is the only idea where the moat is the competitor's *cost structure*.
Verified live: `translatesubtitles.co` (200), `subtitletools.com` (200), `syedgakbar/dst` (200),
`maestrasuite.com` (200) — **every one uploads your file and caps size/quantity**, because they pay
per character downstream (~$20/M chars on Google Cloud). Your marginal cost is **zero**.

They cannot offer "unlimited, free, private" without eating a bill that scales with success.
That's a moat they'd have to burn money to match — the rarest kind.

Demand verified **26/30**, the strongest of any novel-API idea I tested. Audience is global
(fansubbers, indie filmmakers, course creators, anime/K-drama communities) = Western CPM.
SEO surface is large and legitimate: one page per language pair.

⚠️ **Honest risks:** Chrome desktop only — no Safari, no Firefox, **no mobile**. Needs a clean
"open in Chrome" fallback. Also a platform-dependency risk: you're betting on a Google API staying
free. Mitigation: subtitle editing is a desktop workflow anyway, so the constraint costs less here
than almost anywhere else.

---

## 🥉 #3 — LegalPlainPix — `legalplainpix.com` ✓ / `plainmycontract.com` ✓
**Explain a contract / lease / NDA / ToS in plain English**, clause by clause, fully on-device via the
Prompt API (shipped M148, verified).

| | |
|---|---|
| **Engine** | 🐢 SEO, highest-CPM vertical |
| **Effort** | 🟢 1 weekend (🟡 to do well) |
| **Reach** | Chrome desktop only |
| **Moat** | 🔒 Privacy is a *hard blocker*, not a preference |

**Why it's here:** it's the **revenue** pick. Demand verified 30/30, and **legal is the most expensive
ad inventory on the internet** — one visitor here is worth many from #1.

The wedge is unusually strong because privacy isn't a nice-to-have: nobody should paste an employment
contract or NDA into ChatGPT, and for a lawyer doing so is arguably a client-confidentiality breach.
"Never leaves your laptop" converts a legal blocker into the product. Verified incumbents
(spellbook.legal 200, donotpay 200, tosdr.org 200, lawinsider 200) are all cloud-based and mostly
B2B-priced; `lawgeex.com` is **unreachable**.

Enormous long-tail: `/explain-my-lease`, `/what-is-a-non-compete`, `/nda-explained`.

⚠️ **Honest risks:** on-device model quality is below GPT-class — keep scope to *explaining*, never
advising. Hard "not legal advice" framing required. Multi-GB first-run model download will lose some
users. Chrome desktop only.

---

## Portfolio shape

| | #1 HearingAge | #2 SubLingo | #3 LegalPlainPix |
|---|---|---|---|
| Engine | Viral | SEO+novelty | SEO |
| Audience | Everyone | Creators | Professionals |
| Traffic | High, spiky | Medium, compounding | Lower, compounding |
| CPM | Low | Medium | **Very high** |
| Effort | 1 day | 1 weekend | 1 weekend |
| Mobile | ✅ **Yes** | ❌ | ❌ |
| Moat | Weak (speed) | **Strong (economics)** | Strong (compliance) |

No two share a traction engine, an audience, or a failure mode. If Google changes ranking, #1 still
works. If the viral loop dies, #2 and #3 still compound.

## What I did NOT pick, and why

- **ExamPhotoResize / IDVCalcPix / SalaryPix** (R1–R2) — genuinely good, high-CPM, and IDVCalcPix was my
  earlier top pick. Cut **only** because they're India-only and you explicitly asked to go global. Keep
  IDVCalcPix as the next build after these three.
- **SoundMixPix** — the 2–8hr session length is unmatched, but mynoise/rainymood are verified alive and
  beloved, and sourcing CC0 audio is real ongoing work.
- **SeasonalColorPix** — highest CPM of Round 3, but 2 weekends and the season-classification logic
  needs heavy tuning to feel credible. Good #4.
- **TypingPix** — still like it, but Hindi Krutidev mapping is the long pole and it's India-only.
- **PresenterPix / Window Management** — **I withdrew this myself.** "presenter view browser" = 4/30
  demand, and the web can't move native windows. Feature, not product.
- **LabReportPix** — strong demand + top CPM, but YMYL health liability isn't worth it as an early bet.

## Suggested order

1. **HearingAgeTest** — ship in a day, get the fast win and an audience
2. **SubLingo** — the strongest moat; let SEO start compounding early
3. **LegalPlainPix** — the revenue engine, once you've got two live

Start with the one-day build so there's something live this week.
