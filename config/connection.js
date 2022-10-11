//This sets up the application to connect to the database using sequilize

// import the sequilize constructor from the library
const Sequelize  = require('sequelize');

require('dotenv').config();



//create connection to our database, pass in your MySQL info for username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
  
  module.exports = sequelize;
//This imports the base sequelize class and uses it to create a new connection to the db
//The sequelize function accepts the database name, MySQL username and password as parameters, then we also pass configuration setting. 
//Then we export the connection

