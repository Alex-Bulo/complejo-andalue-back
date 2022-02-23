const db = require("./index")

module.exports = (sequelize, DataTypes) => {
    let alias = 'Product'

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

        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        adults: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        kids: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        pets: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        color:{
            type: DataTypes.STRING(7),
            allowNull: false,
            unique: true,
        },

        mainIdImage: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        defaultClose: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        closeSince : DataTypes.DATE,

        createdAt : DataTypes.DATE,
        updatedAt : DataTypes.DATE
    }

    let config = {
        tableName: 'products',
        underscored: true
    }


    const Product = sequelize.define(alias, cols, config)

    //Relaciones

    Product.associate = (models) => {
        
        Product.belongsTo(models.Category,{
            as: "category",
            foreignKey: "id_category"
        }),

        Product.hasMany(models.Booking, {
            as: "bookings",
            foreignKey: "id_product"
        }),

        Product.belongsToMany(models.Image, {
            as: "images",
            through: models.ProductImage,
            foreignKey: "id_product"
        }),
        
        Product.belongsToMany(models.Feature, {
            as: "features",
            through: models.ProductFeature,
            foreignKey: "id_product"
        }),

        Product.belongsTo(models.Image,{
            as: "mainImage",
            foreignKey: "main_id_image"
        })
 
    }
    

    return Product

}