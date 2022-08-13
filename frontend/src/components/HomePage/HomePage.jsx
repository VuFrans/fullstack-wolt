import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import Card from '../Card/Card.jsx';
import Fab from '../StyledComponents/ScrollTopButton';
import FilterBar from '../StyledComponents/FilterBar';
import { 
  getRestaurantsApi,
  getRestaurantsTagsApi,
  getNearbyRestaurantsApi,
} from '../../api/restaurants-api.js';

import './HomePage.css';

export const HomePage = () => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [renderedRestaurants, setRenderedRestaurants] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const hasRestaurants = renderedRestaurants?.length > 0;

  const resetRestaurantState = () => setRenderedRestaurants(restaurantsData);
  const toggleFilterModal = () => setIsFilterModalOpen(!isFilterModalOpen);

  const getRestaurants = async () => {
    const restaurants = await getRestaurantsApi();
    
    setRestaurantsData(restaurants);
    setRenderedRestaurants(restaurants);
  };

  const getRestaurantsTags = async () => {
    const restaurantTags = await getRestaurantsTagsApi();

    setTags(restaurantTags);
  };

  const getNearbyRestaurants = async () => {
    const nearbyRestaurants = await getNearbyRestaurantsApi();

    setSelectedTags([]);
    setRenderedRestaurants(nearbyRestaurants);
  };

  const filterRestaurants = (event) => {
    const { value } = event.target;
    const formattedValue = value.trim();

    if (formattedValue) {
      const copiedRestaurants = [...restaurantsData];
      const filteredRestaurants = copiedRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(value.toLowerCase())
      );

      setRenderedRestaurants(filteredRestaurants);
    } else {
      resetRestaurantState();
    }
  };

  const filterRestaurantsByTags = () => {
    const copiedRestaurants = [...restaurantsData];
    const filteredRestaurants = copiedRestaurants.filter((restaurant) =>
      selectedTags.some((tag) => restaurant.tags.includes(tag))
    );

    setRenderedRestaurants(filteredRestaurants);
    toggleFilterModal();
  };

  const cleanUpFunction = () => {
    setSelectedTags([]);
    setIsFilterModalOpen(false);
    resetRestaurantState();
  };

  const getAllRestaurantsButton = (
    <Button
      onClick={() => cleanUpFunction()}
      size="large"
      variant="outlined"
    >
      Näytä kaikki ravintolat
    </Button>
  );

  const displayAvailableRestaurants = () => {
    if (hasRestaurants) {
      return renderedRestaurants?.map((restaurant, i) => (
        <Card key={i} restaurant={restaurant} />
      ))
    }
  };

  useEffect(() => {
    getRestaurants();
    getRestaurantsTags();
  }, []);

  return (
    <div className="root">
      <div className="header">
        <h1>New Wolt</h1>
        <div className="search-bar">
          <Button onClick={getNearbyRestaurants}>
            HAE LÄHELTÄ (3KM)
          </Button>
          <TextField
            id="outlined-basic"
            label="Hae ravintola"
            onChange={filterRestaurants}
            size="small"
            type="text"
            variant="outlined"
          />
          <FilterBar
            cleanUpFunction={cleanUpFunction}
            filterRestaurantsByTags={filterRestaurantsByTags}
            handleOpen={toggleFilterModal}
            open={isFilterModalOpen}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            tags={tags}
          />
        </div>
      </div>
      <div className="grid-container">
        {hasRestaurants ? null : (
          <>
            <h1>Läheltäsi ei löydy ravintoloita</h1>
            {getAllRestaurantsButton}
          </>
        )}
        {displayAvailableRestaurants()}
      </div>
      <Fab />
    </div>
  );
}
