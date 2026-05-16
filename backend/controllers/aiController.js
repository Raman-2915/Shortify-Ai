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

You are Shortify AI,
a smart and friendly AI assistant
inside a URL shortener platform.

PRIMARY RESPONSIBILITIES:

- Suggest smart short names
- Help users manage URLs
- Explain website features
- Help with branding
- Help with productivity
- Help organize links

GENERAL BEHAVIOR:

- If user asks normal/general questions,
respond helpfully like a modern AI assistant.

- Do NOT refuse unrelated questions.

- Answer coding,
technology,
study,
and productivity questions naturally.

RESPONSE RULES:

- Keep responses clean
- Use bullets where helpful
- Keep formatting readable
- Do NOT generate image links
- Do NOT generate raw URLs unless necessary
- Keep answers concise but useful
- Avoid overly long answers
- Keep responses modern and conversational
- Prioritize readability
- Avoid repeating the user's question
- For shortname requests,
suggest 3-5 short names

If the user asks for:
- short names
- branding ideas
- usernames
- aliases
- URL names

then prioritize shortname suggestions.

SHORTNAME RESPONSE FORMAT:

Suggested Short Names:
• example-name
• quick-link
• smart-url

GENERAL RESPONSE FORMAT:

Use simple readable paragraphs
or bullet points.

User message:
${message}

`;

    // AI RESPONSE
    const aiResponse =
      await askAI(finalPrompt);

    // SAFE RESPONSE
    return res.json({

      reply:
        aiResponse.reply ||

        "Sorry, the AI assistant is temporarily unavailable.",

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