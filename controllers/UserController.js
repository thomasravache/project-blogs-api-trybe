const express = require('express');
const userSchema = require('./schemas/userSchema');
const UserService = require('../services/UserService');

const userRouter = express.Router();

const validateUser = (body) => {
  const { error } = userSchema.validate(body);

  if (error) throw error;
};

const create = async (req, res, next) => {
  try {
    const {
      displayName,
      email,
      password,
      image,
    } = req.body;

    validateUser(req.body);
  
    const token = await UserService.create({ displayName, email, password, image });
  
    return res.status(201).json({ token });
  } catch (e) {
    return next(e);
  }
};

/* ROUTES */
userRouter.post('/', create);

module.exports = userRouter;
