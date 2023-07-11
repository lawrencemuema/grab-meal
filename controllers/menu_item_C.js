const express = require('express');
const router = express.Router();
const { MenuItem,Restaurant } = require('../models');

// Get all menu items
router.get('/menu_items', async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve menu items' });
  }
});

// Get a specific menu item by ID
router.get('/menu_items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve menu item' });
  }
});

// Update a menu item
router.put('/menu_items/:id', async (req, res) => {
  const { id } = req.params;
  const { item_name, delivery_time, price, ratings, offers, category } = req.body;
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (menuItem) {
      menuItem.item_name = item_name;
      menuItem.delivery_time = delivery_time;
      menuItem.price = price;
      menuItem.ratings = ratings;
      menuItem.offers = offers;
      menuItem.category = category;
      await menuItem.save();
      res.json(menuItem);
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Delete a menu item
router.delete('/menu_items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (menuItem) {
      await menuItem.destroy();
      res.json({ message: 'Menu item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

// Create a menu item
router.post('/create_menu_items', async (req, res) => {
    //category is fast food, restaurant or liquor, if it is restaurant, you need to add restaurant id from Restaurant model/table
    const { item_name, delivery_time, price, ratings, offers, category, RestaurantId } = req.body;
    try {
        const newMenuItem = await MenuItem.create({
            item_name,
            delivery_time,
            price,
            ratings,
            offers,
            category,
            RestaurantId
        });
        res.json(newMenuItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create menu item' });
    }
});

// menu item by category
router.get('/menu_items/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const menuItem = await MenuItem.findAll({ where: { category: category } });
        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ error: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve menu item' });
    }
});

// menu item by restaurant id
router.get('/menu_items/:RestaurantId', async (req, res) => {
    const { RestaurantId } = req.params;
    try {
        const menuItem = await MenuItem.findAll({ where: { RestaurantId: RestaurantId } });
        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ error: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve menu item' });
    }
});


    
module.exports = router;
