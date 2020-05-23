import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/HomePage.css';
import TextField from '@material-ui/core/TextField';
import Fab from './ScrollTopButton';
import FilterBar from './FilterBar';
import { Button } from '@material-ui/core';

export default function HomePage() {
  let baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api'
      : '/api';

  const [state, setState] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getRestaurants();
    getRestaurantsTags();
  }, []);

  const getRestaurants = async () => {
    const response = await axios.get(`${baseUrl}/restaurants`);
    const data = response.data;
    setState(data);
    setRestaurants(data);
  };

  const filterRestaurants = (value) => {
    const hasValue = value.trim();

    if (hasValue) {
      const filteredRestaurants = state.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(value.toLowerCase())
      );
      setState(filteredRestaurants);
    } else {
      setState(restaurants);
    }
  };

  const filterRestaurantsByTags = () => {
    const filterTag = state.filter((restaurant) =>
      selected.some((tag) => restaurant.tags.includes(tag))
    );
    setState(filterTag);
    handleClose();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const getRestaurantsTags = async () => {
    const response = await axios.get(`${baseUrl}/restaurants/tags`);
    const data = response.data;
    setTags(data);
  };

  const removeFilters = () => {
    setState(restaurants);
    setSelected([]);
    handleClose();
  };

  const getNearbyRestaurants = () => {
    setSelected([]);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const response = await axios.get(
        `${baseUrl}/search?q&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );
      const data = response.data;
      setState(data);
    });
  };

  const getAllRestaurants = (
    <Button variant="outlined" size="large" onClick={removeFilters}>
      Näytä kaikki ravintolat
    </Button>
  );
  return (
    <div className="root">
      <div className="header">
        <h1>New Wolt</h1>
        <div className="search-bar">
          <Button onClick={getNearbyRestaurants}>HAE LÄHELTÄ (3KM)</Button>
          <TextField
            size="small"
            type="text"
            id="outlined-basic"
            label="Hae ravintola"
            variant="outlined"
            onChange={(event) => filterRestaurants(event.target.value)}
          />
          <FilterBar
            tags={tags}
            removeFilters={removeFilters}
            filterRestaurantsByTags={filterRestaurantsByTags}
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
      <div className="grid-container">
        {state.length === 0 ? (
          <>
            <h1>Läheltäsi ei löydy ravintoloita</h1>
            {getAllRestaurants}
          </>
        ) : (
          state !== restaurants && getAllRestaurants
        )}
        {state.map((restaurant, i) => (
          <Card key={i} restaurant={restaurant} />
        ))}
      </div>
      <Fab />
    </div>
  );
}
