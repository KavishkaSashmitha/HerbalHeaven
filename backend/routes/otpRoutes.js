const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store generated OTPs
const otpMap = new Map();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kavivlogs20@gmail.com',
    pass: 'bfax smpm bvkb uhot',
  },
});

// Route for sending OTP via email
router.post('/send-otp', (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();

    // Send OTP via email
    const mailOptions = {
      from: 'kavivlogs20@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
      } else {
        // Store OTP in map with email as key
        otpMap.set(email, otp);
        res.json({ success: true, message: 'OTP sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route for verifying OTP
router.post('/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otpMap.has(email)) {
      res
        .status(400)
        .json({ success: false, message: 'OTP not found or expired' });
      return;
    }

    const storedOTP = otpMap.get(email);

    if (otp === storedOTP) {
      // OTP verification successful
      otpMap.delete(email); // Remove OTP from map after successful verification
      res.json({ success: true, message: 'OTP verification successful' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
