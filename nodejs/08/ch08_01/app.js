// sequelize 객체 생성
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "post.db",
});

// 모델 선언 (사용자 모델을 샘플로 생성) - create table User ()
`   create table User {
        username VARCHAR(100) not null,
        email VARCHAR(100)
    }
    
`
const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
})