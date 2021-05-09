const express = require('express');
const router = express.Router();
const recipeController = require('../Controller/recipeController');


router.get('/', (req, res, next)=>{
    
   recipeController.trendingRecipe()
   .then((result)=>{
       res.send(result);
   })
   .catch((err)=>{
       console.log("error at index Route");
   })
   
});



module.exports = router;