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
       //association
    //    Users.associate = (models) => {
    //     Users.hasMany(models.Errors, { onDelete: "cascade"})
    //     }

    return Users;
}