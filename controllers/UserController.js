const express = require('express');
const { userSchema, validate } = require('./schemas');
const UserService = require('../services/UserService');

const userRouter = express.Router();

const create = async (req, res, next) => {
  const {
    displayName,
    email,
    password,
    image,
  } = req.body;

  try {
    validate(req.body, userSchema);
  
    const token = await UserService.create({ displayName, email, password, image });
  
    return res.status(201).json({ token });
  } catch (e) {
    return next(e);
  }
};

/* ROUTES */
userRouter.post('/', create);

module.exports = userRouter;
