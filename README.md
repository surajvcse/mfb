# MFB Geotech

A React and TypeScript website built with Vite, Tailwind CSS, and React Router. The sample branding and copy describe an architecture studio.

## Run locally

Install dependencies with `npm ci` and start the development server with `npm run dev`. Use Node.js 22.12+ on the Node 22 release line or a newer supported release.

## Structure

| Location | Purpose |
| --- | --- |
| `src/main.tsx` | Routes for Home, About, Services, Contact, and a 404 fallback |
| `src/layouts/SiteLayout.tsx` | Shared navigation, main content, and footer |
| `src/pages/` | Individual TSX route views |
| `src/components/` | Reusable page intros, service cards, calls to action, footer, and contact form |
| `src/content/site.ts` | Brand name, navigation, and service content |
| `src/styles.css` | Tailwind theme tokens and shared responsive styles |

## Contact form

The contact form opens a prefilled draft in the visitor’s email app, addressed to `info@mfbumi.com` by default. To use a different recipient, set `VITE_CONTACT_EMAIL` in `.env.local` and restart the development server or rebuild.

## Production build

Run `npm run build` to type-check and generate `dist/`. Use `npm run preview` to serve the built files locally. When hosting, configure the server to serve `index.html` for application routes so direct visits and refreshes work.

The home hero uses web-sized copies of the supplied project photos in `src/Assets/hero/`. The originals are in `src/Assets/imges/`.
