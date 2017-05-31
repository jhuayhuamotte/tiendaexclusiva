var mongoose = require('mongoose');
var Schema = mongoose.Schema;

VodSchema = new Schema({
  invitation:{
    id:{type:mongoose.Schema.Types.ObjectId,ref:'InvitationsVod'}
  },
  candidate: {
      id:{type:mongoose.Schema.Types.ObjectId,ref:'Profiles'}
  },
  questions:[
    {
      id:{type:mongoose.Schema.Types.ObjectId,ref:'Questions'},
      answer:String
    }
  ],
  completed:{ type: Boolean, default: false},
  enable:{ type: Boolean, default: true },
  createAt:{ type: Date, default: Date.now },
  updateAt:{ type: Date, default: Date.now }
});

mongoose.model('Vod',VodSchema);
