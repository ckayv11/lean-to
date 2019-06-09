module.exports = function (sequelize, DataTypes) {
    var Requester = sequelize.define("Requester", {
        //
    });

    Requester.associate = function (models) {
        Requester.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Requester;
};