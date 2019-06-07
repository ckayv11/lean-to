module.exports = function (sequelize, DataTypes) {
    var Volunteer = sequelize.define("Volunteer", {
        name: DataTypes.STRING
    });

    // associate Volunteer with 
    Volunteer.associate = function (models) {
        Volunteer.hasMany(models.Requester, {
            onDelete: "cascade"
        });
    };
    return Volunteer;
};
