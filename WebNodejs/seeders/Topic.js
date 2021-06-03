const Topic = require('../models/Topic');
let db = require("../db.js");
const TBL_Topics = 'Topic';
module.exports = {
  add(entity) {
    Topic.create({ nametopic: entity.Name, categoryid: entity.Id });
  },
  // add123(entity) {
  //   return db.query(`INSERT INTO public."Topics" values('${entity.Id}','${entity.Name}')`);
  // },
  all() {
    return db.query(`select * from public."Topics"`);
  },
  allCate(entity) {
    return db.query(`select * from public."Topics" where  "Topics"."categoryid"='${entity}'  ORDER BY "Topics"."id"`);
  },
  del(entity) {
    const condition = entity.id;
    return db.query(`delete from public."Topics" where  "Topics"."id"='${condition}'`);
  },
  patch(entity) {
    const id = entity.id;
    const name = entity.nametopic;
    Topic.update({ nametopic: name }, { where: { id: id } });
  },
 
  // allWithDetails() {
  //   return db.query(`select "Topics".*, count("Categories"."id") as TopicCount
  //     from public."Topics" INNER JOIN public."Categories" ON "Topics"."id"="Categories"."id"
  //     group by "Topics"."id"`);
  // },
   allWithDetails() {
    return db.query(`select "Topics".*
      from public."Courses" INNER JOIN public."Topics" ON "Courses"."id"="Topics"."id"
      WHERE "Courses".lock != 1 group by "Topics"."id","Courses"."id" order by "Topics"."nametopic" `);
  },

  async single(id) {
    const rows = await db.query(`select * from public."Topics" where "Topics"."id" = ${id}`);
    if (rows.length === 0)
      return null;
    else
      return rows[0];
  },
};

