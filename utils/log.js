var mongoose = require('mongoose');
require('../models/log');
var Log = mongoose.model('Log');

exports.save = function(action,In) {
    // var contentIn = JSON.stringify(In);
    if(process.env.SAVELOG=='true'){
        var data = {process:action,content:In};
        var Logs = new Log(data);
        Logs.save(function(err,log){
            if(err){return console.error('Error al intentar agregar un log',err);}
            console.log('se realizó correctamente el guardado del log');
            return true;
        });
    }
}


exports.up = function (data) {
    data.content.timestamp = new Date();
    var Logs = new Log(data);
    Logs.save(function (err, log) {
        if (err) {
            return console.error('Error al guardar log',err);
        }else {
            return true;
        }

    });
}