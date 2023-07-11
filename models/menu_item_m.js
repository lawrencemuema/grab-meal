// MenuItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Restaurant = require('./restaurant_m');
const OrderDetail = require('./order_detail_m');

const MenuItem = sequelize.define('grab_menuitems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  delivery_time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  delivery_cost: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  ratings: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  offers: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
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

MenuItem.belongsTo(Restaurant);
MenuItem.hasMany(OrderDetail); 

module.exports = MenuItem;
