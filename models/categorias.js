var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriasShema = new Schema({
  nombre_categoria:String,
  estado:{type:Number,default:0},
  descripcion:String,
  fotoUrl:String,
  enable:{type:Boolean,default:true},
  createAt:{type:Date,default:Date.now},
  updateAt:{type:Date,default:Date.now}
});

mongoose.model('Categorias', CategoriasShema);
