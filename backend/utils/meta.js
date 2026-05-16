const axios = require("axios");
const cheerio = require("cheerio");

exports.getMetaData = async (url) => {

  try {

    const { data } = await axios.get(url, {

      headers: {

        "User-Agent":
          "Mozilla/5.0",

      },

      timeout: 5000,

    });

    const $ = cheerio.load(data);

    let image =
      $('meta[property="og:image"]').attr("content") ||

      $('meta[name="twitter:image"]').attr("content");

    let title =
      $('meta[property="og:title"]').attr("content") ||

      $("title").text();

    // FALLBACK IMAGE
    if (!image) {

      const domain =
        new URL(url).hostname;

      image =
        `https://logo.clearbit.com/${domain}`;
    }

    return {

      image,

      title,

    };

  } catch (err) {

    console.log(
      "Metadata Error:",
      err.message
    );

    let fallbackImage =
      "https://picsum.photos/400/200";

    try {

      const domain =
        new URL(url).hostname;

      fallbackImage =
        `https://logo.clearbit.com/${domain}`;

    } catch {}

    return {

      title: "",

      image: fallbackImage,

    };
  }
};