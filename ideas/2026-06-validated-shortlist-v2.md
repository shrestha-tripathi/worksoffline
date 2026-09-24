# Client-Side Ideas v2 — Validated Shortlist (June 2026)

> **Replaces:** `2026-06-client-side-app-ideas.md` (added: 30+ new candidates, real-signal validation, .com domain checks, competitor density)
>
> **Method:** Google autocomplete (180 queries, parallel) + competitor recon (35+ sites) + RDAP .com availability (133 domains) + framework from the PhoneMic/PCAP rejection analyses.
>
> **Scoring:** S-tier = ship next. A-tier = strong second. B-tier = could work. C-tier = avoid (incumbent or low demand).

## TL;DR — Top 5 picks ranked

| Rank | Idea | Why | Build | Domain |
|---|---|---|---|---|
| 🥇 **S** | **VoiceNote.click** (WhatsApp voice-note → text) | Universal pain, India = killer market, viral mechanic baked in, no .com-grade incumbent | 14h | TBD (`.click` works for vibes; `.com` candidates need fresh check) |
| 🥈 **S** | **AadhaarMask.com** (mask Aadhaar in PDFs) | India-specific, **mandated** by RBI for KYC submissions, no good free client-side tool, you literally CAN'T upload Aadhaar to a server (defeats the point) | 12h | ✓ `aadhaarmask.com` FREE |
| 🥉 **A** | **PassportPhoto (govt-size, India + global)** | High demand globally, **specific Indian sizes** (200×200, 35×45mm) underserved by .com tools that upload | 16h | ✓ `phototopassport.com` / `indiapassportphoto.com` FREE |
| 4 | **GST Invoice maker (free forever, no signup)** | Every existing tool requires signup. Indian SMBs file daily. ~37 autocompletes. Real recurring pain. | 18h | ✓ `gstpix.com` / `invoicepix.com` / `indiainvoice.com` FREE |
| 5 | **DecibelMeter.click** (PWA, viral mechanic) | Highest viral coefficient ("how loud is your Diwali firework"), instant-PWA, perfect mobile fit | 10h | TBD `.com` |

---

## The framework I used to cut

Same 4 questions from the PhoneMic + PCAP rejection analyses:

1. **Demand:** Does Google autocomplete + Reddit confirm recurring intent?
2. **Competition:** Is the incumbent structurally beatable, or do they own the market (Espressif esptool-js, regex101, crontab.guru, Squoosh)?
3. **Wedge:** What's our hard-to-copy moat? (privacy, free-forever, India-specific, no-signup)
4. **Domain:** Real buyable `.com` available? (User's rule)

If any of those is a flat NO → cut to C-tier.

---

## Full ranked table — 50 candidates

| Tier | Idea | Demand | Incumbent risk | .com avail | Verdict |
|---|---|---|---|---|---|
| 🟢 **S** | VoiceNote.click | 40 (huge — WhatsApp universal) | Otter $20/mo upload; Google Recorder Android-only — **no .com client-side winner** | TBD | Top pick |
| 🟢 **S** | AadhaarMask | 31 (India, RBI mandate) | Only UIDAI's own slow tool; can't upload Aadhaar | ✓ `aadhaarmask.com` | Top pick India |
| 🟢 **A** | PassportPhoto (govt sizes) | 40 | passport-photo.online uploads + AI upsell | ✓ `phototopassport.com` | Strong |
| 🟢 **A** | GST Invoice (no signup) | 37 | Refrens / Zoho — all signup | ✓ `gstpix.com` | Strong India |
| 🟢 **A** | DecibelMeter.click | 40 | App store noise; web ones have ads | TBD | Viral mechanic |
| 🟢 **A** | PDFSign.click | 40 | Adobe $14.99/mo; signnow signup | TBD | SEO + India |
| 🟢 **A** | PhotoScan.io (CamScanner alt) | 40 | CamScanner BANNED in India; Adobe Scan needs account | TBD | India narrative |
| 🟢 **A** | EXIF stripper (privacy) | 30 | TrustedTools, online-tools — uploads | ✓ `exifpix.com` / `noexif.com` | Privacy-pure wedge |
| 🟢 **A** | Recipe extractor (URL→printable) | 20 | All ad-supported recipe sites are the problem; print-free is the wedge | ✓ `extractrecipe.com` | Long-tail SEO + universal pain |
| 🟢 **A** | Aspect ratio cropper bulk | 30 | None really client-side + batch | ✓ `cropbulk.com` | Niche pro audience |
| 🟡 **B** | MemeGIF.click | 38 | ezgif huge incumbent (ads but trusted) | TBD | Possible but ezgif owns |
| 🟡 **B** | Tweet/Carbon screenshot | 21 | Carbon.now.sh / Polacode — incumbent | TBD | Crowded |
| 🟡 **B** | InstaCarousel splitter | 40 | Canva, Adobe — both require signup | ✓ `splitforinsta.com` / `carouselpix.com` | Creator niche |
| 🟡 **B** | Subtitle/SRT editor | 40 | VEED, Amara — VEED requires upload; client-side window exists | ✓ `srtpix.com` / `subspix.com` | Creator niche |
| 🟡 **B** | YouTube thumbnail maker | 30 | Canva owns; Snappa | ✓ `ytthumbnailfree.com` | Creator niche |
| 🟡 **B** | Photo timestamp (insurance) | 28 | Timestamp Camera (Android), niche app stores | TBD | India SMB niche |
| 🟡 **B** | BlurFaces.click | 23 | iOS Markup, Photoshop | TBD | Privacy crowd |
| 🟡 **B** | ColorGrab (camera color picker) | 30 | Adobe Capture (app + account) | TBD | Designer niche |
| 🟡 **B** | Period tracker (local-only) | 30 | Flo (insanely big), Clue — but post-Dobbs privacy panic = wedge | TBD | Sensitive niche |
| 🔴 **C** | **JSON formatter** | 40 | jsonformatter.org dominates SEO since 2010 | — | Don't bother |
| 🔴 **C** | **Regex tester** | 40 | **regex101.com — 100M+ users, the canonical** | — | Don't bother |
| 🔴 **C** | **Cron expression builder** | 28 | **crontab.guru — the bible** | — | Don't bother |
| 🔴 **C** | **Base64 encoder/decoder** | 30 | base64decode.org + 50 others, commodity | — | Don't bother |
| 🔴 **C** | **Diff checker** | 30 | diffchecker.com + many | — | Don't bother |
| 🔴 **C** | **UUID generator** | 30 | uuidgenerator.net, commodity | — | Don't bother |
| 🔴 **C** | **JWT decoder** | 30 | jwt.io (Auth0-owned, canonical) | — | Don't bother |
| 🔴 **C** | **Image background remover** | 40 | **remove.bg owns it ($$$ but huge brand)**; PhotoRoom raised $43M | ✓ `nobgpix.com` | Massive incumbents |
| 🔴 **C** | **Image compressor** | 40 | **Squoosh by Google** — already client-side, free, perfect | — | Don't beat Google |
| 🔴 **C** | **Image resizer** | 40 | imageresizer.com + 50 others; commodity | ✗ all taken | Don't bother |
| 🔴 **C** | **PDF compressor / merge / split / JPG-to-PDF** | 40 each | iLovePDF + Smallpdf own SEO; very hard to dislodge even with client-side wedge | ✗ most taken | Skip |
| 🔴 **C** | **QR code generator** | 40 | qr-code-generator.com + qrcode-monkey + many | ✗ all taken | Skip |
| 🔴 **C** | **EMI Calculator** | 40 | emicalculator.net dominates India SEO for ~15 years | ✓ `freeemi.com` | Hard to dislodge |
| 🔴 **C** | **Markdown to PDF** | 40 | md-to-pdf.fly.dev free + many CLIs | — | Niche dev tool |
| 🔴 **C** | **Password generator** | 30 | Bitwarden, 1Password, every password manager has free generator | ✓ `localpassgen.com` | Commodity |
| 🔴 **C** | **Have I Been Pwned** | 20 | **You can't beat troyhunt's HIBP** | — | Don't try |
| 🔴 **C** | **File hash / checksum** | 30 | every dev tool has one | ✗ all taken | Commodity |
| 🔴 **C** | **BMI / TDEE calc** | 31 | calculator.net + countless | — | Commodity, low rev |
| 🔴 **C** | **Habit tracker** | 30 | Habitica, Streaks, Loop — established | ✓ `habitpix.com` | Apps own this |
| 🔴 **C** | **Insta DP / Story downloader** | 21 | Legally grey + ad-spammed niche | — | Trash neighborhood |
| 🔴 **C** | **YouTube to MP3** | 3 | Legal grey, Google fights it | — | Avoid |
| 🔴 **C** | **PAN-Aadhaar linker** | 30 | Income Tax Dept's own site is the answer | — | Government owns it |
| 🔴 **C** | **PDF→Word** | 30 | Adobe + Smallpdf + iLovePDF — DOCX is HARD to do client-side without quality loss | ✓ `pdftodocfree.com` | Tech moat against us |
| 🔴 **C** | **Tax slab calculator** | 30 | ClearTax, Income Tax Dept — dominate | ✗ all taken | Skip |
| 🔴 **C** | **Excel→CSV/JSON** | 30 | convertcsv.com, every spreadsheet IDE has it | ✓ `xlsxpix.com` | Niche dev |
| 🔴 **C** | **AI image upscaler** | 30 | Upscayl owns client-side; remini owns mobile | — | Saturated |
| 🔴 **C** | **Voice cloner / TTS** | 30 | ElevenLabs, OpenAI, Google — server-side required for quality | — | Can't do well client-side |
| 🔴 **C** | **Live transcription for meetings** | 30 | Otter (raised $63M), Fireflies — well-funded | — | Crowded B2B |
| 🔴 **C** | **Resume parser** | 24 | Affinda + every ATS has one; commercial market | — | B2B saturated |

---

## Deep dives on top 3 NEW picks

### 🥇 #2 — AadhaarMask.com (India-specific, regulatory)

**The pain.** Every Indian who has ever submitted Aadhaar for KYC (bank, mutual fund, telecom, gas connection, school admission) is supposed to mask the first 8 digits per RBI/UIDAI mandate. The official UIDAI tool is slow, downloads a watermarked PDF, and requires you to be on their site. Every third-party tool wants to UPLOAD your Aadhaar — which is precisely the security violation you're trying to prevent.

**The wedge.** "Your Aadhaar never leaves your device" isn't marketing copy — it's the LITERAL reason you'd use this tool. Same shape as HEICPix's privacy moat but with regulatory weight behind it.

**Tech stack.** Astro 6 (same scaffold) + pdf-lib (load + redact rectangles + save) + Canvas for the visual selection UI. ~12h.

**Wedge audit.** Indians submit Aadhaar copies daily for KYC. RBI/SEBI mandate masking. Existing tools either upload (security violation) or are the official UIDAI tool (slow + accounts). True client-side masking is the ONLY ethical answer.

**SEO.** "aadhaar mask online" 31 autocompletes — high-intent India search. Long-tail: "mask aadhaar in pdf", "aadhaar masking online free", "RBI aadhaar masking rule".

**Domain.** ✓ `aadhaarmask.com` AVAILABLE.

**Monetization.** Free forever. India fintech / bank partnerships could be a B2B angle later (sell as embedded widget), but v1 = pure free utility.

**Viral.** Mid (3/5). Not TikTok-viral but VERY shareable in India WhatsApp groups when one person solves the pain for their friend submitting KYC.

---

### 🥈 #3 — PassportPhoto (free, govt-size aware)

**The pain.** Every Indian who applies for passport/visa/PAN/driver's-license/school-ID has a specific size requirement (35×45mm, 200×200px, etc). Existing tools either upload (privacy), require signup, or are AI-only (passport-photo.online charges per photo). The official online passport-photo apps are ad-spammed.

**The wedge.** Three layers:
1. Client-side (no upload)
2. **Govt-size presets** for India (passport, OCI, PAN, Aadhaar, Voter ID, Driving License) PLUS global (US visa, UK passport, Schengen, etc.)
3. Free forever + no signup + no AI fluff

**Tech stack.** Astro + MediaPipe Face Detector (CPU mode for centering) + Canvas crop/resize + PDF export for 4-up/8-up print layouts. ~16h.

**SEO goldmine.** "passport photo maker" 40 autocompletes incl "free" + "online" + "india". Long-tail explodes: "passport size photo for [country/state/scheme]".

**Domain.** ✓ `phototopassport.com` or `indiapassportphoto.com` — both available.

**Monetization.** Free forever. Could offer ₹0 print-shop QR codes (partner with local print shops in Tier-2 India cities — high CAC but real value-add).

**Viral.** 2/5 (utility, not viral). But MASSIVE long-tail SEO — every search like "USA visa photo size online" lands here.

---

### 🥉 #4 — GST Invoice (free forever, no signup)

**The pain.** Every Indian freelancer / SMB / shopkeeper invoices clients. Existing tools (Refrens, Zoho, Vyapar) want signup → credit card → SaaS subscription. Most are ad-monetized. None of them follow GST format rules cleanly without the user upgrading.

**The wedge.** Same as HEICPix: **free forever, no signup, nothing uploads, no premium tier**. Saves Indian SMBs from feeling nickel-and-dimed by SaaS.

**Tech stack.** Astro + pdf-lib for PDF gen + LocalStorage for "save my company details" + QR code library for UPI payment QR on invoice + basic GST math (CGST/SGST/IGST). ~18h.

**SEO.** "gst invoice generator" 37 autocompletes incl "free" + "online" + "india".

**Domain.** ✓ `gstpix.com` / `invoicepix.com` / `indiainvoice.com` — pick whichever brand resonates.

**Monetization.** Free forever. Optional later: ₹0 "save 50 client templates locally" — pure quality of life, no paywall.

**India-portfolio fit.** Slots PERFECTLY next to VyapaarPost in WorksOffline lineup.

---

## What I cut and WHY (the rejection log)

These look tempting on demand alone but fail the "structural moat" test:

- **JSON formatter / regex tester / cron / base64 / diff / UUID / JWT** — Dev-tool commodities. Every dev has a bookmarked tool. regex101 + crontab.guru + jwt.io are CANONICAL. Building a 14th one is engineering vanity.
- **Image bg remover** — remove.bg + PhotoRoom + Canva have $40M+ in funding. They WILL outspend us on SEO. Free-forever wedge isn't enough when their free tier is also generous.
- **Image compressor** — **Squoosh by Google** is already client-side, free, perfect. You can't beat Google at their own game.
- **PDF compressor / merge / JPG-to-PDF** — iLovePDF + Smallpdf own SEO. Even free-forever doesn't dislodge them; users default to what they know.
- **QR generator** — Commodity, low value-per-use, no monetization.
- **EMI calculator** — `emicalculator.net` has owned Indian SEO for ~15 years. Domain authority moat is unbeatable.
- **PDF→Word** — Technically HARD to do client-side without quality loss; cloud tools have a real moat.
- **AI image upscaler** — Upscayl + Remini saturate; serious AI needs WebGPU which fails on mobile Safari.
- **HIBP / password gen / file hash** — bigger names + commodity.

---

## What I'd actually recommend, in order

1. **Buy heicpix.com** (₹800, 1h) — finish what we shipped
2. **Build VoiceNote.click** (14h) — the original #1 pick is still the best forward bet (viral mechanic + universal pain + India angle)
3. **Build AadhaarMask.com** (12h) — fastest ship, regulatory tailwind, India SMB hero
4. **THEN reassess** based on which one shows traction

**Don't** burn 30-50h on PCAP viewer or anything else with WASM-compilation overhead until at least one of (HEICPix, VoiceNote, AadhaarMask) is generating real traffic.

---

*Generated by Hermes agent. Re-verify domain availability + run Ahrefs check before purchase.*
