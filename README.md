# Hatsa Web

Marketing site for **Hatsa Web** — websites, redesigns, and software for small businesses.

Static HTML + CSS only. No build step. Cloudflare Pages serves the repo root as-is.

## Holding page (current)

`index.html` is a single holding screen:

- Wordmark: Hatsa Web
- Tagline and primary CTA to the MellaX CRM demo
- Contact via `mailto:hello@hatsaweb.com`

**Contact address:** `hello@hatsaweb.com` is a placeholder. Change it in `index.html` (and later Phase 2 contact form destinations) when Mako picks the final public inbox.

Do not embed the CRM, add pricing, or claim AI features on this site. Product details live on the CRM URL.

## Deploy on Cloudflare Pages

1. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select the `MakCoder671/HatsaWeb` repository.
3. Configure the project:
   - **Production branch:** `main`
   - **Build command:** leave empty (none)
   - **Build output directory:** `/` (repo root)
4. Save and deploy. Confirm the `*.pages.dev` URL loads this holding page.
5. Only after that looks right, attach custom domains (see DNS checklist below).

No npm install, no framework, no `output: 'export'`. If Pages invents a framework preset, clear it so the static files publish unchanged.

## DNS checklist (hatsaweb.com)

Do this only after the holding page is live on a `*.pages.dev` URL and you have clicked through it.

Full steps live in the project plan: `/cursor/stores/self/docs/site-plan.md` (section **DNS, then Vivio**). Summary:

1. In the Cloudflare account that already hosts `hatsaweb.com` DNS, record current A / CNAME / MX records before changing anything. **Mail records stay put.**
2. Create the Pages project from this repo (production branch `main`). Confirm the `pages.dev` URL.
3. Attach custom domains `hatsaweb.com` and `www.hatsaweb.com` on that Pages project. Because DNS is already on Cloudflare, accept the records Pages offers (apex uses CNAME flattening). Do not point the names at the old Vivio host.
4. Force HTTPS. Redirect one host to the other so only one is canonical (recommend apex `hatsaweb.com`).
5. Load the site in a private window on both hosts. The holding page must be what visitors get, including the CRM link and the contact link.
6. Leave it up long enough to be sure the old origin is no longer serving the domain. Then it is safe to cancel Vivio — not before step 5.

## Repo layout

```
index.html      holding page (Home in Phase 2)
styles.css
README.md
```

Phase 2 (not built yet): `products.html`, `services.html`, `about.html`, `contact.html`, shared header/footer, Formspree or Resend for contact.

## Out of scope

- MellaX-Business-CRM application code, billing, Render, or Django
- Embedding or proxying the CRM
- Invented testimonials, card checkout, or AI claims
