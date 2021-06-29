const express = require('express');
const router = express.Router();

var multer = require('multer');
const courseModel = require('../seeders/Course');
const videoModel = require('../seeders/Video');
router.get('/:id', (req, res) => {
    if(req.session.teacher) {
        res.render('postcourse',{banner: 'Upload Course'});
    }
    else {
        res.render('erorr/404');
    }
});

router.post('/:id', (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/img/test/' + file.fieldname)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
    var upload = multer({
        storage: storage
    });
    var Fields = [ 
        { name : 'thumbnail' , maxCount : 1 },
        { name: 'input-image', maxCount: 1 }, 
        { name: 'input-video', maxCount: 1 }
    ]
    upload.any(Fields)(req, res, async function (err) {
        try {
            if (err instanceof multer.MulterError) {
            return console.log("Multer Error : " + err);
        }
        else if (err) {
            return console.log(" Error  normal" + err);
        }
        else {
            const course = {
                namecourse: req.body.namecourse,
                summary: req.body.summary === 0  ? 'No summary for this course' : req.body.summary,
                description: req.body.fullDes.length === 0 ? 'No description for this course' : req.body.fullDes,
                price: req.body.price > 0 ? req.body.price : 0,
                sale: req.body.sale === undefined || req.body.sale === null ? 0 : req.body.sale,
                imagepath: req.files[1].path.replace('public','').replace(/\\/g, "/"),
                thumbnailpath : req.files[0].path.replace('public','').replace(/\\/g, "/"),
                videopath : req.files[2].path.replace('public','').replace(/\\/g, "/"),
                finish : req.body.finish,
                namevideo : 'Preview',
                teacherid: req.params.id,
                topicid: req.body.topicid,
                chapter : 'Preview',
                view : 0,
                rating : 0,
                lock : 0,
            }
            await courseModel.add(course);
            await videoModel.add(course);   
            await res.render('postcourse');
        }
    } catch(err) {
        console.log('erorr/500');
    }
    });
});
module.exports = router