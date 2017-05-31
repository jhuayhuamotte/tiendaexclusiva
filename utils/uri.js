// require('dotenv').config();

exports.host = function() {
  var host='http://localhost:3000';
  if(process.env.HOST){
    host=process.env.HOST
  }
  return host;
}
