# Hatsa Web

Hatsa Web's independent business site for small-business websites, redesigns, local SEO foundations and small custom tools. **Static HTML, CSS and a small progressive-enhancement script. No backend, framework, package install or build step.**

## Pages

- `index.html`: business overview, scoped services and real Hatsa CRM feature.
- `services.html`: four service offers, deliverables, hosting boundaries and FAQ.
- `work.html`: five verified website demo concepts with desktop/mobile captures and a separate Hatsa CRM own-product case study. No commissioned-client claims.
- `about.html`: founder-led approach and working principles.
- `contact.html`: project-brief helper and plain-language privacy notice.

The CRM is a **separate project/repository**, linked to `https://app.hatsaweb.com`. This site does not embed the CRM, duplicate its pricing, claim payment readiness, or modify its billing/authentication/backend.

## Before public launch: owner decisions

1. **Confirm the public inbox.** `hello@hatsaweb.com` was a placeholder, so this revision does not pretend it is working. Set `contactEmail` in `site-config.js` to the verified public address when ready. This value is public, not a secret. Test a real email end to end.
2. Until then the contact page explicitly says delivery is not configured and only **downloads/copies a brief locally**. No enquiry is sent. Do not advertise contact submission until an actual delivery method is confirmed.
3. With an email configured, the helper opens a **mailto draft** for the visitor to review/send in their mail application. It is not a server-side contact form, has no delivery confirmation and requires a mail application. If a real form is desired, select a static-compatible form provider separately, review its limits/privacy/spam controls, and update the privacy text and CSP. Never add a secret API key to client code.
4. Confirm service wording, quoting policy and optional monthly support offering. No prices, ranking guarantees, turnaround promises, testimonials or client outcomes have been invented. Custom backend operations/support and third-party costs must be separately agreed.
5. Review the five owner-provided website examples in Work & CRM. They are labeled concepts/templates, not commissioned client work. Source revisions and capture details are recorded in `assets/portfolio/README.md`. Confirm any future client names, outcomes and permissions before publishing them.
6. Preview before changing DNS. Intended business domain is **www.hatsaweb.com**; canonical host/redirect and metadata should be finalized when attached. `app.hatsaweb.com`, `dev.hatsaweb.com` and API/mail records must remain untouched.

## Local preview / checks

```sh
python3 -m http.server 8080
python3 tools/check_site.py
node --check site.js
node --check site-config.js
```

Open localhost:8080. No npm install needed. Mobile menu requires JS, but without JS navigation is visible and ordinary links still work. FAQ uses native HTML disclosure controls. There is no third-party font, photo, analytics, tracking script, embedded video or remote runtime dependency.

`site.js` handles menu/Escape, service preselection, form validation, local brief download/copy (or mailto draft only after inbox configuration), and the accessible desktop/mobile screenshot dialog. The dialog defaults to the phone capture on small screens, traps focus natively, closes on Escape and restores focus to its opener. It never makes a network form submission or stores form data.

## Cloudflare Pages

The site is compatible with Cloudflare Pages' static HTML hosting. The existing Vercel project is useful for review previews; a merge there **does not configure Cloudflare**.

Official guide: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

Per the guide: **Workers & Pages → Create application → Pages → Import an existing Git repository**, select `MakCoder671/HatsaWeb`, then **Begin setup**.

- Production branch: `main`.
- No framework preset / no Functions / no server.
- Build command: `exit 0` (no compilation required).
- Build output directory: repository root, `/`.
- No secrets or environment variables required.

Review the initial `pages.dev` deployment before attaching a domain. Cloudflare plan limits still apply; this design does not promise unlimited free hosting. `_headers` supplies security headers on Cloudflare Pages; Vercel does not interpret that file. Reassess CSP before adding a third-party form/analytics service.

No DNS changes or Vivio cancellation are part of this source PR. Before cutover, record existing DNS, preserve MX/TXT/mail and CRM/API subdomains, attach only the intended website hosts, decide a canonical host and redirect the other host, test both over HTTPS, then retire old hosting only after successful verification. Do not repoint the CRM application.

## Images and honesty

Local WebP images are the owner's existing real Hatsa CRM product captures from `MakCoder671/MellaX-Business-CRM/frontend/public/images/showcase`, created with an isolated fictional demo business for the earlier authorized showcase. They are public marketing assets, not screenshots of production customer data. Each is labeled sample data, with no performance/outcome claims. No externally licensed stock assets or invented portfolio pieces are used.

## Verification recorded for this revision

- All five pages at 360, 390, 768, 1280 and 1600px: no horizontal overflow, images loaded, one h1 per page, no JS exceptions.
- Mobile menu, keyboard Escape, native FAQ, service preselection, invalid query handling and download contents checked.
- Fictional contact entries download locally with explicit no-send message and **no POST requests**. JavaScript-disabled navigation also checked.
- No actual emails sent, CRM operations performed, domain changes or production deployments initiated by this task.
- Hosted-preview evidence is recorded in the pull request. Inbox delivery and Cloudflare custom-domain cutover remain unverified.

## Official branding and demo portfolio

- Supplied light/dark PNG logos were losslessly converted to transparent WebP, trimming only their empty outer margins. Header uses the dark-lettered light-background logo; footer uses the white-lettered dark-background logo. No recoloring, filters or distorted proportions.
- `assets/favicon.ico` is the exact supplied favicon; `assets/hatsa-mark.png` is its 256px representation for decorative agency branding. CRM product branding is separate and unchanged. The original temporary SVG favicon is no longer referenced.
- Theme accents now use soft cyan/lavender to complement the official cyan-purple logo.
- Booking, Island Flame and Ember & Moss lead the home portfolio; all five examples plus CRM are included in Work & CRM. Each has visible demo classification and an honest note about non-live transactions/registration.
- Desktop and mobile captures are separate compositions. Cards stack on phones; enlarged previews switch sizes without loading external websites. Without JavaScript the ordinary demo/source links and thumbnails remain available.
- Gallery check: five projects × eight widths (320, 360, 390, 430, 768, 1024, 1280, 1600), both screenshot modes, Escape/focus restoration, no horizontal overflow or JS errors. All 25 original page/viewport checks and brief/privacy behavior also rerun.
- Public inbox setup and Cloudflare/domain cutover remain pending owner action, unchanged by this portfolio update. Hosted preview evidence belongs in the PR.
