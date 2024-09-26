const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

// list
app.get("/list", (req, res) => {
  list(req, res);
});

// view
app.get("/view/:id", (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  const posts = result["result"];
  let post = {}; // post 객체 선언 (id에 해당하는 데이터를 담을 변수)

  posts.forEach((item) => {
    if (item.id == id) {
      post = item;
    }
  });
  res.json(post);
});

const list = (req, res) => {
  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  res.json(result); // 바로 json으로 변환
};

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
