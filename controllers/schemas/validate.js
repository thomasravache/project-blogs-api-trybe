module.exports = (body, schema) => {
  const { error } = schema.validate(body);

  if (error) throw error;
};
