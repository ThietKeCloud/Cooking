const sequelize = require('sequelize')
const dotenv = require('dotenv');

dotenv.config();

const db = new sequelize({
    database: "Cook",
    username: "postgres",
<<<<<<< HEAD
    password: 'vuivelavang',
=======

    password: process.env.password,
>>>>>>> 67c84598a403f039230dc2a3b589ed3a5c07e96d
    host: "localhost",
    port: 5432,
    dialect: "postgres",
	
})

db.authenticate()
.then(() => console.log('Connect database successfully'))
.catch(err=> console.log(err))

module.exports = db