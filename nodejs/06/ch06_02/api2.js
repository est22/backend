const express = require("express");
const moment = require("moment");
const path = require("path");
const Database = require("better-sqlite3");

// DB setting
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;
app.use(express.json()); // json 미들웨어 설정

const create_sql = `
    CREATE TABLE if not exists posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255),
        content TEXT,
        author VARCHAR(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );
`;

db.exec(create_sql);

// 1. GET /posts 게시글 목록
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5; // 한페이지 당 5개 글만 볼것이다
  const offset = (page - 1) * limit; // page = 2일 경우, offset => 5
  let sql = `
    SELECT id, title, author, createdAt, count FROM posts
    ORDER BY createdAt DESC limit ? offset ?
    `;
  const stmt = db.prepare(sql);
  const rows = stmt.all(limit, offset);
  res.json({ item: rows });
});

// 3. POST /posts 게시글 쓰기
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;

  let sql = `INSERT INTO posts(title, content, author) values (?,?,?)`;
  const stmt = db.prepare(sql);
  const result = stmt.run(title, content, author);
  console.log(`${JSON.stringify(result)}`); // debug
  res
    .status(201)
    .json({ id: result.lastInsertRowid, title: title, content: content });
});

// 2. GET /posts/1 게시글 상세
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `SELECT id, title, content, author, createdAt, count FROM posts WHERE id = ?`;
  let count_sql = `UPDATE posts SET count = count + 1 WHERE id = ?`;
  db.prepare(count_sql).run(id); // method chaining
  // const stmt = db.prepare(count_sql)
  // stmt.run(id)
  const post = db.prepare(sql).get(id);
  res.status(200).json({ item: post });
});

// 4. PUT /posts/1 게시글 수정
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `
    UPDATE posts set title = ?, content = ? where id = ?`;
  try {
    const result = db.prepare(sql).run(title, content, id);
    console.log(`result => ${JSON.stringify(result)}`);
    if (result.changes) {
      res.status(200).json({ result: "success" });
    } else {
      res.status(404).json({ error: "post is not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});



app.listen(PORT, () => {
  console.log(`server list listening on port ${PORT}...`);
});
