const db = require('../db')
const sequelize = require('sequelize')


const Outline = db.define("Outline", {
    nameoutline: sequelize.STRING,
    

})


// db.sync()
// .then(()=>{
//     console.log("Create Outline successfully...")
// })

module.exports = Outline