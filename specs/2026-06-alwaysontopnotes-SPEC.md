# SPEC — AlwaysOnTopNotes (NotesPip)

> **Brand decision pending.** This SPEC uses **AlwaysOnTopNotes** as the working name based on SEO stem analysis (captures "always" + "top" + "notes" = the exact "always on top notes" search query). Backup: `stickynotesweb.com` (top 2 stems + web wedge). Final brand locked once domain registered.

**Goal:** Ship a free-forever, fully client-side floating sticky-notes app that lives in a real OS-level floating window via Document Picture-in-Picture API. Same family as LiveCaptionIt — desktop power-user play with zero install.

**Architecture:** Astro 6 + Tailwind v4 SSG → static deploy on Cloudflare Pages. All notes stored locally in OPFS (no signup, no cloud). Document PiP API moves the notes UI into a real OS-level floating window. NO Cloudflare Worker needed.

**Tech Stack (mirrors FTN / LiveCaptionIt):** 
- Astro 6, Tailwind v4 (`@theme` tokens in `global.css`, NO `tailwind.config.js`)
- TypeScript strict
- Document Picture-in-Picture API (Chrome/Edge 116+)
- OPFS for note storage
- Tiptap (rich text editor — markdown + checkboxes + colors)
- Inline SVG + Lucide path data (no icon library)
- PWA install + service worker
- Deploy: Cloudflare Pages auto from `main` push, Cloudflare Registrar `.com`

---

## 🎯 Problem Statement

### The pain
1. **Users want notes that float on top of every app** — during Zoom meetings, while watching tutorials, when filling forms, when coding
2. **Current options all suck:**
   - **Windows Sticky Notes** (preinstalled) — no Markdown, no formatting, no cross-device, ugly UI
   - **macOS Stickies.app** — Mac only, install required, dated UI
   - **stickies.app (web service)** — uses Electron, full install, requires account
   - **Notion / Obsidian / Apple Notes** — full-page apps, no floating mode
   - **Browser extensions** — limited, can't escape the browser window
   - **3rd-party Windows apps** (Notezilla, Simple Sticky Notes) — install + adware
3. **None work cross-OS** — Mac users can't use Windows Sticky Notes habits, vice versa

### The wedge
A desktop user searches "always on top notes" or "floating sticky notes" or "sticky notes browser". We rank for those terms with:
- ✅ Works in Chrome/Edge browser — **zero install**
- ✅ Lives in OS-level floating window via Document PiP (same as LiveCaptionIt)
- ✅ Stays on top of EVERY app (Zoom, Slack, VS Code, Photoshop, anything)
- ✅ Rich text formatting (Markdown, checkboxes, colors, links)
- ✅ Notes saved locally to OPFS (no signup, no cloud, no privacy concerns)
- ✅ Multi-OS — same UX on Windows, Mac, Linux, Chromebook
- ✅ Free forever, no ads, no signup

### Browser API capability (the NEW thing)

**Document Picture-in-Picture API** is genuinely a 2024-2026 capability:
- Released Chrome 116 (Aug 2023), Edge 116 (Aug 2023)
- Lets a webpage open a real OS-level floating window with full HTML/CSS/JS — not just a video
- **Same API that powers LiveCaptionIt** — Shrestha already has the patterns
- **Desktop only** — no iOS/Android Safari support (deliberate scope)

**OPFS** for note persistence:
- Safari 17 (Sep 2023), Chrome 102 (May 2022), Firefox 111 (Mar 2023)
- Allows ~1GB+ local storage with file-like access (no IndexedDB JSON serialization overhead)

---

## 🏗️ Architecture

### Pages
```
src/pages/
├── index.astro              # Landing — hero, demo video, FAQ, "Open app" CTA
├── app.astro                # The actual notes app (single-page tool)
├── how-it-works.astro       # Privacy + Document PiP explainer
├── compare.astro            # Comparison vs Windows Sticky Notes / Stickies.app
├── about.astro
├── contact.astro
├── privacy.astro
└── terms.astro
```

### Core library
```
src/lib/
├── notes/
│   ├── notesStore.ts        # OPFS-backed note CRUD with reactive store
│   ├── noteSchema.ts        # Note type: id, title, body (Tiptap JSON), color, position, createdAt, updatedAt
│   ├── noteSync.ts          # Cross-tab sync via BroadcastChannel (multiple notes open in PiP windows)
│   └── opfsAdapter.ts       # OPFS get/put/delete/list helpers
├── editor/
│   ├── tiptapSetup.ts       # Tiptap instance with extensions: StarterKit, TaskList, Color, Link
│   ├── tiptapToolbar.ts     # Floating toolbar UI (bold, italic, checkbox, color)
│   └── editorMobileShortcuts.ts  # Keyboard shortcuts (Cmd+B, Cmd+K, etc.)
├── pip/
│   ├── pipWindow.ts         # Document PiP open/close (REUSE from FTN's pipWindow.ts pattern)
│   ├── pipPreferences.ts    # Width/height preferences per note (saved in OPFS)
│   └── pipTour.ts           # Onboarding pointer on first visit (REUSE FTN pattern)
├── ui/
│   ├── notesList.ts         # Sidebar list of all notes
│   ├── colorPicker.ts       # 8 preset colors (yellow, pink, blue, green, etc.)
│   └── searchNotes.ts       # Fuzzy search across all note bodies
└── pwa/
    ├── installPrompt.ts     # Custom A2HS prompt
    └── serviceWorker.ts     # App shell caching
```

### Data flow

```
User lands on /app
  ↓
Load all notes from OPFS into in-memory store
  ↓
Render sidebar (notes list) + main panel (currently selected note in Tiptap editor)
  ↓
User clicks "Pop out" on a note
  ↓
Document PiP API opens a floating window
  ├── REUSE FTN's pattern: move <main> element (not children) for CSS scoping
  ├── Apply :where(.pip-mode) CSS rules for compact layout
  └── Tiptap editor + toolbar visible in floating window
  ↓
User edits in PiP window
  ├── Changes propagate to OPFS (debounced save, 500ms)
  ├── BroadcastChannel notifies main tab (if open) for sync
  └── Window stays on top of every other OS app
  ↓
User closes PiP window
  ├── Restore <main> back to origin tab (placeholder pattern)
  └── Notes saved, ready for next session
```

### Multi-note in multiple PiP windows
**Critical design decision:** Can user open MULTIPLE notes in MULTIPLE floating windows simultaneously? 

**Answer: YES (v2 feature)** — Document PiP allows multiple PiP windows per origin. Architecture:
- Each PiP window has its own iframe pointing to `/app?noteId=X&pip=1`
- BroadcastChannel keeps them in sync if same note edited in two places

**v1 ships single PiP window** to keep scope tight. Multi-PiP is Phase 4.

---

## 📋 Multi-commit feature plan

Following one-feature-one-commit cadence.

### Phase 1: Scaffold + landing (~1 weekend, 5 commits)

#### Commit 1: `chore: scaffold Astro 6 + Tailwind v4 + TS strict + Cloudflare Pages`
- Standard Astro scaffold (mirror FTN setup exactly)
- `src/styles/global.css` with `@theme` tokens
- Color palette: warm yellow primary (sticky-note vibe) + dark mode support
- Initial CF Pages connection + first deploy

#### Commit 2: `feat(landing): hero + product demo SVG + privacy pitch`
- `src/pages/index.astro`
- Hero: animated SVG showing "browser tab → floats above Zoom window"
- CTA: "Open Notes →" linking to `/app`
- Subhero: "Sticky notes that float over every app. No install. Notes stay on your device."

#### Commit 3: `feat(landing): feature grid + comparison table`
- Feature grid: Floating / Cross-OS / Markdown / Privacy / Free / Multi-note
- Comparison table: AlwaysOnTopNotes vs Windows Sticky Notes vs macOS Stickies vs stickies.app
- Use FTN's paired-diagram pattern

#### Commit 4: `feat(landing): FAQ + browser support callout`
- 8-10 FAQs (browser support, what is Document PiP, why does it work in Chrome but not Safari, etc.)
- Browser support badges: Chrome ✓ / Edge ✓ / Firefox ⚠ (no PiP) / Safari ⚠ (no PiP)
- Recommendation: "Use Chrome or Edge for the floating-window experience. In other browsers, notes still work — just no float."

#### Commit 5: `chore: PWA manifest + icons + OG image + SEO meta`
- Standard PWA setup
- GA4 wire-up (`G-Q1Y0YHLJ8K` per worksoffline rule)
- `sitemap.xml`, `robots.txt`
- JSON-LD `SoftwareApplication` schema

### Phase 2: Core notes app (~1 weekend, 6 commits)

#### Commit 6: `feat(app): notes sidebar list + create/delete/select`
- `src/pages/app.astro` with two-pane layout (sidebar + main)
- Sidebar: list of notes with title + preview snippet + color dot + last-modified time
- Buttons: "+ New note", "Delete", "Search"
- Click note → selects in main panel
- All state in-memory for this commit (no persistence yet)

#### Commit 7: `feat(notes): OPFS-backed persistence + reactive store`
- `src/lib/notes/notesStore.ts` — small reactive store (nano-stores or hand-rolled signal)
- `src/lib/notes/opfsAdapter.ts` — OPFS get/put/list/delete
- Save format: one JSON file per note (`notes/{noteId}.json`)
- Index file (`notes/_index.json`) with note metadata for fast list rendering
- Migration: if no OPFS support, fall back to IndexedDB (Firefox older versions)

#### Commit 8: `feat(editor): Tiptap integration with Markdown + checkboxes + colors`
- Install Tiptap v2 + StarterKit + TaskList + Color + Link extensions
- Mount Tiptap on currently-selected note
- Floating toolbar (formats: bold, italic, code, link, checkbox, color)
- Keyboard shortcuts (Cmd+B, Cmd+I, Cmd+K, Cmd+Enter for checkbox toggle)
- Auto-save on change (debounced 500ms → OPFS)

#### Commit 9: `feat(notes): per-note color + cross-tab sync via BroadcastChannel`
- 8-color picker (sticky-note palette: yellow, pink, blue, green, lavender, orange, mint, white)
- Color applied as background tint of note in sidebar + Tiptap editor surround
- BroadcastChannel(`notes-sync`): when one tab saves, other tabs reload
- Conflict resolution: last-write-wins (sticky notes don't need CRDT complexity)

#### Commit 10: `feat(notes): full-text search across all notes`
- `src/lib/ui/searchNotes.ts` — fuzzy search via simple substring (no library needed for <1000 notes)
- Search input in sidebar header, results filter the list
- Keyboard shortcut: Cmd+K to focus search

#### Commit 11: `feat(notes): undo / redo + auto-save indicator`
- Tiptap built-in history (Cmd+Z, Cmd+Shift+Z)
- "Saved" indicator next to title (changes to "Saving..." during write)
- Conflict on close: if unsaved changes, prompt user via `beforeunload`

### Phase 3: Document PiP — the killer feature (~3 days, 4 commits)

#### Commit 12: `feat(pip): Document PiP toggle button + open/close flow`
- "Pop out" button in note header (only shown if `isPipSupported()`)
- Reuse FTN's `pipWindow.ts` pattern: MOVE the element, not children
- Origin tab shows placeholder "Note is in floating window — close to bring back"
- Close PiP → restore element to origin tab seamlessly

#### Commit 13: `feat(pip): PiP-mode CSS scoping + compact layout`
- `:where(.pip-mode)` CSS block in global.css
- Hide brand title, sidebar (only current note visible in PiP)
- Compact toolbar (icons only, no labels)
- Default PiP size: 400×500 (sticky-note proportions)
- User can resize PiP window via OS handles → save preference per-note

#### Commit 14: `feat(pip): per-note size preferences in OPFS`
- `src/lib/pip/pipPreferences.ts` — { noteId: {width, height} }
- On open PiP for a note, load saved size
- On close, save the new size if user resized
- Default fallback: 400×500

#### Commit 15: `feat(pip): onboarding tour on first PiP-supported visit`
- Reuse FTN's `pipTour.ts` pattern
- First-visit overlay arrow pointing at "Pop out" button
- 2.5s delay after page load
- Self-bails on unsupported browsers
- Dismissable, `localStorage` key `aotn:pip-tour-seen-v1`

### Phase 4: Polish + edge cases (~3 days, 4 commits)

#### Commit 16: `feat(pwa): A2HS install prompt + service worker app shell`
- Custom A2HS prompt (pattern from FTN)
- SW caches app shell for offline (notes themselves are in OPFS, work offline)

#### Commit 17: `feat(notes): export to Markdown + import from Markdown`
- Export single note → download `.md` file
- Export all notes → download ZIP of `.md` files (use `client-zip`)
- Import `.md` files (drag-drop or file picker) → creates new notes
- Export to JSON (full fidelity including formatting)

#### Commit 18: `feat(notes): keyboard shortcuts cheatsheet (Cmd+/)`
- Modal showing all keyboard shortcuts
- Cmd+/ to open
- Esc to close

#### Commit 19: `feat(notes): pin notes (keep at top of sidebar)`
- "Pin" button in note header
- Pinned notes group at top of sidebar
- Stored in note metadata

### Phase 5: Differentiation features (when traffic validates)

These ship later if traffic is real. Each is a separate commit:
- **Multi-PiP** (multiple notes in multiple floating windows simultaneously)
- **Note linking** (`[[wiki-style links]]` between notes — basic backlinks)
- **Tags** (`#tag` syntax → filterable in sidebar)
- **Sync across devices** (WebRTC P2P sync using FTN's TeleportSession — Pro feature)
- **Notion / Obsidian export** (formatted Markdown that imports cleanly into both)
- **AI summarize** (using built-in Chrome AI / `navigator.ai` — "summarize this note")

---

## 🎨 UX flow

### First-time desktop user (Chrome/Edge)
```
1. Land on alwaysontopnotes.com
2. Read pitch: "Sticky notes that float over every app. No install."
3. Click "Open Notes →"
4. /app loads: empty sidebar + empty editor
5. Tour overlay arrow: "Click + to create your first note"
6. User clicks +, types "Hello world"
7. Tour arrow: "Click the pop-out icon to float this note"
8. User clicks pop-out
9. OS-level floating window opens with the note
10. User switches to Zoom — note stays on top
11. User types more in the floating note → instantly saved to OPFS
12. Close floating window → note returns to main tab, all saved
```

### Mobile user (iOS/Android)
```
1. Land on alwaysontopnotes.com
2. Banner: "Floating mode requires desktop Chrome/Edge. Notes still work — just no float."
3. User can still create + edit notes (they sync via OPFS if they open same URL on desktop)
4. Recommend: "Open this URL on your Mac/PC for the full floating experience"
```

### Edge cases the spec covers

| Edge case | Handling |
|-----------|----------|
| User on Firefox/Safari | "Pop out" button hidden, notes still work as web app |
| User on mobile | Banner explains desktop requirement, full notes UX still works |
| Tab close while PiP open | PiP auto-closes (browser default), note saved |
| User has 100+ notes | OPFS handles fine; sidebar uses virtual scrolling at 50+ notes |
| Multi-tab edit conflict | BroadcastChannel sync, last-write-wins, conflict warning if simultaneous |
| OPFS quota exceeded (>1GB) | Warning + suggest pruning old notes |
| Browser private/incognito | OPFS denied → warn user, fall back to in-memory (lost on close) |
| Note has unsaved changes on close | `beforeunload` warning |

---

## 💰 Monetization (Phase 5+, after MVP traction)

| Tier | Price | What you get |
|------|-------|--------------|
| **Free forever** | $0 | Unlimited notes, all formatting, Document PiP, OPFS storage, export/import |
| **Pro** | $9 lifetime (one-time, NOT subscription) | Multi-PiP (multiple floating windows), WebRTC sync between your devices, themes, Notion/Obsidian export |
| **Teams** | $5/user/month | Shared notes via WebRTC P2P (small teams — no central server needed) |

**Key principle:** Pro is purely additive — free tier is fully functional standalone. Pro adds power-user features for the 1-5% who'll happily pay $9 once.

---

## 📊 Scaling math

Identical to MagicPhotoEraser — all storage is client-side (OPFS), so backend cost = bandwidth only (CF Pages cheap).

| DAU | Backend cost | Bandwidth |
|-----|--------------|-----------|
| 100 | $0 | <0.1GB/day |
| 10k | $0 | ~10GB/day |
| 100k | $0 | ~100GB/day |
| 1M | ~$40/mo bandwidth | ~1TB/day |

---

## ⚠️ Known risks + mitigations

| Risk | Probability | Mitigation |
|------|-------------|------------|
| Document PiP is desktop-only — loses mobile audience | Already known | Frame as a feature ("the floating-window experience is desktop-only because OS-level windows don't exist on mobile") |
| User confused why button doesn't appear in Firefox/Safari | Medium | Show banner: "Floating mode works in Chrome/Edge. In your browser, notes still work — just no float." |
| Tiptap bundle size (~80KB gzipped) | Low | Acceptable for the feature it provides |
| OPFS quota issues at scale | Low | Notes are tiny (KBs each); typical user won't hit 100MB even with 1000 notes |
| Stickies.app already free + mature | Low | Stickies.app is Mac-only + install. Our cross-OS + zero-install is the wedge. |

---

## ✅ Definition of Done (MVP)

- [ ] Landing page deployed at alwaysontopnotes.com
- [ ] `/app` works end-to-end on Chrome + Edge (desktop)
- [ ] Notes persist in OPFS across sessions
- [ ] Tiptap editor with bold/italic/checkbox/color
- [ ] Document PiP "Pop out" works
- [ ] PiP window can be resized + position preserved
- [ ] Tour fires for first-time PiP-supported visitors
- [ ] BroadcastChannel sync works across multiple tabs
- [ ] PWA installable
- [ ] GA4 wired
- [ ] Lighthouse 95+ across all metrics

---

## ❓ Decisions for Shrestha to make

1. **Brand name:** `alwaysontopnotes.com` (max SEO + targets exact "always on top notes" query) vs `stickynotesweb.com` (top 2 stems + shorter) vs keep `notespip.com` (no SEO wedge). **My recommendation: alwaysontopnotes.com** — directly targets the highest-intent search query.

2. **Color palette:** Warm yellow (classic sticky-note vibe)? Or match LiveCaptionIt's blue family for portfolio consistency? **Recommend warm yellow** — distinctive, evokes the product instantly.

3. **Editor library:** Tiptap (my recommendation — Notion-grade UX, ~80KB) vs ProseMirror (heavier, more control) vs hand-rolled contentEditable (lighter but pain). **Recommend Tiptap** per your "off-the-shelf > hand-rolled" preference.

4. **Multi-PiP in v1?** Or save for Phase 4 after we validate? **Recommend Phase 4** — single-PiP first to ship faster; multi-PiP is a "wow" feature but doubles complexity.

5. **Sync between devices:** WebRTC P2P (reuse FTN's TeleportSession) sounds elegant but is honestly the most complex feature on the roadmap. Ship as Pro in Phase 5, NOT in MVP. Agreed?

---

## 🚀 Multi-commit shipping cadence

Each commit ships independently to production via CF Pages auto-deploy. Estimated total:
- **Phase 1 (scaffold + landing):** ~10-12 hours
- **Phase 2 (core notes):** ~10-14 hours
- **Phase 3 (Document PiP):** ~6-8 hours (reuse 90% from FTN patterns)
- **Phase 4 (polish):** ~6-8 hours
- **Total MVP:** ~32-42 hours (~3 weekends)

Phase 5 features ship organically.

---

*Approval needed on: (1) brand name, (2) palette direction. Then I scaffold + start shipping commits.*
