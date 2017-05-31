(function () {
'use strict';
angular.module('krowdy-positions')
.factory('positions',function($http){
  var positions={};
  positions.detail=[];
  positions.education=[];
  positions.skills=[];
  positions.inputs=[{funciones:[],status:'new',puesto:[],label:null}];

  positions.getEducation = function(id){
    positions.education=[];
    return $http.get('/api/info/position/education/'+id)
    .success(function(result){
      angular.copy(result.data,positions.education);
    })
    .error(function(err){
      console.log('error al recuperar detalle');
    })
  }

  positions.getSkills = function(id){
    positions.skills=[];
    return $http.get('/api/info/position/skill/'+id)
    .success(function(result){
      for (var i=0; i<result.data.length; i++) {
        var res = result.data[i];
        var array = [];
        var arrString = [];
        if(res.sinonimos!=null&&res.sinonimos!='')array = JSON.parse(res.sinonimos);
        for(var x in array){
          arrString.push(' '+array[x].name);
        }
        positions.skills.push({nombre:res.nombre,id:res.id,sinonimos:arrString.toString(),arraysino:array});
      }
    })
    .error(function(err){
      console.log('error al recuperar detalle');
    })
  }

  positions.updateSkills = function(id,row){
    $http.put('/api/info/position/skill/'+id,row).success(function(response){
    }).error(function(err){
      console.log('error skill update',err);
    });
  }

  positions.getDetail = function(id){
    positions.detail=[];
    return $http.get('/api/info/position/'+id)
    .success(function(result){
      angular.copy(result.data,positions.detail);
    })
    .error(function(err){
      console.log('error al recuperar detalle');
    })
  }

  positions.save = function(row){
    if(positions.inputs[0].status=='new'){
      return $http.post('/api/info/position',row).success(function(response){
        $http.put('/api/v1/profilesdetail/'+row.id_candidato)
        .success(function(response){
        })
      }).error(function(err){
        console.log('error position insert',err);
      });
    }else{
      return $http.put('/api/info/position/update',row).success(function(response){
        $http.put('/api/v1/profilesdetail/'+row.id_candidato)
        .success(function(response){
        })
      }).error(function(err){
        console.log('error position update',err);
      });
    }
  }

  positions.getSaved = function(id){
    return $http.get('/api/info/position/candidato/'+id)
    .success(function(result){
      if(result.data.length>0){
        positions.inputs[0].label = result.data[0].label;
        positions.inputs[0].status = 'update';
        if(result.data[0].funciones.length>0){
          positions.inputs[0].funciones = JSON.parse(result.data[0].funciones);
        }
        if(result.data[0].id_onet_new.length>0){
          var arr = result.data[0].id_onet_new.split('|');
          for (var x in arr) {
            $http.get('/api/info/puestos/'+arr[x]).success(function(response){
              positions.inputs[0].puesto.push(response);
              var newArray = removeDuplicatesBy(x => x.id, positions.inputs[0].puesto);
              angular.copy(newArray, positions.inputs[0].puesto);
            })
          }
        }
      }else{
        positions.cleanInputs();
      }
    })
    .error(function(err){
      console.log('error al recuperar puestos');
    })
  }

  function removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function(x) {
      var key = keyFn(x), isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }

  positions.cleanInputs = function(){
    positions.inputs[0].label='1'
    positions.inputs[0].status = 'new';
    positions.inputs[0].funciones=[];
    positions.inputs[0].puesto=[];
  }

  return positions;
})
.factory('puestos',function($http){
  var puestos={};
  puestos.values=[];
  puestos.getPuestos = function(){
    return $http.get('/api/info/puestos')
    .success(function(response){
      angular.copy(response,puestos.values);
    })
    .error(function(err){
      console.log('error',err);
    })
  }
  return puestos;
})
.factory('consolidado',function($http){
  var consolidado = {};
  consolidado.actividades=[];
  consolidado.categorias=[];
  consolidado.commodities=[];
  consolidado.status={loading:false,noResults:false};
  consolidado.toolsTechnology=[];

  consolidado.getConsolidado = function(row){
    consolidado.actividades=[];
    consolidado.categorias=[];
    consolidado.commodities=[];
    consolidado.status.noResults=false;
    consolidado.status.loading=true;

    return $http.post('/api/v1/consolidado',row)
    .success(function(response){
      consolidado.status.loading=false;
      if(response.length==0){
        consolidado.status.noResults=true;
      }

      for(var x in response){
        switch (response[x].tabla) {
          case "actividades":
            $http.get('/api/v1/actividades/'+response[x].codigo).success(function(result){
              for(var x in result){
                consolidado.actividades.push(result[x]);
              }
            }).error(function(err){
              console.error("error en actividades: ",err);
            });
            break;
          case "categorias":
            $http.get('/api/v1/categorias/'+response[x].codigo).success(function(result){
              for(var x in result){
                consolidado.categorias.push(result[x]);
              }
            }).error(function(err){
              console.error("error en categorias: ", err);
            });
            break;
          case "commodities":
            $http.get('/api/v1/commodities/'+response[x].codigo).success(function(result){
              for(var x in result){
                consolidado.commodities.push(result[x]);
              }
            }).error(function(err){
              console.error("error en commodities: ", err);
            });
            break;
        }
      }
    })
    .error(function(err){
      console.log("Error en consolidado: ", err);
    });
  };

  consolidado.getToolsTechnology = function(id){
    consolidado.toolsTechnology = [];
    return $http.get('/api/v1/toolstechnology/'+id)
    .success(function(response){
      if(response.length>0){
        var rpta=[]
        for(var i in response){
          rpta.push({_id:{title:response[i]._id.title},onet_code:response[i]._id.code_onet});
        }
        angular.copy(rpta,consolidado.toolsTechnology);
      }else{
        consolidado.toolsTechnology = undefined;
      }
    })
    .error(function(err){
      console.log('error getPositions',err);
    })
  };

  return consolidado;
})
.factory('sugerencias',function($http){
  var sugerencias={};
  sugerencias.positions = [];

  sugerencias.getPositions = function(id){
    sugerencias.positions = [];
    return $http.get('/api/v1/positions/'+id)
    .success(function(response){
      if(response.length>0){
        var rpta=[]
        for(var i in response){
          rpta.push({_id:{title:response[i].title_es},onet_code:response[i].onet_code});
        }
        angular.copy(rpta,sugerencias.positions);
      }else{
        sugerencias.positions = undefined;
      }
    })
    .error(function(err){
      console.log('error getPositions',err);
    })
  }
  return sugerencias;
}).
factory('profilesdetail',function($http){
  var profilesdetail = {};
  profilesdetail.candidates = [];

  profilesdetail.getCandidatesRange = function(offset, clear){
    if(clear){
      profilesdetail.candidates = [];
    }
    return $http.get('/api/v1/profilesdetail/all/'+offset)
    .success(function(response){
      if(profilesdetail.candidates==0){
        angular.copy(response,profilesdetail.candidates);
      }else{
        for(var k in response){
          profilesdetail.candidates.push(response[k]);
        }
      }
    }).error(function(err){
      console.log("Error en getCandidatesRange: ", err);
    })
  }

  return profilesdetail;
}).
factory('onets',function($http){
  var onets = {};
  onets.value = {};
  onets.valueModal = {};

  onets.getById = function(id_onet,modal){
    return $http.get('/api/v1/onets/'+id_onet)
    .success(function(response){
      if(modal){
        angular.copy(response,onets.valueModal);
      }else{
        angular.copy(response,onets.value);
      }
    }).error(function(err){
      console.error("Error en onets.getById: ", err);
    })
  }

  return onets;
}).
factory('jobzone', function($http){
  var jobzone = {};
  jobzone.value = {};
  jobzone.valueModal = {};

  jobzone.getById = function(id,modal){
    return $http.get('/api/info/jobzone/'+id)
    .success(function(response){
      if(modal){
        angular.copy(response, jobzone.valueModal);
      }else{
        angular.copy(response, jobzone.value);
      }
    }).error(function(err){
      console.error("Error en jobzone.getById: ", err);
    })
  }

  return jobzone;
}).
factory('log',function($http){
  var log={};
  log.get = function (idInterview,type) {
    return $http.get('/api/v1/interview/'+idInterview+'/logs?type='+type);
  }

  log.save = function (type, data) {
    $http.get('/rest/savelog')
    .success(function (savelog) {
      console.log("Save Log: ",savelog);
      if (savelog.result=='true') {
        var row = {
            process: type,
            content: data
        };
        return $http.post('/api/v1/log', row) .success(function (response) {
            // console.warn('Logged:', response);
        })
        .error(function (err) {
            console.error('error al guardar log',err,row);
        })
      }
    });
  }
  return log;
})
})();
