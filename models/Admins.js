module.exports = ( sequelize, DataTypes )=>{
    const Admins = sequelize.define("Admins", {
        firstname : {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname : {
            type: DataTypes.STRING,
            allowNull: false
        },
        username : {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    // Admins.associate = (models)=>{
    //     Admins.hasMany(models.Developers, { onDelete: "cascade" })
    // }
    
    return Admins;
}