const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.sendMail = async (req, res) => {
  const { to, subject, text, html, attachments } = req.body;

  try {
    // Create mail options
    const to = 'kavindi@gmail.com';

    const mailOptions = {
      from: {
        name: 'Herbal Heaven',
        address: process.env.EMAIL,
      },
      to,
      subject,
      text,
      html,
      attachments,
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error });
  }
};
