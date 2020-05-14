const express = require('express');
const router = new express.Router();
const restaurantService = require('../services/restaurant');

router.get('/restaurants', (req, res) => {
  res.status(200).send(restaurantService.getAllRestaurants());
});

router.get('/restaurants/tags', (req, res) => {
  res.status(200).send(restaurantService.getAllRestaurantsTags());
});

module.exports = router;
