const handleError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res
      .status(500)
      .send({ message: err.message || 'На сервере произошла ошибка.' });
  }
  next();
};

export default handleError;