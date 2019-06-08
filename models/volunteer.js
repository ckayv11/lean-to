module.exports = function(sequelize, DataTypes) {
    var Volunteer = sequelize.define("Volunteer", {
        availability: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            len: [0]
        }
    });
    
    Volunteer.associate = function(models) {
        Volunteer.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Volunteer;
};