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

app.listen(3000);
