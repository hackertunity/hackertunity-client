const { Parser } = require("xml2js");
const request = require("request-promise-native");
const parser = new Parser();

const getRssConvertXmlToJson = async (url, callback) =>
  request(url).then(feed =>
    parser
      .parseStringPromise(feed)
      .then(callback)
      .catch(e => console.error("error parsing XML", e))
  );

const getJobFeed = () =>
  getRssConvertXmlToJson(
    "https://weworkremotely.com/remote-jobs.rss",
    ({
      rss: {
        channel: [c]
      }
    }) =>
      c.item.map(i => {
        const [companyName, jobTitle] = i.title[0].split(":");
        return {
          jobTitle: jobTitle.trim(),
          companyName: companyName.trim(),
          pubDate: i.pubDate[0],
          link: i.link[0],
          logoSrc: i["media:content"][0].$.url
        };
      })
  );

module.exports = { getJobFeed };
