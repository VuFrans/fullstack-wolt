import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function FilterBar(props) {
  const {
    tags,
    removeFilters,
    filterRestaurantsByTags,
    handleOpen,
    open,
    selected,
    setSelected,
  } = props;

  return (
    <>
      {selected.length <= 0 ? (
        <Button variant="outlined" size="large" onClick={handleOpen}>
          Suodattimet
        </Button>
      ) : (
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
        <DialogTitle id="form-dialog-title">Ruokatyylit</DialogTitle>
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
    </>
  );
}
