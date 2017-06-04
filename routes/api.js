var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');
var when = require('when');
var moment = require('moment');
var LogModel = mongoose.model('Log');
var CarroModel = mongoose.model('Carros');
var PedidoModel = mongoose.model('Pedidos');
var ProductoModel = mongoose.model('Productos');
var VentaModel = mongoose.model('Ventas');

/* START Carros */
router.get('/carros', function(req, res, next){
  CarroModel.find({enable:true},function(err,carros){
    if(err){return next(err);}
    res.json(carros);
  });
});

router.get('/carro/:id', function(req, res, next){
  var id = req.params.id;
  CarroModel.findOne({_id: new ObjectId(id)},function(err, carro){
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
    CarroModel.findOne({id_profile: new ObjectId(id)},function(err, carro){
        if(err){return next(err);}
        var productos = carro.productos;
        if(!productos){productos=[];}
        productos.push(producto);
        CarroModel.update({id_profile: new ObjectId(id)},
        {$set: {productos:productos}},
        function(err, rowsAffected){
            if(err){return next(err);}
            res.json(rowsAffected);
        });
    });
});

router.delete('/carro/:id', function(req, res, next){
  var id = req.params.id;
  CarroModel.remove({_id: new ObjectId(id)}, function (err, numAffected){
    if(err) { return next(err); }
    res.json(numAffected)
  })
});
/* END Carros */

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

router.put('/pedido', function(req, res, next){

});

router.delete('/pedido/:id', function(req, res, next){
    var id = req.params.id;
    PedidoModel.update({_id: new ObjectId(id)},
    {$set: {enable: false}},
    function (err, numAffected){
        if(err) { return next(err); }
        res.json(numAffected)
    })
});

router.delete('/pedido/remove/:id', function(req, res, next){
    var id = req.params.id;
    PedidoModel.remove({_id: new ObjectId(id)}, function (err, numAffected){
        if(err) { return next(err); }
        res.json(numAffected)
    })
});
/* END Pedidos */

/* START Productos */
router.get('/productos', function(req, res, next){
  ProductoModel.find({enable:true},function(err,productos){
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
    var fotos = [];
    var descuentos = [];

    for(var f in prod.fotos){
        fotos.push({
              url: prod.fotos[f].url,
              orden: parseInt(prod.fotos[f].orden)
        });
    }

    for(var t in prod.descuentos){
        descuentos.push({
              grupo: parseInt(prod.descuentos[t].grupo),
              cantidad: parseInt(prod.descuentos[t].cantidad),
              descuento: parseFloat(prod.descuentos[t].descuento),
              date_start: new Date(),
              date_end: new Date()
        });
    }

    var producto = {
        nombre_producto: prod.nombre,
        precio: parseFloat(prod.precio),
        cantidad: parseInt(prod.cantidad),
        estado: parseInt(prod.estado),
        desc_producto: prod.desc_producto,
        fotos: fotos,
        meta_tag_title: prod.tag_title,
        meta_tag_desc: prod.tag_desc,
        meta_tag_keywords: prod.tag_keywords,
        modelo: prod.modelo,
        codigo: prod.codigo,
        clase: prod.clase,
        cantidad_min: parseInt(prod.cantidad_min),
        prioridad: parseInt(prod.prioridad),
        direccion: prod.direccion,
        descuentos: descuentos
    };

    var Producto = new ProductoModel(producto);
    Producto.save(function(err, producto){
        if(err){ return next(err);}
        res.json(producto);
    });
});

router.put('/producto/:id', function(req, res, next){
    var id = req.params.id;
    var prod = req.body;
    var fotos = [];
    var descuentos = [];

    for(var f in prod.fotos){
        fotos.push({
              url: prod.fotos[f].url,
              orden: parseInt(prod.fotos[f].orden)
        });
    }

    for(var t in prod.descuentos){
        descuentos.push({
              grupo: parseInt(prod.descuentos[t].grupo),
              cantidad: parseInt(prod.descuentos[t].cantidad),
              descuento: parseFloat(prod.descuentos[t].descuento),
              date_start: new Date(),
              date_end: new Date()
        });
    }

    ProductoModel.update(
        {_id: new ObjectId(id)},
        {
            $set: {
                nombre_producto: prod.nombre,
                precio: parseFloat(prod.precio),
                cantidad: parseInt(prod.cantidad),
                estado: parseInt(prod.estado),
                desc_producto: prod.desc_producto,
                fotos: fotos,
                meta_tag_title: prod.tag_title,
                meta_tag_desc: prod.tag_desc,
                meta_tag_keywords: prod.tag_keywords,
                modelo: prod.modelo,
                codigo: prod.codigo,
                clase: prod.clase,
                cantidad_min: parseInt(prod.cantidad_min),
                prioridad: parseInt(prod.prioridad),
                direccion: prod.direccion,
                descuentos: descuentos
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
/* END Carros */

/* START Carros */
router.get('/ventas', function(req, res, next){
  VentaModel.find({enable:true},function(err,ventas){
    if(err){return next(err);}
    res.json(ventas);
  });
});

router.get('/venta/:id', function(req, res, next){
  var id = req.params.id;
  VentaModel.findOne({_id: new ObjectId(id)},function(err, venta){
    if(err){return next(err);}
    res.json(venta);
  });
});

router.post('/venta', function(req, res, next){
  var Venta = new VentaModel(req.body);
  Venta.save(function(err, venta){
    if(err){ return next(err);}
    res.json(venta);
  })
});

router.put('/venta', function(req, res, next){

});

router.delete('/venta/:id', function(req, res, next){
  var id = req.params.id;
  VentaModel.remove({_id: new ObjectId(id)}, function (err, numAffected){
    if(err) { return next(err); }
    res.json(numAffected)
  })
});
/* END Carros */

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
