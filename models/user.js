module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street_address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address_2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true }
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        // gender: {
        //     type: DataTypes.ENUM,
        //     values: ['male', 'female', 'non-binary', 'denies']
        // },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function (models) {
        User.hasOne(models.UserServices, {
            onDelete: "cascade"
        });
    };

    return User;
};