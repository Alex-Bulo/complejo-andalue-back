module.exports = (sequelize, DataTypes) => {
    let alias = 'ProductFeature'

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        idProduct: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        
        idFeature: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }

    let config = {
        tableName: 'products_features',
        underscored: true,
        timestamps: false
    }


    const ProductFeature = sequelize.define(alias, cols, config)

    //Relaciones

    ProductFeature.associate = (models) => {
        
        ProductFeature.belongsTo(models.Feature,{
            as: "features",
            foreignKey: "id_feature"
        }),

        ProductFeature.belongsTo(models.Product,{
            as: "products",
            foreignKey: "id_product"
        })
        
    }
    

    return ProductFeature

}