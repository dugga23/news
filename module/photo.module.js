const mongoose = require('mongoose');

const {Schema}= mongoose;
// Define the schema for the Photo model
let photoupload = new Schema({
  image:{
    client_id:{
        type:String,
        require:true
    },
    url: { type:  String     }
},
  caption:
  {
      type: String
  },
  city:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
    collection:'photoupload'
});

module.exports=mongoose.model('photoupload', photoupload);
