var express = require('express');
var utils = require('../../utils');
var Pool = require('pg-pool');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var moment = require('moment');

/*Define connection to DB*/
var connection = getConnection(process.env.POSTGRESQLINKEDIN);
var pool = new Pool(connection);

/* START CRUD Puestos */
router.get('/puestos',function(req,res,next){
  var connectionsJson = JSON.parse(
    fs.readFileSync(__dirname+'/../../json/puestos.json', 'utf8')
  );
  res.json(connectionsJson);
});

router.get('/puestos/:id',function(req,res){
  var id = req.params.id;
  var result = {};
  var connectionsJson = JSON.parse(
    fs.readFileSync(__dirname+'/../../json/puestos.json', 'utf8')
  );
  for (var i = 0; i < connectionsJson.length; i++) {
    if (connectionsJson[i].id == id) {
        result = connectionsJson[i];
        break;
    }
  }
  res.json(result);
});
/* END CRUD Puestos */

/* START Job Zone */
router.get('/jobzone/:id', function(req,res,next){
  var id = req.params.id;
  var result = {};
  var JobsZone = JSON.parse(
    fs.readFileSync(__dirname+'/../../json/job_zone.json', 'utf8')
  );
  for(var x in JobsZone){
    if(JobsZone[x].id == id){
      result = JobsZone[x];
      break;
    }
  }
  res.json(result);
});
/* END Job Zone */

/*positions_m1*/
router.get('/position/:id',function(req,res,next){
  var id=req.params.id;
  var results={success:false,data:[]};

  var consult = pool.query(`SELECT c.id_candidato, ex.position_id as id_puesto,c.nombre,
  c.descripcion,c.resumen,c.url, ex.exp_organization_name,
  ex.exp_position_name,to_char(ex.fecha_inicio,'dd-MM-yyyy') as fecha_inicio,
  to_char(ex.fecha_fin,'dd-MM-yyyy') as fecha_fin,
  ex.funciones, so.id_onet
  FROM "Krowdy_DB".candidatos as c
  left join "Krowdy_DB".experiencia as ex on c.id_candidato = ex.id_candidato
  left join "Krowdy_DB".position_fixed pfx on pfx.id_candidato=ex.id_candidato
  left join "Krowdy_DB".soc_onet as so on ex.id_onet =so.id_onet
  where c.id_candidato=$1
  group by c.id_candidato,
  ex.position_id,c.nombre,c.descripcion,c.resumen,c.url,ex.id_experiencia,
  ex.exp_organization_name,ex.exp_position_name,fecha_inicio,fecha_fin,ex.funciones,
  so.id_onet,so.name_onet_eng
  order by ex.fecha_fin desc;`,[id], function(err, result, data){
    if(err){
      utils.log.save("GETTING POSITION DETAILS ERROR", {error:err, id_candidato:id, id_user:req.user.id_user});
      return next(err);
    }
    results.success=true;
    results.data = result.rows;
    return res.json(results);
  });
});

router.post('/position',function(req,res,next){
  var data = req.body;
  data.created = moment().format("YYYY-MM-DD HH:mm:ss");
  data.id_user = req.user.id_user;

  pool.query(`INSERT INTO "Krowdy_DB".position_fixed(id_candidato, id_onet, id_onet_new,
  funciones, label, created, id_user) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
  [data.id_candidato,data.id_onet,data.id_onet_new,data.funciones,data.label,
  data.created,data.id_user],function(err, result){
    if(err){
      utils.log.save('INSERT POSITION_FIXED ERROR', {error:err, data:data});
      return next(err);
    }
    return res.status(200).json({ success: true, data: result});
  });
});

router.get('/position/skill/:id',function(req,res,next){
  var id=req.params.id;
  var results={success:false,data:[]};

  pool.query(`SELECT s.skill_id as id,s.name as nombre,s.sinonimos as sinonimos
  FROM "Krowdy_DB".candidatos as c
  inner join "public".profile_skill_m2m psm on c.id_candidato=psm.profile_id
  inner join "public".skill as s on psm.skill_id=s.skill_id
  where c.id_candidato=$1;`,[id],function(err, result){
    if(err){
      utils.log.save("GETTING SKILLS ERROR",{error:err,id_candidato:id, id_user:req.user.id_user});
      return next(err);
    }
    results.success=true;
    results.data = result.rows;
    return res.json(results);
  });
});

router.put('/position/skill/:id',function(req,res, next){
  var id_skill=req.params.id;
  var sinonimos=JSON.stringify(req.body.sinonimos);

  pool.query("UPDATE skill set sinonimos=$1 where skill_id=$2",
  [sinonimos,id_skill],function(err, result){
    if(err){
      utils.log.save("UPDATE SKILLS -SINONIMOS- ERROR",{error:err, id_skill:id_skill, id_user:req.user.id_user});
      return next(err);
    }
    return res.status(200).json({ success: true, data: id_skill});
  });
});

router.get('/position/education/:id',function(req,res,next){
  var id=req.params.id;
  var results={success:false,data:[]};
  pool.query(`SELECT e.fecha_inicio,e.fecha_fin,e.nombre_institucion nombre_institucion_orig,
  ie.nombre_institucion,e.nombre_grado nombre_grado_orig,g.nombre_grado,
  crs.nombre_carrera,e.nombre_carrera nombre_carrera_orig
  FROM "Krowdy_DB".candidatos as c
  left join "Krowdy_DB".educacion e on c.id_candidato=e.id_candidato
  left join "Krowdy_DB".instituciones_educativas ie on e.id_institucion=ie.id_institucion
  left join "Krowdy_DB".grados g on e.id_grado=g.id_grado
  left join "Krowdy_DB".carreras crs on e.id_carrera=crs.id_carrera
  where c.id_candidato=$1 order by e.fecha_fin desc;`,[id],function(err, result){
    if(err){
      utils.log.save("GETTING EDUCATION ERROR", {error:err, id_candidato:id, id_user:req.user.id_user});
      return next(err);
    }
    results.success=true;
    results.data = result.rows;
    return res.json(results);
  });
});

router.get('/position/candidato/:id',function(req,res,next){
  var results = {success:false,data:[]};
  var id=req.params.id;
  var id_user = req.user.id_user;
  pool.query(`SELECT * FROM "Krowdy_DB".position_fixed WHERE
  id_candidato = $1 AND id_user = $2;`, [id, id_user],function(err, result){
    if(err){
      utils.log.save("GETTING CANDIDATE FROM POSITION_FIXED BY ID_CANDIDATE ERROR", {error:err,id_candidato:id,id_user:id_user});
      return next(err);
    }
    results.success=true;
    results.data = result.rows;
    return res.json(results);
  });
});

router.put('/position/update',function(req,res,next){
  var data = req.body;
  data.updated = moment().format("YYYY-MM-DD HH:mm:ss");
  data.id_user = req.user.id_user;

  pool.query(`UPDATE "Krowdy_DB".position_fixed SET id_onet_new=$1, funciones=$2,
  label=$3, updated=$4 WHERE id_candidato = $5 AND id_user = $6;`,
  [data.id_onet_new,data.funciones, data.label, data.updated, data.id_candidato, data.id_user],
  function(err, result){
    if(err){
      utils.log.save("UPDATE POSITION_FIXED ERROR", {error:err, data:data});
      return next(err);
    }
    return res.status(200).json({ success: true, data: data.id_candidato});
  });
});

function getConnection(environment){
  var connects=[];
  var connectionsJson = JSON.parse(
    fs.readFileSync(__dirname+'/../../database.json', 'utf8')
  );
  for(var x in connectionsJson){
    if(x == environment){
      return connectionsJson[x];
    }
  }
  return connects;
}

module.exports = router;
