
const Post = require("./Post")
//All this file is responsible for right now is importing the User model and exporting an object with it as a property.
const User = require('./User');
const Vote = require('./Vote')
//create associations
// This association creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is the user_id in the Post model.
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});
//belongsToMany allows both the post and user to access each other's info in the context of a vote
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
  });
  
  Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
  });

  Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Vote.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Vote, {
    foreignKey: 'post_id'
  });
  
module.exports = { User, Post };