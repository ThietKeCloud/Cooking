let controller = {};
let Review = require("../models/Review");
let Course = require("../models/Course");
let Sequelize = require("sequelize");
let op = Sequelize.Op;

controller.add = (review) => {
  return new Promise((resolve, reject) => {
    Review.create(review)
      .then((data) => {
        Review.findAll().then((reviews) => {
          console.log(reviews);
          let stars = [];
          for (let index = 1; index <= 5; index++) {
            stars.push(reviews.filter((item) => item.rating === index).length);
          }
          return Course.findOne({
            where: { id: review.courseid },
          }).then((course) => {
            let s = 0;
            let n = 0;
            for (let i = 0; i < 5; i++) {
              s = s + stars[i] * (i + 1);
              n = n + stars[i];
            }
       
            
            let rating = Math.round( s / n * 10) / 10
            return Course.update(
              {
                rating: rating,
                reviewcount: n,
              },
              { where: { id: course.id } }
            );
          });
        });
      })
      .then((data) => resolve(data))
      .catch((error) => console.log("Error review controller"));
  });
};

module.exports = controller;

// controller.add = (review)=>{
//     return new Promise((resolve,reject)=>{
//        Review.findOne({
//            where: {
//                userid: review.userid,
//                courseid: review.courseid
//            }
//        }).then(data =>{
//            if(data)
//            {
//                return Review.update(review,{
//                    where: {
//                     userid: review.userid,
//                     courseid: review.courseid
//                    }
//                })
//            }
//            else{
//                return Review.create(review);
//            }

//        }).then(data => {
//            Course.findOne({
//                where: {id: review.courseid}
//            }).then(course=>{

//            })

//        })
//           .catch(error => console.log('error review controller'));
//     });
// }
