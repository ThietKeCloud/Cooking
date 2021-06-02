const Recipe = require('../model/Recipe');
const USer = require('../model/User');
const Category = require('../model/Category');
const User = require('../model/User');
const db = require('../db');
const controller = {};


// Trending recipe
const trending = `select "Recipes".*, "Categories".namecategory, "Users".username from ("Recipes" join "Categories" on "Recipes"."categoryId" ="Categories".id) join "Users"
on "Recipes"."teacherID" = "Users".id 
where "Users".role = 1 AND "Recipes".lock != 1
order by rating DESC
LIMIT 10`;



controller.trendingRecipe = ()=>{
    
    return new Promise((resolve, reject)=>{
        
       db.query(trending)
       .then((result) => {
           
           resolve(result[0]);
       }).catch((error) => {
           console.log("error at recipe controller");
       });
    })
}


const lastest =  `select "Recipes".*, "Categories".namecategory, "Users".username from ("Recipes" join "Categories" on "Recipes"."categoryId" ="Categories".id) join "Users"
on "Recipes"."teacherID" = "Users".id 
where "Users".role = 1 AND "Recipes".lock != 1
order by "createdAt" DESC
LIMIT 10`
controller.lastestRecipe = ()=>{

    return new Promise((resolve, reject)=>{
        db.query(lastest)
        .then((result)=>{
            resolve(result[0]);
        })
        .catch((error)=>{
            console.log("error lastest at recipe controller");
        })
    })
}

// best seller 
const bestSeller = `select "Recipes".*, "Categories".namecategory, "Users".username from ("Recipes" join "Categories" on "Recipes"."categoryId" ="Categories".id) join "Users"
on "Recipes"."teacherID" = "Users".id 
where "Users".role = 1 AND "Recipes".lock != 1
order by "numberBuyers" DESC
LIMIT 10`
controller.bestSellers = ()=>{
    return new Promise((resolve, reject)=>{
        db.query(bestSeller)
        .then((result)=>{
            resolve(result[0]);
        })
        .catch((error)=>{
            console.log("error sellers at recipe controller");
        })
    })
}





module.exports = controller;