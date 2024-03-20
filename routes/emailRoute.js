const express = require("express");
const router = express.Router();
const User = require("../models/user");
const EmailService = require("../services/EmailService");
const Otp = require("../models/otp");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getPasswordResetEmailContent(otp) {
  return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Password Reset OTP</h2>
            </div>
            <div class="content">
              <p>Your OTP for password reset is: <strong>${otp}</strong></p>
              <p>This OTP will expire in 10 minutes.</p>
            </div>
            <div class="footer">
              <p>If you didn't request this password reset, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
}

router.post("/otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const existingOTP = await Otp.findOne({ email });
    if (existingOTP && existingOTP.expiredAt > new Date()) {
      return res
        .status(400)
        .json({ error: "An active OTP already exists for this user" });
    }

    const otp = generateOTP();

    const otpDocument = new Otp({
      email,
      otp,
      expiredAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await otpDocument.save();

    const emailContent = getPasswordResetEmailContent(otp);
    await EmailService.sendOTP(user, emailContent);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error generating and sending OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/otpcheck", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpDocument = await Otp.findOne({ email, otp });

    if (!otpDocument) {
      return res.status(400).json({ error: "Invalid OTP or email" });
    }

    if (otpDocument.expiredAt < new Date()) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
