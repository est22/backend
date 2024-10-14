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
app.get("/posts", (req, res) => {});
// 2. GET /posts/1 게시글 상세
app.get("/posts/:id", (req, res) => {});
// 3. POST /posts 게시글 쓰기
app.post("/posts", (req, res) => {});
// 4. PUT /posts/1 게시글 수정
app.put("/posts/:id", (req, res) => {});
// 5. DELETE /posts/1 게시글 삭제
app.delete("/posts/:id", (req, res) => { });


app.listen(PORT, () => {
  console.log(`server list listening on port ${PORT}...`);
});
