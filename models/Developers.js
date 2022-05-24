module.exports = ( sequelize, DataTypes )=>{
    const Developers = sequelize.define("Developers", {
        firstname : {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname : {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Developers;
}