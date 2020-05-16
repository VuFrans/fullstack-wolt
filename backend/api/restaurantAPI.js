const express = require('express');
const router = new express.Router();
const restaurantService = require('../services/restaurant');
const queryValidator = require('../errorHandlers/queryValidator');

router.get('/restaurants', (req, res) => {
  res.status(200).send(restaurantService.getAllRestaurants());
});

router.get('/restaurants/tags', (req, res) => {
  res.status(200).send(restaurantService.getAllRestaurantsTags());
});

router.get('/search', queryValidator(), (req, res, next) => {
  const { q, lat, lon } = req.query;

  if (lat && lon) {
    res
      .status(200)
      .send(restaurantService.getDistanceFromRestaurants(lat, lon, q));
  } else {
    const err = new Error('INVALID QUERY PARAMETERS');
    err.statusCode = 400;
    next(err);
  }
});

module.exports = router;
