const { Op } = require('sequelize');
const { BlogPost, PostCategorie, Categorie, User } = require('../models');

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

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories' },
    ],
  });
  // console.log(posts);
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories' },
    ],
  });

  if (!post) throw new Error('Post does not exist');

  return post;
};

const update = async ({ currentUser, id, title, content }) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories' },
    ],
  });

  console.log(post);

  if (currentUser.id !== post.userId) throw new Error('Unauthorized user');

  await post.update({ title, content, updated: new Date().toString() });

  return post;
};

const destroy = async ({ currentUser, id }) => {
  const post = await BlogPost.findOne({ where: { id } });

  if (!post) throw new Error('Post does not exist');
  if (post.userId !== currentUser.id) throw new Error('Unauthorized user');

  await BlogPost.destroy({ where: { id } });
};

const search = async (queryParam) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${queryParam}%` } },
        { content: { [Op.like]: `%${queryParam}%` } },
      ],
    },
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories' },
    ],
  });

  return posts;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
  search,
};
