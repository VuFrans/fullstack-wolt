const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./errorHandlers/errorHandler');
const port = 8000;

app.use(cors());
app.use(morgan('dev'));

const restaurantApi = require('./api/restaurantAPI');

app.use('/api', restaurantApi);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Backend started, listening to port ${port}`)
);
