var fs=require('fs');

exports.getPositions = function() {
  var positionsJson=JSON.parse(fs.readFileSync(__dirname+'/../json/puestos.json', 'utf8'));//require(__dirname+'/../database.json');
  return positionsJson;
}
