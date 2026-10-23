// Every file in content/news/ is a News post page at /news/<file-name>/.
export default {
  layout: "layouts/news-post.njk",
  tags: ["news"],
  eleventyExcludeFromCollections: false,
  eleventyComputed: {
    permalink: (data) => `/news/${data.page.fileSlug}/`,
  },
};
