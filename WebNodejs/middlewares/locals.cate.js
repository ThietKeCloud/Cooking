const categoryModel = require('../seeders/Category');
const topicModel = require('../seeders/Topic');
module.exports = async function (req, res, next) {
  const rows = await categoryModel.all1();
  const t=rows[0];
 // console.log(t);
  for (var i = 0; i < t.length; i++) {
    //console.log("level2",await topicModel.allCate(t[i].id))
    var final = JSON.parse(JSON.stringify(await topicModel.allCate(t[i].id)));
    t[i].level2= final[0];

  }
  res.locals.lcCategories = t;
 
  next();
}
