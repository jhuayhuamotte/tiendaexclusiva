var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopSchema = new Schema({
  code:String,
  onet_code:String,
  title:String,
  title_es:String,
  id:String,
  name:String,
  data:String,
  enable:{type:Boolean, default: true},
  createAt:{ type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Top', TopSchema);
