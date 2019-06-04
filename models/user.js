//Form for creating USER account

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        nameFirst: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        nameLast: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phoneNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [10, 12],
                isNumeric: true
            },
        },
        //////////////////////////// password validation?
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            }
        },
        ////////////////////////////
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isBefore: "2001-06-12",
                //throw error if after date. User must be older than 18.
            }
        },
        adress1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

            }
        },
        adress2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [5],
                isNumeric: true
            }
        },
        gender: {

        },
        services: {

        }
    });
    return User;
};


//join services.js and gender.js