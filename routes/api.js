var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var path = require('path');
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');
var when = require('when');
var moment = require('moment');
var LogModel = mongoose.model('Log');
var CarroModel = mongoose.model('Carros');
var VentaModel = mongoose.model('Ventas');
var ProductoModel = mongoose.model('Productos');
var PedidoModel = mongoose.model('Pedidos');
var CategoriaModel = mongoose.model('Categorias');

/* START Carros */
router.get('/carros', function(req, res, next){
  CarroModel.find({enable:true},function(err,carros){
    if(err){return next(err);}
    res.json(carros);
  });
});

router.get('/carro/:id', function(req, res, next){
  var id = req.params.id;
  CarroModel.findOne({_id: new ObjectId(id), enable:true},function(err, carro){
    if(err){return next(err);}
    res.json(carro);
  });
});

router.get('/carro/profile/:id', function(req, res, next){
  var id = req.params.id;
  CarroModel.findOne({id_profile: new ObjectId(id), enable:true},function(err, carro){
    if(err){return next(err);}
    res.json(carro);
  });
});

router.post('/carro', function(req, res, next){
  var Carro = new CarroModel(req.body);
  Carro.save(function(err, carro){
    if(err){ return next(err);}
    res.json(carro);
  })
});

router.put('/carro/:id', function(req, res, next){

});

router.put('/carro/profile/:id', function(req, res, next){
    var id = req.params.id;
    var producto = req.body;
    console.log("producto", producto);
    CarroModel.findOne({id_profile: new ObjectId(id), enable:true},function(err, carro){
        if(err){return next(err);}
        var productos = carro.productos;
        if(!productos){productos=[];}
        productos.push(producto);
        console.log("YYY", productos);
        CarroModel.update({id_profile: new ObjectId(id), enable:true},
        {$set: {productos:productos}},
        function(err, rowsAffected){
            if(err){return next(err);}
            res.json(rowsAffected);
        });
    });
});

router.delete('/carro/:id', function(req, res, next){
  var id = req.params.id;
  CarroModel.remove({_id: new ObjectId(id), enable:true}, function (err, numAffected){
    if(err) { return next(err); }
    res.json(numAffected)
  })
});
/* END Carros */

/* START Ventas */
router.get('/ventas', function(req, res, next){
  VentaModel.find({enable:true},function(err,ventas){
    if(err){return next(err);}
    res.json(ventas);
  });
});

router.get('/venta/:id', function(req, res, next){
  var id = req.params.id;
  VentaModel.findOne({_id: new ObjectId(id), enable:true},function(err, venta){
    if(err){return next(err);}
    res.json(venta);
  });
});

router.post('/venta', function(req, res, next){
  var Venta = new VentaModel(req.body);
  Venta.save(function(err, venta){
    if(err){ return next(err);}
    CarroModel.update({id_profile: new ObjectId(req.body.profile.id), enable:true},
    {$set: {enable: false}},
    function (err, numAffected){
        if(err) { return next(err); }

        var prod = req.body.productos;
        for (var x in prod){
            ProductoModel.findOne({_id: new ObjectId(prod[x].id_producto)}, function(err, producto){
                if(err){ console.log("Error: ", err); return}
                var pro = producto;
                var cantidad_actual = pro.cantidad - prod[x].cantidad;
                console.log("cantidad_actual: ", cantidad_actual);

                ProductoModel.update({_id: new ObjectId(pro._id)},
                {$set: {cantidad: cantidad_actual}}, function(err, numAffected){
                    if(err){ console.log("Error: ", err); return}
                })
            })
        }
        res.json({numAffected: numAffected, venta: venta})
    })
  })
});

router.put('/venta', function(req, res, next){

});

router.delete('/venta/:id', function(req, res, next){
    var id = req.params.id;
    VentaModel.update({_id: new ObjectId(id)},
    {$set: {enable: false}},
    function (err, numAffected){
        if(err) { return next(err); }
        res.json(numAffected)
    })
});

router.delete('/venta/remove/:id', function(req, res, next){
    var id = req.params.id;
    VentaModel.remove({_id: new ObjectId(id)}, function (err, numAffected){
        if(err) { return next(err); }
        res.json(numAffected)
    })
});
/* END Ventas */

/* START Productos */
router.get('/productos', function(req, res, next){
  ProductoModel.find({enable:true},function(err,productos){
    if(err){return next(err);}
    res.json(productos);
  });
});

router.get('/productos/list/:ids', function(req, res, next){
    var prod = req.params.ids;
    console.log("prods", prod);
    var ids = prod.split('-');
    var queryIN = [];
    for (var x in ids){
        queryIN.push(new mongoose.Types.ObjectId(ids[x]));
    }
    console.log("queryIN: ", queryIN);
    ProductoModel.find({enable:true, _id: {$in: queryIN}},function(err,productos){
        if(err){return next(err);}
        console.log("productos: byID; ", productos);
        res.json(productos);
    });
});

router.get('/productos/category/:id', function(req, res, next){
    var id = req.params.id;
    ProductoModel.find(
        {
            enable: true,
            "categoria._id": new ObjectId(id),
            cantidad: {$gt: 0},
            estado: {$eq: 0}
        },
    function(err, productos){
        if(err){return next(err);}
        res.json(productos);
    });
});

router.get('/producto/:id', function(req, res, next){
  var id = req.params.id;
  ProductoModel.findOne({_id: new ObjectId(id), enable: true},function(err, producto){
    if(err){return next(err);}
    res.json(producto);
  });
});

router.post('/producto', function(req, res, next){
    var prod = req.body;
    var Producto = new ProductoModel(prod);
    Producto.save(function(err, producto){
        if(err){ return next(err);}
        res.json(producto);
    });
});

router.put('/producto/:id', function(req, res, next){
    var id = req.params.id;
    var prod = req.body;

    ProductoModel.update(
        {_id: new ObjectId(id)},
        {
            $set: {
                nombre_producto: prod.nombre_producto,
                precio: prod.precio,
                cantidad: prod.cantidad,
                categoria: prod.categoria,
                estado: prod.estado,
                desc_producto: prod.desc_producto,
                descripcion: prod.descripcion,
                fotos: prod.fotos,
                meta_tag_title: prod.tag_title,
                meta_tag_desc: prod.tag_desc,
                meta_tag_keywords: prod.tag_keywords,
                modelo: prod.modelo,
                marca: prod.marca,
                codigo: prod.codigo,
                clase: prod.clase,
                cantidad_min: prod.cantidad_min,
                prioridad: prod.prioridad,
                direccion: prod.direccion,
                descuentos: prod.descuentos
            }
        },
        function(err, rowsAffected){
            if(err){ return next(err);}
            res.json(rowsAffected);
        }
    );
});

router.delete('/producto/:id', function(req, res, next){
    var id = req.params.id;
    ProductoModel.update({_id: new ObjectId(id)},
    {$set: {enable: false}},
    function (err, numAffected){
        if(err) { return next(err); }
        res.json(numAffected)
    })
});

router.delete('/producto/remove/:id', function(req, res, next){
    var id = req.params.id;
    ProductoModel.remove({_id: new ObjectId(id)}, function (err, numAffected){
        if(err) { return next(err); }
        res.json(numAffected)
    })
});
/* END Productos */

/* START Pedidos */
router.get('/pedidos', function(req, res, next){
  PedidoModel.find({enable:true},function(err,pedidos){
    if(err){return next(err);}
    res.json(pedidos);
  });
});

router.get('/pedido/:id', function(req, res, next){
  var id = req.params.id;
  PedidoModel.findOne({_id: new ObjectId(id)},function(err, pedido){
    if(err){return next(err);}
    res.json(pedido);
  });
});

router.post('/pedido', function(req, res, next){
  var Pedido = new PedidoModel(req.body);
  Pedido.save(function(err, pedido){
    if(err){ return next(err);}
    res.json(pedido);
  })
});

router.put('/pedido/:id', function(req, res, next){
    var id = req.params.id;
    var pedido = req.body;

    PedidoModel.update(
        {_id: new ObjectId(id)},
        {
            $set: {
                id_pedido: pedido.id_pedido,
                cliente: pedido.cliente,
                productos: pedido.productos,
                estado: pedido.estado
            }
        },
        function(err, rowsAffected){
            if(err){ return next(err);}
            res.json(rowsAffected);
        }
    );
});

router.delete('/pedido/:id', function(req, res, next){
  var id = req.params.id;
  PedidoModel.remove({_id: new ObjectId(id)}, function (err, numAffected){
    if(err) { return next(err); }
    res.json(numAffected)
  })
});
/* END Pedidos */

/* START Categorias */
router.get('/categorias', function(req, res, next){
  CategoriaModel.find({enable:true},function(err, categorias){
    if(err){return next(err);}
    res.json(categorias);
  });
});

router.get('/categoria/:id', function(req, res, next){
  var id = req.params.id;
  CategoriaModel.findOne({_id: new ObjectId(id), enable: true},function(err, categoria){
    if(err){return next(err);}
    res.json(categoria);
  });
});

router.post('/categoria', function(req, res, next){
    var prod = req.body;
    var Producto = new CategoriaModel(prod);
    Producto.save(function(err, categoria){
        if(err){ return next(err);}
        res.json(categoria);
    });
});

router.put('/categoria/:id', function(req, res, next){
    var id = req.params.id;
    var cat = req.body;

    CategoriaModel.update(
        {_id: new ObjectId(id)},
        {
            $set: {
                nombre_categoria: cat.nombre_categoria,
                estado: cat.estado,
                fotoUrl: cat.fotoUrl,
                descripcion: cat.descripcion
            }
        },
        function(err, rowsAffected){
            if(err){ return next(err);}
            res.json(rowsAffected);
        }
    );
});

router.delete('/categoria/:id', function(req, res, next){
    var id = req.params.id;
    CategoriaModel.update({_id: new ObjectId(id)},
    {$set: {enable: false}},
    function (err, numAffected){
        if(err) { return next(err); }
        res.json(numAffected)
    })
});

router.delete('/categoria/remove/:id', function(req, res, next){
    var id = req.params.id;
    CategoriaModel.remove({_id: new ObjectId(id)}, function (err, numAffected){
        if(err) { return next(err); }
        res.json(numAffected)
    })
});
/* END Categorias */

/* START Media */
router.post('/media/upload', function (req, res, next) {
    console.log("value: ", req.body);
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename, fieldname);

        //Path where image will be uploaded
        fstream = fs.createWriteStream(path.join(__dirname, '../dist/assets/img/' + filename));
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            res.redirect('back');           //where to go next
        });
    });
});
/* END Media */

/*START Log*/
router.post('/log',function(req,res,next){
  var Log = new LogModel(req.body);
  Log.save(function(err,log){
    if(err){
      console.log('INCOMING LOG ERROR: ',req.body,err)
      return next(err)
    }
    res.json(log);
  })
})
/*END Log*/

module.exports = router;
