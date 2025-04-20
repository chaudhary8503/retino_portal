const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Nodemailer transporter with Brevo SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

// Callable function to send OTP
exports.sendOTP = functions.https.onCall(async (data, context) => {
  const { email, otp } = data;

  const mailOptions = {
    from: process.env.BREVO_USER,
    to: email,
    subject: "Your Retino Portal OTP Code",
    text: `🔐 Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent successfully to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP." };
  }
});


