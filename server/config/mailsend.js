const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4a05e2ad10a38d",
    pass: "7431909242a71c",
  },
});
exports.varifyEmail = async (req, email) => {
  const token = jwt.sign({ email }, process.env.TOKEN_VERIFY);
  await transporter.sendMail({
    from: "deepakdutta752@gmail.com",
    to: email,
    subject: "Blogger",
    html: `<a href="http://${req.headers.host}/api/user/verify-email/${token}">Verify email</a>`,
  });
};
