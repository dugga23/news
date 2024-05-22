const mongoose = require('mongoose');

const {Schema}= mongoose;
// Define the schema for the Photo model
let breakingvideo = new Schema({
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
  
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
    collection:'breakingvideo'
});

module.exports=mongoose.model('breakingvideo', breakingvideo);
