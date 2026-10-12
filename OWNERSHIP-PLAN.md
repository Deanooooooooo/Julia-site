# Джулия: ownership handover plan (owner request 2026-10-12, draft — nothing sent)

Goal: Джулия owns her site and can publish articles herself, with zero tech. She never sees GitHub, Vercel or code (owner: don't involve GitHub for her).
Responsible: Gunter (gunter@vdiga.bg) runs the handover and the emails, after owner OK on the draft.

## Current state (checked 2026-10-12)
- Static HTML site + blog, code in Deanooooooooo/Julia-site (+ MDDechevs copy), hosted on Vercel under our account.
- DNS: juliatodorova.bg uses ns1/ns2.vercel-dns.com (Vercel). Domain: owned by Джулия, registered through Netim on her own account; she knows this (owner, 2026-10-12). Only the DNS change at Netim is needed (nameservers Vercel → Cloudflare), done by us with her login or by her during the call.

## What she ends up with
1. Domain juliatodorova.bg: already hers (Netim, her account). Nothing to transfer.
2. Hosting in her own free Cloudflare account (commercial use allowed; Vercel free plan is non-commercial). We're invited as members. Site deployed from our side; she never touches deploys.
3. Admin panel at juliatodorova.bg/admin: login with her email + one-time code, Bulgarian labels, only Статии / Текстове / Снимки, layout locked, version history. Tool to be confirmed in a spike on a copy of the site: must support email-only login for her (no GitHub account on her side). Code/repo stays with us technically; the agreement states the site and its content are hers.
4. A full copy of the site files sent to her (zip, by email / her Google Drive) at handover and on request.
5. One page „Вашият сайт“: what she owns, where, who has access (no passwords in it).
6. 3-minute video „Как да публикувате статия“.
7. Exit clause: if we stop working together, we hand everything over within 7 days.

## Her steps (only these)
1. Click the Cloudflare email, choose a password, write it down.
2. Click the admin invite email; log in with the code.
3. 15-minute call: she logs in to Netim for one DNS setting, then we publish a test article together.

## Our steps (order)
1. Spike: admin tool with email-only login on a copy; Bulgarian labels; locked fields.
2. Convert blog articles to editable entries without changing the design.
3. Cloudflare: deploy, test on a temporary address, then switch DNS from Vercel (no downtime); keep Vercel until verified.
4. DNS at Netim: point nameservers to her Cloudflare (during the call, with her logged in).
5. Video + one-pager + zip; call; exit clause.

## Admin panel: Pages CMS (built 2026-10-12, branch `cms/pages-cms`, not merged)
- Tool: Pages CMS (app.pagescms.org). Джулия is invited by email as a collaborator; she logs in with an email link, no GitHub account. Collaborators without GitHub do not see the Configuration or Collaborators screens (checked in Pages CMS source, `components/repo/repo-nav.tsx`).
- `juliatodorova.bg/admin` redirects to https://app.pagescms.org (vercel.json now, `cloudflare/_redirects` after the move).
- What she can edit (`.pages.yml`): Статии (`src/articles/*.md`), Текстове на сайта (`src/_data/texts.yaml`), Снимки (`assets/uploads/`). Layout, styles and code are not in the CMS.
- Every save is a commit on `main` of Deanooooooooo/Julia-site, so the host rebuilds and publishes in about a minute. Version history = git history.

### Build (same on Vercel and Cloudflare Pages)
- Generator: Eleventy 3 (`eleventy.config.js`, templates in `src/`).
- Build command: `npm run build`
- Output directory: `_site`
- Node: 22 (`.node-version` for Cloudflare, `engines` in package.json for Vercel).
- Vercel: already set in `vercel.json` (`buildCommand`, `outputDirectory`, redirects, headers).
- Cloudflare Pages: Framework preset None, build command `npm run build`, output `_site`. `_redirects` and `_headers` are copied from `cloudflare/` into the output.
- Local preview: `npm install` once, then `npm run serve` → http://localhost:5173

### How content maps to the site
- Article file name = URL: `src/articles/<name>.md` → `/blog/<name>/`. Pages CMS names new files from the title, transliterated to Latin.
- `draft: true` (Чернова) → page is not built, not in the list, not in the sitemap.
- List order: „Дата в сайта“, newest first; hidden `order` breaks ties between same-day articles.
- In the article text: an image on its own line becomes a figure (wide if the picture is horizontal); an italic line right under it becomes the caption; the numbered list under the heading „Източници“ gets the sources style; the LinkedIn note is added above „Източници“ when „Дата в LinkedIn“ is filled.
- Old article images moved from `assets/blog/` to `assets/uploads/`; `/assets/blog/*` 301-redirects to the new path.
- Hidden per-article fields kept for the three migrated articles: `seo_title`, `seo_description`, `social_description`, `breadcrumb`, `modified`, `order`.
- Contacts in „Текстове на сайта“ (phone, email, address, hours, price) feed every page, the call buttons and the schema.

### One-time setup still needed (owner)
1. Merge `cms/pages-cms` into `main` after checking the Vercel preview.
2. Go to app.pagescms.org, sign in with GitHub, install the Pages CMS GitHub App on Deanooooooooo/Julia-site only.
3. Open the repo in Pages CMS → Collaborators → invite Джулия's email.
Her side: open the invite email, click the link, done.
