const { generateToken } = require('../tokenHandler/tokenGenerator');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const jwtOptions = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const create = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  if (user !== null) throw new Error('User already registered');

  const { dataValues } = await User.create({ displayName, email, password, image });
  const newUser = dataValues;
  // console.log('dataValues', dataValues);

  const token = generateToken({ sub: newUser.email }, JWT_SECRET, jwtOptions);

  return token;
};

module.exports = {
  create,
};
