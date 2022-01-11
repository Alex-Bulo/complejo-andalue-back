module.exports = (sequelize, DataTypes) => {
    let alias = 'CategoryFeature'

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        idCategory: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        
        idFeature: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }

    let config = {
        tableName: 'categories_features',
        underscored: true,
        timestamps: false
    }


    const CategoryFeature = sequelize.define(alias, cols, config)

    //Relaciones

    CategoryFeature.associate = (models) => {
        
        CategoryFeature.belongsTo(models.Feature,{
            as: "features",
            foreignKey: "id_feature"
        }),

        CategoryFeature.belongsTo(models.Category,{
            as: "categories",
            foreignKey: "id_category"
        })
        
    }
    

    return CategoryFeature

}