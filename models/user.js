module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        street_address: DataTypes.STRING,
        address_2: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip_code: DataTypes.INTEGER,
        phone_number: DataTypes.INTEGER,
        email: DataTypes.STRING,
        date_of_birth: DataTypes.DATE,
        gender: DataTypes.BOOLEAN,
        role: DataTypes.BOOLEAN
    });

    User.associate = function(models) {
        User.hasOne(models.UserServices, {
            onDelete: "cascade"
        });
    };

    return User;
};