// this file is for GraphQL
// module
const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// db
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);
// run app
const app = express();
const PORT = 4000;
const create_sql = `
    CREATE TABLE if not exists posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255),
        content TEXT,
        author VARCHAR(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );


    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        postId INTEGER,
        FOREIGN KEY(postId) REFERENCES posts(id)
        );
`;

db.exec(create_sql);

const schema = buildSchema(`
    type Post {
    id: ID!
    title: String
    content: String
    author: String
    createdAt: String
    }

    type Query {
        getPosts: [Post]
    }
    `);

// resolver
const root = {
  getPosts: () => {
    const stmt = db.prepare(`select * from posts`);
    return stmt.all();
  },
};

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

// run server
app.listen(PORT);
