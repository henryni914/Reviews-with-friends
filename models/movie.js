module.exports = function (sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Movie.associate = function (models) {

        // Movies will have reviews
        Movie.hasMany(models.Review, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Movie;
};