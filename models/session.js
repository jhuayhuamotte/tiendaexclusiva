var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
  _id:String,
  session:String,
  expires:Date
});

mongoose.model('session',SessionSchema);
