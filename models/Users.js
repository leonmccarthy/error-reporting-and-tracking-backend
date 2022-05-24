module.exports = ( sequelize, DataTypes ) => {
    const Users = sequelize.define("Users", {
        firstname : {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname : {
            type: DataTypes.STRING,
            allowNull: false
        },
        username :{
            type: DataTypes.STRING,
            allowNull: false
        },
        password :{
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Users;
}