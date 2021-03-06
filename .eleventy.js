const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");
const pluginNavigator = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
let markdownItConfig = markdownIt({
  html: true
}).use(markdownItAnchor);

/**
 * Create a new Nunjucks environment that sets Nunjucks' base path
 * to "src/templates" so that we can use shorter paths to reference
 * templates from within the app.
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
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPlugin(pluginNavigator);
  eleventyConfig.addPlugin(pluginRss);

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
