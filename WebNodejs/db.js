const sequelize = require('sequelize')

const db = new sequelize({
    database: "postgres1",
    username: "postgres",
    password: "10082000a",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
	
})

db.authenticate()
.then(() => console.log('Connect database successfully'))
.catch(err=> console.log(err))

module.exports = db