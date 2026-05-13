const askAI =
  require("../utils/ai");

exports.chatAI = async (
  req,
  res
) => {

  try {

    const { message } =
      req.body;

    if (!message) {

      return res.status(400).json({
        message:
          "Message required",
      });
    }

    const finalPrompt = `

      You are an AI assistant
      for a URL shortener app.

      User message:
      ${message}

      Help with:
      - shortnames
      - categorization
      - productivity
      - URLs
      - organization

    `;

    // AI RESPONSE
    const aiResponse =
      await askAI(finalPrompt);

    // SAFE RESPONSE
    return res.json({

      reply:
        aiResponse.reply ||

        "AI unavailable",

      image:
        aiResponse.image || null,

    });

  } catch (err) {

    console.log(
      "AI Controller Error:",
      err
    );

    return res.status(500).json({

      reply:
        "AI failed",

      image: null,

    });
  }
};