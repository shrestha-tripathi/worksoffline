# FileTransferNow — LocalSend / Snapdrop / PairDrop teardown

Research date: 2026-08-27. Source: raw source files + GitHub Search API (issues by reactions).

## Hard capability line (read this first)

A browser **cannot** do: UDP multicast (`224.0.0.167:53317`), mDNS, subnet scanning,
Wi-Fi Direct / Wi-Fi Aware / Bluetooth, background always-on presence, reading DTLS cert
fingerprints, or running an inbound HTTP server.

So **all of LocalSend's discovery (protocol §3.1/§3.2) is off the table.** Substitute:
additive rooms + hardened IP-bucketing + pairing.

Notably, LocalSend's most-requested features are all things a browser can never do:
Wi-Fi Direct (64👍), Bluetooth discovery (49👍), Wi-Fi Aware (40👍). Don't chase these.

## Snapdrop is confirmed dead — and it died badly

`pushed_at = 2025-02-10`, 287 open issues, not archived. Top issues by reactions are a
**user revolt**, not bugs:

| Issue | 👍 |
|---|---|
| Intransparent switch to **LimeWire** | 60 |
| SnapDrop.net has been replaced by PairDrop.net | 48 |
| "Robin, you sold your integrity and trust." | 42 |
| Limewire has RUINED Snapdrop! | 20 |
| **Send file to all buddies** (open since **2015**) | 10 |

snapdrop.net was handed to LimeWire, became ad-laden, discovery broke. **19.7k stars of
demand actively looking for a new home.** This is FTN's opening — and the honest,
no-ads, no-owner-selling-out positioning writes itself.

## What PairDrop does that FTN should copy

### 1. Additive room model (highest value per LOC) ⭐
A peer is in **IP room ∪ secret rooms ∪ public room simultaneously**; peer list is the union.
Maintainer's rationale: *"devices on the same network are always visible regardless whether
any devices are paired… The main user flow is never obstructed."*

FTN already has pairing + lobbies. What's missing is the **union** semantics.

### 2. Hardened IP-bucketing
`cf-connecting-ip` → `x-forwarded-for` → `remoteAddress`; strip `::ffff:`; IPv6 truncate
to /64 so a household buckets together; private IPs collapse to `127.0.0.1`.

⚠️ We **already rejected** raw IP-bucketing (privacy disaster on office/hotel/VPN) — that
call still stands. But note PairDrop's own top-10 issue is *"add option to disable
automatic grouping of private IPs"*, which validates our rejection. If ever revisited,
ship it **opt-in**, never default.

### 3. Server-issued salted peer-id proof
Client keeps a UUID across reloads; server only honors it with a matching HMAC it issued
(`SHA3-512(password + SHA3-512(salt))`). Prevents peer-id spoofing inside a room.
FTN currently has no impersonation defense in the lobby.

### 4. Burn-on-use short code + long secret
6-digit code (leading zeros preserved), rate-limited 10 attempts / 10s, **burned on first
successful join**; exchanges a 256-char secret which is the durable identity.
FTN has 4-char Crockford codes — already good. **Missing: the rate limit and explicit burn.**

### 5. Per-device auto-accept
`auto_accept` is a boolean **on the paired-device row**, and is *only* offered for paired
devices. That safety coupling is the right design. FTN has global "auto-send next time" —
should become per-pair.

### 6. thumbnailDataUrl in the transfer request
Recipient sees a **preview before accepting**. LocalSend has the same via `preview`.
FTN shows previews only after receipt. Cheap, high-perceived-value change.

## What LocalSend does that FTN should copy

### 7. prepare-upload handshake: session + per-file capability tokens ⭐
Metadata-first negotiation where the **receiver's response IS the authorization**:

```
POST /prepare-upload  { info, files: { fileId: {name,size,fileType,sha256,preview,metadata} } }
   → { sessionId, files: { fileId: token } }      // only tokenised files may be sent
POST /upload?sessionId=&fileId=&token=            // "can be called in parallel"
POST /cancel?sessionId=
```

**Partial accept falls out for free** — receiver simply doesn't issue a token for files it
declines. Zero extra messages. FTN's protocol is all-or-nothing today.

Steal the error table wholesale:

| Code | Meaning |
|---|---|
| 204 | Finished (nothing to transfer) |
| 401 | PIN required / Invalid PIN |
| 403 | Rejected / invalid token or IP |
| 409 | **Blocked by another session** |
| 422 | **Checksum mismatch (sha256)** |
| 429 | Too many requests |

Map routes → data-channel message types 1:1. "Parallel calls" → multiple `RTCDataChannel`s
on one `RTCPeerConnection`, which is genuinely *better* than LocalSend's parallel TCP.

### 8. LocalSend v3's nonce + signature mutual auth (the real prize) ⭐⭐
From `v3/webrtc-diagram.mermaid` — authenticate **inside** the encrypted data channel, so
the signaling server is not trusted for identity:

```
Sender   → Receiver : RTCNonceMessage {sender_nonce}
Receiver → Sender   : RTCNonceMessage {receiver_nonce}
   combined = sender_nonce || receiver_nonce
Sender   → Receiver : RTCTokenRequest {signed_token}
   → Ok | PinRequired | InvalidSignature
Receiver → Sender   : RTCFileListResponse::Pair {publicKey}
Sender   → Receiver : RTCPairResponse::Ok {publicKey} | PairDeclined | InvalidSignature
```

Feasible with WebCrypto: `generateKey` (Ed25519, ECDSA P-256 fallback), **non-extractable
`CryptoKey` stored directly in IndexedDB**, sign/verify over the combined nonce.

We **cannot** copy LocalSend's HTTPS fingerprint (SHA-256 of TLS cert) — browsers don't
expose DTLS fingerprints. **But we don't need to: pin our own app-level keypair instead.
Strictly better for a web app.** This directly answers PairDrop's #1 enhancement request
("Encrypt signaling + mark devices as verified", 10👍) which they haven't built.

## Unbuilt in ALL of them — the genuine white space

| Gap | Evidence | Browser-feasible? |
|---|---|---|
| **Send to multiple recipients at once** | Snapdrop issue open since **Dec 2015**, never built | ✅ Yes — N peer connections |
| **Resume large transfers** | PairDrop: "large files keep disconnecting" + "transfers incredibly slow" | ✅ **FTN ALREADY HAS THIS** — nobody else does |
| **Folder send preserving tree** | PairDrop open issue; everyone else zips | ✅ **FTN ALREADY HAS THIS** |
| **Verified devices / E2E-authed pairing** | PairDrop top enhancement, 10👍 | ✅ Yes (#8 above) |
| **Percentage transfer indicator** | PairDrop, 13👍 | ✅ FTN has per-row MB/s already |
| Always-online background presence | PairDrop, 3👍 | ❌ **Impossible in a browser** |

**FTN already leads on two of the biggest unbuilt asks (resume + folder tree).** That is a
marketing fact we are not currently using anywhere on the landing page.

## Recommended FTN roadmap (ranked by value ÷ effort)

1. **Multi-recipient send** — the 2015 ask nobody built. Differentiator + demo-able.
2. **Preview-before-accept** (`thumbnailDataUrl` in the request). Small, high perceived value.
3. **Per-file partial accept** via capability tokens + sha256 verify (`422`).
4. **Per-device auto-accept** (move global toggle onto the pair row).
5. **WebCrypto verified devices** — keypair pinned per pair, "✓ Verified" badge.
6. **Rate-limit + explicit burn** on the 4-char code (10 attempts / 10s).
7. **Landing-page copy**: lead with resume + real folder trees + "no ads, never sold" —
   direct contrast with the Snapdrop/LimeWire story.

## What NOT to do
- Don't add IP-bucket discovery (previously rejected; PairDrop users are asking to disable it).
- Don't promise background presence, Wi-Fi Direct, or Bluetooth — browser can't.
- Don't add a database. PairDrop's "we don't even use a database" is a trust asset.
