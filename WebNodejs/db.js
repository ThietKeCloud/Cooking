const sequelize = require('sequelize')

const db = new sequelize({
    database: "Cooking",
    username: "postgres",
    password: "Hotien2107",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
	
})

db.authenticate()
.then(() => console.log('Connect database successfully'))
.catch(err=> console.log(err))

module.exports = db