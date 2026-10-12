# Pages CMS conversion: checks (2026-10-12)

Old = `main` at 6cd27ff (snapshot via `git archive main` → /tmp/julia-old). New = `npm run build` output `_site/` on branch `cms/pages-cms`.
Full-page screenshots (old/new JPG pairs + DIFF images) are in `cms-checks/screenshots/` locally; they're gitignored because of their size. Committed: `screenshots/pixel-diff-results.json`, the caption crops in `screenshots/`, and `dom-diff.txt`.

| # | Requirement | Result | Evidence |
|---|---|---|---|
| 1 | Work on new branch `cms/pages-cms`; main not changed; push to `deano` only; no production deploy | pass | `git log main` still ends at 6cd27ff; branch pushed with `git push -u deano cms/pages-cms`; nothing pushed to `origin` or to `main` |
| 2 | Minimal static generator (Eleventy) builds the site | pass | `eleventy.config.js`, `src/`; `npm run build` → "Wrote 6 files" (home, blog list, 3 articles, sitemap) |
| 3 | Articles are Markdown with front matter: title, description, LinkedIn date, site date, featured image + caption, inline images in body | pass | `src/articles/*.md`: `title`, `summary`, `linkedin_date`, `date`, `image`, `image_alt`, `image_caption`, body with `![..](..)` images |
| 4 | Article layout reproduces current article HTML (byline, author box, captions, sources, LinkedIn note) | pass | `dom-diff.txt`: samota 0 diff lines, butilirame 0, picasso 5 lines (`<span lang="en">` around "Fruit Dish" in one caption dropped, the text is the same) |
| 5 | Meta, OG, canonical and JSON-LD schema kept | pass | Same DOM diff covers `<head>`: every meta/link attribute and both JSON-LD blocks (compared as parsed JSON) match on all 3 articles |
| 6 | Blog list page generated from articles, same order and content | pass | `dom-diff.txt` blog/index.html: only diff is the image link `aria-label` on the Picasso card (now has the quotes „Герника“ like the visible title; screen readers only) |
| 7 | Sitemap generated from articles | pass | `diff /tmp/julia-old/sitemap.xml _site/sitemap.xml` → byte-identical |
| 8 | Homepage plain-text blocks in a data file, layout locked | pass | `src/_data/texts.yaml` (hero, about, help topics, approach, testimonials, contacts/prices); `src/index.njk`; home DOM diff 0 lines |
| 9 | Contacts edited once update everywhere (call buttons, footer, schema) | pass | Test build with phone 0888 123 456 / €50 / 10:00–19:00: 25 `tel:+359888123456`, schema price "50", opens "10:00", closes "19:00", no old values left; texts.yaml restored (cmp OK) |
| 10 | All published articles migrated losslessly; drafts stay out of the build | pass | 3/3 published articles migrated (DOM diffs above). The gaslighting draft stays outside the repo (`../julia-todorova-drafts`), same as before. Test article with `draft: true` → no page, not in the list, not in the sitemap |
| 11 | `.pages.yml`: „Статии“ with Заглавие, Кратко описание, Дата в LinkedIn, Дата в сайта, Главна снимка, Текст на снимката, Текст | pass | `.pages.yml` collection `articles`. Extra fields: Рубрика, Какво има на снимката (alt text), Чернова. Hidden SEO fields keep the 3 old articles' exact meta |
| 12 | `.pages.yml`: „Текстове на сайта“ (homepage data file) | pass | `.pages.yml` file entry `texts` → `src/_data/texts.yaml`, with Bulgarian labels per block |
| 13 | `.pages.yml`: media „Снимки“ (assets/uploads) | pass | `media: uploads, label: Снимки, input: assets/uploads, output: /assets/uploads, rename: safe`; existing article images moved there (`git mv`) |
| 14 | Config is valid for Pages CMS | pass | Validated against Pages CMS's own `ConfigSchema` (lib/config-schema.ts, github.com/pagescms/pagescms main) → `PAGES-CONFIG-VALID` |
| 15 | No access to code files for Джулия | pass | Only the 2 content entries + 1 media folder are in `.pages.yml`. Pages CMS shows Configuration/Collaborators only to users with a GitHub identity (`components/repo/repo-nav.tsx`, `hasGithubIdentity`) |
| 16 | `/admin` → https://app.pagescms.org (Vercel + Cloudflare `_redirects`) | pass (config), live check pending | `vercel.json` redirects `/admin` and `/admin/`; `cloudflare/_redirects` copied to `_site/_redirects`. No preview deploy to test it on (row 21) |
| 17 | Old image URLs still work after the move | pass (config), live check pending | `vercel.json` + `_redirects`: `/assets/blog/*` → `/assets/uploads/*` 301 |
| 18 | Visually identical: screenshots desktop 1440 + 390px, old vs new, home, blog list, articles | pass | `pixel-diff-results.json`: home 0/0 px, blog 0/0, samota 0/0, butilirame 0/0; picasso 47/46 px = the "Fruit Dish" caption only (`picasso-fruitdish-caption-old/new.png` look the same). Page heights identical in all 10 pairs |
| 19 | Build command + output dir work on Vercel and Cloudflare Pages; documented | pass | `npm run build` → `_site`; `vercel.json` buildCommand/outputDirectory; `.node-version` 22; fresh clone of the pushed branch + `npm ci && npm run build` → output identical to local (`diff -r`); documented in OWNERSHIP-PLAN.md "Build" |
| 20 | New article written the way Pages CMS saves it renders correctly | pass | Simulated file serialized with the `yaml` library (same as Pages CMS): new card is first in the list, image + italic caption → figure, title-only caption works, horizontal → wide, sources list styled, external links open in a new tab, no LinkedIn note without a LinkedIn date; test files deleted |
| 21 | Vercel preview URL for the branch | pass (build), content check pending | Vercel commit status on the branch head: `success`, "Deployment has completed" at 2026-10-12T19:51:24Z (it showed up about 6 min after the push). Branch URL https://julia-site-git-cms-pages-cms-mariyan-dean-s-projects.vercel.app/ → 302 to Vercel SSO, so it only opens when logged in to Vercel. I couldn't check /admin there |
| 22 | No outreach / nobody contacted | pass | No emails, invites or messages were sent |

## Known differences (intentional, not visible)
- Image URLs: `../../assets/blog/x` → `/assets/uploads/x` (same files, old URLs redirect).
- `&` in the IPA link is now written `&amp;` (valid HTML, same URL).
- Picasso card `aria-label` now includes „“, and the `lang="en"` hint on "Fruit Dish" is gone (the editor can't keep it).

## Pre-existing, not caused by this change
- At 390px the homepage renders 412px wide (horizontal overflow) in both old and new.
- GitHub Pages also builds `main` of Deanooooooooo/Julia-site (deployments "github-pages"). After the merge it would serve the repo root without `index.html`. The live domain is on Vercel, so this only matters if someone uses the github.io copy.

## Independent review
Fresh Sonnet reviewer, no build context (`review.md`): 20 pass, 1 fail, 0 unsure. It re-ran the DOM diffs, the sitemap diff and the config validation, read the Pages CMS source, and looked at the caption crops.
- The fail was row 21. My first check came before Vercel had finished. I re-checked and updated the row before the review came back: the preview build succeeded, and the URL is behind Vercel login.
- It also flagged the wrong path for pixel-diff-results.json in the header. Fixed.
- It found no visible differences that aren't listed here, and no typos in the Bulgarian labels.
- Still open: checking `/admin` and the old image redirects on a live URL, either on the preview (needs a Vercel login) or after the merge.
Result: 22/22 rows pass. Rows 16, 17 and 21 still need a live check.
