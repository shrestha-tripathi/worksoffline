# Next app — killer idea shortlist (Aug 2026)

Research date: 2026-08-27. Demand evidence = HN Algolia API (verified points/comments).
Domains = live RDAP. ⚠️ Reddit was hard-blocked during research — see caveat at end.

## The #1 finding: how these projects ACTUALLY won

**BentoPDF did NOT win on Hacker News.** Every submission flopped:

| Date | Title | Points |
|---|---|---|
| 2025-10-29 | "BentoPDF: Local, browser-only tool to manipulate PDFs" | **4** |
| 2025-11-07 | **"Stop Uploading Your PDFs to Random Websites"** | **3** |
| 2026-01-17 | "Show HN: BentoPDF is a privacy first PDF Toolkit" (by author) | **2** |

14.8k stars came from **r/selfhosted**. Same story for Meetily: ~30k stars, four HN
attempts, max **4 points**.

### The repeatable pattern
1. **Winning titles are an accusation or a substitution, never a feature list.**
   "Stop Uploading Your PDFs to Random Websites" / "alternative to AirDrop" /
   "Alt to Otter.ai" / "a la Roam".
2. **The founder's own Show HN underperforms a third party's repost.** Logseq: 65 → **209**
   next day by someone else. BentoPDF author: 2 points.
3. **HN works for developer-facing local-first; Reddit wins consumer privacy tools.**
   LocalSend 923, Prism.Tools 380, Logseq 276, Stirling-PDF 507 — all dev-ish.
4. **Relaunch on a schedule.** LocalSend, identical 9-word headline:
   4 → 563 → 447 → **923** points across 3 years. Just keep taking at-bats.
5. **Incumbent pain is always one of five:** upload required / account required / paywall /
   a bot joins your meeting / your data trains a model. Never "it's slow."
6. **Privacy positioning invites adversarial auditing.** Screenpipe got an email-harvesting
   accusation post; BentoPDF a security notice; Prism.Tools was attacked for **loading
   assets from a CDN**. Pre-empt: zero third-party requests, no telemetry, and invite people
   to open the Network tab.

### Direct lessons from the Prism.Tools thread (380 pts — closest analogue to worksoffline.in)
- **#1 complaint, from 3+ separate commenters: RECALL.** *"whenever i actually need one, i
  can never seem to remember their name. That kills like half the traffic for you guys."*
- CDN usage was attacked as breaking the privacy claim. Self-host every asset.
- Ship a **downloadable offline single-file build**, and say so loudly.
- Use a permissive licence — a "no re-hosting" clause got called out.

`worksoffline.in` is a genuinely better, more memorable name than CyberChef / it-tools /
prism.tools. **That is an underused asset.**

## Ranked candidates

| # | Idea | Demand (verified) | Incumbent weakness | Browser-only? | Score |
|---|---|---|---|---|---|
| 1 | **PII scrubber before pasting into ChatGPT** — replace names/IDs, restore on copy-back | Verbatim HN ask: *"I'd like to know if there's a tool that can automatically replace sensitive information before I paste content into ChatGPT, and then automatically restore it when I copy the results… both handled locally"* (46377070) | Tinfoil/Bridge/rehydra = **enterprise contract or signup**. No free consumer tool exists | ✅ regex + NER via transformers.js | **9.5** |
| 2 | **Bot-free meeting notes** — tab audio + Whisper in-browser, no bot joins the call | Meetily's winning pivot to *"Bot-free, self-hosted, 100% local"*; "Refuse to let your doctor record you" 167pts/**226 comments** | Otter/Fireflies/Granola: **a bot visibly joins your call** (social cost) + account + paywall. Meetily needs an **install** | ⚠️ Desktop Chromium only (getDisplayMedia audio) | **9.0** |
| 3 | **True PDF redaction** — actually removes the text layer, not a black rectangle | BentoPDF's whole thesis; Stirling-PDF 507pts | Acrobat **paywall**; iLovePDF/Smallpdf **upload + size caps**; Stirling needs **Docker** | ✅ pdf-lib rasterize-and-recompose | **9.0** |
| 4 | **EXIF / metadata stripper** (images + docx/pdf author + GPS) | Three separate Show HN attempts in **four days** (Feb 2026) — latent demand, no brand owns it | Online strippers: **ads, upload, sketchy** | ✅ trivial | **8.5** |
| 5 | **Preview any file without uploading** (.docx/.psd/.heic/.eml) | "Show HN: JustOpenFile" (48488469) | Google Docs viewer **indexes your file** | ✅ mammoth.js, heic2any | **8.0** |
| 6 | **Local doc Q&A for legal/medical/HR** | ChatGPT-Health HN cluster: *"You are also not protected by HIPAA using ChatGPT"* | ChatGPT **not HIPAA-covered**, retention. AnythingLLM = **install** | ⚠️ WebGPU, ~1–2GB model, desktop | **8.0** |
| 7 | **In-browser LaTeX / doc compilation** | "Show HN: TeXbrain — pdfTeX in the browser via WASM" **117pts, 2 days ago** | Overleaf: **account + compile-time paywall**; unpublished-manuscript confidentiality | ✅ proven twice in 2026 | **7.5** |
| 8 | **Fix the RECALL problem** — PWA + launcher + offline bundle for worksoffline.in | 3 independent commenters in the 380pt thread | CyberChef unmemorable; it-tools needs self-host | ✅ distribution feature, not a tool | **7.5** |

## 🏆 Recommendation: #1 — PII scrubber before pasting into AI

**Why this one:**
- The **only** gap where I found a literal verbatim "is there a tool that…" request.
- Incumbents are all enterprise-gated. Zero free consumer options.
- Browser-trivial — regex layer + optional NER, no model download required for v1.
- Targets exactly the professional audiences with money: lawyers, therapists, HR, finance.
- **It has the best available headline**, structurally identical to BentoPDF's best-performing one:

> ### "Stop pasting client names into ChatGPT."

**Mechanic:** two-pane. Paste text → PII detected and swapped for stable tokens
(`[CLIENT_1]`, `[EMAIL_2]`) → you copy the safe version into any AI → paste the AI's reply
back → tokens rehydrate to real values. **The mapping never leaves the tab.**

**Why it fits your stack:** same 2-layer graceful-degradation architecture as
plainenglishcontract (regex layer always works everywhere; Prompt API layer upgrades
quality on Chromium desktop). You've already shipped this pattern once.

**⚠️ Critical constraint:** Prompt API is **Chromium desktop-only, zero Android**
(verified today). Regex/NER layer must carry mobile entirely.

**Domains (RDAP-verified free today):**
- `scrubbeforepaste.com` ✅ ← **recommended**, matches the headline verb-for-verb
- `pastesafely.com` ✅
- `redactbeforepaste.com` ✅
- `maskbeforepaste.com` ✅
- `noclientnames.com` ✅ (memorable, very on-message)
- `safepasteai.com` ✅ · `pastewithoutpii.com` ✅

Taken: promptscrub, scrubprompt, pastescrub, piiscrub, scrubpii, deidentify, privatepaste,
aiscrub, redactprompt, scrubtext.

**Runner-up domains** if you prefer #2 or #3:
`botfreemeeting.com` ✅, `nobotmeeting.com` ✅, `meetingnobot.com` ✅, `botfreenotes.com` ✅
(`nobotnotes.com` taken) · `redactfreeonline.com` ✅ (truredact/realredact/redactlocal all taken).

## Launch plan (derived from Part A, not guessed)
1. Launch on **r/selfhosted + r/privacy FIRST**, not HN.
2. Have **someone else** post it to HN. Founder Show HNs underperform.
3. Title = accusation: *"Stop pasting client names into ChatGPT."*
4. **Zero third-party CDN requests.** Self-host everything. This was the #1 technical
   criticism of the closest comparable.
5. Ship a downloadable offline single-file build; permissive licence.
6. **Resubmit annually** — LocalSend went 4 → 923 on identical wording.

## ⚠️ Research caveat
Reddit was hard-blocked (old.reddit, redlib mirrors, JSON API — all 403). Since BentoPDF
and Meetily both won on Reddit with near-zero HN traction, **the Reddit corpus is where the
remaining alpha is.** This report likely under-weights consumer gaps and over-weights
developer-facing ones. Re-run via residential proxy or Pushshift/Arctic Shift before betting big.
