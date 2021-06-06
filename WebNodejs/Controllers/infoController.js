let db = require("../db.js");
let controller = {};
// const pgp = require("pg-promise");




controller.getInfo = (id) => {
  return new Promise((resolve, reject) => {
    var query = `
    SELECT *
	  FROM "Users"
    WHERE "Users".id = '${id}'
`;
    db.query(query)
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};

controller.listcourse = (entity) => {
  return new Promise((resolve, reject) => {
    var list = ` SELECT *
    FROM "Courses"
    WHERE "Courses".teacherid = ${entity} AND "Courses".lock != 1
      `;
    db.query(list)
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};


module.exports = controller;