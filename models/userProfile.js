var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserProfiles = new Schema({
  _id:{type:mongoose.Schema.Types.ObjectId,ref:'Profiles'},
  name:String,
  lastName:String,
  nameProfile:String
});

mongoose.model('UserProfiles',UserProfiles);
