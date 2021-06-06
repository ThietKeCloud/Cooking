let express = require('express');
const controller = require('../Controllers/courseController');
let router = express.Router();
let video = require('../seeders/Video');

router.get('/', (req, res) => {
    let courseController = require('../Controllers/courseController');
    courseController.Topnew()
        .then(function (topnew) {

            controller.mostview().then(function (mostview) {
                courseController.HotCourses()
                    .then(hotcourse => {
                        courseController.Hottopic()
                            .then(hottopic => {
                                // console.log(topnew);
                                video.up();
                                res.render('index',
                                    {
                                        topnew: topnew[0],
                                        mostview: mostview[0],
                                        hotCourse: hotcourse[0],
                                        hottopic: hottopic[0],
                                        empty: topnew[0].length === 0,
                                        user: req.session.user
                                    });
                            })
                    }).catch(console.log('Error Hot Course'))
            }).catch('Error mostview')
        }).catch(console.log('Error top New'));
})

module.exports = router;