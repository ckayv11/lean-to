module.exports = function (sequelize, DataTypes) {

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