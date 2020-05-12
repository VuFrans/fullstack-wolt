import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';

export default function App() {
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
    <div className="App">
      <h1>Fullstack Project</h1>
      {state.map((restaurant, i) => (
        <div>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{ height: 200, width: 300 }}
          />
          <p>{restaurant.name}</p>
        </div>
      ))}
    </div>
  );
}
