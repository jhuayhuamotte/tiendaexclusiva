var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToolsTechnologySchema = new Schema({
  code_onet: String,
	title: String,
	t2_type: String,
	t2_example: String,
	commodity_code: String,
	commodity_title: String,
	hot_technology: String
});

var CommoditySchema = new Schema({
  codigo: String,
	commodity_example: String,
	commodity_id: String,
	commodity_en: String,
  toolsTechnology:[ToolsTechnologySchema],
  enable: {type:Boolean, default:true},
  createAt: {type:Date, default: Date.now},
  updateAt: {type:Date, default: Date.now}
});

mongoose.model('Commodity', CommoditySchema);
