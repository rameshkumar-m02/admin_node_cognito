const db = require('./dbconfig');
const order_header = db.order_header;
const order_item = db.order_item;
const cart = db.cart;
const cart_item = db.cart_item;
const product = db.product;

function getAllOrderList(req,res){
    order_header.findAll({
      }).then(data=>{
        res.send(data);
       }).catch(error=>{
        res.status(500).send(error);
       })
}

function getUserOrderList(req,res){
    order_header.findAll({
        where:{
            user_id:req.body.user_id
        }
    }).then(data=>{
        res.send(data);
       }).catch(error=>{
        res.status(500).send(error);
       })
}

function createOrder(req,res){
    let cartTotal =0;
    let cartItems;
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
        console.log("||||||||||string||"+cartstr);
    
        let mystr =JSON.parse(cartstr);
        //console.log("||||||||||cartid||"+mystr.cart_id);
        //console.log("||||||||||item||"+mystr.cart_item);
        cartItems = mystr.cart_item;
        console.log("||||||||||cartItems||"+cartItems);
        cartItems.forEach((item, index) => {
          console.log(`Item ${index + 1}:`, item);
          cartTotal = cartTotal+ item.list_price*item.quantity;
        });

        const orderObject = {
            order_id:req.body.order_id,
            user_id:req.body.user_id,
            address_id:req.body.address_id,
            payment_mode:req.body.payment_mode,
            order_starus:req.body.order_status,
            order_total:cartTotal,
            order_date:new Date()

            
           }
           
           order_header.create(orderObject).then(datahdr=>{
               let respData = {}
               console.log(">>>>>>>>>>>"+datahdr)
               const dataheader =""+JSON.stringify(datahdr);
        console.log("||||||||||dataheader||"+dataheader);
    
        let header =JSON.parse(dataheader);
               cartItems.forEach((item, index) => {
                const orderItemObject = {
                        order_id:header.order_id,
                        product_id:item.product_id,
                        list_price:item.list_price,
                        sales_price:item.sales_price,
                        quantity:item.quantity
                      };
                      console.log("||||||||||Before Create Order Item ||"+orderItemObject.product_id);
                      order_item.create(orderItemObject).then(itemDatas=>{
                        console.log("||||||||||Create Order Item ||"+itemDatas);
                      }).catch(error=>{
                        console.log("||||||||||errorCreate Order Item "+error);
                        res.status(500).send(error);
                       })
                   
              })
               
                   
                 
                  
            res.send(respData);
           }).catch(error=>{
            res.status(500).send(error);
           })
        
       

       

    })

}


function getOrderDetail(req,res){
    let response={};
    order_header.findOne({
        include: [{
            model:order_item,
            as:'order_item'
        }],
        where:{
            order_id:req.body.order_id
        }
    }).then(data=>{
        const orderstr=""+JSON.stringify(data);
        console.log("||||||||||orderstr||"+orderstr);
        let mystr =JSON.parse(orderstr);
        console.log("||||||||||mystr||"+mystr);
        const orderItems = mystr.order_item;
       //console.log("||||||||||orderItems||"+orderItems);
       var itemsData = [];
       let productName ="";
       let order_header ={
        order_id:mystr.order_id,
        order_total:mystr.order_total,
        order_date:mystr.order_date,
        payment_mode:mystr.payment_mode,
        order_starus:mystr.order_starus,
        user_id :mystr.user_id
   }
   console.log("headererrrrrrrrrr"+order_header);
   console.log("orderItems"+orderItems);
       orderItems.forEach(async (item, index) => {
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
           order_header:order_header,
           orderItems:itemsData
       }
         res.send(response);
       },1000);
             
      }).catch(error=>{
       res.status(500).send(error);
      })
}

function changeOrderStatus(req,res){
    order_header.findByPk(req.body.order_id).then(element => {
    console.log("Oder Change");
    element.order_starus = req.body.order_status;
    return element.save();
  }).then(itemData=>{
 
    res.status(500).send("Order Status Changed Successfully");
         
       
   }).catch(error=>{
    res.status(500).send(error);
   })
}

module.exports = {
    createOrder,
    getUserOrderList,
    getAllOrderList,
    getOrderDetail,
    changeOrderStatus
}