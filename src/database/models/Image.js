const db = require("./index")

module.exports = (sequelize, DataTypes) => {
    let alias = 'Image'

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(75),
            unique: true,
            allowNull: false
        }
    }

    let config = {
        tableName: 'images',
        underscored: true,
        timestamps: false
    }


    const Image = sequelize.define(alias, cols, config)

    //Relaciones

    Image.associate = (models) => {
        
        Image.belongsToMany(models.Feature, {
            as: "features",
            through: models.FeatureImage,
            foreignKey: "id_image"
        }),

        Image.belongsToMany(models.Category, {
            as: "categories",
            through: models.CategoryImage,
            foreignKey: "id_image"
        }),
        
        Image.belongsToMany(models.Product, {
            as: "products",
            through: models.ProductImage,
            foreignKey: "id_image"
        }),

        Image.hasMany(models.Product, {
            as: "productsMain",
            foreignKey: "main_id_image"
        })
    }
    

    return Image

}