module.exports = (sequelize, DataTypes) => {
    let alias = 'CategoryImage'

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
        
        idImage: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }

    let config = {
        tableName: 'categories_images',
        underscored: true,
        timestamps: false
    }


    const CategoryImage = sequelize.define(alias, cols, config)

    //Relaciones

    CategoryImage.associate = (models) => {
        
        CategoryImage.belongsTo(models.Image,{
            as: "images",
            foreignKey: "id_image"
        }),

        CategoryImage.belongsTo(models.Category,{
            as: "categories",
            foreignKey: "id_category"
        })
        
    }
    

    return CategoryImage

}