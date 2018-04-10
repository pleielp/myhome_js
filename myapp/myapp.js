const express = require('express');
const app = express();

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
// const bkfd2Password = require('pbkdf2-password');
// const hasher = bkfd2Password();

app.locals.pretty = true;

// view engine setup(pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/edit', express.static(path.join(__dirname, 'public')));
// app.use(bkfd2Password());

/* routing */
const main = require('./routes/main')(app);
const edit = require('./routes/edit');
const project = require('./routes/project');
app.use('/', main);
app.use('/edit', edit);
app.use('/project', project);

/* catch 404 and forward to error handler */
app.use((req, res, next) =>{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});;

/* error handler */
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* listening singals */
app.listen(8080, '0.0.0.0', () =>{
  console.log('Connected to port 8080!');
});

module.exports = app;
