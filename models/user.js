const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create our user model
//This Model class is what we create our own models from using the extends keyword so User inherits all 
//of the functionality the Model class has.
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        //using 'this' lets us access this user's properties, including password, 
        //which was stored as a hashed string.
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and config
User.init(
    {
        //TABLE COLUMN DEFINITIONS GO HERE
        //define an id columns
        id: {
            //use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of sql's not null option
            allowNull: false,
            //instruct that this is the primary key
            primaryKey: true,
            //turn on autoincrement
            autoIncrement: true
        },
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table
            unique: true,
            //if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }

        },
        //define a password column
        passowrd: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        //The resulting hashed password is then passed to the Promise object as a newUserData object with a hashed password property.
        // The return statement then exits out of the function, returning the hashed password in the newUserData function.
        hooks: {
            //set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
        }
    },
    {
        //TABLE CONFIG OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        
        //don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing
        underscored: true,
        //make it so our model name stays lowecase in the database
        modelName: 'user'
    }
);

module.exports = User;
//1.create user class
//2.use .init() method to initialize the models data and config, passing two arguments as objects
