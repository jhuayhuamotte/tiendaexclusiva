var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarroDetalleSchema = new Schema({
    id_producto: {type: mongoose.Schema.Types.ObjectId, ref: 'Productos'},
    cantidad: Number,
    precio: Number,
    descuento: Number,
    nombre_producto: String,
    descripcion: String,
    descripcion_list: String,
    img_url: String
});

var CarrosSchema = new Schema({
    estado:Number,
    id_profile:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profiles' },
    productos:[CarroDetalleSchema],
    enable:{type:Boolean, default: true},
    createAt:{ type: Date, default: Date.now },
    updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Carros', CarrosSchema);
