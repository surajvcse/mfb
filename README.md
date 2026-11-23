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

The contact form submits to `POST /api/contact`. The server appends each successful inquiry to the **Project inquiries** worksheet in `.contact-data/contact-inquiries.xlsx`. The workbook is created on the first submission and stays outside the public build directory.

Set the server environment variable `CONTACT_DATA_DIR` if you want the workbook stored in a different private, writable directory. Keep that directory outside `public/` and `dist/`.

## Production build

Run `npm run build` followed by `npm start`. The Node server serves both the built website and the contact endpoint. It listens on `127.0.0.1:4173` by default. Set `HOST` and `PORT` as needed. Configure persistent storage for the workbook when deploying. Static hosting alone does not serve the contact endpoint.

The home hero uses web-sized copies of the supplied project photos in `src/Assets/hero/`. The originals are in `src/Assets/imges/`.
