var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name_en:String,
  name_sp:String
});

var TaskDetailSchema = new Schema({
  name_en:String
});

var WorkActivitySchema = new Schema({
  name_en:String,
  name_sp:String,
  desc_en:String,
  desc_sp:String
});

var LaysSchema = new Schema({
  name_en:String,
  name_sp:String
});

var OnetsSchema = new Schema({
  id_onet:String,
  name_en:String,
  name_sp:String,
  desc_en:String,
  desc_sp:String,
  job_zone:String,
  task:[TaskSchema],
  task_detail:[TaskDetailSchema],
  work_act:[WorkActivitySchema],
  lays:[LaysSchema]
});

mongoose.model('Onets', OnetsSchema);
