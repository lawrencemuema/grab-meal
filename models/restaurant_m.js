const Sequelize = require('sequelize');
const db = require('../config/db');

//define the model
const Restaurant = db.define('grab_restaurants', {
    rest_id:{
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
    delivery_cost:{
        type:Sequelize.STRING,
        allowNull:true
    },
    open_time:{
        type:Sequelize.STRING,
        allowNull:false
    },
    createdAt:{
        type:Sequelize.DATE,
        allowNull:true
    },
    updatedAt:{
        type:Sequelize.DATE,
        allowNull:true
    },
});

module.exports = Restaurant;
