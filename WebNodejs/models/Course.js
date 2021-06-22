const db = require('../db')
const sequelize = require('sequelize')


const Course = db.define("Course", {

    namecourse: sequelize.STRING,
    imagepath: sequelize.STRING,
    thumbnailpath: sequelize.STRING,
    sumary: sequelize.TEXT,
    description: sequelize.TEXT,
    price: sequelize.INTEGER,
    slhvdg: sequelize.INTEGER,
    sale: sequelize.INTEGER,
    countregister: sequelize.INTEGER,
    view: sequelize.INTEGER, //luot xem
    rating: sequelize.FLOAT,
    reviewcount: sequelize.INTEGER, //sl review
    topicid: sequelize.INTEGER,
    teacherid: sequelize.INTEGER,
    outlineid: sequelize.INTEGER, //id đề cương
    finish : sequelize.INTEGER,
    lock: sequelize.INTEGER

})

Course.associate = function(models) {
    Course.belongsTo(models.User, {foreignKey: 'teacherid'}),
    Course.belongsTo(models.Topic, {foreignKey: 'topicid'}),
    Course.belongsTo(models.Outline, {foreignKey: 'outlineid'})
    
};

// db.sync()
// .then(()=>{
//     console.log("Create Course successfully...")
// })

module.exports = Course