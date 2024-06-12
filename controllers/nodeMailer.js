require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
          <li> Name: ${req.body.name}</li>
          <li> Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
      `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    let mailOptions = {
      from: "xmedicinepower@gmail.com",
      to: "xmedicinepower@gmail.com",
      subject: "New Message",
      text: req.body.message,
      html: htmlEmail
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log(res);
        res.status(200).send("Your Email has been successfully sent");
        console.log("Email En route!");
      }
    });
  });
};

module.exports = sendMail;
