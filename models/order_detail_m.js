// OrderDetail.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order_m');
const MenuItem = require('./menu_item_m');

const OrderDetail = sequelize.define('grab_orderdetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  menu_item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
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

OrderDetail.belongsTo(Order); // Establishing the association between OrderDetail and Order
//association with menu item
OrderDetail.hasMany(MenuItem);

module.exports = OrderDetail;
