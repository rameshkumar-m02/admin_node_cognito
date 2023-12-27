const {sequelize,Sequelize} = require("./dbconfig");
module.exports=(sequelize,Sequelize)=>{
    const cart_item = sequelize.define("cart_item",{
        cart_item_id:{
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        cart_id:{
            type: Sequelize.BIGINT,
            
        },
        list_price:{
             type: Sequelize.DOUBLE 
        },

        sales_price:{
            type: Sequelize.DOUBLE 
       },

        product_id:{
            type: Sequelize.INTEGER
        },
        quantity:{
            type: Sequelize.INTEGER
        }
        
    });
    return cart_item;
}