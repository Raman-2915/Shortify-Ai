const OpenAI = require("openai");

const client = new OpenAI({

  apiKey: process.env.GROQ_API_KEY,

  baseURL:
    "https://api.groq.com/openai/v1",

});

// EXTRACT DOMAIN
const getDomain = (text) => {

  try {

    const match =
      text.match(
        /(https?:\/\/[^\s]+)/g
      );

    if (!match) return null;

    const url =
      new URL(match[0]);

    return url.hostname
      .replace("www.", "");

  } catch {

    return null;
  }
};

// SMART IMAGE
const getSuggestedImage = (
  prompt
) => {

  const text =
    prompt.toLowerCase();

  // DOMAIN LOGOS
  try {

    const match =
      text.match(
        /(https?:\/\/[^\s]+)/g
      );

    if (match) {

      const url =
        new URL(match[0]);

      return `https://logo.clearbit.com/${url.hostname}`;
    }

  } catch {}

  // KNOWN BRANDS
  const brands = {

  // SOCIALS
  whatsapp:
    "https://cdn-icons-png.flaticon.com/512/733/733585.png",

  instagram:
    "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",

  facebook:
    "https://cdn-icons-png.flaticon.com/512/733/733547.png",

  twitter:
    "https://cdn-icons-png.flaticon.com/512/733/733579.png",

  linkedin:
    "https://cdn-icons-png.flaticon.com/512/174/174857.png",

  reddit:
    "https://cdn-icons-png.flaticon.com/512/2111/2111589.png",

  pinterest:
    "https://cdn-icons-png.flaticon.com/512/145/145808.png",

  telegram:
    "https://cdn-icons-png.flaticon.com/512/2111/2111646.png",

  discord:
    "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",

  snapchat:
    "https://cdn-icons-png.flaticon.com/512/3670/3670147.png",

  // VIDEO & MUSIC
  youtube:
    "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",

  spotify:
    "https://cdn-icons-png.flaticon.com/512/174/174872.png",

  netflix:
    "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",

  primevideo:
    "https://cdn-icons-png.flaticon.com/512/5968/5968897.png",

  // TECH
  github:
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",

  git:
    "https://cdn-icons-png.flaticon.com/512/4494/4494748.png",

  vscode:
    "https://cdn-icons-png.flaticon.com/512/906/906324.png",

  "visual studio code":
    "https://cdn-icons-png.flaticon.com/512/906/906324.png",

  postman:
    "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",

  "postman-api-testing":
    "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",

  mongodb:
    "https://cdn.iconscout.com/icon/free/png-256/free-mongodb-5-1175140.png",

  nodejs:
    "https://cdn-icons-png.flaticon.com/512/919/919825.png",

  "node.js":
    "https://cdn-icons-png.flaticon.com/512/919/919825.png",

  express:
    "https://cdn.worldvectorlogo.com/logos/express-109.svg",

  react:
    "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",

  nextjs:
    "https://cdn.worldvectorlogo.com/logos/next-js.svg",

  tailwind:
    "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",

  firebase:
    "https://cdn-icons-png.flaticon.com/512/5968/5968771.png",

  docker:
    "https://cdn-icons-png.flaticon.com/512/919/919853.png",

  vercel:
    "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",

  render:
    "https://avatars.githubusercontent.com/u/44526468?s=280&v=4",

  // CODING PLATFORMS
  leetcode:
    "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",

  codeforces:
    "https://sta.codeforces.com/s/0/apple-icon-180x180.png",

  codechef:
    "https://cdn.codechef.com/images/cc-logo.svg",

  geeksforgeeks:
    "https://media.geeksforgeeks.org/gfg-gg-logo.svg",

  hackerrank:
    "https://cdn.worldvectorlogo.com/logos/hackerrank.svg",

  // EDUCATION
  apnacollege:
    "https://yt3.googleusercontent.com/ytc/AIdro_l8rM4zS5v1wz8L8m9d=s900-c-k-c0x00ffffff-no-rj",

  ggsipu:
    "https://www.ipu.ac.in//style/images/logo.png",

  gtbit:
    "https://gtbit.ac.in/wp-content/uploads/2022/06/logo.png",

  college:
    "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",

  university:
    "https://cdn-icons-png.flaticon.com/512/8074/8074788.png",

  // COMPANIES
  amazon:
    "https://cdn-icons-png.flaticon.com/512/5968/5968870.png",

  google:
    "https://cdn-icons-png.flaticon.com/512/281/281764.png",

  microsoft:
    "https://cdn-icons-png.flaticon.com/512/732/732221.png",

  apple:
    "https://cdn-icons-png.flaticon.com/512/0/747.png",

  tesla:
    "https://cdn.worldvectorlogo.com/logos/tesla-9.svg",

  openai:
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",

  chatgpt:
    "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",

};

  for (const brand in brands) {

    if (
      text.includes(brand)
    ) {

      return brands[brand];
    }
  }

  // AI GENERATED IMAGE
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(
    text
  )}`;
};

const askAI = async (prompt) => {

  try {

    const completion =
      await client.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [

          {
            role: "system",

content: `
You are Shortify AI,
a smart modern AI assistant
inside a premium URL shortener app.

PRIMARY RESPONSIBILITIES:
- Suggest smart shortnames
- Create catchy URL aliases
- Help users with branding
- Help organize links
- Improve productivity

GENERAL BEHAVIOR:
- Answer general questions naturally
- Help with coding, studies, technology, and productivity
- Behave like a helpful modern AI assistant
- Do NOT refuse unrelated questions

RESPONSE RULES:
- Keep responses clean and readable
- Use bullets where useful
- Keep formatting modern
- Avoid messy formatting
- Avoid raw image links
- Avoid markdown links
- Keep responses concise but useful
- Do not repeat the user's question

SHORTNAME RULES:
- If user asks for shortnames,
prioritize 3-5 modern suggestions
- Put shortname suggestions first
- Make names short, brandable, and readable

SHORTNAME RESPONSE EXAMPLE:

Suggested Short Names:
• dev-hub
• quick-link
• code-sync
• smart-url

GENERAL RESPONSE STYLE:
- Use readable paragraphs
- Use bullets when useful
- Be conversational and clean
`,
          },

          {
            role: "user",

            content: prompt,
          },

        ],

        temperature: 0.7,

      });

let reply =
  completion.choices[0]
    .message.content;

// REMOVE RAW URLS
reply = reply.replace(
  /(https?:\/\/[^\s]+)/g,
  ""
);

// CLEAN EXTRA SPACES
reply = reply.trim();

    return {

      reply,

      image:
        getSuggestedImage(
          prompt
        ),

    };

  } catch (err) {

    console.log(
      "Groq Error:",
      err
    );

    return {

      reply:
        `
• Suggested shortname: smart-link
• Category: Productivity
• Tip: Use custom aliases
        `,

      image:
        getSuggestedImage(
          prompt
        ),

    };
  }
};

module.exports = askAI;