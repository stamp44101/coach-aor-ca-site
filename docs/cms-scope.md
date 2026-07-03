# Coach Aor CA — CMS Scope & Plan
_Prepared 2026-07-02 · site: coachaorca.com (Next.js 15 App Router, Vercel) · content already centralized in `app/_mobileContent.ts`_

---

## 1. Recommendation

**Primary: Storyblok** (headless CMS with a visual on-page editor).

Why it fits this project:
- **Visual editing** — the client clicks directly on a live preview of the page and edits text/images inline. Best match for "ให้ลูกค้าจัดการเนื้อหาในหน้าเอง" and for a non-technical user.
- **Native i18n (EN/TH)** — field-level translation; one entry, two languages, side by side.
- **Image focal point / smart crop** in the asset manager → directly prevents the head-crop problem we already hit (About photo, service cards).
- **Instant publish** — on Publish, a webhook revalidates the page (ISR). No code deploy, live in seconds.
- **Roles/permissions** — give the client an Editor role (edit content, cannot touch structure).
- Clean Next.js SDK (`@storyblok/react`), runs fine on Vercel.

**Budget alternative: TinaCMS** (git-based, visual, free/cheap).
- Content lives in the repo; edits commit to git → trigger a rebuild (~1–2 min to go live).
- No monthly SaaS cost, but slightly less polished editor and edits are gated on a rebuild.
- Choose Tina if "zero monthly fee" matters more than "instant publish + friendliest UI."

Decision driver: **Storyblok = best UX + instant publish, small monthly fee** vs **Tina = free, rebuild-on-edit.** For a paying end-client I recommend Storyblok.

_(Sanity = great but its editing UI is a separate studio, less "on-page". Payload = powerful, self-hosted, but needs a database + hosting — overkill for one landing page.)_

---

## 2. Content model (mapped from the current `_mobileContent.ts`)

Two content types. All text fields are **translatable (EN/TH)** unless noted.

### A) Global Settings (single entry)
| Field | Type | Current source |
|---|---|---|
| logo | asset (image) | `IMG.logo` |
| socials | list of { label, url } | `SOCIALS` (5 items) |
| followText | text (i18n) | `followTxt` |
| form.name / email / message / send / done | text (i18n) | `CONTENT.form` |
| nav labels | 4× text (i18n) | `CONTENT.nav` (targets are fixed `#about…`, not editable) |

### B) Home Page (single entry, i18n)
**Hero** — title, withLabel, quote, ctaLabel, tag, **heroImage** (asset)
**About** — aboutQuote, name, role, bio (long text), **aboutImage** (asset, focal point)
**Services** — servicesTitle, cta2, and a **Services list** (repeatable block), each:
  - title, description, bullets (list of text), meta, **image** (asset, focal point), `featured` (bool)
**Testimonials** — testimonialsTitle, **Testimonials list** (repeatable), each: name, role, quote, **image** (asset, focal point)
**Booking** — bookingTitle, bookingText, **bookingBgImage** (asset, focal point), **qrWhatsapp** (asset), **qrLine** (asset)

Notes:
- Some TH values are intentionally English (hero title, service titles). In the CMS these are just fields the client can leave as-is or localize.
- `bullets` and the whole `services`/`testimonials` arrays are repeatable → client can **add/remove/reorder** items.
- Structure (section order, layout) is NOT editable — protects the design.

---

## 3. Architecture / how it wires into the current site

The site already reads everything from one object (`CONTENT` / `IMG` / `SOCIALS`), used by **both** desktop (v3) and mobile. So the integration is a clean swap, not a rewrite:

1. Build a small **adapter** that fetches from the CMS and returns the **exact same shape** as today's `CONTENT`/`IMG`/`SOCIALS`. Components (`SiteHero`, `SiteAbout`, …, `MobileSite`) stay untouched.
2. Keep `_mobileContent.ts` as a **typed fallback/seed** (and for local dev without the CMS).
3. **Images** → Storyblok asset CDN with per-image focal point; render via their image service (auto crop/resize/format). Fixes the head-crop concern structurally.
4. **Publish flow** → Storyblok webhook → Next.js `revalidatePath('/')` (+ `/th`) → live in seconds, no deploy.
5. **Preview** → draft mode so the client sees unpublished edits before publishing.
6. **Form** (`/api/contact`) is unaffected — stays exactly as is.

---

## 4. Phased plan & effort (~3–4 dev-days)

- **P0 — Setup (0.5d):** create Storyblok space, invite client as Editor, install SDK, env keys.
- **P1 — Model + seed (1d):** build the two content types above; migrate current EN+TH content + images in.
- **P2 — Wire the site (1d):** CMS adapter returning the current shape; swap the import; keep fallback.
- **P3 — Images + focal points (0.5d):** move assets to CMS, set focal points, wire image service.
- **P4 — Publish webhook + preview (0.5d):** on-publish revalidate + draft preview mode.
- **P5 — Client handover (0.5d):** roles/guardrails + a short how-to (Loom + 1-page guide in TH).

Can ship incrementally (e.g., start with just the "About" + "Services" text to prove it, then the rest).

---

## 5. What the client can / cannot do

**Can:** edit all text (EN/TH), swap any image (with focal point so it never crops badly), edit service/testimonial lists (add/remove/reorder), edit bullets, socials, form labels, QR codes.
**Cannot (by design):** change layout, section order, colors, fonts, or code → they can't break the design.

---

## 6. Costs

- **Storyblok:** Community plan is free (1 user, ample for one site). If the client wants multiple editors/roles or higher limits → paid tier (roughly ~$'s/month, confirm current pricing at sign-up).
- **TinaCMS (alt):** free / very low; content in repo, edits trigger a Vercel rebuild.
- **Vercel/hosting:** unchanged.
- **Dev time:** ~3–4 days (above).

---

## 7. Risks & considerations

- **Image focal points** — must be set per image or a smart-crop default applied, or head-crop returns. Storyblok's focal point handles this.
- **Bilingual discipline** — client must fill BOTH EN and TH (or we fall back to EN). We can flag empty TH fields.
- **Long Thai text** — we tuned type sizes to fit; very long new copy can re-break spacing. Add soft length guidance + fluid clamp already absorbs a lot.
- **SEO** — content stays server-rendered (SSR/ISR), so no SEO regression.
- **Versioning/backup** — Storyblok keeps edit history + rollback; Tina uses git history.

---

## 8. Suggested next step

Approve Storyblok (or pick Tina) → I start with **P0 + a 1-section POC (About)** so you and the client can try the real editing flow before we model the whole page. Low risk, ~half a day to something clickable.
