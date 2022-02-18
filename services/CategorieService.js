const { Categorie } = require('../models');

const create = async (name) => {
  const newCategorie = await Categorie.create({ name });

  return newCategorie.dataValues;
};

const getAll = async () => {
  const categories = await Categorie.findAll();

  return categories;
};

module.exports = {
  create,
  getAll,
};
