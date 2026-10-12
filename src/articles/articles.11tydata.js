// Every Markdown file in this folder is one article at /blog/<file-name>/.
// Drafts (draft: true) are not written to the site at all.
export default {
  layout: "article.njk",
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : `/blog/${data.page.fileSlug}/`),
  },
};
