const db = require('./dbconfig');
const user = db.user;
const address = db.address;

function createUser(req,res){
   if(!req.body.user_name || !req.body.email_id ){
    res.status(400).send({
      message:"Bad Request"
    })
   }

   const userObject = {
    user_id:req.body.user_id,
    user_name:req.body.user_name,
    email_id:req.body.email_id,
    user_status:req.body.user_status
   }
   user.create(userObject).then(data=>{
    res.send(data);
   }).catch(error=>{
    res.status(500).send(error);
   })
}

function addUserAddress(req,res){
   
    const addressObject = {
     user_id:req.body.user_id,
     user_name:req.body.user_name,
     user_address:req.body.user_address,
     city:req.body.city,
     state:req.body.state,
     pincode:req.body.pincode,
     contact_number:req.body.contact_number
    }
    address.create(addressObject).then(data=>{
     res.send(data);
    }).catch(error=>{
     res.status(500).send(error);
    })
 }
 

function getUserByEmail(req,res){
    user.findAll({
        include: [{
            model:address,
            as:'address'
        }],
        where:{
            email_id:req.body.email_id
        }
    }).then(data=>{
        let respData = {
            status:'Success',
            users:data
           }
        res.send(respData);
       }).catch(error=>{
        res.status(500).send(error);
       })
}

function getUserList(req,res){
    user.findAll().then(data=>{
        res.send(data);
       }).catch(error=>{
        res.status(500).send(error);
       })
}


module.exports = {
    createUser,
    getUserByEmail,
    getUserList,
    addUserAddress
}