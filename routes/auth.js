const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/sUser");
const authMiddleware = require('../middleware/auth')
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Signup Route
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ where: { email } });
      if (user) return res.status(400).json({ message: "User already exists" });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = await User.create({ name, email, password: hashedPassword });

      // Generate JWT
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "User registered successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
// Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      // Find user by email
      let user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      // Generate JWT
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
// Get all users
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, results: "not working working!!" });
  }
});
module.exports = router;
