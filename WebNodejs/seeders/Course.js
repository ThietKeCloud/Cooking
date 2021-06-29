



// db =  require('../models/Course.js');

// db.create(
//   // {namecourse: "Lam chu java", price: 20, slhvdg: 10,rating: 4.7, topicid: 1,teacherid: 1},
//   {namecourse: "Lam chu Python", price: 15, slhvdg: 20,rating: 5, topicid: 2,teacherid: 2},
//   // {namecourse: "Lam chu c#", price: 20, slhvdg: 10,rating: 4.5, topicid: 3,teacherid: 1}
// )
// db.create(
//   {namecourse: "Lam chu java", price: 20, slhvdg: 10,rating: 4.7, topicid: 1,teacherid: 1},
//   // {namecourse: "Lam chu javascript", price: 15, slhvdg: 20,rating: 4.8, topicid: 2,teacherid: 2},
//   {namecourse: "Lam chu c#", price: 20, slhvdg: 10,rating: 4.5, topicid: 3,teacherid: 1}
// )

// // db.sync({force: true}).then(function () {
// //     // Add data
// //   //  db.bulkCreate([
// //   //       { namecourse: 'Java', topicid: 5,imagepath: 'picture1' },
// //   //       { namecourse: 'HTML + CSS', topicid: 7,imagepath: 'picture2'},
// //   //       { namecourse: 'Javascript', topicid: 9,imagepath: 'picture3',},
// //   //       { namecourse: 'Android', topicid: 2,imagepath: 'picture4',},
// //   //       { namecourse: 'C++', topicid: 10,imagepath: 'picture5',},
// //   //       { namecourse: 'C#', topicid: 11,imagepath: 'picture6',},
// //   //       { namecourse: 'Ruby', topicid: 20,imagepath: 'picture7',},
// //   //       { namecourse: 'Nodejs', topicid: 21,imagepath: 'picture8',},
// //   //     ]).then(function() {
// //   //     });

// //       console.log('Add data success to table Course');

// //       db.bulkCreate([
// //         { namecourse: 'New Boottrap 4', topicid: 3,imagepath: 'picture1' },
// //         { namecourse: 'Reactjs + Angular + Nodejs', topicid: 7,imagepath: 'picture2'},
// //         { namecourse: 'Javascript + BT', topicid: 9,imagepath: 'picture3',},
// //         { namecourse: 'C++ ML', topicid: 10,imagepath: 'picture3',},
// //         { namecourse: 'Python ML', topicid: 8,imagepath: 'picture4',},
// //         { namecourse: 'MySQL + Nodejs', topicid: 1,imagepath: 'picture5',}

// //       ]).then(function() {
// //       });
// // });

// const Course = require('../models/Course');
// module.exports = {
//   add(entity) {
//     Course.create({ namecourse: entity.namecourse, sumary: entity.summary, imagepath: entity.imagepath, description: entity.description,
//        price: entity.price , sale : entity.sale , teacherid : entity.teacherid , topicid : entity.topicid });
//   }
// };

// // Update data
const Topic = require('../models/Topic');
const Course = require('../models/Course');
let db = require("../db.js");
const config = require('../config/default.json');
const TBL_CourseS = 'Course';
module.exports = {
    add(entity) {
        Course.create({
            namecourse: entity.namecourse, sumary: entity.summary, description: entity.description[0],
            price: entity.price, sale: entity.sale, imagepath: entity.imagepath, thumbnailpath: entity.thumbnailpath, teacherid: entity.teacherid
            , topicid: entity.topicid, finish: entity.finish, view: entity.view, rating: entity.rating, lock : entity.lock
        });

    },
    update1(entity) {
        Course.update({ check: 1 }, { where: { Coursename: entity } });
    },
    all() {
        return db.query(`select * from public."Courses" WHERE "Courses".lock != 1`);
    },
    allbypage(offset) {
        return db.query(`select * from public."Courses" limit '${config.pagination.limit}' offset '${offset}'`);
    },

    pagebytopic(topicid, offset) {
        return db.query(`select * from public."Courses" where "Courses"."topicid"='${topicid}' limit '${config.pagination.limit}' offset '${offset}'`);
    },
    pagebycategory(categoryid, offset) {
        return db.query(`select * from public."Topics" INNER JOIN public."Courses" ON "Topics"."id"="Courses"."topicid" where "Topics"."categoryid"='${categoryid}'  limit '${config.pagination.limit}' offset '${offset}'`);
    },
    pagebyteacher(teacherid, offset) {
        return db.query(`select * from public."Courses" where "Courses"."teacherid"='${teacherid}' limit '${config.pagination.limit}' offset '${offset}'`);
    },
    add333() {
        Topic.create({ nametopic: 'Android', categoryid: 2, counting: 2 });
    },
    new() {
        return db.query(`select id from public."Courses" WHERE "Courses".lock != 1  ORDER BY "Courses"."createdAt" DESC limit 2`);
    },
    hot() {
        return db.query(`select id from public."Courses"  WHERE "Courses".lock != 1 ORDER BY "Courses"."countregister" DESC limit 2`);
    },
    delete(id) {
        return db.query(`delete from public."Courses" where  "Courses"."id"='${id}'`);
    },
    async count() {
        const rows = await db.query(`select count(*) as total from public."Courses"`);
        if (rows.length === 0)
            return null;
        else
            return rows[0];

    },
    async countbytopic(topicid) {
        const rows = await db.query(`select count(*) as total from public."Courses" where "Courses"."topicid"='${topicid}' AND "Courses".lock != 1`);
        if (rows.length === 0)
            return null;
        else
            return rows[0];

    },
    async countbycategory(categoryid) {
        const rows = await db.query(`select count(*) as total from public."Topics" INNER JOIN public."Courses" ON "Topics"."id"="Courses"."topicid" where "Topics"."categoryid"='${categoryid}' AND "Courses".lock != 1`);
        if (rows.length === 0)
            return null;
        else
            return rows[0];

    },
    async countbyteacher(teacherid) {
        const rows = await db.query(`select count(*) as total from public."Courses" where "Courses"."teacherid"='${teacherid}' AND "Courses".lock != 1`);
        if (rows.length === 0)
            return null;
        else
            return rows[0];

    },

    async singleByCourseName(Coursename) {
        const rows = await db.query(`select *  from public."Courses" where "Courses"."Coursename" ='${Coursename}' AND "Courses".lock != 1`);
        if (rows.length === 0)
            return null;
        else
            return rows[0];
    },
    async singleByEmail(email) {
        const rows = await db.query(`select *  from public."Courses" where "Courses"."email" ='${email}' and "Courses"."check"='1' AND "Courses".lock != 1`);
        if (rows.length === 0)
            return null;
        else
            return rows[0];
    },
    pageById(entity) {
        return db.query(`select * from public."Courses" where  "Courses"."role"='1' AND "Courses".lock != 1`);
    }
    ,
    updateview(entity) {
        return db.query(`UPDATE public."Courses" SET
        view = view + 1 WHERE
        id = ${entity} AND "Courses".lock != 1`)
    },
    lockcourse(id) {
        Course.update({ lock: 1 }, { where: { id: id } });
    },
    unlockcourse(id) {
        Course.update({ lock: 0 }, { where: { id: id } });
    },
};

