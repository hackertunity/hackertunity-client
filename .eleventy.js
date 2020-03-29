const anchor = require("markdown-it-anchor");
const htmlmin = require("html-minifier");
const mdIt = require("markdown-it")({
  html: true
});
mdIt.use(anchor);

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const { ELEVENTY_ENV } = process.env;

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    // copy all JS files except the "data" files used by 11ty
    "src/**/!(_data)/*.js": "js"
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setLibrary("md", mdIt);

  if (ELEVENTY_ENV === "prod") {
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if (outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }

      return content;
    });
  }

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
