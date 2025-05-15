const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `Please click <a href="${verificationUrl}">here</a> to verify your email.`
  });
};

const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `Please click <a href="${resetUrl}">here</a> to reset your password.`
  });
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };