let db = require("../db.js");
let favorite = require("../models/Like");

let controller = {};

// let favorite = `select "Courses".*, "Topics".nametopic, "Users".username from ("Courses" join "Topics" on "Courses".topicid ="Topics".id) join "Users"
// on "Courses".teacherid = "Users".id join "Likes" on "Courses".id = "Likes".courseid
// where "Users".role = 1 and "Like".userid = userid `;

controller.getFavoriteList = (userid) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select distinct "Courses".*, "Topics".nametopic, "Users".fullname from ("Courses" join "Topics" on "Courses".topicid ="Topics".id) join "Users"
        on "Courses".teacherid = "Users".id join "Likes" on "Courses".id = "Likes".courseid
        where "Users".role = 1 and "Likes".userid = ${userid}`
    )
      .then((data) => resolve(data))
      .catch((error) => console.log("error favorite controller"));
  });
};


controller.getCoures = (courseid) => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    favorite.findOne({
        where: 
        { courseid: id
        }
=======
    favorite
      .findOne({
        where: { courseid: courseid },
>>>>>>> 67c84598a403f039230dc2a3b589ed3a5c07e96d
      })
      .then((data) => resolve(data))
      .catch((error) => log(error));
  });
};


controller.removeFavorite = (courseid)=>{
    return new Promise((resolve, reject) => {
        favorite
          .findOne({
            where: { courseid: courseid },
          })
          .then((data) => resolve(data))
          .catch((error) => log(error));
      });
}

module.exports = controller;
