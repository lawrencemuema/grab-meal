const express = require('express');
const restaurantController = require('../controllers/restaurant_C');

const router = express.Router();

//routes
router.get('/getAll', restaurantController.getAllRestaurants);
router.get('/getOne/:id', restaurantController.getRestaurantById);
router.post('/register', restaurantController.addRestaurant);
router.put('/update/:id', restaurantController.updateRestaurant);
router.delete('/delete/:id', restaurantController.deleteRestaurant);

module.exports = router;