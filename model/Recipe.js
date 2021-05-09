const db = require('../db')
const sequelize = require('sequelize')


const Recipe = db.define("Recipe", {

    nameRecipe: sequelize.STRING,
    imagepath: sequelize.STRING,
    thumbnailpath: sequelize.STRING,
    sumary: sequelize.TEXT,
    description: sequelize.TEXT,
    price: sequelize.INTEGER,
    sale: sequelize.INTEGER,
    numberBuyers: sequelize.INTEGER,
    view: sequelize.INTEGER, //luot xem
    rating: sequelize.FLOAT,
    numberReviewer: sequelize.INTEGER, //sl review
    teacherID: sequelize.INTEGER,
    outlineID: sequelize.INTEGER, //id đề cương
    categoryId: sequelize.INTEGER,
    finish : sequelize.INTEGER,
    lock: sequelize.INTEGER,

})


// db.sync()
// .then(()=>{
//     console.log("Create recipe successfully...")
// })

module.exports = Recipe;