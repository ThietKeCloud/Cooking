const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const userModel = require('../seeders/User');
router.get('/', (req, res) => {
    let user = req.session.user;
    let infoController = require('../Controllers/infoController');
    if (user === undefined)
        res.render('erorr/500');
    else
    {
        infoController.getInfo(user.id).then(function (info) {
            if (user.role === 1) {
                infoController.listcourse(user.id)
                    .then(list => {
                        res.render('info',
                            {
                                user: info[0],
                                list: list[0],
                                empty: list[0].length === 0,
                                checkteacher : true
                            });
                    })
            }
            else {
                res.render('info', {
                    user: info[0],
                })
            }
        })
    }
});
router.post('/', async function (req, res) {
    const password = await req.body.password;
    let user = req.session.user;
    var info, infouser;
    if (password === null || password === undefined) {
        info = {
            id: user.id,
            Name: req.body.name === undefined || req.body.name === null ? req.body.oldName : req.body.name,
            Email: req.body.email === undefined || req.body.email === null ? req.body.oldEmail : req.body.email,
        }
    }
    else {
        const hash = bcrypt.hashSync(password, 10);
        info = {
            id: user.id,
            Name: req.body.name === undefined || req.body.name === null ? req.body.oldName : req.body.name,
            Email: req.body.email === undefined || req.body.email === null ? req.body.oldEmail : req.body.email,
            Password: hash,
        }
    }

    if (password === null || password === undefined) {
        infouser = {
            id: info.id,
            Name: info.Name,
            Email: info.Email
        }
    }
    else {
        infouser = {
            id: info.id,
            Name: info.Name,
            Email: info.Email,
            Password: info.Password,
        }
    }
    console.log(infouser);
    await userModel.update(infouser);
    res.render('index');
})
module.exports = router;