var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FotosSchema = new Schema({
  url:String,
  orden:Number
});

var DescuentosSchema = new Schema({
  grupo:Number,
  cantidad:Number,
  descuento:Number,
  date_start:{type:Date,default:Date.now},
  date_end:{type:Date,default:Date.now}
});

var ProductosShema = new Schema({
  nombre_producto: String,
  categoria: {_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorias' }, nombre_categoria: String},
  precio: {compra: Number, venta: Number},
  cantidad:Number,
  estado:{type:Number,default:0},
  desc_producto:String,
  descripcion:String,
  fotos:[FotosSchema],
  meta_tag_title:String,
  meta_tag_desc:String,
  meta_tag_keywords:String,
  modelo:String,
  marca: String,
  codigo:String,
  clase:String,
  cantidad_min:Number,
  prioridad:Number,
  direccion:String,
  descuentos:[DescuentosSchema],
  enable:{type:Boolean,default:true},
  createAt:{type:Date,default:Date.now},
  updateAt:{type:Date,default:Date.now}
});

mongoose.model('Productos', ProductosShema);
