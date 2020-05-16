const queryValidator = (field) => {
  const values = ['q', 'lat', 'lon'];

  return (req, res, next) => {
    let invalidQuery = false;
    const queryArray = Object.keys(req.query);

    for (let key in queryArray) {
      console.log('GOES TO FOR');
      if (!values.includes(queryArray[key])) {
        console.log('Invalid query');
        invalidQuery = true;
        break;
      }
    }

    if (invalidQuery) {
      const err = new Error('INVALID QUERY PARAMETERS');
      err.statusCode = 400;
      next(err);
    } else {
      console.log('GOES NEXT');
      next();
    }
  };
};

module.exports = queryValidator;
