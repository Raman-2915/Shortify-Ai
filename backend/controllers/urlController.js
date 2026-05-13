const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const { getMetaData } = require("../utils/meta");

exports.createUrl = async (req, res) => {

  try {

    const {
      fullUrl,
      custom,
      image,
    } = req.body;

    // VALIDATION
    if (!fullUrl) {

      return res.status(400).json({
        message: "URL is required",
      });
    }

    // VALID URL CHECK
    try {

      new URL(fullUrl);

    } catch {

      return res.status(400).json({
        message: "Invalid URL",
      });
    }

    const shortId =
      custom || nanoid(6);

    // CHECK DUPLICATE
    const existing =
      await Url.findOne({
        shortId,
        user: req.user,
      });

    if (existing) {

      return res.status(400).json({
        message:
          "You already created this short name",
      });
    }

    // FETCH METADATA
    const meta =
      await getMetaData(fullUrl);

    // CREATE URL
    const url =
      await Url.create({

        fullUrl,

        shortId,

        user: req.user,

        image:
          image || meta.image,

        title:
        custom ||
        shortId ||
         meta.title ||
         "Short Link",

      });

    res.json(url);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};

exports.getUserUrls = async (req, res) => {
  const urls = await Url.find({ user: req.user }).sort({ clicks: -1 });

  res.json(urls);
};

exports.deleteUrl = async (req, res) => {
  await Url.findOneAndDelete({
    _id: req.params.id,
    user: req.user,
  });
  res.json({ msg: "Deleted" });
};

exports.updateUrl = async (req, res) => {

  const { fullUrl, shortId } = req.body;

  const updated = await Url.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user,
    },
    {
      fullUrl,
      shortId,
    },
    { new: true }
  );

  res.json(updated);
};

exports.redirectUrl = async (req, res) => {
  const url = await Url.findOne({ shortId: req.params.shortId });

  if (!url) return res.send("Not found");

  url.clicks++;
  await url.save();

  res.redirect(url.fullUrl);
};