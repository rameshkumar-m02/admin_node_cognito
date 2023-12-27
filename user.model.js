const {sequelize,Sequelize} = require("./dbconfig");
module.exports=(sequelize,Sequelize)=>{
    const user = sequelize.define("user",{
        user_id:{
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        user_name:{
            type: Sequelize.STRING,
            
        },
        email_id:{
            type: Sequelize.STRING,
            
        },
        user_status:{
            type: Sequelize.STRING,
            
        }       
    });
    return user;
}