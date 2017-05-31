var crypto = require('crypto');

exports.password = function(pass) {
  var key = crypto.pbkdf2Sync(pass, 'salt', 10000, 128, 'sha512');
  return key.toString('base64');
}
