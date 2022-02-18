const jwt = require('jsonwebtoken');

const generateToken = (payload, secret, options) => jwt.sign(payload, secret, options);

module.exports = {
  generateToken,
};
