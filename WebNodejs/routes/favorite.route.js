const express = require('express');
const Like = require('../models/Like');
const router = express.Router();


router.get('/',(req,res,next)=>{
    favorite = require('../Controllers/favariteController');
    
    favorite.getFavoriteList( req.session.user.id).then(favorite=>{
        // console.log(favorite[0]);
        res.render('Favorite',{banner:'List favorite courses', favorite : favorite[0], check : favorite[0].length === 0 })
    })

});

router.post('/',(req,res,next)=>{
    
    if(req.session.user){
        var courseId = req.body.id; 
        var userid = req.session.user.id;
        var favorite = require('../Controllers/favariteController');
        favorite.getCoures(courseId).then(data=>{
            console.log(data[0]);
            if(data[0]===null || data[0] === undefined)
            {
                Like.create({userid: userid, courseid: courseId});
            }
           
        })
        
    }

});

router.delete('/',(req,res)=>{
    var courseId = req.body.id;
    console.log(courseId);
    Like.destroy({
        where: {courseid: courseId, userid: req.session.user.id}
    })
}); 

module.exports = router;