const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "application/json");

    // Check if the path is in urlMap
    if (path in urlMap) {
      urlMap[path](req, res);
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  })
  .listen(4500);

const home = (req, res) => {
  res.end("home");
};

const list = (req, res) => {
  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  const resStr = JSON.stringify(result);
  res.end(resStr);
};

const view = (req, res) => {
  const param = url.parse(req.url, true).query;
  console.log(param.id);
  const id = param.id;
  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data); // JS object가 담김
  const posts = result["result"];
  //   console.log(posts);
  //   posts.forEach((item) => {
  //     console.log(item.id);
  //   });
  const post = posts.filter((item) => {
    return item.id == id;
  });
  //   console.log(post);
  const postStr = JSON.stringify(post);
  res.end(postStr);
};

const write = (req, res) => {
  // title, content
  const param = url.parse(req.url, true).query;
  const title = param.title;
  const content = param.content;

  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  const posts = result["result"];
  posts.push({
    id: posts.length + 1,
    title: title,
    content: content,
  });
  console.log(posts);
  // 주소창에 http://localhost:4500/write?title=신규제목게시글이야&content=새로운게시글을추가하고싶어 하고 엔터
  //   { id: 11, title: '신규제목게시글이야', content: '새로운게시글을추가하고싶어' }
  const newData = {
    result: posts,
  };
  fs.writeFileSync("test.json", JSON.stringify(newData));
  res.end("");
};

const edit = (req, res) => {
  // title, content
  const param = url.parse(req.url, true).query;
  const id = param.id;
  const title = param.title;
  const content = param.content;

  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  const posts = result["result"];
  const newPosts = [];
  posts.forEach((item) => {
    if (item.id == id) {
      // 수정 로직을 넣습니다
      item.title = title;
      item.content = content;
      newPosts.push(item);
    } else {
      newPosts.push(item);
    }
  });
  console.log(newPosts);
  const newData = {
    result: newPosts,
  };

  fs.writeFileSync("test.json", JSON.stringify(newData));
  res.end("");
};

// http://localhost:4500/remove?id=3
const remove = (req, res) => {
  const param = url.parse(req.url, true).query;
  const id = param.id;
//   const title = param.title;
//   const content = param.content;

  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  const posts = result["result"];
    const newPosts = posts.filter(item => {
        return item.id != id;
    });
    
  const newData = {
    result: newPosts,
  };
    

  fs.writeFileSync("test.json", JSON.stringify(newData));
  res.end("");
};

const urlMap = {
  "/remove": remove,
  "/edit": edit,
  "/write": write,
  "/view": view,
  "/list": list,
  "/": home,
};
