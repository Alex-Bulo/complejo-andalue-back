module.exports = (sequelize, DataTypes) => {

    let alias = 'Source'
    
    let cols = {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(75),
            unique: true,
            allowNull: false
        },

        createdAt : DataTypes.DATE,
    }

    let config = {
        tableName: 'sources',
        underscored: true,
        timestamps: false
    }

    const Source = sequelize.define(alias, cols, config)

    //Relaciones

    Source.associate = (models) => {
        Source.hasMany(models.Booking, {
            as: "bookings",
            foreignKey: "id_source"
        })
    }

    return Source
}