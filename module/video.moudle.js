const mongoose = require('mongoose');

const {Schema}= mongoose;
// Define the schema for the Photo model
let videoupload = new Schema({
  video:{
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
link:{
  type:String
},

  city:{
    type:String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
},{
    collection:'videoupload'
});

module.exports=mongoose.model('videoupload', videoupload);
