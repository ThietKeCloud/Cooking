  
const db = require('../db')
const sequelize = require('sequelize')


const Review = db.define("Review", {
    message: sequelize.TEXT,
    userid:sequelize.INTEGER,
    courseid: sequelize.INTEGER,
    rating: sequelize.INTEGER

})


db.sync()
.then(()=>{
    console.log("Create Review successfully...")
})

module.exports = Review