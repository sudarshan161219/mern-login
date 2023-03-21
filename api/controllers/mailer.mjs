import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.mjs";

//* https://ethereal.email/create
let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ENV.EMAIL, // generated ethereal user
    pass: ENV.PASSWORD, // generated ethereal password
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js",
  },
});

// * POST: http://localhost:8080/api/registerMail //
//? @param : {
//?  -->  "username": "example123",
//?  -->  "userEmail": "admin@123",
//?  -->  "text": "email Text",
//?  -->  "subjec": "email Subject",
//?  }
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;
  
  //$ body of the email
  let email = {
    body: {
      name: username,
      intro: text || "Hello, World!",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let emailBody = MailGenerator.generate(email);
  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "Signup Successful",
    html: emailBody,
  };
  //* send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((err) => res.status(500).send({ err }));
};
