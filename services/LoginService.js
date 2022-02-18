const { generateToken } = require('../tokenHandler/tokenGenerator');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const jwtOptions = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) throw new Error('Invalid fields');

  const token = generateToken({ sub: user.email }, JWT_SECRET, jwtOptions);

  return token;
};

module.exports = {
  login,
};
