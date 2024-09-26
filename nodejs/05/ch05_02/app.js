const express = require("express");
const { engine } = require("express-handlebars"); // 구조구문 할당: 많은 것들 중에서 필요한 것인 'engine'만 가지고 온다.

const app = express();
const PORT = 3000;

// handlebars 작업
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// router
app.get("/", (req, res) => {
  const data = {
    title: "첫번째 핸들바",
    message: "수염이 멋집니다,",
  };
    res.render("index",data);
});

// listen PORT
app.listen(PORT, () => {
  console.log(`${PORT} 웹 서버가 뜨고 있습니다.`);
});
