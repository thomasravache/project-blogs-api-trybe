const statusCodes = {
  'User already registered': 409,
};

module.exports = (err, _req, res, next) => {
  if (err.message) {
    const statusCode = statusCodes[err.message] || 400;

    return res.status(statusCode).json({ message: err.message });
  }

  return next(err);
};
