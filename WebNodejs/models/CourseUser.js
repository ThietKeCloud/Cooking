const db = require('../db')
const sequelize = require('sequelize')


const CourseUser = db.define("CourseUser", {

    courseid: sequelize.INTEGER,
    userid: sequelize.INTEGER


})

CourseUser.associate = function(models) {
    CourseUser.belongsTo(models.User, {foreignKey: 'userid'}),
    CourseUser.belongsTo(models.Course, {foreignKey: 'courseid'})
  
    
};

//db.sync()
//.then(()=>{
//    console.log("Create CourseUser successfully...")
//})

module.exports = CourseUser