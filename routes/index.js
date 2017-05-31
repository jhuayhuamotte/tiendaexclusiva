var express = require('express');
var router = express.Router();
var passport = require('passport');
var idInterview = '57f26ac03eea6a4e4215fa61';//'10000000-0000-0000-0000-000000000000';
var mongoose = require('mongoose');
//var usersModel = mongoose.model('Users');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Puestos' });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Home del portal',user:req.user });
});

router.get('/login',function(req, res){
  res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login'}),function(req, res){
  res.redirect('/escritorio');
  // if(req.user.rol=='1'){
  //     res.redirect('/dashboard#/preview/'+idInterview);
  // }else{
  //     res.redirect('/dashboard');
  // }
});

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.get('/dashboard',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('dashboard', { user: req.user ,interview:idInterview});
  });

router.get('/dashboard/:ctrl/:id',function(req,res,next){
  idInterview = req.params.id;
  // console.log('req.user',req.user);
  if(req.user){
    if(req.user.rol=='1'){
        // res.redirect('/dashboard#/preview/'+idInterview);
        res.redirect('/dashboard#/candidate-interview/'+idInterview);
    }else{
        // console.log('redirect=====>','/dashboard#/'+req.params.ctrl+'/'+idInterview);
        res.redirect('/dashboard#/'+req.params.ctrl+'/'+idInterview);
    }
  }else{
    res.redirect('/dashboard');
  }
})

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
  // console.log('rpta',rpta);
  res.json({result:rpta});
});

router.get('/session-user',function(req,res){
  return res.json({ user: req.user });
});

module.exports = router;
