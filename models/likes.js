module.exports = function (sequelize, DataTypes) {
    var Like = sequelize.define("Like", {
        liked: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
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