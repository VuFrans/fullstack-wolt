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

exports.getDistanceFromRestaurants = (lat, lon, q) => {
  let restaurantsArray = [];

  restaurants.map((restaurant) => {
    const [lon2, lat2] = restaurant.location;
    if (getDistanceFromCoords(lat, lon, lat2, lon2) <= 3) {
      restaurantsArray.push(restaurant);
    }
  });

  let filteredArray = restaurantsArray.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(q.toLowerCase())
  );

  return q.length >= 1 ? filteredArray.sort() : restaurantsArray.sort();
};

const getDistanceFromCoords = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in kilometers
  const deg2rad = (deg) => deg * (Math.PI / 180);
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers

  return d.toFixed(2);
};
