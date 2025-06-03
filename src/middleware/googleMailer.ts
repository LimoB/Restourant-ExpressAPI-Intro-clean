import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter once and reuse it
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendNotificationEmail = async (
  email: string,
  fullName: string,
  subject: string,
  message: string
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: subject,
      text: `${message}\n`,
      html: `
        <html>
          <head>
            <style>
              .email-container {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 5px;
              }
              .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #28a745;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
              }
              .btn:hover {
                background-color: #218838;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <h2>${subject}</h2>
              <p>Hello, ${fullName},</p>
              <p>${message}</p>
              <p>Enjoy Our Services!</p>
            </div>
          </body>
        </html>`,
    };

    const mailRes = await transporter.sendMail(mailOptions);

    if (mailRes.accepted.length > 0) {
      return "Notification email sent successfully";
    } else if (mailRes.rejected.length > 0) {
      return "Notification email not sent, please try again";
    } else {
      return "Email server error";
    }
  } catch (error) {
    console.error("Email sending error:", error);
    return "Email server error";
  }
};
