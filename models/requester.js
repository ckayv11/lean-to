module.exports = function (sequelize, DataTypes) {
    var Requester = sequelize.define("Requester", {
        // req_name: DataTypes.STRING,
        // role: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
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