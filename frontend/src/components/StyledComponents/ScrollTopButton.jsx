import React from 'react';

import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

export default function ScrollTopButton() {
  return (
    <Fab
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        bottom: '3em',
        margin: 0,
        position: 'fixed',
        right: '2em',
      }}
      variant="extended"
    >
      <NavigationIcon />
    </Fab>
  );
}
