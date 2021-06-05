let db = require("../db.js");
let CourseUser = require("../models/CourseUser");
let controller = {};

// const pgp = require("pg-promise");



var today = new Date();
if (today.getDay() == 4){ db.query('update "Topics" as T set counting=(select sum(slhvdg) from public."Courses" as C where C.topicid=T.id)');
console.log(today);
}
if(today.getDay() == 4){ db.query('update "Courses" set "Courses".slhvdg=0');
console.log(today);
}



var topnew_query = `select "Courses".*, "Topics".nametopic, "Users".username from ("Courses" join "Topics" on "Courses".topicid ="Topics".id) join "Users"
on "Courses".teacherid = "Users".id 
where "Users".role = 1 AND "Courses".lock != 1
order by "updatedAt" DESC
LIMIT 10
`;
var mostview_query = `
select "Courses".*, "Topics".nametopic, "Users".username from ("Courses" join "Topics" on "Courses".topicid ="Topics".id) join "Users"
on "Courses".teacherid = "Users".id 
where "Users".role = 1 AND "Courses".lock != 1
order by view DESC
LIMIT 10
`;

var hotcourse_query = `select "Courses".*, "Topics".nametopic, "Users".username from ("Courses" join "Topics" on "Courses".topicid ="Topics".id) join "Users"
on "Courses".teacherid = "Users".id 
where "Users".role = 1 AND "Courses".lock != 1
order by rating DESC
LIMIT 3`;

var hottopic_query = ` SELECT *
FROM "Topics"
ORDER BY "counting" DESC
LIMIT 4
`;

controller.mostview = () => {
  return new Promise((resolve, reject) => {
    db.query(mostview_query)
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};

controller.Topnew = () => {
  return new Promise((resolve, reject) => {
    db.query(topnew_query)
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};

controller.HotCourses = () => {
  return new Promise((resolve, reject) => {
    db.query(hotcourse_query)
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};

controller.Hottopic = () => {
  return new Promise((resolve, reject) => {
    db.query(hottopic_query)
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};

// detail
controller.getById = (id) => {
  return new Promise((resolve, reject) => {
    let course;
    db.query(
      `select "Courses".*, "Topics".nametopic, "Users".fullname,"Users".email from ("Courses" join "Topics" on "Courses".topicid ="Topics".id) join "Users"
    on "Courses".teacherid = "Users".id 
    where "Courses".id = ${id} and "Users".role = 1 AND "Courses".lock != 1`
    )
      .then((result) => {
        course = result[0];

        return db.query(
          `select RV.*, US.username from "Reviews" as RV join "Users" as US on RV.userid = US.id where RV.courseid = ${id}`
        );
      })
      .then((review) => {
        course.reviews = review[0];
        let stars = [];
        for (let index = 1; index <= 5; index++) {
          stars.push(review[0].filter((item) => item.rating === index).length);
        }
        course.stars = stars;

        // console.log(stars);
        resolve(course);
      })
      .catch((error) => console.log("Error findOne Course"));
  });
};

// kiem tra nguoi dung co dk khoa hc co id =?
controller.isRegistered = (userid, courseid) => {
  // console.log(courseid);
  // console.log(userid);
  return CourseUser.findOne({
    where: { courseid: courseid, userid: userid },
  });
};

// tìm những khóa học cùng topic
controller.getSameTopic = (topicId) => {
  return db.query(
    `select * from "Courses" where "Courses".topicid = ${topicId} AND "Courses".lock != 1`
  );
};

// tim khoa hoc cuar user co id = userid da dk
controller.getListCourse = (userid) => {
  return db.query(`select "Courses".*, "Topics".nametopic, "Users".username from ("Courses" join "CourseUsers" on "Courses".id = "CourseUsers".courseid) join "Topics" on "Courses".topicid ="Topics".id join "Users"
  on "Courses".teacherid = "Users".id where "CourseUsers".userid = ${userid} and "Users".role = 1 AND "Courses".lock != 1`);
};
controller.namecourse = (entity) => {
    return db.query(`select * from public."Courses" where id = ${entity} AND "Courses".lock != 1`);
};
controller.Getinfo = (entity) => {
  return new Promise((resolve, reject) => {
    
    db.query(`SELECT * FROM "Viewvideos" WHERE idcourse = ${entity}`)
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};
module.exports = controller;

// db.multi(topnew_query + ";" + mostview_query)
//     .then((topnew, mostview) => {
//       console.log(data.topnew);
//       console.log(data.mostview);
//     })
//     .catch(error => {
//         console.log(error);
//     });
//   module.exports = db;

// db.tx('get-everything', async t => {
//   const topnew = await t.any(topnew);
//   const mostview = await t.one(mostview);
//   return { topnew, mostview };
// })
//   .then((topnew, mostview) => {
//     console.log(data.topnew);
//     console.log(data.mostview);
//   })
//   .catch(error => {
//     console.log(error);
//   });
