import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/HomePage.css';
import TextField from '@material-ui/core/TextField';
import Fab from './ScrollTopButton';

export default function HomePage() {
  const URL = 'http://localhost:8000/api/restaurants';

  const [state, setState] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const response = await axios.get(URL);
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

  return (
    <div className="root">
      <div className="header">
        <h1>Fullstack Project</h1>
        <div style={{ paddingTop: 20 }}>
          <TextField
            size="small"
            type="text"
            id="outlined-basic"
            label="Restaurant"
            variant="outlined"
            onChange={(event) => filterRestaurants(event.target.value)}
          />
        </div>
      </div>
      <div className="grid-container">
        {state.map((restaurant, i) => (
          <Card key={i} restaurant={restaurant} />
        ))}
      </div>
      <Fab />
    </div>
  );
}
