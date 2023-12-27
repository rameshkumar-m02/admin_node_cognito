const {sequelize,Sequelize} = require("./dbconfig");
const order_item = require("./orderitem.model");
module.exports=(sequelize,Sequelize)=>{
    const order_header = sequelize.define("order_header",{
        order_id:{
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        order_total:{
             type: Sequelize.DOUBLE 
        },

        user_id:{
            type: Sequelize.INTEGER
        },
        address_id:{
            type: Sequelize.INTEGER
        },
        payment_mode:{
            type: Sequelize.STRING
        },
        order_date:{
            type: Sequelize.DATE,
        },
        order_starus:{
            type: Sequelize.STRING
        }

    });

    
    
    return order_header;
}