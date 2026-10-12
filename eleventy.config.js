import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";
import markdownIt from "markdown-it";
import { imageSize } from "image-size";

const md = markdownIt({ html: true, linkify: false, typographer: false });

const MONTHS = ["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември"];

// Dates arrive either as "2026-06-30" strings or as YAML Date objects (UTC midnight).
const toIso = (value) => {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).trim().slice(0, 10);
};

const bgDate = (value) => {
  const iso = toIso(value);
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y} г.`;
};

const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// External links open in a new tab, as on the hand-written pages.
const externalLinks = (html) =>
  html.replace(/<a href="(https?:\/\/[^"]+)"(?![^>]*target=)/g, '<a href="$1" target="_blank" rel="noopener"');

const imageDims = (src) => {
  if (!src || /^https?:/.test(src)) return null;
  const file = path.join(process.cwd(), decodeURI(src.split("?")[0]).replace(/^\//, ""));
  try {
    return imageSize(fs.readFileSync(file));
  } catch {
    return null;
  }
};

const inlineMd = (text) => externalLinks(md.renderInline(String(text ?? "")));

const ARTICLE_NOTE = `<aside class="article-note">
            <p>
              Текстът е публикуван първоначално в LinkedIn. Настоящата версия е
              структурирана за по-лесно четене в сайта.
            </p>
          </aside>`;

// Turns the editor's Markdown output into the article markup the design expects:
// image paragraphs become figures (an italic paragraph right after an image is its caption),
// the list under „Източници“ gets the sources style, and the LinkedIn note sits above the sources.
const articleBody = (html, data = {}) => {
  let out = html.replace(
    /<p>\s*<img src="([^"]+)" alt="([^"]*)"(?: title="([^"]*)")?\s*\/?>\s*<\/p>(\s*<p>\s*<em>((?:(?!<\/em>)[\s\S])*)<\/em>\s*<\/p>)?/g,
    (_m, src, alt, title, _capBlock, cap) => {
      const dims = imageDims(src);
      const wide = dims && dims.width > dims.height ? " article-figure-wide" : "";
      const size = dims ? `\n              width="${dims.width}"\n              height="${dims.height}"` : "";
      const caption = cap ?? title;
      const figcaption = caption ? `\n            <figcaption>\n              ${caption.trim()}\n            </figcaption>` : "";
      return `<figure class="article-figure${wide}">
            <img
              src="${src}"
              alt="${alt}"${size}
              loading="lazy"
            />${figcaption}
          </figure>`;
    },
  );
  out = externalLinks(out);
  out = out.replace(/(<h2>Източници<\/h2>\s*)<ol>/, '$1<ol class="sources-list">');
  if (data.linkedin_date) {
    if (/<h2>Източници<\/h2>/.test(out)) out = out.replace(/<h2>Източници<\/h2>/, `${ARTICLE_NOTE}\n\n          <h2>Източници</h2>`);
    else out = `${out}\n\n          ${ARTICLE_NOTE}`;
  }
  return out;
};

export default function (eleventyConfig) {
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy({ "cloudflare/_redirects": "_redirects", "cloudflare/_headers": "_headers" });

  eleventyConfig.addFilter("bgDate", bgDate);
  eleventyConfig.addFilter("isoDate", toIso);
  eleventyConfig.addFilter("inlineMd", inlineMd);
  eleventyConfig.addFilter("articleBody", articleBody);
  eleventyConfig.addFilter("attr", escapeAttr);
  eleventyConfig.addFilter("imageDims", imageDims);
  eleventyConfig.addFilter("tel", (phone) => {
    const digits = String(phone).replace(/[^\d+]/g, "");
    return digits.startsWith("0") ? `+359${digits.slice(1)}` : digits;
  });
  eleventyConfig.addFilter("plainAddress", (s) => String(s).replace(/[„“"]/g, ""));
  eleventyConfig.addFilter("priceNumber", (s) => (String(s).match(/\d+(?:[.,]\d+)?/) || [""])[0].replace(",", "."));
  eleventyConfig.addFilter("hoursPart", (s, i) => (String(s).split(/\s*[–—-]\s*/)[i] || "").trim());
  eleventyConfig.addFilter("maxDate", (dates) => dates.map(toIso).filter(Boolean).sort().pop());

  // Published articles, newest site date first; `order` breaks ties between same-day articles.
  eleventyConfig.addCollection("articles", (api) =>
    api
      .getFilteredByGlob("src/articles/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => toIso(b.data.date).localeCompare(toIso(a.data.date)) || (b.data.order || 0) - (a.data.order || 0)),
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
