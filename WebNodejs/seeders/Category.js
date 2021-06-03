const Category = require('../models/Category');
let db = require("../db.js");
const TBL_CategorieS = 'Categorie';
const config = require('../config/default.json');




module.exports = {
  add(entity) {
    Category.create({ namecategory: entity });
  },

  all() {
    return db.query(`select * from public."Categories" ORDER BY "Categories"."id" `);
  },
  all1() {
    return db.query(`select "Categories".*, count("Categories"."id") as length from public."Categories" group BY "Categories"."id"`);
  },
  del(entity) {
    const condition = entity.id;
    return db.query(`delete from public."Categories" where  "Categories"."id"='${condition}'`);
  },
  patch(entity) {
    const id = entity.id;
    const name=entity.namecategory;
    Category.update({ namecategory: name }, { where: { id: id } });
  },
  allbyCategory(offset) {
    return db.query(`select * from public."Categories" limit '${config.pagination.limituser}' offset '${offset}'`);
  },
  async countCategory() {
    const rows = await db.query(`select count(*) as total from public."Categories"`);
    if (rows.length === 0)
      return null;
    else
      return rows[0];

  },
  async single(id) {
    const rows = await db.query(`select * from public."Categories" where "Categories"."id" = ${id}`);
    
    if (rows.length === 0)
      return null;
    else
      return rows[0];
  },
};

