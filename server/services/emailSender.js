import nodemailer from "nodemailer"

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(sender, textBody, name) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: sender, // sender address
    to: "contact@mosw.com", // list of receivers
    subject: "Message from " + name, // Subject line
    text: textBody, // plain text body
    html: `<b>${textBody}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return "Preview URL: %s", nodemailer.getTestMessageUrl(info)
}