const {sequelize,Sequelize} = require("./dbconfig");
module.exports=(sequelize,Sequelize)=>{
    const address = sequelize.define("address",{
        address_id:{
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        user_id:{
            type: Sequelize.BIGINT
            
        },
        user_name:{
            type: Sequelize.STRING,
            
        },
        user_address:{
            type: Sequelize.STRING,
            
        },
        city:{
            type: Sequelize.STRING,
            
        },
        state:{
            type: Sequelize.STRING,
            
        },

        pincode:{
            type: Sequelize.STRING,
            
        },

        contact_number:{
            type: Sequelize.STRING,
            
        }
        
    });
    return address;
}