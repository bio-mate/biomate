const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/User");
const nodemailer = require("nodemailer"); // Import Nodemailer
const crypto = require("crypto"); // Import crypto for generating tokens

const router = express.Router();

// Validation schemas
const signupSchema = Joi.object({
  name: Joi.string().required(),
  username :Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, mobile, password, confirmPassword, username } = req.body;

  // Validate input
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Ensure passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Normalize the email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email: normalizedEmail,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error during user creation:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email or password.");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send("Internal server error.");
  }
});

// Forgot Password route
router.post("/forgot-password", async (req, res) => {
  const { error } = forgotPasswordSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User does not exist.");

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `You requested a password reset. Click this link to reset your password: ${resetUrl}`,
    };

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

  // Validate the password
  if (!password || password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters long.");
  }

  try {
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
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
