module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      dateJoined: DataTypes.STRING,

    });

    User.associate = function(models) {
// Users will have reviews
        User.hasMany(models.Reviews, {
            foreignKey: {
                allowNull: false
            }
        })
    };
  
    return User;
  };