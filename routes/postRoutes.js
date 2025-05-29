const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const image = req.file?.path;

  try {
    const post = await Post.create({
      title,
      content,
      image,
      author: req.user.userId,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;