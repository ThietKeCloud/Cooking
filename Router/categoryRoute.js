const express = require('express');
const router = express.Router();
const categoryController = require('../Controller/categoryController');


router.get('/', (req, res, next)=>{
    
   categoryController.getCategory()
   .then((result) => {
      
       res.send(result);
   }).catch((err) => {
       res.send('error at categoryRoute');
   });
});



module.exports = router;