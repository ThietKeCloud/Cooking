const db = require('../db')
const sequelize = require('sequelize')


const Video = db.define("Viewvideo", {
    namevideo: sequelize.STRING,
    namecourse : sequelize.STRING,
    videopath : sequelize.STRING,
    chapter : sequelize.STRING,
    description : sequelize.STRING,
    idcourse : sequelize.INTEGER,
})


// db.sync()
// .then(()=>{
//     console.log("Create Category successfully...")
// })

module.exports = Video