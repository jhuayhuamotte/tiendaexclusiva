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

mongoose.model('ToolsTechnology', ToolsTechnologySchema);
