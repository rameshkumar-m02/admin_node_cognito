const {sequelize,Sequelize} = require("./dbconfig");
module.exports=(sequelize,Sequelize)=>{
    const cart = sequelize.define("cart",{
        cart_id:{
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        user_id:{
            type: Sequelize.BIGINT
            
        }
    });
    return cart;
}