const express = require("express");
const path = require("path");
const models = require("./models");

const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  console.log(`title:${title}`);
  const post = await models.Post.create({
    title: title,
    content: content,
    author: author,
  });
  res.status(201).json(post);
});

app.get("/posts", async (req, res) => {
  // select * from posts;
  const posts = await models.Post.findAll();
  res.json({ data: posts });
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (post) {
    res.status(200).json({ data: post });
  } else {
    res.status(404).json({ result: "post not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log(`DB connected`);
    })
    .catch((err) => {
      console.error(`DB error: ${err}`);
      process.exit();
    }); // 서버 내렸다 올라갈때마다 테이블 새로 생성되면 열받으니까 force: false
});
