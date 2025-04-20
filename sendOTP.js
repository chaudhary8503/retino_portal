// Import necessary modules
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
require('dotenv').config();  // For environment variables

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Use default credentials
});

// Create a transporter for Gmail's SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your Gmail address
        pass: process.env.EMAIL_PASS   // Your Gmail app-specific password or OAuth2 token
    }
});

// Function to generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);  // 6-digit OTP
}

// Function to send OTP to a user's login email fetched from Firebase Authentication
async function sendOTPToLoginEmail(uid) {
    try {
        // Fetch user details from Firebase Authentication using UID
        const userRecord = await admin.auth().getUser(uid);
        const loginEmail = userRecord.email;

        // Generate OTP
        const otp = generateOTP();

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_USER,  // Sender's email address
            to: loginEmail,                // The login email from Firebase
            subject: 'Your OTP for Login',
            text: `Your OTP code for login is: ${otp}`
        };

        // Send OTP email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ success: false, message: 'Failed to send OTP.' });
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).json({ success: true, message: 'OTP sent successfully.' });
            }
          });          
    } catch (error) {
        console.log('Error fetching user:', error);
    }
}

// Example usage: Send OTP to user with UID
sendOTPToLoginEmail('user-uid');  // Replace with the UID of the user
