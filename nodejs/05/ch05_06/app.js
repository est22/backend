const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();
const PORT = 3000;


app.set("view engine", "ejs");
app.use(express.static("public"));
// cookie and session assign middleWare
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// session setting
app.use(
  expressSession({
    secret: "sample",
    resave: true,
    saveUninitialized: true,
  })
);

const users = [
  { username: "admin", password: "admin1234" },
  { username: "test", password: "test1234" },
];

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/register", (req, res) => {
  res.render("register");
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const isUser = users.filter((item) => {
    return item.username == username && item.password == password;
  });
  if (isUser.length > 0) {
    // 아이디와 비밀번호가 일치하는 사용자가 있네요
    req.session.user = {
      username: username,
      authorized: true,
    };
    res.redirect("/home");
  } else {
    // 아이디와 비밀번호가 일치하는 사용자가 x
    res.redirect("/login");
  }
});

app.post("/register", (req, res) => {
  const { name, username, password } = req.body;
  const isUser = users.filter((x) => {
    // DB에서 회원 존재여부 확인 쿼리
    return x.username == username && x.password == password;
  });
  if (isUser.length > 0) {
    // 이미 회원이 존재
    res.status(401).send("이미 존재하는 아이디입니다");
  } else {
    // 회원가입 - 프로젝트에서는 회원테이블에 insert 로직이 들어가면 됨.
    users.push({
      username: username,
      password: password,
    });
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.user = null;
  }
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`${PORT}에서 웹서버 실행중...`);
});
