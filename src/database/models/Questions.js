module.exports = (sequelize, DataTypes) => {
    let alias = 'Question'

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        question: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        order: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },

        choice: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }

    let config = {
        tableName: 'questions',
        underscored: true,
        timestamps:false
    }


    const Question = sequelize.define(alias, cols, config)

    //Relaciones

    Question.associate = (models) => {

        Question.hasMany(models.Feedback, {
            as: "feedbacks",
            foreignKey: "id_question"
        })
    }
    

    return Question

}