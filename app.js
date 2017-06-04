require('dotenv').config();//Load config enviroment
var express = require('express');
var utils = require('./utils');
var path = require('path');
var mongoose = require('mongoose');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios
require('./passport')(passport);

var cnt= utils.connection.getConnection(process.env.MONGODB);
mongoose.Promise = global.Promise;
if(process.env.MLAB){
  var mongodbUri = cnt.driver+'://'+cnt.user+':'+cnt.pwd+'@'+cnt.host+':'+cnt.port+'/'+cnt.database;
  var dboptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                    replset:{ socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } } };
}else{
  var mongodbURI = cnt.driver+'://'+cnt.host+':'+cnt.port+'/'+cnt.database;
  var dboptions = {user:cnt.user,pass:cnt.pwd};
}
mongoose.connect(mongodbUri,dboptions);

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.
  console.log("<======= MONGODB CONNECTION OPEN ==========>");
});

require('./models/log');
require('./models/users');
require('./models/userProfile');
require('./models/carros');
require('./models/pedidos');
require('./models/productos');
require('./models/ventas');

var route = require('./routes/index');
var escritorio = require('./routes/escritorio/index');
var api = require('./routes/api');

var app = express();
var middleware = require('./middleware/app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.use('/scripts', express.static(path.join(__dirname, '/scripts')));
app.use('/styles', express.static(path.join(__dirname, '/styles')));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',route);
app.use('/escritorio', middleware.shouldLogged, escritorio);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
