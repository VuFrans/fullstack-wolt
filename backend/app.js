const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const port = 8000;

app.use(cors());
app.use(morgan());

const restaurantApi = require('./api/restaurantAPI');

app.use('/api', restaurantApi);

app.listen(port, () =>
  console.log(`Backend started, listening to port ${port}`)
);
