const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const { canTreatArrayAsAnd } = require('sequelize/types/lib/utils');

//create our user model
class User extends Model {}

//define table columns and configurations

User.init(
    {
        // ID column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true
        }, 
        username: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true, 
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE 

        // pass in our imported sequelize connection
        sequelize, 
        // don't automatically create timestamp fields in the db
        timestamps: false,
        // don't pluralize the name of the database table
        freezeTableName: true, 
        // Use underscores instead of camelCasing
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;