module.exports = function (sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    name: DataTypes.STRING
  }, {
    timestamps: false
  });

  Favorite.associate = function (models) {
    // Associating Favorite with Posts
    // When an Favorite is deleted, also delete any associated Example2
    Favorite.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Favorite.belongsTo(models.Movie, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Favorite;
};
