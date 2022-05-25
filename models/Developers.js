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
      //association
    // Developers.associate = (models) => {
    //     Developers.hasMany(models.Errors, { onDelete: "cascade" })
    // }
    
    return Developers;
}