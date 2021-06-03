const db = require('../db')
const sequelize = require('sequelize')

const CourseCart = db.define("CourseCart", {
   
  courseid:sequelize.INTEGER,
   cartid: sequelize.INTEGER

})

CourseCart.associate = function(models) {
    CourseCart.belongsTo(models.Cart, {foreignKey: 'cartid'}),
    CourseCart.belongsTo(models.Course, {foreignKey: 'courseid'})
};


// db.sync()
// .then(()=>{
//     console.log("Create CourseCart successfully...")
// })

module.exports = CourseCart