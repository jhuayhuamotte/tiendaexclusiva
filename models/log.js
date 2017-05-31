var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
  process:String,
  content:[],
  createAt:{ type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Log',LogSchema);
