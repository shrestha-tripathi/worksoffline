# Domain Rename — SubLingo → ? and LegalPlainPix → ?

Method: Google autocomplete **stem-frequency analysis** (352 suggestions across 40 seed queries),
then RDAP + DNS verification of every candidate. Detector sanity-checked against `google.com`.

---

## 🚨 Critical finding — both proposed brands have ZERO SEO value

### SubLingo

189 autocomplete suggestions for the subtitle-translation category:

```
112× translate     ← MUST be in domain
 59× subtitles     ← MUST be in domain
 56× subtitle
 48× translator
 47× srt           ← high-value, high-intent
 34× english
 23× file
 21× language
 10× vtt
  0× lingo         ← BRAND HAS ZERO SEO VALUE
  0× sub (as standalone)
```

**"Lingo" appears 0 times in 189 suggestions.** `subtitlelingo.com` targets nothing.

### LegalPlainPix

163 autocomplete suggestions for the contract-explanation category:

```
 57× legal          ← MUST be in domain
 45× contract       ← MUST be in domain (higher intent than "legal")
 29× english
 21× document
 21× agreement
 20× explain        ← the actual user verb
 20× lease
 18× mean
 17× plain
 10× clause
  0× pix            ← BRAND HAS ZERO SEO VALUE
```

**"Pix" appears 0 times.** Your whole `*pix` naming convention is brandable but SEO-dead — worth
knowing since it recurs across the portfolio (HEICPix, OCRPix, etc.). Fine for a brand you'll market;
wrong for a tool you want to *rank*.

---

## 🥈 #2 — SubLingo → **`translatesubtitlefile.com`** ✓

### Competitive reality (verified live)

| Domain | Status | Registered |
|---|---|---|
| `translatesubtitles.com` | 🔴 live, real site, not parked | **2018** |
| `subtitletranslator.com` | 🔴 live, real site, not parked | **2016** |
| `srttranslator.com` | 🔴 live, not parked | **2025** — new, weak |

The two best exact-match domains are held by real operators with 8-10 years of authority. **Don't try
to out-rank them on the head term.** Target the long-tail modifier instead — which is where the actual
high-intent traffic is anyway.

### Recommendation

| Rank | Domain | Stems captured | Why |
|---|---|---|---|
| 🥇 | **`translatesubtitlefile.com`** | translate(112) + subtitle(56) + file(23) | **3 top stems.** Exact-match for "translate subtitle file" — the precise high-intent query. The word "file" signals your differentiator (you handle real SRT/VTT files, not a text box). |
| 🥈 | `subtitlefiletranslator.com` | subtitle + file + translator(48) | Same stems, noun-first phrasing |
| 🥉 | `translatesrtfile.com` | translate + srt(47) + file | Narrower but very high intent — "srt" searchers know what they want |
| 4 | `offlinesubtitletranslator.com` | + the privacy wedge in the name | Longest, but the "offline" USP is literally in the URL |
| 5 | `translatevtt.com` | translate + vtt(10) | Short, clean, uncontested — but VTT is a smaller cluster than SRT |

**Pick: `translatesubtitlefile.com`** — captures the 3 highest-value stems, avoids fighting the
2016/2018 incumbents head-on, and reads naturally.
Backup buy: `translatesrtfile.com` ($10 insurance).

---

## 🥉 #3 — LegalPlainPix → **`plainenglishcontract.com`** ✓

### Competitive reality (verified live)

| Domain | Status | Registered |
|---|---|---|
| `legaltranslator.com` | 🔴 live | **1999** — untouchable |
| `plainlegal.com` | 🔴 live | **2005** |
| `explaincontract.com` | 🔴 taken, **no DNS** | **2026-03** — just squatted, not built |
| `explainmycontract.com`, `contractinplainenglish.com`, `readmylease.com` | 🔴 taken | — |

Note `explaincontract.com` was registered **five months ago and has no DNS** — someone else is circling
this exact space. Mild urgency signal.

### Recommendation

| Rank | Domain | Stems captured | Why |
|---|---|---|---|
| 🥇 | **`plainenglishcontract.com`** | plain(17) + english(29) + contract(45) | **3 top stems.** "Plain English" is the canonical phrase for this entire category, and "contract" is the highest-intent noun. `contractinplainenglish.com` is taken — this is the best available phrasing. |
| 🥈 | `legaldocumentexplained.com` | legal(57) + document(21) + explain(20) | Broader than contracts — better if you want to cover NDAs/ToS/leases equally |
| 🥉 | `understandmycontract.com` | contract + the emotional verb | Strong human phrasing, matches "what does my contract mean" intent |
| 4 | `explainlegaldocument.com` | explain + legal + document | Verb-first, very literal |
| 5 | `leaseinplainenglish.com` | lease(20) + plain + english | Niche-down option — leases are a big sub-cluster |

**Pick: `plainenglishcontract.com`** — 3 top stems, category-canonical phrasing, immediately
self-explanatory.
Backup buy: `legaldocumentexplained.com` (also gives you room to expand past contracts).

---

## Final answer

| Was | Now | Stems | Status |
|---|---|---|---|
| ~~subtitlelingo.com~~ | **translatesubtitlefile.com** | translate + subtitle + file | ✅ RDAP free, no DNS |
| ~~legalplainpix.com~~ | **plainenglishcontract.com** | plain + english + contract | ✅ RDAP free, no DNS |

**Buy both + backups at Cloudflare Registrar** (~$10.44/yr at-cost, one-click wire-up to CF Pages,
which is your deploy stack):

```
translatesubtitlefile.com    $10.44   ← primary #2
plainenglishcontract.com     $10.44   ← primary #3
translatesrtfile.com         $10.44   ← backup (optional)
legaldocumentexplained.com   $10.44   ← backup (optional)
                            -------
Primaries only:              $20.88
All four:                    $41.76
```

The $21 difference is cheap insurance — you just ran 86 domains through RDAP, and squatters do watch
for newly-checked-then-unregistered names. `explaincontract.com` being registered 5 months ago with no
site suggests someone is already sniffing around this category.

⚠️ Verify final price on Cloudflare Registrar before buying — RDAP-free occasionally means
premium-priced at registrar level (unlikely for 3-word compounds like these, but check).

## Naming trade-off, stated honestly

These are **SEO-optimized, not brandable.** `translatesubtitlefile.com` will never be as memorable as
`SubLingo`. You're explicitly trading verbal memorability for ranking ability — the right call here
because both products are **search-discovery tools**, not word-of-mouth products. Nobody tells a friend
"check out SubLingo"; they google "translate subtitle file."

(HearingAgeTest is the opposite case — that one *is* word-of-mouth, which is why a descriptive name
already works for it.)
