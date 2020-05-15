import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/HomePage.css';
import TextField from '@material-ui/core/TextField';
import Fab from './ScrollTopButton';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function HomePage() {
  const URL = 'http://localhost:8000/api/restaurants';

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

  const filterRestaurantsByTags = () => {
    const filterTag = state.filter((restaurant) =>
      selected.some((tag) => restaurant.tags.includes(tag))
    );
    setState(filterTag);
    setOpen(false);
  };

  const handleClick = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const getRestaurantsTags = async () => {
    const response = await axios.get(`${URL}/tags`);
    const data = response.data;
    setTags(data);
  };

  const removeFilters = () => {
    setState(restaurants);
    setSelected([]);
    open && setOpen(false);
  };

  return (
    <div className="root">
      <div className="header">
        <h1>New Wolt</h1>
        <div className="search-bar">
          <TextField
            size="small"
            type="text"
            id="outlined-basic"
            label="Hae ravintola"
            variant="outlined"
            onChange={(event) => filterRestaurants(event.target.value)}
          />
          <Button variant="outlined" size="large" onClick={handleClick}>
            Suodattimet
          </Button>
          {selected.length > 0 && (
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={removeFilters}
            >
              Poista suodattimet
            </Button>
          )}
          <Dialog open={open} onClose={removeFilters} fullWidth="md">
            <DialogTitle id="form-dialog-title">{'Ruokatyylit'}</DialogTitle>
            <DialogContent>
              <FormControl>
                <FormGroup>
                  {tags.map((tag, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          name={tag}
                          onChange={() => setSelected([...selected, tag])}
                        />
                      }
                      label={tag}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={removeFilters} color="secondary">
                Peruuta
              </Button>
              <Button onClick={filterRestaurantsByTags} color="primary">
                Hae
              </Button>
            </DialogActions>
          </Dialog>
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
