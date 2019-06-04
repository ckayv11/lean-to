//Form for USER service request

//title, body, location, date(s), gender preference

//associate with user.js

//use services.js

module.exports = function (sequelize, DataTypes) {
    var requestService = sequelize.define("requestService", {
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.STRING
        },


        //location of service requested
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
        }
    })
};