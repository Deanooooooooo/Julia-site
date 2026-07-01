# Julia Todorova Website — Continuation Notes

Use this file as the quick handoff for future chat sessions. It intentionally keeps source info, image references, and working preferences; it does **not** track every design tweak.

## Project
- Local project: `/Users/User/.openclaw/workspace/julia-todorova-site`
- Type: Bulgarian one-page business-card / landing page for a psychologist in Sofia.
- Deployment: GitHub `deano/main` (`Deanooooooooo/Julia-site`) is connected to the live Vercel site. `origin/main` (`MDDechevs/Julia-site`) updates GitHub Pages. For live `www.juliatodorova.bg`, push `deano/main` after final approval.
- Local preview:
  ```bash
  cd /Users/User/.openclaw/workspace/julia-todorova-site
  python3 -m http.server 5173
  ```
  Open: `http://localhost:5173`

## Blog Publishing Workflow
These notes are only for this Julia Todorova site. Do not treat them as general rules for other projects.

- Add `Блог` in the main navigation and keep `/blog/` as the article list page.
- Blog list intro copy currently approved:
  - H1: `Статии за човешките ни противоречия, за връзките, които ни оформят, и за отношението ни към самите нас.`
  - Supporting line: `Текстове на Джулия Тодорова`
- For imported LinkedIn articles, use the LinkedIn original publish date as the original article date and the website publication date as the site date.
- Show both dates in the article byline:
  - `Публикувано в LinkedIn: ...`
  - `Публикувано в сайта: ...`
- Use the compact author/date row under the article title: small circular `assets/julia-todorova-razkazhimi.jpg`, author name, and both dates.
- Use the same compact author/date treatment on blog cards.
- Article pages should be readable, not wall-of-text: clear H2s, short paragraphs, source list, image captions, and a bottom author box.
- If generated illustrations are requested for Julia's articles, keep them specific to this site style:
  - warm cream/ivory, muted sage/olive, deep charcoal, and restrained warm clay accents;
  - calm psychology/art editorial style, not stock, cartoon, clinical, or decorative;
  - avoid clearly gendered silhouettes unless the article/client explicitly asks for gender;
  - if children are shown, avoid making the child's gender clearly recognizable unless requested;
  - prefer open-to-interpretation illustrations with no visible explanatory captions; keep descriptive `alt` text for accessibility/SEO only;
  - use 1 featured image plus 1-2 inline images unless Dean/client asks for more;
  - do not add generated-image process text such as "created for the article" on the page.
- Bottom author box copy currently approved:
  - `Джулия Тодорова`
  - `Клиничен психолог и психотерапевт. Работи с възрастни, юноши и родители, които срещат трудности в грижата за децата си.`
- Bottom author image should use `assets/julia-todorova-razkazhimi.jpg` with a crop that does not cut off her head.
- For article images, place each image near the matching source/argument in the article flow, and include visible caption/source links.
- For the current Picasso/Cubism article:
  - Featured image caption: `Пабло Пикасо, „Герника“, 1937. Източник`
  - Place `Госпожиците от Авиньон` under the paragraph beginning `Кубизмът се характеризира...`
  - Place `Fruit Dish` under the paragraph beginning `Синтетичният кубизъм...`
  - Do not keep broken source links. If an academic source blocks direct linking, use plain DOI text instead of a clickable broken link.

## Source Links / Profiles
Use these as source material and secondary trust links:
- LinkedIn: `https://www.linkedin.com/in/julia-todorova-a5bbb656?utm_source=share_via&utm_content=profile&utm_medium=member_android`
- Superdoc: `https://superdoc.bg/lekar/dzhulia-todorova`
- Google Business Profile: `https://share.google/z9bXEJBtoN6xMTFeZ`
- Google entity URL: `https://www.google.com/search?kgmid=/g/11z80z098q&hl=bg&q=%D0%94%D0%B6%D1%83%D0%BB%D0%B8%D1%8F+%D0%A2%D0%BE%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B0+-+%D0%BA%D0%BB%D0%B8%D0%BD%D0%B8%D1%87%D0%B5%D0%BD+%D0%BF%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3+%D0%B8+%D0%BF%D1%81%D0%B8%D1%85%D0%BE%D1%82%D0%B5%D1%80%D0%B0%D0%BF%D0%B5%D0%B2%D1%82`
- RazkazhiMi: `https://razkazhimi.online/providers/a738c4ca-e749-4b33-bb38-5c99cb72d5e8`
- RazkazhiMi portrait source used during planning: `https://razkazhimi-production.s3.eu-south-2.amazonaws.com/a738c4ca-e749-4b33-bb38-5c99cb72d5e8`

## Extracted / Agreed Info
- Name: Джулия Тодорова
- Role: клиничен психолог, психотерапевт
- City: София
- Address: бул. „Витоша“ 61, София
- Phone: `0878 194 843` / `+359 878 194 843`
- Email from RazkazhiMi: `todorova.djulia@gmail.com`
- Price to show: **€40** / 78.23 лв. Do **not** use 52.50 лв.
- Hours: **09:00–20:00**, with last session starting at **19:00**.
- Sessions: live / in-person sessions should be emphasized. Sofia cabinet first.
- Audience: adults, parents, and teenagers/youth.
- Approach: psychoanalytic psychotherapy; explain in human, non-jargony language.
- Experience: use **10+ години опит** as the main trust phrasing.
- Education/credentials from sources: bachelor + master in clinical psychology at NBU; psychodrama consultant; associated member of Bulgarian Psychoanalytic Society; member of Bulgarian Psychological Society.
- Experience mentioned in sources: Center for Public Support, Military Medical Academy psychiatry, National Specialized Hospital for Hematological Diseases, independent practice.

## Image References
Current project assets:
- `assets/julia-todorova-portrait.jpg` — uploaded portrait; preferred/strong hero portrait.
- `assets/julia-todorova-razkazhimi.jpg` — RazkazhiMi portrait; secondary/about image.
- `assets/psychology-cabinet-sofia.jpg` — cabinet image; must remain horizontal/natural, not forced into a vertical crop.

Original inbound uploads from the build chat:
- Cabinet image: `/Users/User/.openclaw/media/inbound/file_49---dae0be5d-61d6-4423-9c7c-245156f658ae.jpg`
- Uploaded portrait: `/Users/User/.openclaw/media/inbound/file_50---98e6fc14-50fa-47ba-bf4f-af0771c7088a.jpg`

Image usage preference:
- Hero: strongest uploaded portrait.
- About/credentials: RazkazhiMi portrait.
- Cabinet/address section: cabinet image below/near the address copy, preserving its horizontal aspect ratio.
- SEO alt text ideas:
  - `Джулия Тодорова психолог и психотерапевт София`
  - `Психологически кабинет Джулия Тодорова бул. Витоша 61 София`
  - `Психологическа консултация в София`

## CTA / Conversion Preferences
- Primary CTA should be phone-first: **“Запазете час”** linking to `tel:+359878194843`.
- She prefers phone call as the main action.
- Superdoc and LinkedIn can appear as quiet secondary links, not primary CTAs.
- No contact form for now; avoid GDPR hassle.
- Main promise should balance SEO and real user trust, not keyword stuffing.
- Do **not** mention Superdoc reviews/rating on the site.
- Testimonials: real testimonials only if approved. For presentation, placeholders are okay but should be clearly replaceable and not fake “5-star review” style.

## Tone / UX Preferences
- Bulgarian only.
- Tone: calm, serious, warm, credible, professional; not salesy, not overly clinical.
- Target patients likely need calm, clarity, privacy, and trust.
- Design direction: warm beige/cream base, muted sage/olive, deep charcoal text, soft warm accent. Avoid clinic-blue and flashy startup feel.
- Avoid visual chaos: too many cards/boxes create stress. Prefer calm hierarchy and breathing room.
- Typography must have clear hierarchy: section titles and card titles need to be visibly stronger than body text.
- Keep mobile-first behavior strong; most visitors will likely open from phone.

## SEO Intent
Primary keyword themes:
- `психолог София`
- `психотерапевт София`
- `психолог бул. Витоша`
- `психоаналитична психотерапия София`
- `психолог тревожност София`

SEO structure to preserve:
- H1 should balance user trust + SEO, e.g. psychologist in Sofia for anxiety/stress/life difficulties.
- Local NAP consistency: name, address, phone should match across site/profiles.
- Include Google Maps/address section. When a Google Business Profile exists, use the business/entity map rather than a raw street-address map.
- Keep structured data/schema, Bulgarian `lang="bg"`, meta title/description, Open Graph, sitemap, robots.

## Later Local SEO / Google Business Profile
Google Business Profile exists as of 2026-06-30. Keep the site name, role, address, phone, and hours aligned with it.
Suggested GBP content:
- Business name: `Джулия Тодорова - клиничен психолог и психотерапевт`
- Primary category: `Психолог`
- Secondary category if available: `Психотерапевт` / `Консултант`
- Description: focus on individual consultations for anxiety, tension, burnout, life crises, loss, relationship difficulties; adults, parents, teenagers; cabinet at бул. „Витоша“ 61; psychoanalytic psychotherapy, confidentiality, professional ethics.
- CTA: call
- Phone: `0878 194 843`
- Address: бул. „Витоша“ 61, София
- Hours: 09:00–20:00
- Website: add after final domain
