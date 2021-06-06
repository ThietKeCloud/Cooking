const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    list = require('../Controllers/courseController');
    list.getListCourse( req.session.user.id).then(list=>{
        console.log(list);
        res.render('listcourses',{banner:'List My Courses', listcourse : list[0],checkcourse : list[0].length === 0 })
    })
})

module.exports = router;