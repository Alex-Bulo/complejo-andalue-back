module.exports = (sequelize, DataTypes) => {

    let alias = 'Icon'
    
    let cols = {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },

        icon: {
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false
        },
    }

    let config = {
        tableName: 'icons',
        timestamps: false
    }

    const Icon = sequelize.define(alias, cols, config)

    //Relaciones

    Icon.associate = (models) => {
        Icon.hasMany(models.Feature, {
            as: "features",
            foreignKey: "id_icon"
        })
    }

    return Icon
}