const Searcher = require("../models/Search");
const Course = require("../models/Course");
const config = require('../config/default.json');
const db = require("../db");
let query = `INSERT INTO "Searchers" ( idtopic, idcourse,namecourse , "createdAt","updatedAt")
SELECT cour.topicid , cour.id,cour.namecourse,cour."createdAt",cour."updatedAt"
      FROM "Courses" as cour
      WHERE cour.namecourse not in (SELECT s.namecourse
                                    FROM "Searchers" as s)`;
let update = `UPDATE 
"Searchers"
SET 
nametopic =  "Topics".nametopic
FROM 
"Topics"
WHERE 
"Topics".id = "Searchers".idtopic;`;

let createindex = `
CREATE INDEX idx_seacher ON "Searchers" USING gin(document_vectors);
UPDATE 
    "Searchers" 
SET 
    document_vectors = (to_tsvector(nametopic) || to_tsvector(namecourse));`;
db.query(query);
db.query(update);
db.query(`UPDATE 
    "Searchers" 
SET 
    document_vectors = (to_tsvector(nametopic) || to_tsvector(namecourse));`);
module.exports = {
    query(query, order, offset) {
        db.query(`INSERT INTO "Searchers" ( idtopic, idcourse,namecourse , "createdAt","updatedAt")
        SELECT cour.topicid , cour.id,cour.namecourse,cour."createdAt",cour."updatedAt"
              FROM "Courses" as cour
              WHERE cour.namecourse not in (SELECT s.namecourse
                                            FROM "Searchers" as s)`);
        db.query(`UPDATE 
        "Searchers"
        SET 
        nametopic =  "Topics".nametopic
        FROM 
        "Topics"
        WHERE 
        "Topics".id = "Searchers".idtopic;`);
        db.query(`UPDATE 
        "Searchers" 
    SET 
        document_vectors = (to_tsvector(nametopic) || to_tsvector(namecourse));`);
        if (order === undefined || order === 'Default') {
            var query_string = `SELECT * FROM "Courses" as cour WHERE cour.lock != 1 AND cour.id in 
          (SELECT idcourse 
           FROM "Searchers"
           WHERE document_vectors @@ plainto_tsquery('${query}')) 
           limit '${config.pagination.limituser}' offset '${offset}'`;
        }
        else if (order === 'rating') {
            var query_string = `SELECT * FROM "Courses" as cour WHERE cour.lock != 1 AND cour.id in 
            (SELECT idcourse 
             FROM "Searchers"
             WHERE document_vectors @@ plainto_tsquery('${query}'))
             ORDER BY cour.rating DESC 
             limit '${config.pagination.limituser}' offset '${offset}'
             `;

        }
        else {
            var query_string = `SELECT * FROM "Courses" as cour WHERE cour.lock != 1 AND cour.id in 
            (SELECT idcourse 
             FROM "Searchers"
             WHERE document_vectors @@ plainto_tsquery('${query}'))
             ORDER BY cour.price ASC
             limit '${config.pagination.limituser}' offset '${offset}'
              `;

        }
        return db.query(query_string);
    },
    async counting(query) {
        
            const couting = await db.query(`
             select count(*) as total from public."Courses" as c where c.id in (
                SELECT cour.id FROM "Courses" as cour WHERE cour.lock != 1 AND cour.id in 
                (SELECT idcourse 
                 FROM "Searchers"
                 WHERE document_vectors @@ plainto_tsquery('${query}')) 
             )`);
        
       
        if (couting.length === 0)
            return null;
        else
            return couting[0];
    }
}