const Category = require('../model/Category');
const controller = {};


controller.getCategory = ()=>{
    return new Promise((resolve, reject)=>{
        Category.findAll()
        .then((result)=>{
            resolve(result);
        })
        .catch((err)=>{
            console.log("error at categoryController");
        })
    })
}

module.exports = controller;