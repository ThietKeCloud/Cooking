const express = require('express');
const router = express.Router();

router.post('/',(req,res,next)=>{
    let controller = require('../Controllers/reviewController');
    let review = {
        userid: req.session.user.id,
        courseid: req.body.courseid,
        rating: req.body.rating,
        message: req.body.message
    };
    // console.log(req.body.courseid);
    // console.log(req.body.rating);
    // console.log(req.body.message);
    
    controller.add(review).then(data =>{
        res.redirect('/courses/' + review.courseid);
    }).catch(error => next(error)); 
    

}); 



module.exports = router;