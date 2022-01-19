module.exports = (sequelize, DataTypes) => {

    let alias = 'Owner'
    
    let cols = {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        user: { type: DataTypes.STRING(45), allowNull: false, unique: true},

        pass: { type: DataTypes.STRING(100), allowNull: false},

        owner: { type: DataTypes.BOOLEAN, allowNull: false }
    }

    let config = {
        tableName: 'owners',
        underscored: true,
        timestamps: false
    }

    const Owner = sequelize.define(alias, cols, config)

    return Owner
}