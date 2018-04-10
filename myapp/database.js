module.exports = function(router){

  /* mysql, session setup */
  const mysql = require("mysql");
  const session = require('express-session');
  const MySQLStore = require('express-mysql-session')(session);

  var options = {
    host: "localhost",
    post: "8080",
    user: "root",
    password: "123456",
    database: "pleiweb"
  }

  const conn = mysql.createConnection(options);
  const sessionStore = new MySQLStore({}, conn);

  router.use(session({
    secret: '123456789ASDF!@#',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  }))

  /* return functions */
  return {
    
  selectThumbcount: function(params, callback){
    var sql = 'SELECT value FROM data WHERE type=?';
    conn.query(sql, params, (err, count, fields) => {
      console.log('SELECTED value!');
      if (err) throw err;
      else return callback(false, count, fields);
    })
  },
  
  updateThumbcount: function(params, callback){
    var sql = 'UPDATE data SET value=? where type=?';
    conn.query(sql, params, (err, count, fields) => {
      console.log('UPDATED data!');
      if(err) throw err;
      else return callback(false, count, fields);
    })
  },

  insertAccount: function(params, callback){
    var sql = 'INSERT INTO accounts (id, pw, name, salt) VALUES(?,?,?,?)';
    conn.query(sql, params, (err, accounts, fields) => {
      if (err) {
        console.log(err.sqlState);
        if (err.sqlState === '42S02') {
          var sql2 = 'CREATE TABLE accounts (id varchar(20) NOT NULL, pw varchar(256) NOT NULL, name varchar(20) NOT NULL, salt varchar(256) NOT NULL, PRIMARY KEY(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
          conn.query(sql2, (err, rows, fields) => {
            console.log(err);
            var sql = 'INSERT INTO accounts (id, pw, name, salt) VALUES(?,?,?,?)';
              conn.query(sql, params, (err, accounts, fields) => {
                console.log(1);
                if (err) throw err;
                return callback(err, accounts, fields);
              })
            })
        }
      }
      else {
      console.log('INSERTED INTO accounts!');
      return callback(err, accounts, fields);
      }
    })
  },

  selectAccount: function(params, callback){
    var sql = 'SELECT * FROM accounts WHERE id=?';
    conn.query(sql, params, (err, accounts, fields) => {
      console.log('SELECTED * !');
      return callback(err, accounts, fields);
    })
  },
  
  selectArticle: function(topic, callback){
    var sql1 = 'SELECT * FROM ' + topic;
    conn.query(sql1, (err, articles, fields) => {
      // console.log(err.sqlState);
      // console.log(err);
      if (err) {
        if (err.sqlState === '42S02') {
          var sql2 = 'CREATE TABLE ' + topic + ' (id int(4) NOT NULL AUTO_INCREMENT, article text NOT NULL, PRIMARY KEY(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
          conn.query(sql2, (err, rows, fields) => {
            console.log(rows);
          })
        }
        throw err;
      }
      else return callback(false, articles, fields);
    })
  },  
  
  selectTime: function(params, callback){
    var sql = 'SELECT time FROM times WHERE topic=?';
    conn.query(sql, params, (err, times, fields) => {
      console.log('SELECTED time!');
      if (err) {
        if (err.sqlState === '42S02') {
          var sql2 = 'CREATE TABLE times (topic varchar(20) NOT NULL, time varchar(20) NOT NULL, PRIMARY KEY(topic)) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
          conn.query(sql2, (err, rows, fields) => {
            console.log(rows);
          })
        }
      }
      else return callback(false, times, fields);
    })
  },
  
  
  updateArticle: function(topic, params, callback){
    var sql1 = 'SELECT article FROM ' + topic + ' WHERE id=?'
    conn.query(sql1, params[1], (err, articles, fields) => {
      console.log('SELECTED article!');
      if (articles[0]) {
        var sql2 = 'UPDATE ' + topic + ' SET article=? WHERE id=?';
        conn.query(sql2, params, (err, rows, fields) => {
          console.log('UPDATED INTO '+topic+'!');
          if (err) throw err;
          else return callback(false, rows, fields);
        })
      }
      else {
        var sql3 = 'INSERT INTO ' + topic + ' (article, id) VALUES(?,?)'
        conn.query(sql3, params, (err, rows, fields) => {
          console.log('INSERTED '+topic+'!');
          if (err) throw err;
          else return callback(false, rows, fields);
        })
      }
    })
  },
  
  updateTime : function(params, callback){
    var sql1 = 'SELECT time FROM times WHERE topic=?'
    conn.query(sql1, params[1], (err, time, fields) => {
      console.log('SELECTED time!');
      if (time[0]) {
        var sql2 = 'UPDATE times SET time=? WHERE topic=?';
        conn.query(sql2, params, (err, rows, fields) => {
          console.log('UPDATED times!');
          if (err) throw err;
          else return callback(false, rows, fields);
        })
      }
      else {
        var sql3 = 'INSERT INTO times (time, topic) VALUES(?,?)';
        conn.query(sql3, params, (err, rows, fields) => {
          console.log('INSERTED INTO times!');
          if (err) throw err;
          else return callback(false, rows, fields);
        })
      }
    })
  }
} // close return

} // close exports;

// var pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASS,
//   database: process.env.MYSQL_DB,
//   connectionLimit: 10,
//   supportBigNumbers: true
// });

// Get records from a city
// exports.getRecords = function(city, callback) {
//   var sql = "SELECT name FROM users WHERE city=?";
//   // get a connection from the pool
//   pool.getConnection(function(err, connection) {
//     if(err) { console.log(err); callback(true); return; }
//     // make the query
//     connection.query(sql, [city], function(err, results) {
//       connection.release();
//       if(err) { console.log(err); callback(true); return; }
//       callback(false, results);
//     });
//   });
// };