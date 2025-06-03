import { ifError } from "assert";
import nodemailer from "nodemailer"


//create a test accaunt fro transporter
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
        user: 'alaina.heathcote@ethereal.email',
        pass: 'V43HAEgSSkfRcgmcdz'
    }
});


//call back function

// transporter.verify((success, error)=>{
//     if (error) {
//         console.log(error)
        
//     } else {
//         console.log('server is ready to take our messages')
//     }
// })


// Optional: Verify the transporter is ready
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

(async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Alaina Heathcote" <alaina.heathcote@ethereal.email>',
      to: "boazlimo07@gmail.com",
      subject: "Hello",
      text: "Hello from Node.js",
      html: "<p>Hello from Limo</p>",
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
})();