const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const create = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  if (user !== null) throw new Error('User already registered');

  const { dataValues } = await User.create({ displayName, email, password, image });
  console.log('dataValues', dataValues);

  const jwtOptions = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ sub: dataValues.displayName }, JWT_SECRET, jwtOptions);

  return token;
};

module.exports = {
  create,
};
