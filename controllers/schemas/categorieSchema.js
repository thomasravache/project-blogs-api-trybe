const Joi = require('joi');

const categorieSchema = Joi.object({
  name: Joi.string().not().empty().required(),
});

module.exports = categorieSchema;
