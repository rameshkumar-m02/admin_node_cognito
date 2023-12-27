const express = require('express');
const routes = express.Router();
const cognito = require('./cognito.js');
const CognitoExpress = require('cognito-express')
const { validateAuth } = require('./auth')
const order = require("./order.controller.js");
const cart = require("./cart.controller.js")
const user = require("./user.controller.js");
routes.post('/signup',async(req,resp)=>{
    console.log("Request Came in Router>>>>>>>>>>>");
    const {body} = req;
    console.log(body)
    let {email,user,password} =body;
    try{
      console.log("email="+email+",user="+user+"password="+password); 
    let result = await cognito.signUp(user,email,password);
    console.log("Result ======"+result);
    let response = {
        UserName: result.user.userName,
        Id : result.userSub,
        SUCCESS:true

    }
    resp.status(200).json({result:response})
  } catch{
    resp.status(400).json({result:response})
  } 
})

routes.post('/code',async(req,resp)=>{
  const {body} = req;
  console.log("Request??????????"+body)
  if(body.user && body.code){
    const{user,code} = body;
    try{
      let result = await cognito.verifyCode(user,code);
      resp.status(200).json({"result":result});
    } catch(error){
      console.log(error);
      resp.status(400).json({"error":error});
    }
  } else{
    resp.status(400).json({"error":"Band Format"});
  }
});


routes.post('/changePwd',async(req,resp)=>{
  const {body} = req;
  console.log("Request??????????"+body)
  if(body.email && body.password && body.newpassword){
    const{email,password,newpassword} = body;
    try{
      let result = await cognito.changePwd(email,password,newpassword);
      resp.status(200).json({"result":result});
    } catch(error){
      console.log(error);
      resp.status(400).json({"error":error});
    }
  } else{
    resp.status(400).json({"error":"Band Format"});
  }
});

routes.post('/login',async(req,resp)=>{
  const {body} = req;
  console.log("Request??????????"+body)
  if(body.email && body.password){
    const{email,password} = body;
    try{
      let result = await cognito.login(email,password);
      resp.status(200).json({"result":result});
    } catch(error){
      console.log(error);
      resp.status(400).json({"error":error});
    }
  } else{
    resp.status(400).json({"error":"Band Format"});
  }
});


routes.post("/user/create",[validateAuth],async(req, res)=> {
    console.log("Create User");
    user.createUser(req,res);
})

routes.post("/user/all",[validateAuth],async(req, res)=> {
       user.getUserList(req,res);
})


routes.post("/user/getUserByEmail",[validateAuth],async(req, res)=> {
    
    user.getUserByEmail(req,res);
})

routes.post("/user/addUserAddress",[validateAuth],async(req, res)=> {
    
    user.addUserAddress(req,res);
})


routes.post("/cart/addToCart",[validateAuth],async(req, res)=> {
    
    cart.addToCart(req,res);
})

routes.post("/cart/getCart",[validateAuth],async(req, res)=> {
    
    cart.getCart(req,res);
})

routes.post("/cart/deleteCart",[validateAuth],async(req, res)=> {
    
    cart.deleteCart(req,res);
})

routes.post("/order/create",[validateAuth],async(req, res)=> {
    
    order.createOrder(req,res);
})

routes.post("/order/getAllOrderList",[validateAuth],async(req, res)=> {
    
    order.getAllOrderList(req,res);
})

routes.post("/order/getUserOrderList",[validateAuth],async(req, res)=> {
    
    order.getUserOrderList(req,res);
})

routes.post("/order/getOrderDetail",[validateAuth],async(req, res)=> {
    
    order.getOrderDetail(req,res);
})

routes.post("/order/changeOrderStatus",[validateAuth],async(req, res)=> {
    
    order.changeOrderStatus(req,res);
})

    routes.post('/', [validateAuth], async (req, res) => {
      // ... code removed for brevity
    })
 

module.exports = routes