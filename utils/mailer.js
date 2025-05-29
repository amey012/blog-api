const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (to, name) => {
  await transporter.sendMail({
    from: `"Blog API" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to Blog API!",
    html: `<h2>Hello ${name},</h2><p>Thanks for registering on our platform!</p>`,
  });
};

module.exports = sendConfirmationEmail;
