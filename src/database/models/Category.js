module.exports = (sequelize, DataTypes) => {
    let alias = 'Category'

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        }

    }

    let config = {
        tableName: 'categories',
        timestamps: false
    }


    const Category = sequelize.define(alias, cols, config)

    //Relaciones

    Category.associate = (models) => {

        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "id_category"
        }),

        Category.belongsToMany(models.Image, {
            as: "images",
            through: models.CategoryImage,
            foreignKey: "id_category"
        }),

        Category.belongsToMany(models.Feature, {
            as: "features",
            through: models.CategoryFeature,
            foreignKey: "id_category"
        })

    }
    

    return Category

}