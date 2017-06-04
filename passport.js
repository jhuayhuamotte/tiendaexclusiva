//Seleccionando la estrategía de login local
var LocalStrategy = require('passport-local').Strategy;

//Conexión con bd mongoose
var mongoose = require('mongoose');

//Obteniendo el modelo de usuarios
require('./models/users');
require('./models/sessionLink');
require('./models/session');
var userModel = mongoose.model('Users');
var sessionLinkSchema = mongoose.model('sessionLink');
var sessionSchema = mongoose.model('session');

//importando la libreria local utils para emcriptamiento
var utils = require('./utils');
var config = require('./config');

// var redis = require('redis');
// var connection = utils.connection.getConnection(process.env.REDIS);
// var redisClient = redis.createClient(connection.port,connection.host);


// var db = require('./db');//Define data temporal para pruebas
// var models = require('./models');
// Estrategia de autenticación con Twitter
// var TwitterStrategy = require('passport-twitter').Strategy;
// Estrategia de autenticación con Facebook
// var FacebookStrategy = require('passport-facebook').Strategy;
// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.

module.exports = function(passport) {

	// Serialize for saving in session
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserialize session user
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

  //Configure the local strategy passport.
  passport.use(new LocalStrategy(
    function(username, password, cb) {

        sessionLinkSchema.find({email:username}).exec(function (err,sessionLink) {
            if(err) {
                return cb(err, false,{code:1});
            }

            if(sessionLink===null | sessionLink.length==0){
                return auth(username, password, cb);
            }else{
                sessionSchema.findById(sessionLink[0].sessionID,function(error,session){
                    if(session===null){
                        sessionLinkSchema.findById(sessionLink[0]._id).remove().exec();
                        return auth(username, password, cb);
                    }else{
                        console.log('session no login',session);
                        return cb(null, false,{code:3,sessionID:sessionLink[0].sessionID});
                    }
                })
            }
        });

        // redisClient.get(username,function(err,reply){
        //     if(reply===null){
        //         //no existe sesion
        //         return auth(username, password, cb);
        //     }else{
        //         redisClient.get(reply,function(err,replyTwo){
        //             if(replyTwo===null){
        //                 redisClient.del(username);
        //                 return auth(username, password, cb);
        //             }else{
        //                 // ya existe sesion
        //                 return cb(null, false,{code:3});
        //             }
        //         });
        //     }
        // });
    }));

    function auth(username,password,cb){
        userModel.find({email:username},function(err,user){
            if(err){ return cb(err); }
            if(!user[0]){ return cb(null,false,{code:1}); }
            var passEnc=utils.encript.password(password);
            if (user[0].password != passEnc) { return cb(null, false,{code:2}); }
                delete user[0].password;
                utils.log.save('login',user[0]);
            return cb(null, user[0]);
        });
    }

	// Configuración del autenticado con Twitter
	// passport.use(new TwitterStrategy({
	// 	consumerKey		 : config.twitter.key,
	// 	consumerSecret	: config.twitter.secret,
	// 	callbackURL		 : '/auth/twitter/callback'
	// }, function(accessToken, refreshToken, profile, done) {
	// 	// Busca en la base de datos si el usuario ya se autenticó en otro
	// 	// momento y ya está almacenado en ella
	// 	User.findOne({provider_id: profile.id}, function(err, user) {
	// 		if(err) throw(err);
	// 		// Si existe en la Base de Datos, lo devuelve
	// 		if(!err && user!= null) return done(null, user);
  //
	// 		// Si no existe crea un nuevo objecto usuario
	// 		var user = new User({
	// 			provider_id	: profile.id,
	// 			provider		 : profile.provider,
	// 			name				 : profile.displayName,
	// 			photo				: profile.photos[0].value
	// 		});
	// 		//...y lo almacena en la base de datos
	// 		user.save(function(err) {
	// 			if(err) throw err;
	// 			done(null, user);
	// 		});
	// 	});
	// }));

	// Configuración del autenticado con Facebook
	// passport.use(new FacebookStrategy({
	// 	clientID			: config.facebook.key,
	// 	clientSecret	: config.facebook.secret,
	// 	callbackURL	 : '/auth/facebook/callback',
	// 	profileFields : ['id', 'displayName', /*'provider',*/ 'photos']
	// }, function(accessToken, refreshToken, profile, done) {
	// 	// El campo 'profileFields' nos permite que los campos que almacenamos
	// 	// se llamen igual tanto para si el usuario se autentica por Twitter o
	// 	// por Facebook, ya que cada proveedor entrega los datos en el JSON con
	// 	// un nombre diferente.
	// 	// Passport esto lo sabe y nos lo pone más sencillo con ese campo
	// 	User.findOne({provider_id: profile.id}, function(err, user) {
	// 		if(err) throw(err);
	// 		if(!err && user!= null) return done(null, user);
  //
	// 		// Al igual que antes, si el usuario ya existe lo devuelve
	// 		// y si no, lo crea y salva en la base de datos
	// 		var user = new User({
	// 			provider_id	: profile.id,
	// 			provider		 : profile.provider,
	// 			name				 : profile.displayName,
	// 			photo				: profile.photos[0].value
	// 		});
	// 		user.save(function(err) {
	// 			if(err) throw err;
	// 			done(null, user);
	// 		});
	// 	});
	// }));

};
