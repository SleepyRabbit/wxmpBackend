var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var redisStore = require('connect-redis')(session);
var redis = require('redis');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login')

var app = express();

var client = redis.createClient(6379,"127.0.0.1");

client.info(function(err,response){
    console.log(err,response);
});

// var redis_options = {
//     host: "127.0.0.1",
//     port: "6379",
//     // db: "jone_snow",
//     ttl: 60 * 60 * 24 * 30,
// }
//
// app.use(session({
//     store: new redisStore(redis_options),
//     secret: 'Winter is coming!',
//     resave: false,
//     saveUninitialized: false
// }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
