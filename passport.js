//Estrategia de autenticacion local
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var utils = require('./utils');
require('./models/users');
var userModel = mongoose.model('Users');
var Pool = require('pg-pool')
var fs = require('fs');

/*define connection to DB*/
var connection = getConnection(process.env.POSTGRESQLINKEDIN);
var pool = new Pool(connection);

// var db = require('./db');//Define data temporal para pruebas
// var models = require('./models');
// Estrategia de autenticación con Twitter
// var TwitterStrategy = require('passport-twitter').Strategy;
// Estrategia de autenticación con Facebook
// var FacebookStrategy = require('passport-facebook').Strategy;
// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.
var config = require('./config');

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.

function getConnection(environment){
  var connects=[];
  var connectionsJson=JSON.parse(fs.readFileSync(__dirname+'/database.json', 'utf8'));
  for(var x in connectionsJson){
    if(x==environment){
      return connectionsJson[x];
    }
  }
  return connects;
}

module.exports = function(passport) {

	// Serializa al usuario para almacenarlo en la sesión
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserializa el objeto usuario almacenado en la sesión para
	// poder utilizarlo
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	//Configuración del autenticado local
  passport.use(new LocalStrategy(
  function(username, password, cb) {
    userModel.find({email:username},function(err,user){
      if(err){ return cb(null, false,{code:0}); }
      if(!user[0]){ return cb(null, false,{code:1}); }
      var passEnc=utils.encript.password(password);
      if (user[0].password != passEnc) { return cb(null, false,{code:2}); }
        delete user[0].password;
        utils.log.save('login',user[0]);
        return cb(null, user[0]);
    });
  }));
};
