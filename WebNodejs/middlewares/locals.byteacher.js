const userModel = require('../seeders/User');

module.exports = async function (req, res, next) {
  const rows = await userModel.allTeacher();
  res.locals.lcTeachers = rows[0];
  //console.log(res.locals.lcTeachers);
  //console.log(rows[0]);
  next();
}
