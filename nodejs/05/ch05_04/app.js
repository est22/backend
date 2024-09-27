const express = require("express");
const fs = require("fs");
const moment = require("moment");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/list", (req, res) => {
  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);

  res.render("list", { posts: result["result"] });
});

app.get("/view/:id", (req, res) => {
  const id = req.params.id;

  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  let post = {};
  const posts = result["result"];
  posts.forEach((item) => {
    if (item["id"] == id) {
      post = item;
    }
  });

  res.render("view", { post: post }); // 좌: 객체 프로퍼티 이름인 post // 우: post 라는 변수의 값
  // ejs에서 <%=post.[JSON 키값]%> 으로 접근
});

app.get("/create", (req, res) => {
  res.render("create");
});

let maxId = 0;
const initId = () => {
  const result = fs.readFileSync("test.json", "utf-8");
  const data = JSON.parse(result);
  const idList = data["result"].map((item) => parseInt(item.id));
  maxId = Math.max(...idList);
};

const getId = () => {
  return ++maxId;
};

initId();

app.use(express.urlencoded({ extended: true })); // form 태그로 전송된 데이터를 post로 전달가능

app.post("/create", (req, res) => {
  //   console.log(`/create post body: ${JSON.stringify(req.body)},${maxId}`);
  // req.body: [object Object]
  // JSON.stringify 하면: {"'title":"안녕하세요","author":"안리아","content":"불금입니다"}
  const result = fs.readFileSync("test.json", "utf-8");
  let data = JSON.parse(result);

  // const lastItem = data["result"].slice(-1); // last object array
  // const lastId = lastItem[0].id + 1; // last object element
  const lastId = getId();
  // console.log(`lastItem: ${lastItem},lastId: ${lastId}`)

  const createdAt = moment().format("YYYY-MM-DD");
  const newPost = {
    id: lastId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: createdAt,
  };

  data["result"].push(newPost);
  fs.writeFileSync("test.json", JSON.stringify(data), "utf-8");
  res.redirect("/list"); // redirect to list page
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;

  const result = fs.readFileSync("test.json", "utf-8");
  const data = JSON.parse(result);
  let post = {};
  data["result"].forEach((item) => {
    if (item.id == id) {
      post = item;
    }
  });

  res.render("edit", { post: post });
});

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;

  const result = fs.readFileSync("test.json", "utf-8");
  let data = JSON.parse(result);

  for (item of data["result"]) {
    if (item["id"] == id) {
      item["title"] = req.body.title;
      item["content"] = req.body.content;
      item["author"] = req.body.author;
    }
  }
  fs.writeFileSync("test.json", JSON.stringify(data), "utf-8");
  res.redirect(`/view/${id}`);
});

app.get("/remove/:id", (req, res) => {
  const id = req.params.id;

  const result = fs.readFileSync("test.json", "utf-8");
  let data = JSON.parse(result);

  let removed_idx = 0;
  data["result"].forEach((e, i) => {
    if (e["id"] == id) {
      removed_idx = i;
    }
  });
    data["result"].splice(removed_idx, 1); // remove 
    fs.writeFileSync('test.json', JSON.stringify(data), "utf-8");
    res.redirect('/list');
});

app.listen(PORT, (req, res) => {
  console.log(`게시판 서버를 시작합니다.`);
});
