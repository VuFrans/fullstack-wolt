const express = require('express');
const router = new express.Router();
const restaurantService = require('../services/restaurant');

router.get('/restaurants', (req, res) => {
  res.status(200).send(restaurantService.getAllRestaurants());
});

module.exports = router;
