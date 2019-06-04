// Volunteer availability form

module.exports = function (sequelize, DataTypes) {
    var Availability = sequelize.define("Availability", {
        monday: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        tuesday: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        wednesday: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        thursday: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        friday: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        saturday: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        sunday: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    })
};