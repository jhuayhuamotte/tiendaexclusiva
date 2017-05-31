var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActividadesSchema = new Schema({
  codigo: String,
  gwa_id: String,
  gwa_en: String,
  gwa_desc_en: String,
  gwa_sp: String,
  gwa_desc_sp: String,
  iwa_id: String,
  iwa_en: String,
  iwa_sp: String,
  dwa_id: String,
  dwa_en: String,
  dwa_sp: String,
  task_id: String,
  task_en: String,
  enable: {type: Boolean, default: true},
  createAt: {type: Date, default: Date.now},
  updateAt: {type: Date, default: Date.now}
});

mongoose.model('Actividades', ActividadesSchema);
