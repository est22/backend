const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/facebook");

const db = mongoose.connection;
db.on("error", (err) => {
  console.error(`mongo connect error: ${err}`);
});
db.once("open", () => {
  console.log(`mongo connected successfully`);
});

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      comment: String,
      author: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);
const app = express();
app.use(express.json());

app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const post = new Post({
      title: title,
      content: content,
      author: author,
    });
    post.save();
    res.status(201).json({ data: post });
  } catch (e) {
    res.status(500).json({ error: error });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json({ data: posts });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.json({ data: post });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, {
      title,
      content,
    });
    res.status(200).json({ data: post });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({ data: post });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.listen(3000);
