module.exports = function (sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
        post: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 500] //at least 1 length, but up to 500
            }
        }
    });
    Review.associate = function (models) {
        // Reviews are made by users
        Review.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Review;
};