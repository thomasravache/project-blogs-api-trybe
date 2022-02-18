const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const payload = jwt.verify(token, JWT_SECRET, { algorithms: 'HS256' }); // aqui ocorre a autenticação se não conseguir autenticar lança um erro

    const user = await User.findOne({ where: { email: payload.sub } });

    if (!user) return res.status(401).json({ message: 'Erro ao encontrar usuário do token' });

    req.user = user.dataValues;

    return next(); // passa a responsabilidade para o próximo middleware
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
