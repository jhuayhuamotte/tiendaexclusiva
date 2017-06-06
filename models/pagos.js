var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PagosSchema = new Schema({
  id_vendedor:{type:mongoose.Schema.Types.ObjectId,ref:'Profiles'},
  id_cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Profiles'},
  id_pedido:{type:mongoose.Schema.Types.ObjectId,ref:'Pedidos'},
  numero_tarjeta:String,
  cv_code:String,
  fecha_expiracion:String,
  nombre_tarjeta:String,
  precio_total:Number,
  enable: {type:Boolean, default:true},
  createAt:{ type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Pagos', PagosSchema);
