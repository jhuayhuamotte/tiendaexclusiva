var mongoose = require('mongoose');

var Profiles = new mongoose.Schema({
  _id:{type:mongoose.Schema.Types.ObjectId,ref:'Profiles'},
  name:String,
  lastName:String,
  nameProfile:String
});

var UsersSchema = new mongoose.Schema(
  {
    username:{ type: String, required: true, unique: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true},
    profiles:[Profiles],
    rol:{ type: Number, default: 1 },
    enabled:{ type: Boolean, default: true },
    forcePassword:{ type: Boolean, default: true },
    createAt:{ type: Date, default: Date.now },
    updateAt:{ type: Date, default: Date.now }
  }
);

mongoose.model('Users',UsersSchema);
