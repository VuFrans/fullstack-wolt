import React from 'react';
import { 
  Button,
  Checkbox,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControl, 
  FormGroup, 
  FormControlLabel,
 } from '@material-ui/core';

export default function FilterBar(props) {
  const {
    cleanUpFunction,
    filterRestaurantsByTags,
    handleOpen,
    open,
    selectedTags,
    setSelectedTags,
    tags,
  } = props;
  
  const hasTags = tags?.length > 0;

  return (
    <>
      {selectedTags.length <= 0 ? (
        <Button
          onClick={handleOpen}
          size="large"
          variant="outlined"
        >
            Suodattimet
        </Button>
      ) : (
        <Button
          color="secondary"
          onClick={cleanUpFunction}
          size="large"
          variant="outlined"
        >
          Poista suodattimet
        </Button>
      )}
      <Dialog
        open={open}
        onClose={cleanUpFunction}
        fullWidth="md"
      >
        <DialogTitle id="form-dialog-title">
          Ruokatyylit
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <FormGroup>
              {hasTags ? tags?.map((tag, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      name={tag}
                      onChange={() => setSelectedTags([...selectedTags, tag])}
                    />
                  }
                  label={tag}
                />
              ))
            : null}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={cleanUpFunction}
          >
            Peruuta
          </Button>
          <Button 
            color="primary"
            onClick={filterRestaurantsByTags}
          >
            Hae
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
