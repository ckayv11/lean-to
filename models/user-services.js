module.exports = function (sequelize, DataTypes) {

    var UserServices = sequelize.define("UserServices", {
        // this var has to be defined even tho currently empty
    });

    UserServices.associate = function (models) {
        UserServices.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    UserServices.associate = function(models) {
        UserServices.hasMany(models.Services, {
            foreignKey: {
                allowNull: true
            }
        });
    }
    return UserServices;
};