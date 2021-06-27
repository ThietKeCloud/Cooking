let db = require("../db.js");
const router = require("../routes/search.route");
let controller = {};
// const pgp = require("pg-promise");

controller.datasearch = (query, order) => {
  return new Promise((resolve, reject) => {
    if (order === undefined || order === "Default") {
      var query_string = `SELECT * FROM "Courses" as cour WHERE cour.lock != 1 AND cour.id in 
    (SELECT idcourse 
     FROM "Searchers"
     WHERE document_vectors @@ plainto_tsquery('${query}'))`;
    } else if (order === "rating") {
      var query_string = `SELECT * FROM "Courses" as cour WHERE cour.lock != 1 AND cour.id in 
      (SELECT idcourse 
       FROM "Searchers"
       WHERE document_vectors @@ plainto_tsquery('${query}'))
       ORDER BY cour.rating DESC `;
    } else {
      var query_string = `SELECT * FROM "Courses" as cour WHERE cour.lock != 1 AND cour.id in 
      (SELECT idcourse 
       FROM "Searchers"
       WHERE document_vectors @@ plainto_tsquery('${query}'))
       ORDER BY cour.price ASC `;
    }
    db.query(query_string)
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};

module.exports = controller;
