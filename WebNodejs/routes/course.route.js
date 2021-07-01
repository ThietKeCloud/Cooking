const express = require("express");
const controller = require("../Controllers/courseController");
const router = express.Router();
const courseuserController = require("../Controllers/courseController");
const Coursemodel = require("../seeders/Course");

router.get("/:id", (req, res, next) => {
  Coursemodel.updateview(req.params.id);
  const courseController = require("../Controllers/courseController");
  controller.Getinfo(req.params.id).then((data) => {
  courseController
    .getById(req.params.id)
    .then((course) => {
      res.locals.course = course;
      
      if (req.params.id) {
        req.session.id = req.params.id;
      }
      if (!req.session.user) {
        courseController.getSameTopic(course[0].topicid).then((result1) => {
          res.locals.sameCourse = result1[0];
            res.render("detailCourse", {
              banner: "Detail Course",
              star: course.stars,
              data : data[0],
              checkchapter : data[0].length === 0
            });
        });
      } else {
        courseuserController
          .isRegistered(req.session.user.id, req.params.id)
          .then((courseuser) => {
            // res.locals.sameCourse = result1[0];
            res.locals.isRegistered = courseuser;
          })
          .then((result) => {
            courseController.getSameTopic(course[0].topicid).then((result1) => {
              res.locals.sameCourse = result1[0];
                res.render("detailCourse", {
                  banner: "Detail Course",
                  star: course.stars,
                  data : data[0],
                  checkchapter : data[0].length === 0,
                });
            });
          });
      }
      // console.log(course);
      // console.log(course.stars);
      // res.render('detailCourse',{banner: 'Detail Course', star: course.stars });
      // console.log(course);
      
    })
    .catch((error) => console.log("error: /:id"));
  }).catch((error) => console.log("error"));
});

module.exports = router;
