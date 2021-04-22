module.exports = function (sequelize, DataTypes) {
    var Like = sequelize.define("Like", {
        tmdbId: DataTypes.INTEGER,
        reviewer: DataTypes.STRING,
        title: DataTypes.STRING
    }, {
        timestamps: false
    });

    Like.associate = function (models) {
        Like.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Like.belongsTo(models.Review, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Like;
};