const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  /** create table Comment(
   *    id INTEGER primary key autoincrement,
   *    title TEXT not null,
   * )
   *
   *
   **/
  const Comment = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: DataTypes.STRING,
    },
  );
  return Comment;
};
