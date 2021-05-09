const Recipe = require('../model/Recipe');
const USer = require('../model/User');
const Category = require('../model/Category');
const User = require('../model/User');
const controller = {};

// Trending Product
controller.trendingRecipe = ()=>{
    
    // return new Promise((resolve, reject)=>{
    //     Recipe.findAll({
            
    //         include: {
    //           model: User,
    //           where: {teacherID = User.id}  
    //         }
    //       });
       
    // })
}

controller.lastestRecipe = ()=>{

}

controller.bestSellers = ()=>{
    
}


module.exports = controller;