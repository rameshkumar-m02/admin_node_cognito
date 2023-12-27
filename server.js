const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const bodyPparser = require('body-parser');
//const routes = require("./routes.js")

//const routes = require("./routes.js")
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(express.urlencoded());
const db = require('./dbconfig');
const user = require("./user.controller.js");
const order = require("./order.controller.js");
const cart = require("./cart.controller.js")
const product = require("./product.controller.js")
db.sequelize.sync();
app.listen(3000,()=>{
    console.log("Server Started");
   // app.use("/auth",routes)
})

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.post("/product/create",(req,res)=>{
    console.log("Create Product");
    product.createProduct(req,res);
})

app.post("/product/all",(req,res)=>{
    console.log("Get All Product");
    product.getProductList(req,res);
})

app.post("/product/getProductById",(req,res)=>{
    console.log("Get Product By Product Id");
    product.getProductById(req,res);
})

app.post("/product/update",(req,res)=>{
    console.log("Updater Product ");
    product.updateProduct(req,res);
})


app.post("/user/create",(req,res)=>{
    console.log("Create User");
    user.createUser(req,res);
})

app.post("/user/all",(req,res)=>{
    console.log("Get All User");
    user.getUserList(req,res);
})

app.post("/user/getUserByEmail",(req,res)=>{
    console.log("Get User By Email Id");
    user.getUserByEmail(req,res);
})

app.post("/user/addUserAddress",(req,res)=>{
    console.log("Get User By Email Id");
    user.addUserAddress(req,res);
})

app.post("/cart/getCart",(req,res)=>{
    console.log("Get Cart");
    cart.getCart(req,res);
})

app.post("/cart/addToCart",(req,res)=>{
    console.log("Add to Cart");
    cart.addToCart(req,res);
})

app.post("/cart/deleteCart",(req,res)=>{
    console.log("Add to Cart");
    cart.deleteCart(req,res);
})

app.post("/order/createOrder",(req,res)=>{
    console.log("Get Order List");
    order.createOrder(req,res);
})

app.post("/order/getAllOrderList",(req,res)=>{
    console.log("Get Order List");
    order.getAllOrderList(req,res);
})

app.post("/order/getUserOrderList",(req,res)=>{
    console.log("Get Order List");
    order.getUserOrderList(req,res);
})

app.post("/order/getOrderDetail",(req,res)=>{
    
    order.getOrderDetail(req,res);
})

app.post("/order/changeOrderStatus",(req,res)=>{
    
    order.changeOrderStatus(req,res);
})