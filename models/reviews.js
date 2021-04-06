module.exports = function (sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
        post: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        timestamps: false
    });
    Review.associate = function (models) {

        // Reviews are made by users
        Review.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        // Reviews belong to movies?
        Review.belongsTo(models.Movie, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Review;
};