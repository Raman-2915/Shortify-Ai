const pendingUsers = {};
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendMail = require("../utils/sendMail");


// SIGNUP
exports.signup = async (req, res) => {

  try {

    const {
      username,
      email,
      password,
    } = req.body;

    // VALIDATION
    if (
      !username ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // EMAIL REGEX
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // PASSWORD LENGTH
    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    // CHECK EXISTING USER
    const existing =
      await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // GENERATE OTP
    const otp =
      otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

    // STORE TEMP USER
    pendingUsers[email] = {
      username,
      email,
      password,
      otp,
      expires:
        Date.now() +
        5 * 60 * 1000,
    };

    // SEND EMAIL
    const mailSent =
      await sendMail(
        email,
        "Shortify Email Verification",
        `
          <h1>Your OTP: ${otp}</h1>
        `
      );

    if (!mailSent) {
      return res.status(500).json({
        message:
          "Failed to send OTP",
      });
    }

    res.json({
      message:
        "OTP sent successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Signup failed",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "User not found" });
  if (!user.verified) {
  return res.status(400).json({
    message:
      "Please verify your email first",
  });
}

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, username: user.username });
};

// VERIFY OTP
exports.verifyOtp = async (
  req,
  res
) => {

  try {

    const { email, otp } = req.body;

    const pending =
      pendingUsers[email];

    if (!pending) {
      return res.status(400).json({
        message:
          "No signup request found",
      });
    }

    // EXPIRE CHECK
    if (
      pending.expires < Date.now()
    ) {
      delete pendingUsers[email];

      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // OTP CHECK
    if (pending.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        pending.password,
        10
      );

    // CREATE USER
    await User.create({
      username: pending.username,
      email: pending.email,
      password: hashedPassword,
      verified: true,
    });

    // REMOVE TEMP DATA
    delete pendingUsers[email];

    res.json({
      message:
        "Email verified successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        "Verification failed",
    });
  }
};