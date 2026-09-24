# Round 5 — Prompt API Plays + Window Management for Corporate

## Verification status

| Signal | Method | Confidence |
|---|---|---|
| Prompt API shipping status | chromestatus feature record (id 5134603979063296) | ✅ Verified |
| Writer/Rewriter/Proofreader status | chromestatus feature records | ✅ Verified |
| Live API presence | Probe on HTTPS, Chrome 147 | ✅ Verified |
| Demand | 64 live Google autocomplete queries (gl=us) | ✅ Verified |
| Incumbents alive | Live HTTP on 22 sites | ✅ Verified |
| SERP positions | — | ❌ Not verified |

### 🔬 What the Prompt API actually is (verified, not assumed)

```
Prompt API (id 5134603979063296)
  desktop: 148   android: None
  "initial implementation supports text, image, and audio inputs"
  "response constraints ensure that generated text conforms" (structured output)
```

**It's multimodal** — text, image AND audio in, with schema-constrained output. That's substantially
more than "on-device chatbot." Free, private, zero marginal cost.

### 🩸 Important correction to the hype

I checked the sibling APIs, and they are **NOT ready**:

| API | Real status |
|---|---|
| **Prompt API** | ✅ **Enabled by default, desktop M148** |
| Writer API | ⚠️ **In developer trial (behind a flag)** |
| Rewriter API | ⚠️ **In developer trial (behind a flag)** |
| Proofreader API | ⚠️ **Proposed only** |
| Prompt API **on Android** | ⚠️ **Proposed only — desktop-only for now** |

So "rewrite my email tone" ideas can't lean on the Rewriter API — you'd hand-roll it on the Prompt API.
And **there is no mobile story at all yet.**

### 🩸 Methodology gotcha (bit me twice this session)

These APIs are **secure-context gated**. Probing on `about:blank` returned `Translator: false`,
`Summarizer: false`, `getScreenDetails: false` — all wrong. On `https://` the *same browser* returned
`true`. Always feature-detect on HTTPS.

---

# Part 1 — Prompt API plays

**The universal wedge:** every AI incumbent pays per token and therefore *must* paywall, rate-limit, or
upload your data. On-device inference costs you nothing per use. They cannot match
"unlimited + free + never uploads" without destroying their unit economics.

**The universal constraint:** Chrome desktop only, ~2-4GB model download on first use, and quality is
well below GPT-class. **Pick tasks where "good enough + private + free" beats "excellent + paid + uploaded."**

## 🟢 S1 — LegalPlainPix — `legalplainpix.com` ✓
**Explain a contract / lease / ToS in plain English.** Paste or drop a document → clause-by-clause plain
translation + a "watch out for these" risk list.

- **Demand 30/30** — top-scoring idea of this round.
- **The privacy wedge is at its strongest here.** Nobody should paste an employment contract, NDA, or
  lease into ChatGPT. For a lawyer it's arguably a client-confidentiality breach. "Never leaves your
  laptop" converts a blocker into the product.
- **Legal is the highest-CPM AdSense vertical there is.** Lawyer/legal-service keywords are famously
  the most expensive ad inventory on the internet.
- Incumbents verified live: spellbook.legal (200), donotpay (200), tosdr.org (200) — all cloud, most
  B2B-priced or subscription. `lawgeex.com` **unreachable**.
- ⚠️ Must be framed "not legal advice." Keep it educational.
- SEO: `/explain-my-lease`, `/nda-explained`, `/what-is-a-non-compete` — huge long-tail.
- Effort: 🟢 1 weekend.

## 🟢 S2 — MeetingNotesPix — `meetingnotespix.com` ✓ / `localmeetingnotes.com` ✓
**Drop a recording or transcript → summary + action items + decisions, fully on-device.**
Uses the Prompt API's **audio input** (verified supported).

- **Demand 30/30.**
- Incumbents verified live: otter.ai, fireflies.ai, tldv.io, fathom.video (all 200). All cloud, all
  subscription, all require uploading recordings.
- **The corporate wedge is compliance, not price.** Legal/health/finance/HR staff are often *contractually
  forbidden* from uploading call recordings to a third party. Otter can't fix that — it's their architecture.
- Pairs directly with your existing **captionpip / LiveCaptionIt**, and M152's `audioPreferred`
  getDisplayMedia improves capture quality for free.
- Effort: 🟡 2 weekends.

## 🟢 S3 — LabReportPix — `labreportpix.com` ✓ / `bloodworkpix.com` ✓
**Explain blood test / lab results in plain language** — reference ranges, what a flagged marker means,
what to ask your doctor.

- Demand 25/30, and the emotional urgency is extreme (people google results at 11pm before an appointment).
- **Health data is the most privacy-sensitive category that exists.** Uploading a lab report to a cloud AI
  is exactly what people are afraid of. Also uses the Prompt API's **image input** — photograph the report.
- **Health/pharma CPM is top-tier.**
- ⚠️ **Biggest risk on this list: YMYL.** Google's E-E-A-T bar for health content is brutal for anonymous
  sites, and you need a hard "not medical advice, consult your doctor" stance. Genuinely consider whether
  you want this liability. Ranked S3 on merit; **I'd personally sequence it last.**
- Effort: 🟢 1 weekend.

## 🟡 A-tier
- **QuizFromNotes** — `quizfromnotes.com` ✓ / `studygenpix.com` ✓ — notes → quiz/flashcards (demand 26/30).
  ⚠️ Quizlet (403=alive), Knowt (200), Revisely (200), Quizgecko (403=alive) all healthy. Crowded.
- **PDFChatLocal** — `pdfchatlocal.com` ✓ / `chatpdfoffline.com` ✓ — demand 21/30. ChatPDF, Humata,
  AskYourPDF, ChatDOC **all verified live (200)** and all cloud+paywalled. Wedge is real but category is busy.
- **DeidentifyPix** — `deidentifypix.com` ✓ — strip PII from text *before* you paste it into ChatGPT.
  Demand only 19/30, but it's a delightful meta-play: the tool that makes cloud AI safe to use.

## 🔴 Cut
- **EmailToneRewrite** (20/30) — Grammarly owns it, it's an extension habit, and **the Rewriter API is
  still flagged**, so you'd hand-roll it for a worse result.
- **CodeExplainLocal** (11/30) — dead demand + dev audience = max ad-block.
- **ResumeTailor** (12/30) — weak signal; already B-tier as ATSPix in June.
- **BulkCSVClassify** (19/30) — B2B, no consumer search behaviour, and slow on-device for bulk rows.

---

# Part 2 — Window Management for corporate

## 🩸 The demand data killed my own pitch — read this first

I pitched **PresenterPix** in Round 4. The numbers say I was wrong:

```
"presenter view browser"      →  4/30   ← nearly dead
"multi monitor productivity"  → 30/30   ← maximum
"multi monitor dashboard"     → 14/30
"notes during zoom call"      → 13/30
"multi monitor trading setup" →  9/30
"dual screen focus"           →  8/30
```

**Nobody searches for "presenter view in a browser."** PowerPoint/Keynote/Google Slides already solved
presenting, and people reach for the app they have. I was seduced by the API being cool rather than
checking whether anyone wanted it. **Downgrading PresenterPix from A-tier to C-tier.**

The demand that *does* exist is **window layout management** — and that's a desktop-app category
(DisplayFusion **verified live 200**, Microsoft PowerToys FancyZones), which a web page fundamentally
**cannot** win: a browser tab can't move your Slack, Excel, or Outlook windows. Window Management only
positions *your own* pages.

## Honest verdict on Window Management for corporate

**It's a feature, not a product.** The corporate need is "arrange all my apps," which requires OS-level
access the web will never have. Building a web tool here means competing with free, entrenched native
utilities while being strictly less capable.

**Where it's genuinely worth using — as an enhancement to something you're already building:**

| Use | Value |
|---|---|
| **MeetingNotesPix (S2) second-screen mode** | Live notes/action-items on monitor 2 while the call is on monitor 1. Real corporate workflow, and the *AI* is the product — the multi-screen is a bonus. |
| **Your floatingteleprompter** | Script on the laptop, camera fullscreen on the external display |
| **Any dashboard you build** | One-click "fling panels across all monitors" |
| **DashboardWallPix** (`dashboardwallpix.com` ✓, 14/30) | Signage/kiosk niche — small but nearly uncontested, since it's genuinely painful natively |

**Recommendation: do not build a standalone Window Management product.** Use it as a differentiating
feature inside an idea that already has demand. The API is a great *demo* — I'd put a
"fling this to your second monitor" button in MeetingNotesPix and use it in the launch GIF.

---

## Sequencing

1. **LegalPlainPix** — highest demand (30/30), highest CPM vertical, sharpest privacy wedge, 1 weekend.
2. **MeetingNotesPix** — 30/30, compliance wedge Otter structurally can't answer, + Window Management
   second-screen mode as the ⚡ demo hook, + reuses your captionpip work.
3. **LabReportPix** — strong but YMYL-risky; sequence last and only if you accept the liability framing.

**Standing constraints:** Chrome desktop only, no mobile at all (Prompt API on Android is *Proposed*),
first-run model download is multi-GB, and output quality is below GPT-class — so stay on tasks where
private+free+unlimited beats excellent+paid.
