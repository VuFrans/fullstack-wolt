import React from 'react';
import HomePage from './components/HomePage/HomePage.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route render={() => <HomePage />} />
      </Switch>
    </BrowserRouter>
  );
}
