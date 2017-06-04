var mongoose = require('mongoose');

var SessionLinkSchema = new mongoose.Schema({
  email:String,
  sessionID:String
});

mongoose.model('sessionLink',SessionLinkSchema);
