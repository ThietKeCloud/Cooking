const sequelize = require('sequelize')

const db = new sequelize({
    database: "Cook",
    username: "postgres",
<<<<<<< HEAD
    password: "vuivelavang",
=======
    password: "Hotien2107",
>>>>>>> e075c85c21443840cc900f7bc8166be3a97cc59d
    host: "localhost",
    port: 5432,
    dialect: "postgres",
	
})

db.authenticate()
.then(() => console.log('Connect database successfully'))
.catch(err=> console.log(err))

module.exports = db