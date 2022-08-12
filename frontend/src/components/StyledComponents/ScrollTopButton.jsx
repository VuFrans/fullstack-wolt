import React from 'react';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

export default function ScrollTopButton() {
  return (
    <Fab
      style={{
        margin: 0,
        right: '2em',
        bottom: '3em',
        position: 'fixed',
      }}
      variant="extended"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <NavigationIcon />
    </Fab>
  );
}
