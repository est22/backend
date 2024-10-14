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

app.listen(PORT, () => {
  console.log(`server list listening on port ${PORT}...`);
});
