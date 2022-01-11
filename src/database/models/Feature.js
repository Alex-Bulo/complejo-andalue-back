module.exports = (sequelize, DataTypes) => {
    let alias = 'Feature'

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING(75),
            allowNull: false
        },

        description: {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        subcategory: {
            type: DataTypes.STRING(25),
            allowNull: false
        },

        idIcon: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

    }

    let config = {
        tableName: 'features',
        underscored: true,
        timestamps:false
    }


    const Feature = sequelize.define(alias, cols, config)

    //Relaciones

    Feature.associate = (models) => {
        
        Feature.belongsTo(models.Icon,{
            as: "icon",
            foreignKey: "id_icon"
        }),

        Feature.belongsToMany(models.Image, {
            as: "images",
            through: models.FeatureImage,
            foreignKey: "id_feature"
        }),

        Feature.belongsToMany(models.Category, {
            as: "categories",
            through: models.CategoryFeature,
            foreignKey: "id_feature"
        }),

        Feature.belongsToMany(models.Product, {
            as: "products",
            through: models.ProductFeature,
            foreignKey: "id_feature"
        })
    }
    

    return Feature

}