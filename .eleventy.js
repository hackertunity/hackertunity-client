const anchor = require("markdown-it-anchor");
const mdIt = require("markdown-it")({
  html: true
});
mdIt.use(anchor);

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setLibrary("md", mdIt);
  return {
    dir: {
      input: "src/site",
      output: "dist"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
    templateFormats: ["njk", "md"]
  };
};
