// Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have set up the Sequelize instance
const User = require('./user_m');
const OrderDetail = require('./order_detail_m');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  delivery_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    },
    user_id: {
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

Order.hasMany(OrderDetail);
Order.belongsTo(User);

module.exports = Order;
