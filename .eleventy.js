const anchor = require("markdown-it-anchor");

const mdIt = require("markdown-it")({
  html: true
});
mdIt.use(anchor);

module.exports = function(eleventyConfig) {
  // eleventyConfig.addLayoutAlias("default", "layouts/base.njk");
  eleventyConfig.setLibrary("md", mdIt);
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });

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
