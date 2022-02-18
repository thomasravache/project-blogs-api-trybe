const express = require('express');
const { userSchema, validate } = require('./schemas');
const UserService = require('../services/UserService');
const authentication = require('../tokenHandler/authentication');

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

const getAll = async (_req, res) => {
  const users = await UserService.getAll();

  return res.status(200).json(users);
};

/* ROUTES */
userRouter.post('/', create);
userRouter.get('/', authentication, getAll);

module.exports = userRouter;
