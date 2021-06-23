const express = require('express');
const router = express.Router();
const cateModel = require('../seeders/Category');
const courseModel = require('../seeders/Course');
const config = require('../config/default.json')
let Controller = require('../Controllers/categoryController');
router.get('/', (req, res) => {

    Controller.allcate('Mobile').then(function (mobile) {
        Controller.allcate('Web')
            .then(web => {
                //console.log(web[0]);
                res.render('category',
                    {
                        mobile: mobile[0],
                        web: web[0],
                        emptyweb: web[0].length === 0,
                        emptymobile: mobile[0].length === 0,
                        checktopic: false,
                    });
            }).catch(console.log('Error Web'));
    }).catch(console.log('Error Mobile'));
});

router.get('/allcategory', async function (req, res) {
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;
    // const total = courseModel.count();
    // const rows = await courseModel.allbypage(offset);
    const [total, rows] = await Promise.all([
        await courseModel.count(),
        await courseModel.allbypage(offset)
    ])
    const sum = total[0].total;
    const nPages = Math.ceil(sum / config.pagination.limit);
    const page_items = [];
    for (i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page
        }
        page_items.push(item);
    }
    res.render('category', {
        course: rows[0],
        empty: rows[0].length === 0,
        page_items: page_items,
        can_go_prev: page > 1,
        can_go_next: page < nPages,
        prev_value: page - 1,
        next_value: page + 1,
    });
});

router.get('/bytopic/:categoryid/:topicid', async function (req, res) {
    const page = +req.query.page || 1;
    const id = +req.params.topicid;
    const caid = +req.params.categoryid;
    for (const c of res.locals.lcCategories) {
        if (c.id === caid) {
            for (const d of c.level2) {
                if (d.id === id) {
                    d.isActive = true;
                    console.log(d);
                }
            }
        }
    }
        if (page < 0) page = 1;
        const offset = (page - 1) * config.pagination.limit;
        // const total = courseModel.count();
        // const rows = await courseModel.allbypage(offset);
        const [total, rows] = await Promise.all([
            await courseModel.countbytopic(id),
            await courseModel.pagebytopic(id, offset)
        ])
        const sum = total[0].total;
        const nPages = Math.ceil(sum / config.pagination.limit);
        const page_items = [];
        for (i = 1; i <= nPages; i++) {
            const item = {
                value: i,
                isActive: i === page
            }
            page_items.push(item);
        }
        res.render('category', {
            course: rows[0],
            empty: rows[0].length === 0,
            page_items: page_items,
            can_go_prev: page > 1,
            can_go_next: page < nPages,
            prev_value: page - 1,
            next_value: page + 1,
        });
    });

router.get('/bycategory/:categoryid', async function (req, res) {
    const page = +req.query.page || 1;
    const id = +req.params.categoryid;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;
    // const total = courseModel.count();
    // const rows = await courseModel.allbypage(offset);
    const [total, rows] = await Promise.all([
        await courseModel.countbycategory(id),
        await courseModel.pagebycategory(id, offset)
    ])
    const sum = total[0].total;
    const nPages = Math.ceil(sum / config.pagination.limit);
    const page_items = [];
    for (i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page
        }
        page_items.push(item);
    }
    res.render('category', {
        course: rows[0],
        empty: rows[0].length === 0,
        page_items: page_items,
        can_go_prev: page > 1,
        can_go_next: page < nPages,
        prev_value: page - 1,
        next_value: page + 1,
    });
});
router.get('/add', async function (req, res) {
    courseModel.add333();
    res.render('category');
});

module.exports = router