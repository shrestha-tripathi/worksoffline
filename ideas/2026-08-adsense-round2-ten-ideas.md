# 10 More AdSense-Revenue Plays — Aug 2026 (Round 2)

**Method & confidence labels — read this first.**

| Signal | How obtained | Confidence |
|---|---|---|
| Demand | Google autocomplete depth, 120 live queries | ✅ Hard-verified |
| .com availability | Live RDAP against Verisign | ✅ Hard-verified (still price-check on Porkbun) |
| Incumbent analysis | Reasoning + domain knowledge | ⚠️ **NOT SERP-verified** — Bing/DDG both served bot-degraded results this session |

Do a manual incognito google.co.in check on the head term before committing a weekend to any of these.
Caveat on autocomplete: it **caps at 10 suggestions/query**, so most ideas tie at 30. It proves *demand exists*;
it does **not** rank them. Ranking below is driven by the CPM × dwell-time model, not the raw number.

**The scoring model again:** `Revenue ≈ Pageviews × Session-minutes × Niche CPM × Return rate`

---

## The 10

### 🟢 1. ElectricBillPix — `electricbillpix.com` ✓ / `unitstorupees.com` ✓
Electricity bill calculator with **per-DISCOM tariff slabs** (MSEDCL, BESCOM, TNEB, UPPCL, TPDDL, Adani…).
Plus an appliance-wise "what's eating my bill" breakdown.

- **Weakest incumbent field on this entire list.** Category is owned by stale ad-farm blogs with tariff data
  from 3 years ago, and DISCOM portals that are genuinely broken on mobile.
- **Moat = data freshness**, not code. Tariff orders change yearly; nobody maintains them. That's tedious =
  defensible. Same shape as the Krutidev keymap moat in TypingPix.
- 35+ SEO pages (one per DISCOM/state), each with real differing content — no thin-content risk.
- Dwell time is good: people add appliance after appliance.
- Effort: 🟢 1 weekend + ongoing tariff maintenance.

### 🟢 2. IDVCalcPix — `idvcalcpix.com` ✓ / `insurancecalcpix.com` ✓
**IDV (Insured Declared Value) calculator** for car/bike insurance — ex-showroom × IRDAI depreciation slab.

- **Insurance = the single highest-CPM vertical in AdSense**, and it's not close. Policybazaar/Acko/Digit bid
  savagely on these terms, which means a hot ad auction on *your* page.
- **Structural wedge:** every incumbent gates IDV behind an RC-number lookup + phone number, because they want
  the *lead*, not to answer your question. IDV is a **deterministic formula**. They deliberately won't just
  show it. You will. That's an intent-match advantage they can't copy without killing their business model.
- Effort: 🟢 1 weekend (pure math + depreciation table).

### 🟢 3. VisaPhotoPix — `visaphotopix.com` ✓
Passport/visa photo tool with **60+ country presets** (US 2×2", Schengen 35×45mm, India, China, UK, Canada…),
100% client-side.

- Every incumbent (passport-photo.online, VisaFoto, IDPhotoDIY) **uploads a photo of your face + ID doc to a
  server AND paywalls/watermarks the download.** Charging money for a photo of your own face is a weak position.
- 60 presets = 60 long-tail pages: `/schengen-visa-photo-size`, `/us-visa-photo-2x2`.
- Complements ExamPhotoResize from Round 1 — **same codebase, different market (global, higher CPM than India).**
- ⚠️ Tech risk: in-browser background removal (MODNet/BiRefNet WASM) quality on mid-range mobile. Prototype that first.
- Effort: 🟡 2 weekends.

### 🟢 4. StampDutyPix — `stampdutypix.com` ✓ / `stampdutyindia.com` ✓
Stamp duty + property registration charge calculator, **state-by-state**, with the female-buyer rebate,
joint-ownership and circle-rate logic that portals skip.

- **Real-estate/finance CPM is very high.** Home-loan advertisers bid hard.
- Don't fight the head term (Magicbricks/99acres own it). Win 30 state pages: `/stamp-duty-in-bihar-2026`.
  Portals cover 6 states properly; nobody covers all 30 accurately.
- Effort: 🟢 1 weekend + per-state data research (that research IS the moat).

### 🟢 5. FuelCostPix — `fuelcostpix.com` ✓ / `runningcostpix.com` ✓
Trip fuel cost + **EV vs petrol vs CNG running cost** comparison, with per-city live fuel prices.

- EV-vs-petrol is a **rising-search-volume** query with automotive advertisers attached.
- Weak incumbent field (small blogs, mid-tier auto portals).
- Return visits: people re-check as fuel prices move.
- Effort: 🟢 1 weekend. Needs a daily fuel-price data refresh (small cron).

### 🟢 6. TermCoverPix — `termcoverpix.com` ✓ / `howmuchterm.com` ✓
"**How much term insurance do I actually need**" — Human Life Value vs income-replacement vs
expense-based methods shown **side by side**, with the working exposed.

- Highest CPM ceiling on this list (life insurance).
- Same structural wedge as #2: every result is a lead-capture funnel that ends in a call-center dial.
  A transparent instant number is a genuinely better answer.
- Attack informational long-tail, not the head term.
- Effort: 🟢 1 weekend.

### 🟡 7. FlashcardPix — `flashcardpix.com` ✓ / `revisepix.com` ✓
Free flashcards + **FSRS spaced repetition**, local-first (IndexedDB), no login, CSV/Quizlet import.

- **Dwell time and return-rate king of this list** — daily reviews, months on end. That's the AdSense goldmine.
- Quizlet paywalled Learn mode in 2022 and the backlash is *still* live (Knowt grew purely on that anger).
  Anki's web experience is genuinely bad. Dominance is not total.
- ⚠️ Honest risk: study-tool users skew ad-blocker-heavy, and no-login means no retention hooks.
- Effort: 🟡 2 weekends.

### 🟡 8. PFGratuityPix — `pfgratuitypix.com` ✓ / `gratuitypix.com` ✓
EPF corpus projection + gratuity + PF withdrawal tax rules.

- Finance CPM, evergreen demand.
- ⚠️ **Hardest incumbent field here** — ClearTax and Groww genuinely own these head terms with huge authority.
  Only viable via long-tail: `/gratuity-for-4-years-7-months`, `/epf-interest-rate-2026-27-calculation`.
- Best treated as a **companion tool to SalaryPix** (Round 1 S2) for internal linking, not a standalone bet.
- Effort: 🟢 1 weekend.

### 🟡 9. WireSizePix — `wiresizepix.com` ✓ / `loadcalcpix.com` ✓
Electrical load + wire gauge + MCB/breaker sizing calculator (IS 732 / NEC).

- Genuinely underserved; existing tools are ancient ASP pages or paid desktop software.
- Professional B2B audience → **surprisingly high CPM**, and low competition.
- Pairs naturally with #1 (ElectricBillPix) — same audience cluster, cross-linkable.
- ⚠️ Smaller absolute volume. This is a niche-CPM play, not a traffic play. Also: get the disclaimers right.
- Effort: 🟡 2 weekends (getting the tables correct matters — people wire houses off this).

### 🟡 10. RankPredictorPix — `rankpredictorpix.com` ✓ / `cutoffpix.com` ✓
JEE/NEET rank → college predictor using official JoSAA/MCC cutoff data, **no login**.

- **Massive** seasonal traffic (Jan–Feb JEE, May–Jun NEET).
- Careers360/Shiksha/Collegedunia all gate the college list behind an OTP wall that users openly hate.
  No-login is a real wedge, and it goes viral on Telegram/Reddit during counselling season — **traffic
  that bypasses Google entirely.**
- ⚠️ Two real problems: edtech CPM is *low* (post-Byju's collapse), and cutoff data needs annual refresh.
  High volume, mediocre revenue-per-visit. Ranked #10 for exactly this reason.
- Effort: 🟡 2 weekends + annual data maintenance.

---

## Ranked by expected revenue-per-effort

| # | Idea | CPM | Dwell | Incumbent | Effort | Verdict |
|---|---|---|---|---|---|---|
| 2 | IDVCalcPix | ⭐⭐⭐⭐⭐ | Med | Weak-intent gap | 🟢 | **Best ratio on the list** |
| 1 | ElectricBillPix | ⭐⭐⭐ | High | **Weakest field** | 🟢 | **Safest win** |
| 3 | VisaPhotoPix | ⭐⭐⭐⭐ | Med | Paywalled+upload | 🟡 | Global traffic |
| 4 | StampDutyPix | ⭐⭐⭐⭐ | Med | Portals, per-state gap | 🟢 | High value |
| 6 | TermCoverPix | ⭐⭐⭐⭐⭐ | Med | Lead-gen funnels | 🟢 | Highest CPM |
| 5 | FuelCostPix | ⭐⭐⭐ | Med | Weak | 🟢 | Easy, rising trend |
| 7 | FlashcardPix | ⭐⭐ | **Highest** | Quizlet backlash | 🟡 | Retention play |
| 9 | WireSizePix | ⭐⭐⭐⭐ | Med | Very weak | 🟡 | Niche B2B |
| 8 | PFGratuityPix | ⭐⭐⭐⭐ | Low | **ClearTax/Groww** | 🟢 | Companion only |
| 10 | RankPredictorPix | ⭐ | Med | OTP-walled | 🟡 | Volume ≠ revenue |

## Cut this round (and why)

- **SIP / compound interest / retirement calculators** — Groww, Zerodha, ET Money own every query with a
  decade of authority. Great CPM, unwinnable SEO.
- **Math solver with steps** — Photomath (Google), Symbolab (Learneo), Mathway (Chegg). Billion-dollar
  incumbents with programmatic per-equation pages. Also: correct pedagogical steps are genuinely hard, and
  LLMs hallucinate algebra.
- **Mock test / test series (SSC, IBPS)** — Testbook + Adda247. The moat is *thousands of accurate questions*,
  not code. You cannot weekend this.
- **Kundli / horoscope / baby names** — high volume, but AdSense policy grey zone and a spammy neighborhood.
- **Credit score / CIBIL** — needs real bureau API access; can't be client-side.
- **Nutrition / calorie calculators** — YMYL health. Google's E-E-A-T bar is brutal for anonymous sites.
- **Cover letter generator / ATS scanner** — weak demand signal (15–20) and Zety/Jobscan outspend everyone.
- **Wedding budget, scholarship finder, timezone meeting** — thin demand, low CPM.

## Suggested sequencing (with Round 1)

1. **ExamPhotoResize** (R1) — 1 weekend, seeds the exam audience
2. **IDVCalcPix** (#2) — 1 weekend, best CPM-per-effort on either list
3. **TypingPix** (R1) — the dwell-time engine
4. **ElectricBillPix** (#1) — safest, most defensible via data freshness
5. **SalaryPix** (R1) + **PFGratuityPix** (#8) as one linked finance cluster

Two clusters emerge — **Exam/Student** (ExamPhotoResize + TypingPix + VisaPhotoPix + RankPredictor) and
**India Money** (SalaryPix + IDVCalc + TermCover + StampDuty + PFGratuity + ElectricBill). Cross-linking
within a cluster compounds authority — same portfolio-moat logic as the June India-SMB triple play.
