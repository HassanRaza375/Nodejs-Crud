const express = require("express");
const { Blog } = require("../models/blogs");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

// Create a new blog
router.post("/", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Extracted from JWT token

  try {
    const blog = await Blog.create({ title, content, author_id: userId });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve blogs" });
  }
});

// Get blogs by logged-in user
router.get("/my-blogs", authenticateToken, async (req, res) => {
  try {
    const blogs = await Blog.findAll({ where: { author_id: req.user.id } });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve your blogs" });
  }
});

module.exports = router;
