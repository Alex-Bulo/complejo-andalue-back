module.exports = (sequelize, DataTypes) => {
    let alias = 'Booking'

    let cols = {
        code:{
            type: DataTypes.STRING(18),
            allowNull: false,
            unique: true,
            primaryKey:true
        },

        idProduct: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        idUser: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        startDate : DataTypes.DATE,
        endDate : DataTypes.DATE,

        adults: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        kids: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        pets: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        
        idSource: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        cancelled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        discount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },

        firstPayment: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        firstPaymentDate: {
            type: DataTypes.DATE,
        },

        secondPayment: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        secondPaymentDate: {
            type: DataTypes.DATE,
        },

        createdAt : DataTypes.DATE,
        updatedAt : DataTypes.DATE


    }

    let config = {
        tableName: 'bookings',
        underscored: true,
        timestamps:true
    }


    const Booking = sequelize.define(alias, cols, config)

    //Relaciones

    Booking.associate = (models) => {
        
        Booking.belongsTo(models.Product,{
            as: "product",
            foreignKey: "id_product"
        }),

        Booking.belongsTo(models.User,{
            as: "user",
            foreignKey: "id_user"
        }),

        Booking.belongsTo(models.Source,{
            as: "source",
            foreignKey: "id_source"
        }),

        Booking.hasMany(models.Feedback,{
            as: "feedback",
            foreignKey: "code_booking"
        })
    }
    

    return Booking

}