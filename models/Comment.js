const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    // columns will go here
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    post_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;