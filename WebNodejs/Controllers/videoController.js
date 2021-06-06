let db = require("../db.js");
let controller = {};


controller.queryid = (entity) => {
    return new Promise((resolve, reject) => {
        var query_string = ` select * from public."Viewvideos" where  "Viewvideos".idcourse='${entity}'  ORDER BY "Viewvideos".id`;
        db.query(query_string)
            .then((data) => resolve(data))
            .catch((error) => console.log(error));
    });
};
controller.querychapter = (entity) => {
    return new Promise((resolve, reject) => {
        var query_string = ` select * from public."Viewvideos" where  "Viewvideos"."chapter"='${entity.chapter}' AND "Viewvideos"."idcourse" = '${entity.id}'`;
        db.query(query_string)
            .then((data) => resolve(data))
            .catch((error) => console.log(error));
    });
};
controller.queryidlimit = (entity) => {
    return new Promise((resolve, reject) => {
        var query_string = ` select * from public."Viewvideos" where  "Viewvideos".idcourse='${entity}'  ORDER BY "Viewvideos".id LIMIT 3`;
        db.query(query_string)
            .then((data) => resolve(data))
            .catch((error) => console.log(error));
    });
};
controller.purchase = (entity) => {
    return new Promise((resolve,reject) => {
        var query = `select * from "CourseUsers" where userid = ${entity.userid} AND courseid = ${entity.courseid}`;
        db.query(query).then((data) => resolve(data))
        .catch((error) => console.log(error));
    })
}
controller.owner = (entity) => {
    return new Promise((resolve,reject) => {
        var query = `select * from "Courses" where "Courses".lock != 1 AND id = ${entity.courseid} AND teacherid = ${entity.userid}`;
        db.query(query).then((data) => resolve(data))
        .catch((error) => console.log(error));
    })
}


module.exports = controller;
