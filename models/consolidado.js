var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConsolidadoSchema = new Schema({
  codigo: String,
	id: String,
	desc: String,
	tabla: String,
	campo: String,
  enable: {type:Boolean, default:true},
  createAt: {type:Date, default:Date.now},
  updateAt: {type:Date, default:Date.now}
});

mongoose.model('Consolidado', ConsolidadoSchema);
