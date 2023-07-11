const Sequelize = require('sequelize');
const db = require('../config/db');
const MenuItem = require('./menu_item_m');

//define the model
const Restaurant = db.define('grab_restaurants', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    restaurant:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    location:{
        type:Sequelize.STRING,
        allowNull:true
    },
    banner:{
        type:Sequelize.STRING,
        allowNull:true
    },
    phone_number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    open_time:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    createdAt:{
        type:Sequelize.DATE,
        allowNull:false
    },
    updatedAt:{
        type:Sequelize.DATE,
        allowNull:false
    },
});

//association with menu item
Restaurant.hasMany(MenuItem);

module.exports = Restaurant;
