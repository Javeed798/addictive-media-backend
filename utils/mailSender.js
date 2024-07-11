const nodemailer = require('nodemailer');
require("dotenv").config();

const sendMail = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let info = await transporter.sendMail({
      from: "Addictive Media - D Javeed Sharif",
      to: email, 
      subject: title,
      text: body
    });

    console.log(info);
    return info;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;