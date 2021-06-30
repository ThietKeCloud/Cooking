const sequelize = require('sequelize')
const dotenv = require('dotenv');

dotenv.config();

const db = new sequelize({
    database: "Cook",
    username: "postgres",
    password: process.env.password,
    host: "localhost",
    port: 5432,
    dialect: "postgres",
	
})

db.authenticate()
.then(() => console.log('Connect database successfully'))
.catch(err=> console.log(err))

module.exports = db