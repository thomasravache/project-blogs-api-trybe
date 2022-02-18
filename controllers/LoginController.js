const express = require('express');
const LoginService = require('../services/LoginService');
const { loginSchema, validate } = require('./schemas');

const loginRouter = express.Router();

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    validate(req.body, loginSchema);

    const token = await LoginService.login({ email, password });

    return res.status(200).json({ token });
  } catch (e) {
    return next(e);
  }
};

/* ROUTES */
loginRouter.post('/', login);

module.exports = loginRouter;
