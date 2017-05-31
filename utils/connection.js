var fs=require('fs');

exports.getConnection = function(environment) {
  var connects=[];
  var connectionsJson=JSON.parse(fs.readFileSync(__dirname+'/../database.json', 'utf8'));
  for(var x in connectionsJson){
    if(x==environment){
      return connectionsJson[x];
    }
  }
  return connects;
}
