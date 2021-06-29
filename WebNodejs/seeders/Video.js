const Video = require('../models/Video');
const Course = require('../models/Course')
let db = require("../db.js");
module.exports = {
  add(entity) {
    console.log('11111111111');
    console.log(entity);
    Video.create({ namevideo : entity.namevideo, videopath : entity.videopath , chapter : entity.chapter,
    description : entity.description[0] , idcourse : entity.idcourse , namecourse : entity.namecourse});
    Course.update({ finish : entity.finish},{where : {namecourse : entity.namecourse}});
    
  },
  update(entity) {
    Video.update({ namevideo : entity.namevideo, videopath : entity.videopath , chapter : entity.chapter,
      description : entity.description[0]},{where : {namecourse : entity.namecourse}})
    
  },
  up(){
    db.query(`UPDATE 
    "Viewvideos"
    SET 
    idcourse =  "Courses".id
    FROM 
    "Courses"
    WHERE 
    "Courses".namecourse = "Viewvideos".namecourse;`);
  },
  async purchase(entity){
    const rows = await db.query(`select * from "CourseUsers" where userid = ${entity.userid} AND courseid = ${entity.courseid}`);
        if (rows.length === 0)
            return null;
        else
            return rows[0];
  }
};