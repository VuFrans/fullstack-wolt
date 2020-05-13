import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/HomePage.css';

export default function HomePage() {
  const URL = 'http://localhost:8000/api/restaurants';

  const [state, setState] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const response = await axios.get(URL);
    const data = response.data;
    setState(data);
  };

  return (
    <div className="root">
      <h1>Fullstack Project</h1>
      {state.map((restaurant, i) => (
        <Card key={i} restaurant={restaurant} />
      ))}
    </div>
  );
}
