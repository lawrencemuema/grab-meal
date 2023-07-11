//review menu item
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const MenuItem = require('./menu_item_m');
const User = require('./user_m');

const Review = sequelize.define('grab_reviews', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:false
    },
});

Review.belongsTo(MenuItem);
Review.belongsTo(User);

module.exports = Review;



