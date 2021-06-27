const db = require('../db')
const sequelize = require('sequelize')
const Like = db.define("Like", {
   
   courseid:sequelize.INTEGER,
   userid: sequelize.INTEGER

})

Like.associate = function(models) {
    Like.belongsTo(models.User, {foreignKey: 'userid'}),
    Like.belongsTo(models.Course, {foreignKey: 'courseid'})
};


// db.sync()
// .then(()=>{
//     console.log("Create Like successfully...")
// })

module.exports = Like