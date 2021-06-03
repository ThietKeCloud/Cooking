const db = require('../db')
const sequelize = require('sequelize')


const Category = db.define("Category", {
    namecategory: sequelize.STRING,

})


// db.sync()
// .then(()=>{
//     console.log("Create Category successfully...")
// })

module.exports = Category