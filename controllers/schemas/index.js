const validate = require('./validate');
const loginSchema = require('./loginSchema');
const userSchema = require('./userSchema');
const categorieSchema = require('./categorieSchema');
const { blogPostSchema, updateBlogPostSchema } = require('./blogPostSchema');

module.exports = {
  validate,
  loginSchema,
  userSchema,
  categorieSchema,
  blogPostSchema,
  updateBlogPostSchema,
};
