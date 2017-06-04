var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PedidosSchema = new Schema({
  id_pedido:String,
  estado:Number,
  profile:{id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profiles' }, displayName:String},
  costo_total:Number,
  enable:{type:Boolean, default: true},
  createAt:{ type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Pedidos',PedidosSchema);
