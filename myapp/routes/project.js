const express = require('express');
const router = express.Router();
const myapp = require('../myapp');
const db = require('../database')(router);
const multer = require('multer');
const upload = multer({storage:multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, 'uploads')
  },
  filename: function(req, file, callback){
    callback(null, file.Originalname)
  }
})})
const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();
const functions = require("../public/javascripts/functions");

/* route projects */
router.get("/:topic", (req, res, next) => {
  
  var topic = req.params.topic

  /* error message */
  if(req.query.error) res.locals.error = req.query.error;
  else res.locals.error = '';

  /* login | register */
  if(req.session.account) res.locals.account = req.session.account;
  else res.locals.account= 'login';
  // console.log(req.locals.account);

  /* userId */
  if(req.session.name) res.locals.userId = req.session.name;
  else res.locals.userId = 0;

  db.selectArticle(topic, (err, articles, fields) => {
    db.selectTime([topic], (err, times, fields) => {
      res.locals.topic = topic;
      res.locals.articles = articles;
      if (times[0]) res.locals.time = functions.saveTime(times[0].time);
      // search and mark
      if (req.query.keyword && req.query.pos) {
        res.locals.keyword = req.query.keyword;
        res.locals.pos = req.query.pos;
      }
      res.render(topic);
    });
  });
});

module.exports = router;
