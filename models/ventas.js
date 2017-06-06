var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = new Schema({
    id_producto: {type: mongoose.Schema.Types.ObjectId, ref: 'Productos'},
    nombre_producto: String,
    cantidad: Number
});

var VentasSchema = new Schema({
    id_venta:String,
    productos: [ProductosSchema],
    estado:Number,
    profile:{id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profiles' }, displayName: String},
    costo_total:Number,
    enable:{type:Boolean, default: true},
    createAt:{ type: Date, default: Date.now },
    updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Ventas', VentasSchema);
