const Joi = require('joi');

const blogPostSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  categoryIds: Joi.array().not().empty().required(),
  content: Joi.string().not().empty().required(),
});

module.exports = blogPostSchema;
