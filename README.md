# VERITAS — Staging Site

Luxury Christian devotional art brand. Design-only staging site for partner preview.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (custom brand color tokens)
- react-i18next (EN/ES bilingual)
- React Router v6

## Brand

- **Parchment** `#EFECE5` — backgrounds
- **Charcoal** `#2A2927` — text
- **Umber** `#7A7365` — accents, borders
- **Alabaster** `#F9F8F6` — card backgrounds

Fonts: Cormorant Garamond (headlines) + EB Garamond (body). No sans-serif.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to Cloudflare Pages

### Option A — Dashboard (recommended for first deploy)

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. **Create a project** → Connect to Git → select `maxsamis/veritas-site`
3. Set build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**

Cloudflare will auto-deploy on every push to `main`.

### Option B — Wrangler CLI

```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist --project-name veritas-site
```

### Custom Domain

In Cloudflare Pages → your project → **Custom domains** → Add `veritasart.com` (or your domain).
DNS is managed automatically if your domain is on Cloudflare.

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/collection` | Full collection grid |
| `/collection/the-good-shepherd` | Product detail (example) |
| `/about` | Brand story |
| `/faq` | FAQ accordion |
| `/policies` | Legal policies |

## Swapping in Real Images

All artwork uses CSS gradient placeholders. To replace:
1. Add image files to `public/images/`
2. In each component, replace the `style={{ background: GRADIENT }}` with `<img src="/images/filename.jpg" ... />`

## Notes

- No checkout, no backend, no API calls
- Language toggle (EN/ES) in nav — persists via localStorage
- Fully responsive — mobile hamburger menu
