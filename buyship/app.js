var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var service = require('./routes/service');
var login = require('./routes/login');
var reg = require('./routes/register');
var toolsList = require('./routes/toolsList');
var blog = require('./routes/blog');
var blogNew = require('./routes/blogNew');
var blogDetail = require('./routes/blogDetail');
var zktest = require('./routes/service/zktest');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('Chenxu'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({secret: 'chenxu'}));

// 跳转定向
app.use('/', index);
app.use('/service', service);
app.use('/login', login);
app.use('/reg', reg);
app.use('/download', toolsList);
app.use('/blog', blog);
app.use('/blogNew', blogNew);
app.use('/blogDetail', blogDetail);
app.use('/service/zktest', zktest);

// 处理404或定向错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 处理error
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 监听端口
app.listen(80, function () {

})

module.exports = app;
