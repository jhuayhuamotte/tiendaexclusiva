var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PedidosSchema = new Schema({
  id_pedido:String,
  estado:Boolean,
  vendedor:{type:mongoose.Schema.Types.ObjectId,ref:'Profiles'},
  cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Profiles'},
  costo_total:Number,
  enable:{type:Boolean, default: true},
  createAt:{ type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Pedidos',PedidosSchema);
