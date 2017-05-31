var uniqueSessionId = 0;

exports.nextUniqueId = function(pass) {
  return uniqueSessionId++;
}
