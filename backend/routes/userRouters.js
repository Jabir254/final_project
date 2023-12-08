const express = require("express");
const router = express.Router();
const User = require("../components/user/userModel");
const {
  generateToken,
  authenticateUser,
} = require("../components/auth/userAuthentication");

// @route   POST /api/users
// @desc    Register a new user
// @access  Public
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password,
    });

    // Save user to the database
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/users/me
// @desc    Get current user
// @access  Private
router.get("/me", authenticateUser, async (req, res) => {
  try {
    // Get user details excluding the password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
