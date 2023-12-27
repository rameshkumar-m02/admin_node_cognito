const Sequelize = require("sequelize");
const dbName = 'order_app';
const dbUser='root';
const dbPassword = 'root';
const sequelize = new Sequelize(dbName,dbUser,dbPassword,{
    host:'localhost',
    port:3306,
    dialect:'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
      }
});

const db ={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.model')(sequelize,Sequelize);
db.product = require('./product.model')(sequelize,Sequelize);
db.cart = require('./cart.model')(sequelize,Sequelize);
db.cart_item = require('./cartitem.model')(sequelize,Sequelize);
db.address = require('./address.model')(sequelize,Sequelize);
db.order_header = require('./order.model')(sequelize,Sequelize);
db.order_item = require('./orderitem.model')(sequelize,Sequelize);
db.order_header.hasMany(db.order_item, {
    foreignKey: 'order_id',
    as:'order_item'
  });
 
  db.order_item.belongsTo(db.order_header, {
    foreignKey: 'order_id',
    as:'order_header'
  })

  db.cart.hasMany(db.cart_item, {
    foreignKey: 'cart_id',
    as:'cart_item'
  });
 
  db.cart_item.belongsTo(db.cart, {
    foreignKey: 'cart_id',
    as:'cart'
  })

  db.user.hasMany(db.address,{
    foreignKey: 'user_id',
    as:'address'
  })

  db.address.belongsTo(db.user, {
    foreignKey: 'user_id',
    as:'user'
  })

module.exports=db;