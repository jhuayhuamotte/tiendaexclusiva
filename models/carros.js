var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarrosSchema = new Schema({
  id_producto:String,
  cantidad:Number,
  id_vendedor:{type:mongoose.Schema.Types.ObjectId,ref:'Profiles'},
  nombre_vendedor:String,
  precio:Number,
  descuento:Number,
  enable:{type:Boolean, default: true},
  createAt:{ type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Carros', CarrosSchema);
