const express = require("express");
const { graphqlHTTP } = require("express-graphql"); // middleware: 중간에서 request-response를 조작해주는 역할
const { buildSchema } = require("graphql"); // schema: 데이터 형태 정의

// GraphQL schema 정의
const schema = buildSchema(`
    type Query {
        hello: String
        welcome(name: String!): String
    }
    `);

// 리졸버 생성
const root = {
  hello: () => {
    return "Hello GraphQL!";
  },
  welcome: ({ name }) => {
    return `Welcome ${name}`;
  },
};

// 스키마에 리졸버 할당
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);
