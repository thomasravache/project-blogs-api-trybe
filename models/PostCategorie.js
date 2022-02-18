const associations = (models) => {
  models.BlogPost.belongsToMany(models.Categorie, {
    as: 'categories',
    through: models.PostCategorie,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
  models.Categorie.belongsToMany(models.BlogPost, {
    as: 'posts',
    through: models.PostCategorie,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {}, {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  PostCategorie.associate = associations;

  return PostCategorie;
};