module.exports = (sequelize, DataTypes)=>{
    const Errors = sequelize.define("Errors", {
        errorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        errorDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        errorSteps: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Errors;
}