const express = require('express');
const Like = require('../models/Like');
const router = express.Router();


router.get('/',(req,res,next)=>{
    favorite = require('../Controllers/favariteController');
    
    favorite.getFavoriteList( req.session.user.id).then(favorite=>{
        //console.log(favorite[0], favorite[0].length);
        res.render('Favorite',{banner:'Danh sách công thức yêu thích', favorite : favorite[0], check : favorite[0].length === 0 , totalFav: favorite[0].length})
    })

});

router.post('/',(req,res,next)=>{
    
    if(req.session.user){
        var courseId = req.body.id; 
        var userid = req.session.user.id;
        var favorite = require('../Controllers/favariteController');
        favorite.getCoures(courseId).then(data=>{
<<<<<<< HEAD
           // console.log(data);
=======
            console.log(data[0]);
            if(data[0]===null || data[0] === undefined)
            {
                Like.create({userid: userid, courseid: courseId});
            }
>>>>>>> 67c84598a403f039230dc2a3b589ed3a5c07e96d
           
           Like.create({courseid: courseId, userid: userid});
        })
        
    }

});

router.delete('/',(req,res)=>{
    var courseId = req.body.id;
    console.log(courseId);
    Like.destroy({
        where: {courseid: courseId, userid: req.session.user.id, totalFav: favorite[0].length}
    })
}); 

module.exports = router;