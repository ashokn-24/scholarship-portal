const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false,
  // tls: {
  //   ciphers: "SSLv3",
  // },
});

const sendEmail = async (to, { subject, html }) => {
  try {
    const result = await transporter.sendMail({
      sender: "IICO",
      to,
      subject,
      html,
    });

    console.log(`Successfully sent mail to ${result}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
