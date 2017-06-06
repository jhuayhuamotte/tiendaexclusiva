var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = new Schema({
    nombre_producto: String,
    cantidad: Number,
    modelo: String,
    marca: String
});

var PedidosSchema = new Schema({
    id_pedido: String,
    precio: Number,
    cliente: {nombre: String, email: String},
    productos: [],
    estado: Number,
    profile: {id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profiles' }, displayName:String},
    enable:{type:Boolean, default: true},
    createAt:{ type: Date, default: Date.now },
    updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Pedidos', PedidosSchema);
