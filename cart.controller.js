const db = require('./dbconfig');
const cart = db.cart;
const product = db.product;
const cart_item = db.cart_item;
const bodyParser = require("body-parser");

function addToCart(req,res){
    if(!req.body.user_id || !req.body.items ){
     res.status(400).send({
       message:"Bad Request"
     })
    }
 
    cart.findOne({
        where:{
            user_id:req.body.user_id
        }
    }).then(cartfdata=>{
        if(cartfdata==null){
              const cartObject = {
              cart_id:req.body.cart_id,
              user_id:req.body.user_id
           
           }
           cart.create(cartObject).then(data=>{
                let respData = {}
                
                    product.findOne({
                        where:{
                            product_id:req.body.items.product_id
                        }
                        }).then(productdata=>{
           
                        const productstr =""+JSON.stringify(productdata);
                        let productp =JSON.parse(productstr);
                        
                        let cartItemObject = {
                            cart_item_id:req.body.items.cart_item_id,
                            cart_id:data.cart_id,
                            product_id:req.body.items.product_id,
                            quantity:req.body.items.quantity,
                            list_price:productp.list_price,
                            sales_price:productp.sales_price
                            
                        }
                        cart_item.create(cartItemObject).then(itemData=>{
                            respData = {
                                cart_id:itemData.cart_id,
                                items:itemData
                             }
                        })
                       
               });  });      
          
       

      } else{

           const cartf =""+JSON.stringify(cartfdata);
           let cartp =JSON.parse(cartf); 
           let respData = {}
           product.findOne({
                where:{
               product_id:req.body.items.product_id
               }
           }).then(productdata=>{
           
               const productstr =""+JSON.stringify(productdata);
               let productp =JSON.parse(productstr);
               cart_item.findOne({
                     where:{
                         product_id:req.body.items.product_id
                    }
                }).then(cartItemfdata=>{ 
                   if(cartItemfdata==null){
                      let cartItemObject = {
                        cart_item_id:req.body.items.cart_item_id,
                        cart_id:cartp.cart_id,
                        product_id:req.body.items.product_id,
                        quantity:req.body.items.quantity,
                        list_price:productp.list_price,
                        sales_price:productp.sales_price
                       }
                      cart_item.create(cartItemObject).then(itemData=>{
                    
                            respData = {
                                cart_id:itemData.cart_id,
                                items:itemData
                            }
                        });            
             
                    }  else {
                        const cartItemf =""+JSON.stringify(cartItemfdata);
                        let cartItemp =JSON.parse(cartItemf);
                        let cartItemObject = {
                        cart_item_id:cartItemp.cart_item_id,
                        cart_id:cartp.cart_id,
                        product_id:req.body.items.product_id,
                        quantity:cartItemp.quantity+req.body.items.quantity,
                        list_price:productp.list_price,
                        sales_price:productp.sales_price
                      }
                      cart_item.findByPk(cartItemp.cart_item_id).then(element => {
                      
                        element.quantity = cartItemp.quantity+req.body.items.quantity;;
                        element.list_price = productp.list_price;
                        element.sales_price = productp.sales_price;
                        return element.save();
                      }).then(itemData=>{
                     
                            respData = {
                                cart_id:itemData.cart_id,
                                message:"Cart Addess Successfully"
                            }
                       });
                    }
                });
                respData = {
                    status:200,
                    message:"Cart Addess Successfully"
                }
                //console.log("??????????????????"+respData);
                 res.send(respData);
                
            
        }).catch(error=>{
         res.status(500).send(error);
        })
       }
      })
      respData = {
        status:200,
        message:"Cart Addess Successfully"
    } 
    
 }

 
 function getCart(req,res){
    let cartTotal =0;
    let response ={};
    
    cart.findOne({
        include: [{
            model:cart_item,
            as:'cart_item'
        }],
        where:{
            user_id:req.body.user_id
        }
    }).then(data=>{
        const cartstr =""+JSON.stringify(data);
      
         let mystr =JSON.parse(cartstr);
         const cartItems = mystr.cart_item;
        console.log("||||||||||cartItems||"+cartItems);
        var itemsData = [];
        let productName ="";
        cartItems.forEach(async (item, index) => {
          console.log(`Item ${index + 1}:`, item);
        const prodP = await product.findByPk(item.product_id);
        console.log("Prod PPPPPP"+prodP)
        const productP = prodP.get({plain: true});
        console.log("Prod productP"+productP)
        if (productP) {
            productName = productP.product_name;
        }
       // console.log("Prod PPPPPP"+prodP)
        //const productStr =""+JSON.stringify(prodP);
        //console.log("nnnnnnnnnn"+productStr)
        //let productP =JSON.parse(productStr);
        
       
        
          cartTotal = cartTotal+ item.list_price*item.quantity;
          
         
        console.log("uuuuuuproductP.Total"+cartTotal)
        let itmeValue ={
             cart_item_id:item.product_id,
             product_name:productName,
             quantity:item.quantity,
             list_price:item.list_price,
             sales_price:item.sales_price,
             item_total :item.list_price*item.quantity
        }
        itemsData[index++] = itmeValue;

        });
       
        setTimeout(()=>{
          console.log("WIIIIIITTTTT"+response);
          response={
            cartTotal:cartTotal,
            cartDetail:itemsData
        }
          res.send(response);
        },20);
              
       }).catch(error=>{
        res.status(500).send(error);
       })
}


function deleteCart(req,res) {  
    
    cart.destroy({
        where: {
         user_id: req.body.user_id
        }
       }).then(count => {
        if (!count) {
         return res.status(404).send({error: 'No cart available'});
        }
        res.status(200).send("Cart Deleted Successfully ");
       });
    
}

module.exports = {
    getCart,
    addToCart,
    deleteCart
}