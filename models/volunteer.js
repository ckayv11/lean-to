module.exports = function (sequelize, DataTypes) {
    var Volunteer = sequelize.define("Volunteer", {
        availability: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            len: [0]
        }
    });

    // We're saying that a Volunteer should belong to a User
    // A Volunteer can't be created without a User due to the foreign key constraint
    Volunteer.associate = function (models) {
        Volunteer.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Volunteer;
};