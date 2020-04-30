const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
let markdownItLibrary = markdownIt({
  html: true
}).use(markdownItAnchor);

let Nunjucks = require("nunjucks");
let nunjucksEnvironment = new Nunjucks.Environment(
  new Nunjucks.FileSystemLoader("src/templates")
);

const { ELEVENTY_ENV } = process.env;

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setLibrary("md", markdownItLibrary);
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

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
      input: "./src",
      includes: "assets",
      layouts: "templates",
      output: "dist"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md"]
  };
};
