module.exports = (sequelize, DataTypes) => {

    let alias = 'Info'
    
    let cols = {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        placeFullname: { type: DataTypes.STRING(100), allowNull: false },
        placeShortname: { type: DataTypes.STRING(50), allowNull: false },
        
        welcomeMsg: { type: DataTypes.STRING(320), allowNull: false },
        
        direction: { type: DataTypes.STRING(120), allowNull: false },

        closeOne: { type: DataTypes.STRING(120), allowNull: false },
        closeTwo: { type: DataTypes.STRING(120), allowNull: false },
        closeThree: { type: DataTypes.STRING(120), allowNull: false },
        
        contactCell: { type: DataTypes.STRING(15), allowNull: false },
        contactMail: { type: DataTypes.STRING(50), allowNull: false },
        
        contactOwners: { type: DataTypes.STRING(120), allowNull: false },
        contactExtra: { type: DataTypes.STRING(120)},
        
        checkIn: { type: DataTypes.STRING(30), allowNull: false },        
        checkOut: { type: DataTypes.STRING(30), allowNull: false },
        
        videoOneTitle: { type: DataTypes.STRING(50)},
        videoOne: { type: DataTypes.STRING(50)},
        
        videoTwoTitle: { type: DataTypes.STRING(50)},
        videoTwo: { type: DataTypes.STRING(50)},
        
        videoThreeTitle: { type: DataTypes.STRING(50)},
        videoThree: { type: DataTypes.STRING(50)},

    }

    let config = {
        tableName: 'info',
        underscored: true,
        timestamps: false
    }

    const Info = sequelize.define(alias, cols, config)

    return Info
}