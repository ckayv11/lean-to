module.exports = function(sequelize, DataTypes) {
    var Services = sequelize.define("Services", {
        transporation: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        pet_care: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        babysitting: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        groceries: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        errands: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        yard_work: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        house_keeping: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        home_projects: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        movers: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

    Services.associate = function(models) {
        Services.belongsTo(models.UserServices, {
            foreignKey: {
                allowNull: false
            }
        });
    };
};