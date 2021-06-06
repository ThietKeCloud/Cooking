const express = require('express');
const router = express.Router();
const userModel = require('../seeders/Category');
let Controller = require('../Controllers/categoryController');

router.get('/:course', async (req, res) => {
    var query = req.params.course;
    if(query === null)
        query = 'all';
    Controller.datasearch(query).then(function (data) {
        res.render('category',{
            query: data[0],
            checktopic : true,
        })
    })
    //res.render('category');
});
router.get('/', (req,res) =>{
    Controller.datasearch(query).then(function (data) {
        res.render('category',{
            query: data[0],
            checktopic : true,
        })
    })
})
module.exports = router
