const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendMail = async (
  to,
  subject,
  html
) => {

  try {

    await resend.emails.send({

      from:
        "onboarding@resend.dev",

      to,

      subject,

      html,

    });

    console.log(
      "Email sent successfully"
    );

    return true;

  } catch (err) {

    console.log(
      "RESEND ERROR:",
      err
    );

    return false;
  }
};

module.exports = sendMail;