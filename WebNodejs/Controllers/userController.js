let User = require('../models/User');
let controller = {}; 
var bcrypt = require('bcryptjs');

controller.getUserByUsername = (user)=>{
  
    return User.findOne({
        where: {username: user}
    })
}

controller.comparePassword = (password, hash)=>{
   
 
    return bcrypt.compareSync(password, hash);
  

};

module.exports = controller;
