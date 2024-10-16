const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  /** create table Comment(
   *    id INTEGER primary key autoincrement,
   *    content TEXT,
   *    postId INTEGER,
   *    FOREIGN KEY (postId) references Posts(id)
   * )
   **/
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.STRING,
  });
  Comment.associate = function (models) {
    models.Comment.belongsTo(models.Post);
  };
  return Comment;
};
