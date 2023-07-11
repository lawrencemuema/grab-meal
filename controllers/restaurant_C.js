const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Restaurant } = require('../models');

//get all restaurants
router.get('/get-all-restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (error) {

        res.status(400).send('Error: ' + error);
    }
});
//get a restaurant by id
router.get('/get-restaurant-by-id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(400).send('Error: ' + error);
    }

});


//add a restaurant
router.post('/add-restaurant', async (req, res) => {
    const { restaurant, open_time, phone_number,email, password, banner } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newRestaurant = await Restaurant.create({
            restaurant,
            open_time,
            phone_number,
            email,
            password: hashedPassword,
            banner
        });
        res.json(newRestaurant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});


//update a restaurant
router.put('/update-restaurant/:id', async (req, res) => {
    const { id } = req.params;
    const { restaurant, open_time, phone_number,email, password, banner } = req.body;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }
        // ensure that one can update all fields or just a few
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedRestaurant = await Restaurant.update({
            restaurant,
            open_time,
            phone_number,
            email,
            password: hashedPassword,
            banner
        }, {
            where: {
                id: id
            }
        });
        res.json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update restaurant' });
    }
});


//delete a restaurant
router.delete('/delete-restaurant/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }
        await restaurant.destroy();
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
});

//get all restaurants by location
router.get('/get-all-restaurants-by-location/:location', async (req, res) => {
    const { location } = req.params;
    try {
        const restaurants = await Restaurant.findAll({ where: { location: location } });
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(400).send('Error: ' + error);
    }
});

//restaurant login
router.post('/restaurant-login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const restaurant = await Restaurant.findOne({ where: { email } });
        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, restaurant.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }
        res.json({ message: 'Restaurant logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});




module.exports = router;



