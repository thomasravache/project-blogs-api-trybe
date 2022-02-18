const express = require('express');
const { categorieSchema, validate } = require('./schemas');
const CategorieService = require('../services/CategorieService');

const categorieRouter = express.Router();

const create = async (req, res, next) => {
  const { name } = req.body;

  try {
    validate(req.body, categorieSchema);

    const newCategorie = await CategorieService.create(name);

    return res.status(201).json(newCategorie);
  } catch (e) {
    return next(e);
  }
};

const getAll = async (_req, res) => {
  const categories = await CategorieService.getAll();

  return res.status(200).json(categories);
};

/* ROUTES */
categorieRouter.post('/', create);
categorieRouter.get('/', getAll);

module.exports = categorieRouter;
