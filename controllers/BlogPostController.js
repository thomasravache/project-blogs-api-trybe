const express = require('express');
const BlogPostService = require('../services/BlogPostService');
const { validate, blogPostSchema } = require('./schemas');

const blogPostRouter = express.Router();

const create = async (req, res, next) => {
  const { id } = req.user;
  const { title, categoryIds, content } = req.body;

  try {
    validate(req.body, blogPostSchema);

    const newPost = await BlogPostService.create({ userId: id, title, categoryIds, content });

    return res.status(201).json(newPost);
  } catch (e) {
    return next(e);
  }
};

const getAll = async (_req, res) => {
  const posts = await BlogPostService.getAll();

  return res.status(200).json(posts);
};

/* ROUTES */
blogPostRouter.post('/', create);
blogPostRouter.get('/', getAll);

module.exports = blogPostRouter;
