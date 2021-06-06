const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/videoController');
const Videomodel = require('../seeders/Video');


router.get('/:id/:chapter', (req, res) => {
  let user = req.session.user;
  if (user === null || user === undefined) {
    Controller.queryidlimit(req.params.id).then(function (data) {
      var singlevideo = {
        chapter: req.params.chapter,
        id: req.params.id,
      }
      Controller.querychapter(singlevideo).then(function (video) {
        console.log(data[0]);
        res.render('viewvideo', {
          list: data[0],
          video: video[0],
          listnull: data[0].length === 0,
        });
      });

    });
  }
  else {
    const entity = {
      userid: user.id,
      courseid: req.params.id,
    }
    Controller.owner(entity).then(function (checkowner) {
      if (checkowner[0].length === 0) {
        Controller.purchase(entity).then(function (checkpurchase) {
          if (checkpurchase[0].length === 0) {
            Controller.queryidlimit(req.params.id).then(function (data) {
              var singlevideo = {
                chapter: req.params.chapter,
                id: req.params.id,
              }
              Controller.querychapter(singlevideo).then(function (video) {
                console.log(data[0]);
                res.render('viewvideo', {
                  list: data[0],
                  video: video[0],
                  listnull: data[0].length === 0,
                });
              });

            });
          }
          else {
            Controller.queryid(req.params.id).then(function (data) {
              var singlevideo = {
                chapter: req.params.chapter,
                id: req.params.id,
              }
              {
                Controller.querychapter(singlevideo).then(function (video) {
                  console.log(data[0]);
                  res.render('viewvideo', {
                    list: data[0],
                    video: video[0],
                    listnull: data[0].length === 0,
                  });
                });
              }

            });
          }

        });
      }
      else {
        {
          Controller.queryid(req.params.id).then(function (data) {
            var singlevideo = {
              chapter: req.params.chapter,
              id: req.params.id,
            }
            {
              Controller.querychapter(singlevideo).then(function (video) {
                console.log(data[0]);
                res.render('viewvideo', {
                  list: data[0],
                  video: video[0],
                  listnull: data[0].length === 0,
                });
              });
            }
          });
        }
      }
    })

  }
});
module.exports = router
