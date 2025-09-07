const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const signupControllers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ msg: "Signup successful", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ msg: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const forgotPasswordControllers = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User not found with that email" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"HabitLeaf Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - HabitLeaf",
      html: `
  <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:30px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background:linear-gradient(90deg,#16a34a,#22c55e); padding:20px; text-align:center;">
        <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:600;">🌱 HabitLeaf</h1>
      </div>

      <!-- Body -->
      <div style="padding:30px; color:#374151;">
        <h2 style="margin-top:0; font-size:20px; color:#111827;">Password Reset Request</h2>
        <p style="font-size:15px; line-height:1.6;">Hello <b>${user.name}</b>,</p>
        <p style="font-size:15px; line-height:1.6;">
          We received a request to reset your HabitLeaf account password.  
          If this was you, click the button below to set a new password:
        </p>
        
        <!-- Button -->
        <div style="text-align:center; margin:30px 0;">
          <a href="${resetUrl}" 
            style="background-color:#16a34a; color:#ffffff; padding:12px 28px; border-radius:6px; text-decoration:none; font-weight:600; font-size:15px; display:inline-block;">
            Reset Password
          </a>
        </div>
        
        <p style="font-size:14px; line-height:1.6; color:#6b7280;">
          ⚠️ This link will expire in <b>1 hour</b>.  
          If you didn’t request this, please ignore this email.
        </p>
        
        <p style="font-size:14px; margin-top:25px;">Best regards, <br/>🌿 The HabitLeaf Team</p>
      </div>

      <!-- Footer -->
      <div style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
        © ${new Date().getFullYear()} HabitLeaf, Inc. All rights reserved.  
        <br/>
        Need help? <a href="mailto:support@habitleaf.com" style="color:#16a34a; text-decoration:none;">Contact Support</a>
      </div>
    </div>
  </div>
  `,
    };



    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ msg: "Failed to send email" });
      }
      res.json({ msg: "Reset link sent to your email" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const resetPasswordControllers = async (req, res) => {
  try {
    const resetPassToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetPassToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  signupControllers,
  loginControllers,
  forgotPasswordControllers,
  resetPasswordControllers,
};
