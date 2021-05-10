const express = require('express');
const router = express.Router();
const recipeController = require('../Controller/recipeController');
const categoryController = require('../Controller/categoryController');


router.get('/', (req, res, next)=>{
    
   categoryController.getCategory()
   .then((category)=>{
    recipeController.trendingRecipe()
    .then((trending)=>{
        recipeController.bestSellers()
        .then((sellers)=>{
            recipeController.lastestRecipe()
            .then((lastest)=>{
                res.json({
                    category: category,
                    trending: trending,
                    sellers: sellers,
                    lastest: lastest
                })
               
            })
            .catch((error)=>{
                console.log("error lastest at indexRoute");
            })
            
        })
        .catch((error)=>{
            console.log("error seller at indexRoute");
        })
    })
    .catch((error)=>{
        console.log(err);
        console.log("error trending at indexRoute");
    })
   })
   .catch((error)=>{
       console.log("error category at index Route");
   })
   
});



module.exports = router;