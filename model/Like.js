const db = require('../db')
const sequelize = require('sequelize')

const Like = db.define("Like", {
   
   courseid:sequelize.INTEGER,
   userid: sequelize.INTEGER


})



db.sync()
.then(()=>{
    console.log("Create Like successfully...")
})

module.exports = Like