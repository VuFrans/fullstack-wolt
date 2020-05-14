const { restaurants } = require('../assets/data/restaurants.json');

exports.getAllRestaurants = () => restaurants;

exports.getAllRestaurantsTags = () => {
  let tagsArray = [];

  restaurants.map((restaurant) => {
    tagsArray = [...tagsArray].concat(restaurant.tags);
  });

  const uniqueTagsArray = Array.from(new Set(tagsArray));

  return uniqueTagsArray.sort();
};
