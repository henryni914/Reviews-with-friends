module.exports = function (sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    name: DataTypes.STRING
  }, {
    timestamps: false
  });

  Favorite.associate = function (models) {
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
