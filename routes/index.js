var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var utils = require('../utils/url');

/* GET Login Page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login',function(req, res, next){
  console.log('isAuthenticated',req.isAuthenticated());
  console.log('sessionID',req.sessionID);
  if(!req.isAuthenticated()) {
      redirect = utils.getRedirectUrl(req.originalUrl)
      if (!redirect) {
          res.render('login',{
              'error' : false
          });
      } else {
          var message=false;
          switch (req.query.error) {
              case '1':
                  message="El usuario no está registrado.";
              break;
              case '2':
                  message="El password es incorrecto.";
              break;
              case '3':
                  message="El usuario tiene una sesión activa";
              break;
          }
          res.render('login',{
              'error' : message,
          });
      }
  } else {
      console.log("User Already Logged",req.user)
      if(req.user.enabled){
          res.redirect('/escritorio');
      }else{
          res.render('login');
      }
  }
});

router.post('/login',function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
       if(typeof(info)!='undefined'){
           console.log('info.sessionID',info.sessionID);
           console.log('req.sessionID',req.sessionID);
           res.redirect('/login?error='+info.code);
       }
       if(user!=false){
           req.logIn(user, function(err) {
              if (err) { return next(err); }

              if(req.user.enabled){
                  res.redirect('/escritorio')
              } else {
                  res.render('login');
              }
          });
       }
   })(req,res,next);
});

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.get("/rest/savelog", function(req, res) {
  var env = process.env.SAVELOG;
  res.json({result: env});
});

router.get("/env",function(req,res){
  var env = process.env;
  var rpta = {
    mongodb:env.MONGODB,
    host:env.HOST,
    port:env.PORT,
    mediaserver:env.MEDIASERVER,
    kurento:env.KURENTOSERVER,
    savelog:env.SAVELOG
  };

  res.json({result:rpta});
});

router.get('/session-user',function(req,res){
  return res.json({ user: req.user });
});

module.exports = router;
