var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriasSchema = new Schema({
  codigo: String,
	cat_desc_en: String,
	cat_en: String,
	cat_element_name_en: String,
	cat_desc_sp: String,
	cat_sp: String,
	cat_element_name_sp: String,
	cat_id: String,
  enable: {type: Boolean, default: true},
  createAt: {type: Date, default: Date.now},
  updateAt: {type: Date, default: Date.now}
});

mongoose.model('Categorias', CategoriasSchema);
