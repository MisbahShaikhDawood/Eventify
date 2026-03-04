const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Temporary storage for OTP
const otpStore = {};

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',      // replace with your Gmail
    pass: 'your-app-password'          // generate App Password from Gmail
  }
});

// Send OTP endpoint
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Email required');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP for Eventify',
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending email:', err);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.json({ message: 'OTP sent successfully' });
  });
});

// Verify OTP endpoint
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email]; // remove OTP after verification
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});