const errorHandler = (err, req, res, next) => {
  if (!err.statusCode || err.statusCode === 500) {
    res.status(500).send({ Error: 'Server error' });
  } else {
    res.status(err.statusCode).send({ Error: err.message });
  }
};

module.exports = errorHandler;
