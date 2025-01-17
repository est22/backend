const express = require("express");
const path = require("path");
const models = require("./models");
const multer = require("multer");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for file attachment
// directory for upload and download
app.use("/downloads", express.static(path.join(__dirname, "pulbic/uploads")));

const upload_dir = `public/uploads`;
const storage = multer.diskStorage({
  destination: `./${upload_dir}`, // ./public/uploads/
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  }, // test.png -> test-202410201010.png
});

// 위에서 설정한 파일을 storage로 보내주는 역할
const upload = multer({ storage: storage });

app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content, author } = req.body;
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`; // test-202410010101.png
  console.log(`title:${title}`);
  const post = await models.Post.create({
    title: title,
    content: content,
    author: author,
    filename: filename,
  });
  res.status(201).json(post);
});

app.get("/posts", async (req, res) => {
  // select * from posts;
  const posts = await models.Post.findAll({
    include: [{ model: models.Post }],
  });
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

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;
  if (post) {
    post.title = title;
    post.content = content;
    if (req.file) {
      post.filename = filename;
    }
    await post.save();
    res.status(200).json({ data: post });
  } else {
    res.status(404).json({ result: "post not found" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  // delete from posts;
  // 참고: models.Post.destroyAll() - 한줄씩 지울때
  // 참고: models.Post.truncate() - 통으로 날릴때
  const result = await models.Post.destroy({
    where: {
      id: req.params.id,
    },
  });
  console.log(`destroyed result: ${result}`);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ result: "post not found" });
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id; // Post의 ID
  const { content } = req.body;
  const comment = await models.Comment.create({
    PostId: postId,
    content: content,
  });
  res.status(201).json({ data: comment });
});

app.get("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  console.log(`postId: ${postId}`);
  const comments = await models.Comment.findAll({
    where: {
      PostId: postId, // 여기에 조건을 추가
    },
    include: [{ model: models.Post }], // 필요한 경우에만 추가
  });
  res.status(200).json({ data: comments });
});

app.put("/comments/:id", async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  const comment = await models.Comment.findByPk(id);
  if (comment) {
    comment.content = content;
    await comment.save();
    res.json({ data: comment });
  } else {
    res.status(404).json({ result: "comment is not found" });
  }
});

app.delete("/comments/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Comment.destroy({
    where: {
      id: id,
    },
  });
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ result: "comment not found" });
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
