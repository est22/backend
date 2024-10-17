const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  /** create table Post(
   *    id INTEGER primary key autoincrement,
   *    title TEXT not null,
   * )
   *
   *
   **/
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      content: DataTypes.STRING,
      author: DataTypes.STRING(50),
      filename: DataTypes.STRING
    },
    {
      tableName: "Board", // optional. 없을 시 Post로 생성
    }
  );
  Post.associate = function (models) {
    Post.hasMany(models.Comment);
  };

  return Post;
};
