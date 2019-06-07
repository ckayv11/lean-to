module.exports = function (sequelize, DataTypes) {
    var Volunteer = sequelize.define("Volunteer", {
        name: DataTypes.STRING
    });

    Volunteer.associate = function (models) {
        Volunteer.hasMany(models.Requester, {
            onDelete: "cascade"
        });
    };
    return Volunteer;
};
