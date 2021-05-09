const db = require('../db')
const sequelize = require('sequelize')


const Category = db.define("Category", {
    namecategory: sequelize.STRING,
    imagepath: sequelize.STRING,
    

})


// db.sync()
// .then(()=>{
//     console.log("Create Category successfully...")
// })
// .catch(()=>{
//     console.log("Error create category");
// })

module.exports = Category