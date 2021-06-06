const express = require('express');
const router = express.Router();
const userModel = require('../seeders/Category');
const Searchmodel = require('../seeders/Search');
const Coursemodel = require('../seeders/Course');
const config = require('../config/default.json');
const { off } = require('npm');
var query;
//var final = JSON.parse(JSON.stringify(await Coursemodel.allCate(t[i].id)));

router.get('/', async (req, res) => {
    const query_search = req.query.searching;
    const order = req.query.order;
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limituser;
    // const [total, rows] = await Promise.all([
    //     await userModel.countStudent(),
    //     await userModel.allbyStudent(offset)
    //   ])
    const [total, search, newcourse, hot] = await Promise.all([
        await Searchmodel.counting(query_search),
        await Searchmodel.query(query_search,order,offset),
       await Coursemodel.new(),
       await Coursemodel.hot(),
      ])
      //console.log(new[0]);
    const sum = total[0].total;
    const nPages = Math.ceil(sum / config.pagination.limituser);
    const page_items = [];
    for (i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page
        }
        page_items.push(item);
    }
    for (i = 0; i < search[0].length; i++){
        for(j=0;j <newcourse[0].length;j++){
            if(search[0][i].id==newcourse[0][j].id)
            search[0][i].new=1;
        }
    }
    for (i = 0; i < search[0].length; i++){
        for(j=0;j <hot[0].length;j++){
            if(search[0][i].id==hot[0][j].id)
            search[0][i].hot=1;
        }
    }
//console.log(new[0][0]);
console.log(search[0][0]);

  
  
    
    console.log('query : ' + query_search);
        res.render('search', {
            course: search[0],
            empty: search[0].length === 0,
            checksearch: true,
            searching: query_search,
            rating: order === 'rating',
            price: order === 'price',
            page_items: page_items,
            can_go_prev: page > 1,
            can_go_next: page < nPages,
            prev_value: page - 1,
            next_value: page + 1,
           
        
    })
    //res.render('category');
    
});
module.exports = router