module.exports = function(app){

  const express = require("express");
  const router = express.Router();
  const myapp = require("../myapp");
  const multer = require('multer');
  const upload = multer({storage:multer.diskStorage({
    destination: function(req, file, callback){
      callback(null, 'uploads');
    },
    filename: function(req, file, callback){
      callback(null, file.originalname);
    }
  })
  });
  const db = require("../database")(router);
  const bkfd2Password = require('pbkdf2-password');
  const hasher = bkfd2Password();
  const functions = require("../public/javascripts/functions");

  
  /* GET home page. */
  router.get("/", (req, res, next) => {  

    /* error message */
    if(req.query.error) res.locals.error = req.query.error;
    else res.locals.error = '';
  
    /* login | register */
    if(req.session.account) res.locals.account = req.session.account;
    else res.locals.account= 'login';
  
    /* userId */
    if(req.session.name) res.locals.userId = req.session.name;
    else res.locals.userId = 0;
  
    /* thumb & count */
    // if (req.session.thumb === 'undefined') req.session.thumb = 0;
    // if (req.query.thumb) {
    //   if (!req.session.thumb) {
    //     db.selectThumbcount(['thumb_count'], (err, count, fields) => {
    //       db.updateThumbcount([++count[0].value, 'thumb_count'], (err, row, fields) => {
    //         req.session.thumb = 1;
    //       })
    //     })
    //   }
    //   else {
    //     db.selectThumbcount(['thumb_count'], (err, count, fields) => {
    //       db.updateThumbcount([--count[0].value, 'thumb_count'], (err, row, fields) => {
    //         req.session.thumb = 0;
    //       })
    //     })
    //   }
    // }
    // else res.locals.thumb = req.session.thumb;
    
    // req.session.save(() => {
    //   db.selectThumbcount(['thumb_count'], (err, count, fields) => {
    //     res.locals.thumb = req.session.thumb;
    //     res.locals.count = count[0].value;
    //     res.render("home");
    //   })
    // })
    res.render("home");
  });

  router.post("/", (req, res, next) => {
    req.session.account = req.body.account;
    res.redirect('/');
  })
  
  /* post thumb-highlight */
  router.post("/thumb", (req, res, next) => {
    if (!req.cookies.thumb) res.cookie("thumb", 1);
    res.redirect("/");
  });
  
  /* route accounte state */
  router.post("/login", (req, res ,next) => {
    var id = req.body.id;
    var pw = req.body.pw;
    // db.selectAccount([id], (err, accounts, fields) => {
    //   console.log(accounts);
    //   console.log(accounts[0]);
    //   if (err) throw err;
    //   if (accounts === []) res.send('1');
    //   else if (accounts[0] === 'undefined') res.send('1');
    //   else res.send('2');
    // })
    if (id === '' || pw === '') res.redirect('/?error=unfilled_form');
    else {
      db.selectAccount([id], (err, accounts, fields) => {
        // if(err || accounts[0] === 'undefined') res.redirect('/?error=no_account');
        if (err) throw error;
        else {
          if(accounts[0]) {
            var account_pw = accounts[0].pw;
            var account_name = accounts[0].name;
            var account_salt = accounts[0].salt;
            hasher({password:pw, salt:account_salt}, (err, pass, salt, hash) => {
              if(account_pw === hash) {
                req.session.name = account_name;
                req.session.account = 'logined';
                req.session.save(() => {
                  return res.redirect('/');
                })
              }
              else res.redirect('/?error=no_account');
            })
          }
          else res.redirect('/?error=no_account');
        }
      })
    }
  })
  
  router.post("/logout", (req, res, next) => {
    delete req.session.name;
    req.session.account = req.body.account;
    req.session.save(() => {
      res.redirect('/');
    })
  })
  
  router.post("/register", (req, res, next) => {
    var id = req.body.id;
    var pw = req.body.pw;
    var name = req.body.name;
    if (id === '' || pw === '' || name === '') res.redirect('/?error=unfilled_form');
    else {
      hasher({password:pw}, (err, pass, salt, hash) => {
        db.insertAccount([id,hash,name,salt], (err, rows, fields) => {
          // if(err) res.redirect('/?error=duplicated_ID');
          console.log(err);
          if(err) throw err;
          else {
            req.session.account = 'login';
            req.session.save(() => {
              res.redirect('/'); 
          })
          }
        })
      })
    }
  });

  router.post("/uploads", upload.single('uploads_test'), (req,res,next) => {
    console.log(req.file);
    res.send('1');
  })

  router.get("/search", (req, res, next) => {
    
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

    res.locals.search_results = req.session.search_results;
    res.render('search');
  })

  router.post("/search", (req, res, next) => {

    var keyword = req.body.keyword;
    var menus = req.body.menus;

    // menus.StringtoArray
    menus_array = menus.slice(1,menus.length-1).replace(/"/g,'').split(',');

    if (keyword === "") res.redirect('/search?error=no_keyword');
    else {
      var count = 0;
      var results = [];
      for (var i in menus_array) {
        // select articles of menus
        db.selectArticle(menus_array[i], (err, articles, fields) => {
          if (err) throw err;
          else {
            if (articles[0]) {
              // join articles in each menu
              var dummy = '';
              for (var j in articles) {
                dummy += articles[j].article;
              }
              // slice without html code
              var lt_index = dummy.indexOf('<');
              while (lt_index !== -1) {
                var gt_index = dummy.indexOf('>',lt_index);
                var dummy_data_length = dummy.length;
                dummy = dummy.slice(0,lt_index) + dummy.slice(gt_index+1, dummy_data_length);
                var lt_index = dummy.indexOf('<', lt_index+1);
              }
              // search all index of keyword
              var pos = dummy.indexOf(keyword);
              var result_width = 50;
              while (pos !== -1) {
                var front = (pos - result_width) >= 0 ? pos - result_width : 0;
                var back = (pos + result_width) <= dummy.length ? pos + result_width : dummy.length;
                results.push([menus_array[count], pos, keyword, dummy.slice(front,back), dummy.length, result_width]);
                pos = dummy.indexOf(keyword, pos+1);
              }
              // next for statement
              count++;

              if (count === menus_array.length) {
                req.session.search_results = results;
                console.log('Return search_results');
                res.redirect('/search?keyword='+keyword);
              }
            }
          }
        })
      }
    }
  })

  return router;
}
