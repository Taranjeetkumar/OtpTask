const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../utils/database');
const User = sequelize.define('verify',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:true
        },
        unique:true
    },

    verification:{
        type:DataTypes.INTEGER,
        validate:{
        isNumeric:true,
        len:6
        }
    },
    active:{
        type:DataTypes.STRING,
        validate:{
        
        }
    }
})

module.exports = User;