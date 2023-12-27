const {sequelize,Sequelize} = require("./dbconfig");
module.exports=(sequelize,Sequelize)=>{
    const product = sequelize.define("product",{
        product_id:{
            type: Sequelize.BIGINT,
            primaryKey:true
        },

        product_name:{
            type: Sequelize.STRING,
            
        },
        product_image:{
            type: Sequelize.STRING,
            
        },
        product_stock:{
            type: Sequelize.STRING,
            
        },
        currency:{
            type: Sequelize.STRING,
            
        },
        
        list_price:{
             type: Sequelize.DOUBLE 
        },

        sales_price:{
            type: Sequelize.DOUBLE 
       }

        
    });
    return product;
}