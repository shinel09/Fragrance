import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// create nodemailer transporter
const transporter = nodemailer.createTransport({
   host: "smtp-relay.brevo.com",
   port: 587,
   secure: false,
   auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.SMTP_KEY,
   }
})
// sendEmail Function
export const sendEmail = async (to,subject, msg)=>{
   const mailOptions ={
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    text: msg,
    html: `<body>
         <h2>${subject}</h2>
         <p>${msg}!</p>
         <b>Please enjoy your patronage</b>
    </body>`
   }
   

   try {
    await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${to}`);
   } catch (err) {
    console.log("Error sending email", err.message);
   }
}


// sendEmail using the transporter