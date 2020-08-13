const bcrypt = require('bcrypt');
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
        hooks: {
            // set up beforeCreateee lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData
            }    
        },
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