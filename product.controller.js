const db = require('./dbconfig');
const product = db.product;
const address = db.address;

function createProduct(req,res){
   if(!req.body.product_name || !req.body.product_id ){
    res.status(400).send({
      message:"Bad Request"
    })
   }

   const productObject = {
    product_id:req.body.product_id,
    product_name:req.body.product_name,
    product_image:req.body.product_image,
    product_stock:req.body.product_stock,
    currency:req.body.currency,
    list_price:req.body.list_price,
    sales_price:req.body.sales_price
   }
   product.create(productObject).then(data=>{
    res.send(data);
   }).catch(error=>{
    res.status(500).send(error);
   })
}

function updateProduct(req,res){
   
    const productObject = {
        product_id:req.body.product_id,
        product_name:req.body.product_name,
        product_image:req.body.product_image,
        product_stock:req.body.product_stock,
        currency:req.body.currency,
        list_price:req.body.list_price,
        sales_price:req.body.sales_price
       }
    product.update(productObject).then(data=>{
     res.send(data);
    }).catch(error=>{
     res.status(500).send(error);
    })
 }
 

function getProductById(req,res){
    product.findAll({
        where:{
            product_id:req.body.product_id
        }
    }).then(data=>{
        let respData = {
            status:'Success',
            product:data
           }
        res.send(respData);
       }).catch(error=>{
        res.status(500).send(error);
       })
}

function getProductList(req,res){
    product.findAll().then(data=>{
        res.send(data);
       }).catch(error=>{
        res.status(500).send(error);
       })
}


module.exports = {
    createProduct,
    getProductById,
    getProductList,
    updateProduct
}