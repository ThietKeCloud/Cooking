const db = require('../db')
const sequelize = require('sequelize')


const Topic = db.define("Topic", {
    nametopic: sequelize.STRING,
    categoryid:sequelize.INTEGER,
    counting : sequelize.INTEGER ,// So luong dang ky cua khoa hoc trong tuan
    image: sequelize.STRING
})

Topic.associate = function(models) {
    Topic.belongsTo(models.Category, {foreignKey: 'categoryid'})
};

// db.sync()
// .then(()=>{
//     console.log("Create User successfully...")
// })

module.exports = Topic