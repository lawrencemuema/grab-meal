const Restaurant = require('../models/restaurant_m');

//get all restaurants
exports.getAllRestaurants = (req, res) => {
    Restaurant.findAll()
        .then(restaurants => {
            res.status(200).json(restaurants);
        })
        .catch(err => {
            res.status(400).send('Error: ' + err);
        })
}

//get a restaurant by id

exports.getRestaurantById = (req, res) => {
    Restaurant.findByPk(req.params.id)
        .then(restaurant => {
            res.status(200).json(restaurant);
        })
        .catch(err => {
            res.status(400).send('Error: ' + err);
        })
}

//add a restaurant
exports.addRestaurant = (req, res) => {
    Restaurant.create(req.body)
        .then(restaurant => {
            res.status(200).json(restaurant);
        })
        .catch(err => {
            res.status(400).send('Error: ' + err);
        })
}

//update a restaurant
exports.updateRestaurant = (req, res) => {
    Restaurant.update(req.body, {
            where: {
                rest_id: req.params.id
            }
        })
        .then(restaurant => {
            res.status(200).json(restaurant);
        })
        .catch(err => {
            res.status(400).send('Error: ' + err);
        })
}

//delete a restaurant
exports.deleteRestaurant = (req, res) => {
    Restaurant.destroy({
            where: {
                rest_id: req.params.id
            }
        })
        .then(restaurant => {
            res.status(200).json(restaurant);
        })
        .catch(err => {
            res.status(400).send('Error: ' + err);
        })
}

//get all restaurants by location
exports.getRestaurantByLocation = (req, res) => {
    Restaurant.findAll({
            where: {
                location: req.params.location
            }
        })
        .then(restaurants => {
            res.status(200).json(restaurants);
        })
        .catch(err => {
            res.status(400).send('Error: ' + err);
        })
}

module.exports = exports;



