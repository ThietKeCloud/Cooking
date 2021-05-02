const sequelize = require('sequelize')

const db = new sequelize({
    database: "Cooking",
    username: "postgres",
    password: "vuivelavang",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
	
})

db.authenticate()
.then(() => console.log('Connect database successfully'))
.catch(err=> console.log(err))

module.exports = db