let db = require("../db.js");
let controller = {};
// const pgp = require("pg-promise");


controller.datasearch = (query) => {
  return new Promise((resolve, reject) => {
    var query_string = `SELECT *
    FROM "Courses" AS cate , "Topics" as topic
    WHERE cate.topicid = topic.id AND topic.nametopic = '${query}' AND cate.lock != 1`;
    db.query(query_string)
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
};

controller.allcate = (category) => {
    return new Promise((resolve, reject) => {
        var query_string = `SELECT cate.namecategory , topic.nametopic
        FROM "Categories" AS cate , "Topics" as topic
        WHERE topic.categoryid = cate.id AND cate.namecategory = '${category}' `;
        db.query(query_string)
          .then((data) => resolve(data))
          .catch((error) => console.log(error));
      });
}

module.exports = controller;