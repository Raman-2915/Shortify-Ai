const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({

    host:
      "smtp-relay.brevo.com",

    port: 587,

    secure: false,

    auth: {

      user:
        process.env.BREVO_USER,

      pass:
        process.env.BREVO_PASS,

    },

  });

const sendMail = async (
  to,
  subject,
  html
) => {

  try {

    const info =
      await transporter.sendMail({

        from:
          process.env.BREVO_SENDER,

        to,

        subject,

        html,

      });

    console.log(
      "Email sent:",
      info.response
    );

    return true;

  } catch (err) {

    console.log(
      "MAIL ERROR:",
      err
    );

    return false;
  }
};

module.exports = sendMail;