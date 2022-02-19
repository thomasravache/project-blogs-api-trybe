const Joi = require('joi');

const blogPostSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  categoryIds: Joi.array().not().empty().required(),
  content: Joi.string().not().empty().required(),
});

const updateBlogPostSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  categoryIds: Joi.any().forbidden()
    .messages({
      'any.unknown': 'Categories cannot be edited',
    }),
  content: Joi.string().not().empty().required(),
});

module.exports = {
  blogPostSchema,
  updateBlogPostSchema,
};
