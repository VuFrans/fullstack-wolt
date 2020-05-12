const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());

app.listen(port, () =>
  console.log(`Backend started, listening to port ${port}`)
);
