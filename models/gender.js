//Gender field for user/volunteer/requestService form

module.exports = function (sequelize, DataTypes) {
    var Gender = sequelize.define("Gender", {
        female: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        male: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        nonBinary: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        preferNotSay: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    })
};