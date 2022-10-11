const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


//create our Post model
class Post extends Model {}

//create fields/columns for Post model
Post.init(
    {
        //define the Post schema and identified id column as the primary key 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //defined title as a string
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //isURL set to true lets sequelize validate if it's a verified link
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        //references is to define the relationship between this post and the user
        //by creating a reference to the user model
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;