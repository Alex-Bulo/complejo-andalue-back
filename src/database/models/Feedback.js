module.exports = (sequelize, DataTypes) => {
    let alias = 'Feedback'

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        idQuestion: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        
        codeBooking: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        feedback: {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        createdAt : DataTypes.DATE,
        updatedAt : DataTypes.DATE

    }

    let config = {
        tableName: 'feedback',
        underscored: true,
        timestamps:true
    }


    const Feedback = sequelize.define(alias, cols, config)

    //Relaciones

    Feedback.associate = (models) => {

        Feedback.belongsTo(models.Question, {
            as: "question",
            foreignKey: "id_question"
        }),
        
        Feedback.belongsTo(models.Booking, {
            as: "booking",
            foreignKey: "code_booking"
        })
    }
    

    return Feedback

}