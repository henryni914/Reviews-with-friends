module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        dateJoined: DataTypes.STRING,

    }, {
        timestamps: false
    });

    User.associate = function (models) {

        // Users will have reviews
        User.hasMany(models.Review, {
            foreignKey: {
                allowNull: false
            }
        });

        // Users will have follows/friends?

    };

    return User;
};