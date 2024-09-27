const express = require("express");
const fs = require("fs");
const moment = require("moment");
const sqlite3 = require("sqlite3");
const path = require("path");

// DB setting
const db_name = path.join(__dirname, "post.db");
const db = new sqlite3.Database(db_name);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

const create_sql = `
  create table if not exists posts (
    id integer primary key autoincrement,
    title varchar(255),
    content text,
    author varchar(100),
    createdAt varchar(100),
    count integer default 0
  )
`;

db.serialize(() => {
  db.run(create_sql);
});

app.get("/list", (req, res) => {
  let sql = `select id, title, content, author, createdAt, count from posts order by 1 desc`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      console.log(JSON.stringify(rows));
      res.render("list", { posts: rows });
    }
  });
});

app.get("/view/:id", (req, res) => {
  const id = req.params.id;
  let sql = `select id, title, content, author, createdAt, count from posts where id = ${id}`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      const post = rows[0];
      res.render("view", { post: post });
    }
  });
});

// CREATE DB
app.get("/create", (req, res) => {
  res.render("create");
});

app.use(express.urlencoded({ extended: true })); //  data from <form> -> post

app.post("/create", (req, res) => {
  const createdAt = moment().format("YYYY-MM-DD");
  let sql = `insert into posts(title, content, author, createdAt)
  values('${req.body.title}','${req.body.content}','${req.body.author}', '${createdAt}')`;

  db.run(sql, (err) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/list");
    }
  });
});

//   data["result"].push(newPost);
//   fs.writeFileSync("test.json", JSON.stringify(data), "utf-8");
//   res.redirect("/list"); // redirect to list page
// });

// app.get("/edit/:id", (req, res) => {
//   const id = req.params.id;

//   const result = fs.readFileSync("test.json", "utf-8");
//   const data = JSON.parse(result);
//   let post = {};
//   data["result"].forEach((item) => {
//     if (item.id == id) {
//       post = item;
//     }
//   });

//   res.render("edit", { post: post });
// });

// app.post("/edit/:id", (req, res) => {
//   const id = req.params.id;

//   const result = fs.readFileSync("test.json", "utf-8");
//   let data = JSON.parse(result);

//   for (item of data["result"]) {
//     if (item["id"] == id) {
//       item["title"] = req.body.title;
//       item["content"] = req.body.content;
//       item["author"] = req.body.author;
//       item["count"] = item["count"] ? item["count"] : 0;
//     }
//   }
//   fs.writeFileSync("test.json", JSON.stringify(data), "utf-8");
//   res.redirect(`/view/${id}`);
// });

// app.get("/remove/:id", (req, res) => {
//   const id = req.params.id;

//   const result = fs.readFileSync("test.json", "utf-8");
//   let data = JSON.parse(result);

//   let removed_idx = 0;
//   data["result"].forEach((e, i) => {
//     if (e["id"] == id) {
//       removed_idx = i;
//     }
//   });
//   data["result"].splice(removed_idx, 1); // remove
//   fs.writeFileSync("test.json", JSON.stringify(data), "utf-8");
//   res.redirect("/list");
// });

app.listen(PORT, (req, res) => {
  console.log(`게시판 서버를 시작합니다.`);
});
