module.exports = (sequelize, DataTypes) => {
    const Assigneds = sequelize.define("Assigneds", {
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
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        developerassigned: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stepsToComplete: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        stepsDone: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    })

    Assigneds.associate = (models) => {
        Assigneds.belongsTo(models.Developers, { onDelete: "Cascade" });
    }

    return Assigneds;
}