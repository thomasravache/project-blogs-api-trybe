const { Categorie } = require('../models');

const create = async (name) => {
  const newCategorie = await Categorie.create({ name });

  return newCategorie.dataValues;
};

module.exports = {
  create,
};
