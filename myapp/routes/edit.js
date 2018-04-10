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
    callback(null, file.originalname);
  }
})})
const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();
const functions = require("../public/javascripts/functions");

/* route edit */
router.get("/:topic", (req, res, next) => {
  var userId = req.session.name;
  var topic = req.params.topic;

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

  if (userId === "Administrator") {
    db.selectArticle(topic, (err, articles, fields) => {
      // console.log(articles);
      res.locals.topic = topic;
      res.locals.section = req.query.section;
      res.locals.articles = articles;
      res.render(topic);
    })
  }
  else res.redirect('/project/'+topic+'?error=edit_permission');
});

router.post("/:topic", (req, res, next) => {
  var topic = req.params.topic;
  var article = req.body.text;
  var id = req.query.section;
  db.updateArticle(topic, [article, id], (err, rows, fields) => {
    db.updateTime([new Date(), topic], (err, times, fields) => {
      res.locals.topic = topic;
      res.locals.section = 0;
      res.redirect("/project/" + topic);
    })
  })
});

module.exports = router;
