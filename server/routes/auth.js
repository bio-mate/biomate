// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/User");
const nodemailer = require("nodemailer"); // Import Nodemailer
const crypto = require("crypto"); // Import crypto for generating tokens

const router = express.Router();

// Existing validation schema
const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Forgot Password validation schema
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Signup route
router.post("/signup", async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, mobile, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("User already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, mobile, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({ token });
});

// Login route
router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Forgot Password route
router.post("/forgot-password", async (req, res) => {
  const { error } = forgotPasswordSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User does not exist.");

  // Generate a reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Set the token and expiration on the user (this assumes you have fields for this)
  user.resetToken = resetToken;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration
  await user.save();

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`; // Adjust port and path as needed

  // Send email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Click this link to reset your password: ${resetUrl}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Password reset link sent to your email.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email.");
  }
});

// Reset Password route
router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;

  // Find the user by the reset token
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiration: { $gt: Date.now() },
  });
  if (!user) return res.status(400).send("Invalid or expired token.");

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user password and clear the reset token
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  res.send("Password has been reset successfully.");
});

module.exports = router;
