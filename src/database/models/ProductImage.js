module.exports = (sequelize, DataTypes) => {
    let alias = 'ProductImage'

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
        
        idImage: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }

    let config = {
        tableName: 'products_images',
        underscored: true,
        timestamps: false
    }


    const ProductImage = sequelize.define(alias, cols, config)

    //Relaciones

    ProductImage.associate = (models) => {
        
        ProductImage.belongsTo(models.Image,{
            as: "images",
            foreignKey: "id_image"
        }),

        ProductImage.belongsTo(models.Product,{
            as: "products",
            foreignKey: "id_product"
        })
        
    }
    

    return ProductImage

}