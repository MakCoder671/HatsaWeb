# Hatsa Web

Hatsa Web's independent business site for small-business websites, redesigns, local SEO foundations and small custom tools. **Static HTML, CSS and a small progressive-enhancement script. No backend, framework, package install or build step.**

## Pages

- `index.html`: business overview, scoped services and real Hatsa CRM feature.
- `services.html`: four service offers, deliverables, hosting boundaries and FAQ.
- `work.html`: five verified website demo concepts with desktop/mobile captures and a separate Hatsa CRM own-product case study. No commissioned-client claims.
- `about.html`: founder-led approach and working principles.
- `contact.html`: native enquiry form for the owner-confirmed inbox, with a privacy notice.

The CRM is a **separate project/repository**, linked to `https://app.hatsaweb.com`. This site does not embed the CRM, duplicate its pricing, claim payment readiness, or modify its billing/authentication/backend.

## Contact delivery / owner activation

**Owner-confirmed November 11, 2026:** FormSubmit activation completed and the owner received their test enquiry from the published Contact page. This is an owner-reported delivery check, not an independent inbox audit. Recheck delivery after any provider/recipient/domain change.

The native contact form posts directly to **FormSubmit → Hatsaweb@gmail.com**, the owner-confirmed public inbox. No phone number, mail application, account, app server, frontend API key or custom backend is required. `site.js` only preselects a service from our links; the form works with JavaScript disabled.

- Collects name, reply email, optional business/current website, readable service choice, message and required privacy acknowledgement. No attachments, payment data or newsletter signup.
- Uses native required/email/URL validation, named fields, a static subject and table email format.
- Default provider reCAPTCHA is **not disabled**. A hidden `_honey` spam-trap is included. Visitors leave for FormSubmit's submission/spam-check/confirmation page; no unverified local success message or automatic response is shown.
- `_headers` allows native form submission only to `https://formsubmit.co`. Other CSP protections remain in place. No cross-origin fetch/XHR is needed. Security headers are interpreted by Cloudflare Pages, not Vercel.
- The public recipient is visible in HTML. FormSubmit offers an opaque endpoint after activation if the owner prefers to hide the address later. That ID must be configured separately; obscurity is not a substitute for spam controls.

**Before relying on enquiries:**

1. Publish/review this change, then submit one clearly labeled test enquiry from the published Contact page, using your own reply email.
2. Check **Hatsaweb@gmail.com**, including Spam, for FormSubmit's activation message and approve it. No test or activation emails were sent during development.
3. Submit a second test. Confirm the actual message arrives, all fields/service details are present, and replying addresses the visitor.
4. Repeat a delivery check on the final Cloudflare custom domain after cutover; approve activation again if the provider requests it. Preview checks do not prove final-domain activation or inbox delivery.
5. Do not announce the form as operational until this succeeds. Provider availability, spam filtering, Gmail delivery and usage limits are external dependencies.

Provider documentation: https://formsubmit.co/documentation and https://formsubmit.co/help . Privacy copy on Contact discloses transfer to FormSubmit and Gmail, provider archive retention (documented as 30 days), separate enquiry-email retention and an owner contact for access/deletion. Do not send sensitive records. Review provider terms for your business and keep privacy wording current.

## Other owner decisions

- Confirm service wording, quoting policy and optional monthly support. No prices, ranking guarantees, turnaround promises or customer outcomes are invented.
- Portfolio examples are concepts/templates, not commissioned-client claims; provenance is in `assets/portfolio/README.md`.
- Intended domain is **www.hatsaweb.com**. Cloudflare deployment/cutover is separate; preserve `app`, `dev`, API and mail records. No DNS changes were made here.

## Local preview / checks

```sh
python3 -m http.server 8080
python3 tools/check_site.py
node --check site.js
```

Open localhost:8080. No npm install needed. Mobile menu requires JS, but without JS navigation is visible and ordinary links still work. FAQ uses native HTML disclosure controls. There is no third-party font, tracking script or embedded video. Contact submission depends on FormSubmit; its spam check runs on the provider page.

`site.js` handles menu/Escape, contact service preselection and the accessible desktop/mobile screenshot dialog. The dialog defaults to the phone capture on small screens, traps focus natively, closes on Escape and restores focus to its opener. The native browser form submits only on an explicit Send enquiry action; JavaScript does not intercept/send/store form entries.

## Cloudflare Pages

The site is compatible with Cloudflare Pages' static HTML hosting. The existing Vercel project is useful for review previews; a merge there **does not configure Cloudflare**.

Official guide: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

Per the guide: **Workers & Pages → Create application → Pages → Import an existing Git repository**, select `MakCoder671/HatsaWeb`, then **Begin setup**.

- Production branch: `main`.
- No framework preset / no Functions / no server.
- Build command: `exit 0` (no compilation required).
- Build output directory: repository root, `/`.
- No secrets or environment variables required.

Review the initial `pages.dev` deployment before attaching a domain. Cloudflare plan limits still apply; this design does not promise unlimited free hosting. `_headers` supplies security headers on Cloudflare Pages; Vercel does not interpret that file. The form-action directive explicitly permits FormSubmit. Reassess CSP before adding another form/analytics provider.

No DNS changes or Vivio cancellation are part of this source PR. Before cutover, record existing DNS, preserve MX/TXT/mail and CRM/API subdomains, attach only the intended website hosts, decide a canonical host and redirect the other host, test both over HTTPS, then retire old hosting only after successful verification. Do not repoint the CRM application.

## Images and honesty

Local WebP images are the owner's existing real Hatsa CRM product captures from `MakCoder671/MellaX-Business-CRM/frontend/public/images/showcase`, created with an isolated fictional demo business for the earlier authorized showcase. They are public marketing assets, not screenshots of production customer data. Each is labeled sample data, with no performance/outcome claims. No externally licensed stock assets or invented portfolio pieces are used.

## Verification recorded for this revision

- All five pages at 360, 390, 768, 1280 and 1600px: no horizontal overflow, images loaded, one h1 per page, no JS exceptions.
- Mobile menu, keyboard Escape, native FAQ, service preselection, invalid query handling and download contents checked.
- Earlier local-brief tests were superseded by this native contact form. Current submission checks intercept the external POST locally (no real email sent), verify payload, invalid fields/consent, no-JS behavior and privacy disclosure. Inbox delivery requires the owner activation steps above.
- No actual emails sent, CRM operations performed, domain changes or production deployments initiated by this task.
- Hosted-preview evidence is recorded in the pull request. Inbox delivery/activation and Cloudflare custom-domain cutover remain unverified.

## Official branding and demo portfolio

- Supplied light/dark PNG logos were losslessly converted to transparent WebP, trimming only their empty outer margins. Header uses the dark-lettered light-background logo; footer uses the white-lettered dark-background logo. No recoloring, filters or distorted proportions.
- `assets/favicon.ico` is the exact supplied favicon; `assets/hatsa-mark.png` is its 256px representation for decorative agency branding. CRM product branding is separate and unchanged. The original temporary SVG favicon is no longer referenced.
- Theme accents now use soft cyan/lavender to complement the official cyan-purple logo.
- Booking, Island Flame and Ember & Moss lead the home portfolio; all five examples plus CRM are included in Our Work. Each has visible demo classification and an honest note about non-live transactions/registration.
- Desktop and mobile captures are separate compositions. Cards stack on phones; enlarged previews switch sizes without loading external websites. Without JavaScript the ordinary demo/source links and thumbnails remain available.
- Gallery check: five projects × eight widths (320, 360, 390, 430, 768, 1024, 1280, 1600), both screenshot modes, Escape/focus restoration, no horizontal overflow or JS errors. The original page/viewport and new contact/privacy checks are rerun for subsequent changes.
- Contact uses the owner-confirmed Gmail address; provider activation/delivery testing and Cloudflare/domain cutover remain owner actions. Hosted preview evidence belongs in the PR.

## Founder story and organized work

- About uses Mako’s owner-provided story: a family man and solo owner who loves building, wants useful tools/online visibility to be affordable, treats people with care and believes in mutual support. No fabricated family details, testimonials or price guarantees.
- Navigation and footer use **Our Work**, distinct from **Services** (what customers can hire us for). `work.html` remains the stable URL.
- **All work / Websites / Software** filters reflect the real current portfolio. No empty “Other” category or future products are invented. Add categories only alongside real entries.
- Category and keyword search operate together; result count/reset/empty state are accessible. Selected filters are shareable via `?category=software` or `?category=websites&q=booking`. Project anchors take priority over conflicting filters, so Home project links remain usable.
- Native filter buttons use aria-pressed, not tab semantics. Without JavaScript every project remains visible and the inactive filter controls stay hidden. Search uses text matching, never injected HTML.
- New items can use `data-work-item="websites"` or `data-work-item="software"`; add a real category button when expanding beyond those. Existing website grouping uses `#website-projects` and software is `#software-projects`; update grouping logic if adding new grouped sections.
- Contact route, recipient, consent, spam controls and provider submission are unchanged. No new email was sent in development; request interception is used in regressions.

## Meaning behind the name

About includes the owner's approved Chamorro/Guam roots and the connection between building and lifting others up. “Håtsa” meaning lift/raise/build is supported by the Chamorro dictionary entry at https://natibunmarianas.org/h/ . Brand spelling, domain, existing founder copy and current-location privacy remain unchanged; no residence details were added.

## Founder portrait

The owner supplied and approved the graduation photograph for About. It replaces only the large logo placeholder. Local 480px/960px WebP exports retain the full portrait composition and remove source EXIF metadata. No residence, degree/qualification claim, image filters or facial changes are added. The alternate wedding photo is not published. Header/footer logos, founder story, Håtsa name section, contact and CRM remain unchanged.
