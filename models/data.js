var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
  code:String,
  dwa_id:String,
  id:String,
  n1_en:String,
  n1_es:String,
  n2_en:String,
  n2_es:String,
  n3_en:String,
  n3_es:String,
  n4_en:String,
  n4_es:String,
  n5_en:String,
  n5_es:String,
  n6_en:String,
  n6_es:String,
  n7_en:String,
  n7_es:String,
  enable:{type:Boolean, default: true},
  createAt:{ type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Data', DataSchema);
