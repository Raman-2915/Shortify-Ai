const nodemailer = require("nodemailer");

const sendMail = async (
  to,
  subject,
  html
) => {

  try {

    const transporter =
      nodemailer.createTransport({

        host: "smtp.gmail.com",

        port: 587,

        secure: false,

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },

      });

    const info =
      await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: to,

        subject: subject,

        html: html,

      });

    console.log(
      "Email sent:",
      info.response
    );

    // IMPORTANT
    return true;

  } catch (err) {

    console.log(
      "MAIL ERROR:",
      err.message
    );

    return false;
  }
};

module.exports = sendMail;