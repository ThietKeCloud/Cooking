const topicModel = require('../seeders/Topic');

module.exports = async function (req, res, next) {
  const rows = await topicModel.all();
  res.locals.lcTopics = rows[0];
  //console.log(rows[0]);
  next();
}
