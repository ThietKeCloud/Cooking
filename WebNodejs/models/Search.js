const db = require('../db')
const sequelize = require('sequelize');

const Searcher = db.define("Searcher", {
    idtopic : sequelize.INTEGER,
    nametopic: sequelize.TEXT,
    idcourse : sequelize.INTEGER,
    namecourse:sequelize.TEXT,
})

Searcher.associate = function(models) {
    Searcher.belongsTo(models.Topic, {foreignKey: 'idtopic'}),
    Searcher.belongsTo(models.Course, {foreignKey: 'idcourse'})
    
};

// db.sync()
// .then(()=>{
//     console.log("Create User successfully...")
// })
module.exports = Searcher