const db = require('../db')
const sequelize = require('sequelize')


const User = db.define("User", {
    username: sequelize.STRING,
    email: sequelize.STRING,
    password: sequelize.STRING,
    fullname: sequelize.STRING,
    role: sequelize.INTEGER,
    check: sequelize.INTEGER,
    lock: sequelize.BOOLEAN,

})

// db.sync()
// .then(()=>{
//     console.log("Create User successfully...")
// })

module.exports = User