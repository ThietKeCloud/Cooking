const db = require('../db')
const sequelize = require('sequelize');



const Cart = db.define("Cart", {
    userID: sequelize.INTEGER,
    productID: sequelize.INTEGER,
    subtotal: sequelize.INTEGER
})




db.sync()
 .then(()=>{
     console.log("Create Cart successfully...")
 })

module.exports = Cart