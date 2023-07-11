const express = require('express');
const router = express.Router();
const { Order, OrderDetail, Customer } = require('../models'); 

// Create a new order for a customer
router.post('/customers/:customerId/orders', async (req, res) => {
  const { customerId } = req.params;
  const { delivery_address, phone_number, order_status, order_details } = req.body;

  try {
    // Check if the customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    // Create the order
    const order = await Order.create({
      delivery_address,
      phone_number,
      order_status,
      CustomerId: customerId,
    });

    // Create the order details
    for (const orderDetail of order_details) {
      await OrderDetail.create({
        menu_item_name: orderDetail.menu_item_name,
        quantity: orderDetail.quantity,
        price: orderDetail.price,
        category: orderDetail.category,
        OrderId: order.id,
      });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders for a customer
router.get('/customers/:customerId/orders', async (req, res) => {
  const { customerId } = req.params;

  try {
    // Check if the customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    // Get all orders for the customer
    const orders = await Order.findAll({ where: { CustomerId: customerId } });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    // Get all orders
    const orders = await Order.findAll();

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// Get order details for a specific order
router.get('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    // Check if the order exists
    const order = await Order.findByPk(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // Get the order details for the order
    const orderDetails = await OrderDetail.findAll({ where: { OrderId: orderId } });

    res.json({ orderDetails });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order details' });
  }
});

// Update order
router.put('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { delivery_address, phone_number, order_status } = req.body;

  try {
    // Check if the order exists
    const order = await Order.findByPk(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // Update the order
    await Order.update(
      {
        delivery_address,
        phone_number,
        order_status,
      },
      { where: { id: orderId } }
    );

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Delete order
router.delete('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    // Check if the order exists
    const order = await Order.findByPk(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // Delete the order
    await Order.destroy({ where: { id: orderId } });

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
