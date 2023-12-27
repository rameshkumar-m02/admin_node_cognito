const {sequelize,Sequelize} = require("./dbconfig");
module.exports=(sequelize,Sequelize)=>{
    const order_item = sequelize.define("order_item",{
        order_item_id:{
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        order_id:{
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
    return order_item;
}