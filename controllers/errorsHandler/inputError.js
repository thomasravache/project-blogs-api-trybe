module.exports = (err, _req, res, next) => {
  if (err.isJoi) {
    // console.log(err);
    const { details } = err;
    const { message } = details[0];

    return res.status(400).json({ message });
  }

  return next(err);
};
