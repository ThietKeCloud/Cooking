const db = require('../db')
const sequelize = require('sequelize')

//Cart(id,Subtotal,idUser)
const Cart = db.define("Cart", {
   
    userid:sequelize.INTEGER,
   subtotal: sequelize.INTEGER

})

Cart.associate = function(models) {
    Cart.belongsTo(models.User, {foreignKey: 'userid'})
    
};


db.sync()
.then(()=>{
    console.log("Create Cart successfully...")
})

module.exports = Cart