const express = require("express");
const moment = require("moment");
const sqlite3 = require("sqlite3");
const path = require("path");

// DB setting
const db_name = path.join(__dirname, "post.db");
const db = new sqlite3.Database(db_name);

const app = express();
const PORT = 3000;
app.use(express.json());

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

db.serialize(() => {
  db.run(create_sql); // create post.db
});

// 1. GET /posts 게시글 목록
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5; // 한페이지 당 5개 글만 볼것이다
  const offset = (page - 1) * limit; // page = 2일 경우, offset => 5
  let sql = `
    SELECT id, title, author, createdAt, count FROM posts
    ORDER BY createdAt DESC limit ? offset ?
    `;
  db.all(sql, [limit, offset], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    } else {
      let cnt_sql = `SELECT count(1) as count FROM posts`;
      db.get(cnt_sql, (err1, row) => {
        if (err1) {
          console.error(err1.message);
          res.status(500).send(err1.message);
        } else {
          const total = row.count; // cnt_sql에 alias를 주어야 값을 가져올 수 있음
          const totalPages = Math.ceil(total / limit);
          res.json({ items: rows, currentPage: page, totalPages: totalPages });
        }
      });
    }
  });
});
// 2. GET /posts/1 게시글 상세
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `SELECT id, title, content, author, createdAt, count FROM posts WHERE id = ?`;
  let count_sql = `UPDATE posts SET count = count + 1 WHERE id = ?`;
  db.run(count_sql, [id], (err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    db.get(sql, [id], (err1, row) => {
      if (err1) {
        res.status(500).send(err1.message);
      }
      res.json({ item: row });
    });
  });
});

// 3. POST /posts 게시글 쓰기
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;

  let sql = `
        INSERT INTO posts(title, content, author) values (?,?,?)
        `;

  db.run(sql, [title, content, author], (err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    console.log(`row id: ${this.lastID}`);
    res.json({ result: "success", id: this.lastID });
  });
});

// 4. PUT /posts/1 게시글 수정
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `
    UPDATE posts set title = ?, content = ? where id = ?`;
  db.run(sql, [title, content, id], (err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.json({ result: "success" });
  });
});
// 5. DELETE /posts/1 게시글 삭제
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `DELETE from posts where id = ?`;
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.json({ result: "success" });
  });
});

app.listen(PORT, () => {
  console.log(`server list listening on port ${PORT}...`);
});
