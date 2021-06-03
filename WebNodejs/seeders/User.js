
// const User = require('../models/User')



// User.create({username: 'Jone',email: 'Jone@gmail.com',pass:'jone',role: 1});
// User.create({username: 'Emly',email: 'Emly@gmail.com',pass:'Emly',role: 1});
// User.create({username: 'Anna',email: 'anna@gmail.com',pass:'Anna',role: 1});
// User.create({username: 'HuynhNhi',email: 'huynhnhi@gmail.com',pass:'huynhnhi',role: 0});

const User = require('../models/User');
let db = require("../db.js");
const TBL_USERS = 'User';
const config = require('../config/default.json');
module.exports = {
  add(entity) {
    User.create({ username: entity.Name, email: entity.Email, password: entity.Password, fullname: entity.Fullname, role: entity.role, check: entity.check });
  },
  update(entity) {
    User.update({ fullname: entity.Name, email: entity.Email, password: entity.Password }, { where: { id: entity.id } });
  },
  update1(entity) {
    User.update({ check: 1 }, { where: { username: entity } });
  },
  all() {
    return db.query(`select * from public."Users"`);
  },
  allTeacher() {
    return db.query(`select * from public."Users" where  "Users"."role"='1'`);
  },
  allStudent() {
    return db.query(`select * from public."Users" where "Users"."check"='1' and "Users"."role"='0'`);
  },
  delTeacher(entity) {
    //User.delete({ where: { username: entity } });
    return db.query(`delete from public."Users" where  "Users"."username"='${entity}'`);
  },
  allbyStudent(offset) {
    return db.query(`select * from public."Users" where "Users"."check"='1' and "Users"."role"='0' limit '${config.pagination.limituser}' offset '${offset}'`);
  },
  async countStudent() {
    const rows = await db.query(`select count(*) as total from public."Users" where "Users"."check"='1' and "Users"."role"='0'`);
    if (rows.length === 0)
      return null;
    else
      return rows[0];

  },
  allbyTeacher(offset) {
    return db.query(`select * from public."Users" where "Users"."role"='1' limit '${config.pagination.limituser}' offset '${offset}'`);
  },
  async countTeacher() {
    const rows = await db.query(`select count(*) as total from public."Users" where "Users"."role"='1'`);
    if (rows.length === 0)
      return null;
    else
      return rows[0];

  },
  async singleByUserName(username) {
    const rows = await db.query(`select *  from public."Users" where "Users"."username" ='${username}'`);
    if (rows.length === 0)
      return null;
    else
      return rows[0];
  },
  async singleByEmail(email) {
    const rows = await db.query(`select *  from public."Users" where "Users"."email" ='${email}' and "Users"."check"='1'`);
    if (rows.length === 0)
      return null;
    else
      return rows[0];
  },
  pageById(entity) {
    return db.query(`select * from public."Users" where  "Users"."role"='1'`);
  },
  lockteacher(id){
    User.update({ lock: 1 }, { where: { id: id } });
  },
  lockstudent(id){
    User.update({ lock: 1 }, { where: { id: id } });
  },
  unlockteacher(id){
    User.update({ lock: 0 }, { where: { id: id } });
  },
  unlockstudent(id){
    User.update({ lock: 0 }, { where: { id: id } });
  },
};