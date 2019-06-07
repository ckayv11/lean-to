module.exports = function (sequelize, DataTypes) {
    var Requester = sequelize.define("Requester", {
        name: DataTypes.STRING,
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        category: {
            type: DataTypes.
        }
    });
};