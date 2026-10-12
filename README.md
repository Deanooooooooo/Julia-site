# Джулия Тодорова — сайт

Bulgarian site for a psychologist in Sofia. Built with Eleventy; content is edited in Pages CMS.

## Run locally

```bash
npm install
npm run serve
```

Open: http://localhost:5173

## Build

- Command: `npm run build`
- Output: `_site/`
- Works the same on Vercel (`vercel.json`) and Cloudflare Pages (`cloudflare/_redirects`, `cloudflare/_headers`).

## Where things are

- Articles: `src/articles/*.md` (file name = URL under `/blog/`)
- Homepage texts and contacts: `src/_data/texts.yaml`
- Templates: `src/index.njk`, `src/blog/index.njk`, `src/_includes/`
- Images: `assets/uploads/`
- CMS fields: `.pages.yml`

## Deployment

- Live URL: https://www.juliatodorova.bg/
- Canonical URL, sitemap, robots, Open Graph and JSON-LD use the live `www` domain (`src/_data/site.js`).
