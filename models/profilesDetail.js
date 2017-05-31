var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PuestosSchema = new Schema({
  id_onet:String,
  nombre_puesto:String,
  orden:Number
});

var ProfilesDetailSchema = new Schema({
  id_candidato:String,
  id_onet:String,
  nombre_candidato:String,
  puestos:[PuestosSchema],
  homologado:{type:Boolean, default:false},
  enable:{type:Boolean, default: true},
  createAt:{ type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now }
});

mongoose.model('ProfilesDetail', ProfilesDetailSchema);
