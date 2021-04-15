module.exports = function (sequelize, DataTypes) {
    var Watchlist = sequelize.define("Watchlist", {
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    }, {
        timestamps: false
    });

    Watchlist.associate = function (models) {
        Watchlist.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Watchlist.belongsTo(models.Movie, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Watchlist;
};