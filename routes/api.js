var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var when = require('when');
var DataModel = mongoose.model('Data');
var TopModel = mongoose.model('Top');
var ActividadesModel = mongoose.model('Actividades');
var CategoriasModel = mongoose.model('Categorias');
var CommodityModel = mongoose.model('Commodity');
var ConsolidadoModel = mongoose.model('Consolidado');
var toolsTechnologyModel = mongoose.model('ToolsTechnology');
var ProfilesDetailModel = mongoose.model('ProfilesDetail');
var OnetsModel = mongoose.model('Onets');
var LogModel = mongoose.model('Log');
var CarroModel = mongoose.model('Carros');
var PedidoModel = mongoose.model('Pedidos');
var ProductoModel = mongoose.model('Productos');
var VentaModel = mongoose.model('Ventas');

/* SUGG START */
router.get('/positions/:code',function(req,res,next){
  var code=req.params.code;
  TopModel.find({id:code},{onet_code:true,title_es:true,data:true},
  function(err,tops){
      if(err){return next(err);}
      res.json(tops);
    }).sort({data: -1}).exec(function(err, docs) {
      if(err){return next(err);}
    });
});
/* SUGG END */

/* START Consolidado */
router.post('/consolidado', function(req, res, next){
  var data = req.body;
  var textArr = data.text.split(" ");
  var queryOR = [];
  var tables = [];
  var query = {};
  if(data.actividades) tables.push(" this.tabla=='actividades' ");
  if(data.categorias) tables.push(" this.tabla=='categorias' ");
  if(data.commodities) tables.push(" this.tabla=='commodities' ");

  for(var k in textArr){
    if(textArr[k].length>3){
      var like = new RegExp(textArr[k], "i");
      queryOR.push({desc:like});
    }
  }

  if(textArr.length>0){
    var like = new RegExp(data.text, "i");
    queryOR.push({desc:like});
  }

  query = {$or:queryOR,$where:tables.toString().replace(/,/g,'||')};

  ConsolidadoModel.find(query,{_id:1,codigo:1,id:1,desc:1,tabla:1,campo:1},
  function(err,consolidados){
    if(err){return next(err);}
    res.json(consolidados);
  });
});

router.get('/actividades/:id', function(req, res, next){
  var id = req.params.id;
  ActividadesModel.find({codigo:id},{}, function(err, actividades){
    if(err){return next(err);}
    res.json(actividades);
  });
});

router.get('/categorias/:id', function(req, res, next){
  var id = req.params.id;
  CategoriasModel.find({codigo:id},{}, function(err, categorias){
    if(err){return next(err);}
    res.json(categorias);
  });
});

router.get('/commodities/:id', function(req, res, next){
  var id = req.params.id;
  CommodityModel.find({codigo:id},{}, function(err, commodities){
    if(err){return next(err);}
    res.json(commodities);
  });
});

router.get('/toolstechnology/:id', function(req, res, next){
  var id = req.params.id;
  toolsTechnologyModel.aggregate([
  {$match:{commodity_code:id}},
  {$group:{_id:{code_onet:"$code_onet", title:"$title"}}}],
  function(err, tools){
    if(err){return next(err);}
    res.json(tools);
  });
});
/* END Consolidado */

/* START ProfilesDetail */
router.get('/profilesdetail/all/:offset',function(req,res,next){
  var offset = req.params.offset;
  ProfilesDetailModel.find({enable:true,homologado:false},
  function(err, profilesdetail){
    if(err){return next(err);}
    res.json(profilesdetail);
  }).skip(parseInt).limit(100);
});

router.get('/profilesdetail/:id', function(req,res,next){
  var id = req.params.id;
  ProfilesDetailModel.find({id_candidato:id},{},function(err,profilesdetail){
    if(err){return next(err);}
    res.json(profilesdetail);
  })
});

router.put('/profilesdetail/:id', function(req,res,next){
  var id = req.params.id;
  ProfilesDetailModel.findOne({id_candidato:id}, function(err,profilesdetail){
    if(err){return next(err);}
    profilesdetail.homologado = true;
    profilesdetail.save(function(err){
      if(err){return next(err);}
      res.json({success:true,error:null});
    })
  })
});

router.get('/profilesdetail/candidates/search', function(req,res,next){
  var search = req.query.candidates;
  var offset = req.query.offset;
  var searchArr = search.split(",");
  var queryOR = [];
  var queryIN = [];

  if(search!=null && search.trim()!=''){
    for(var x in searchArr){
      if(!isNaN(searchArr[x]) && searchArr[x].trim()!=''){
        queryIN.push(searchArr[x].trim());
      }else if(searchArr[x].trim()!=''){
        var like = new RegExp(searchArr[x].trim(), "i");
        queryOR.push({nombre_candidato:like});
      }
    }
  }

  if(queryIN.length>0){
    queryOR.push({id_candidato:{$in:queryIN}});
  }

  when.all([
    ProfilesDetailModel.find({$or:queryOR}).skip(
      parseInt(offset)
    ).limit(30).exec(),
    ProfilesDetailModel.find({$or:queryOR}).count().exec()
  ]).spread(function(results,count){
    res.json({success:true,data:results,count:count});
  }).otherwise(function(err){
    if(err){return next(err);}
  });
});
/* END ProfilesDetail */

/* START Onets */
router.get('/onets/:id', function(req,res,next){
  var id = req.params.id;
  OnetsModel.findOne({id_onet:id},function(err,results){
    if(err){return next(err);}
    res.json(results);
  });
});
/* END Onets */

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
