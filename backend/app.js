var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const {EncryptionPolicy, SigningPolicy,SameSitePolicy} = require('@authentication/cookie-session')
var cookieSession = require('@authentication/cookie-session')
var app = express();
// const SameSitePolicy = Cookie.SameSitePolicy;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dateLocRouters = require("./routes/dateBookings")
var loginRouter = require("./routes/login")
const crypto = require('crypto')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(cookieSession({
//   path: '/',
//   maxAge: '24 hours',
//   keys: [crypto.randomBytes(64).toString('hex'), crypto.randomBytes(64).toString('hex')],
//   sameSitePolicy: SameSitePolicy.AnySite,
//   encryptionPolicy: EncryptionPolicy.Optional, // default in development
//   signingPolicy: SigningPolicy.Optional // default in development

// }))

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', "*");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));



app.use('/dateLoc',dateLocRouters)
app.use('/users', usersRouter);
app.use('/login', loginRouter);

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
