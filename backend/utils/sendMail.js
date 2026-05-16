const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,

    },

  });

const sendMail = async (
  to,
  subject,
  html
) => {

  try {

    // VERIFY SMTP
    await transporter.verify();

    console.log(
      "SMTP Connected Successfully"
    );

    const info =
      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

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
      "FULL MAIL ERROR:",
      err
    );

    return false;
  }
};

module.exports = sendMail;