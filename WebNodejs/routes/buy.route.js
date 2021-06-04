const express = require("express");
const db = require("../db");
const courseUser = require("../models/CourseUser");

const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.user) {
    res.render("signin");
  } else {
    const cart = req.session.cart;
    //  console.log(cart.getCart().items);
    cart.getCart().items.forEach((item) => {
    const courseId = item.item.id
    courseUser.create({courseid: item.item.id, userid: req.session.user.id})
    
      db.query(`UPDATE "Courses"
      SET countregister = countregister + 1
      WHERE "Courses".id = ${courseId}`)
      
    });

    
    // res.send(`<script>alert('Ban dk thanh cong')</script>`);
    res.redirect("listcourses");
  }
});

module.exports = router;
