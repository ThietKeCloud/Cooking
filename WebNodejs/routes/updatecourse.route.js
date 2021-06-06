const express = require('express');
const router = express.Router();

var multer = require('multer');
const courseModel = require('../Controllers/courseController');
const videoModel = require('../seeders/Video');
router.get('/:id', (req, res) => {
   if(req.session.teacher)
   {
    courseModel.namecourse(req.params.id).then((data) => {
        res.render('updatecourse', { 
            banner: 'Update Course',
            course : data[0],});
    })
   }
   else{
       res.render('erorr/404');
   }
});

router.post('/:id', (req, res) => {
    try {
        let id = req.params.id;
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
        upload.single('input-video')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return console.log("Multer Error : " + err);
            }
            else if (err) {
                return console.log(" Error  normal" + err);
            }
            else {
                const course = {
                    idcourse: id,
                    description: req.body.Desvideo,
                    chapter: req.body.chapter,
                    videopath: req.file.path.replace('public', '').replace(/\\/g, "/"),
                    finish: req.body.finish,
                    namevideo: req.file.originalname.replace('.mp4',''),
                    namecourse : req.body.namecourse,
                }
                // await courseModel.add(course);

                await videoModel.add(course);
                courseModel.namecourse(id).then((data) => {
                    res.render('updatecourse', { 
                        banner: 'Update Course',
                        course : data[0],});
                })
            }
        });
    } catch(error){ res.render('erorr/500')}
});
module.exports = router