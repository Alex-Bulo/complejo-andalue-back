module.exports = (sequelize, DataTypes) => {
    let alias = 'FeatureImage'

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        idFeature: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        
        idImage: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }

    let config = {
        tableName: 'features_images',
        underscored: true,
        timestamps: false
    }


    const FeatureImage = sequelize.define(alias, cols, config)

    //Relaciones

    FeatureImage.associate = (models) => {
        
        FeatureImage.belongsTo(models.Image,{
            as: "images",
            foreignKey: "id_image"
        }),

        FeatureImage.belongsTo(models.Feature,{
            as: "features",
            foreignKey: "id_feature"
        })
        
    }
    

    return FeatureImage

}