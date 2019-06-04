//Services form for volunteer/user/requestService form(s)

module.exports = function (sequelize, DataTypes) {
    var Services = sequelize.define("Services", {
        transportation: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        petCare: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        babysitter: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        errandsGroceries: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        yardServices: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        housekeeping: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        homeImprovement: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        other: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    })



    // Services.associate = function (models) {
    //     // We're saying that a Service should belong to a Volunteer
    //     // A Services form can't be created without a Volunteer due to the foreign key constraint
    //     Services.belongsTo(models.Volunteer, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    // Services.associate = function (models) {
    //     // We're saying that a Service form should belong to a User
    //     // A Services form can't be created without a User due to the foreign key constraint
    //     Services.belongsTo(models.Volunteer, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
};