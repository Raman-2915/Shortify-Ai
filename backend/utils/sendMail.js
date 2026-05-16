const axios = require("axios");

const sendMail = async (
  to,
  subject,
  html
) => {

  try {

    await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {

        sender: {

          name: "Shortify AI",

          email:
            process.env.BREVO_SENDER,

        },

        to: [

          {
            email: to,
          },

        ],

        subject,

        htmlContent: html,

      },

      {

        headers: {

          "api-key":
            process.env.BREVO_API_KEY,

          "Content-Type":
            "application/json",

        },

      }

    );

    console.log(
      "Email sent successfully"
    );

    return true;

  } catch (err) {

    console.log(
      "BREVO API ERROR:",
      err.response?.data || err
    );

    return false;
  }
};

module.exports = sendMail;