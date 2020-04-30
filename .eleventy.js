const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
let markdownItConfig = markdownIt({
  html: true
}).use(markdownItAnchor);

/**
 * Create a new Nunjucks environment that sets Nunjucks' base path
 * to "src/templates" so that we can use shorter paths to reference
 * templates from within each other.
 *
 * For example, this allows us to write:
 *   {% include 'partials/navbar.njk' %}
 * instead of
 *   {% include 'src/templates/partials/navbar.njk' %}
 */
let Nunjucks = require("nunjucks");
let nunjucksEnvironment = new Nunjucks.Environment(
  new Nunjucks.FileSystemLoader("src/templates")
);

const { ELEVENTY_ENV } = process.env;

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setLibrary("md", markdownItConfig);
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  /**
   * If we're in prod, we want to minify all HTML as we process it
   * @see: https://www.11ty.dev/docs/config/#transforms-example-minify-html-output
   */
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
