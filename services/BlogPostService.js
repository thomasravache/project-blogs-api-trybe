const { BlogPost, PostCategorie, Categorie } = require('../models');

const verifyCategories = async (categoryIds) => {
  const categories = await Categorie.findAll();

  return !categoryIds
    .some((categoryId) => !categories.some((category) => categoryId === category.id));
};

const create = async ({ userId, title, categoryIds, content }) => {
  const isValidCategories = await verifyCategories(categoryIds);

  if (!isValidCategories) throw new Error('"categoryIds" not found');

  const newPost = await BlogPost.create({ userId, title, content });

  categoryIds.forEach(async (categoryId) => {
    await PostCategorie.create({ postId: newPost.id, categoryId });
  });

  return newPost.dataValues;
};

module.exports = {
  create,
};
